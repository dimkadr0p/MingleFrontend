import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import PhotoUser from './PhotoUser';

function Dialogs() {
  const [dialogs, setDialogs] = useState([]);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDialogs();
  }, []);

  const fetchDialogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get("http://localhost:8080/api/dialogs", config);
      setDialogs(response.data);
      console.log("response: ", response.data);
    } catch (error) {
      console.error("Ошибка при получении диалогов:", error);
    }
  };

  const selectDialog = (dialogId) => {
    const selectedDialog = dialogs.find((dialog) => dialog.id === dialogId);
    setSelectedDialog(selectedDialog);
  };

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let idUserDialog;
      if (selectedDialog.sender.name !== getLoginFromToken()) {
        idUserDialog = selectedDialog.sender.id;
      } else {
        idUserDialog = selectedDialog.recipient.id;
      }
      const data = {
        id: idUserDialog,
        content: message,
      };
      await axios.post("http://localhost:8080/api/sendMessage", data, config);
      setMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  const getUniqueSenders = () => {
    const senders = dialogs.map((dialog) => dialog.sender);
    const uniqueSenders = [...new Map(senders.map((sender) => [sender.id, sender])).values()];
    return uniqueSenders;
  };

  const getLoginFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      return jwtDecode(token).sub;
    } catch (error) {
      console.error('Ошибка при декодировании токена:', error);
      return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar dialogs={dialogs} selectDialog={selectDialog} getUniqueSenders={getUniqueSenders} />
      <MainChatArea
        selectedDialog={selectedDialog}
        dialogs={dialogs}
        sendMessage={sendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}

const Sidebar = ({ dialogs, selectDialog, getUniqueSenders }) => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Mingle</h1>
      </header>
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {getUniqueSenders().map((sender) => {
          const dialog = dialogs.find((dialog) => dialog.sender.id === sender.id);
          return (
            <DialogItem
              key={sender.id}
              sender={sender}
              dialog={dialog}
              selectDialog={selectDialog}
            />
          );
        })}
      </div>
    </div>
  );
};

const DialogItem = ({ sender, dialog, selectDialog }) => {
  return (
    <div
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
      onClick={() => selectDialog(dialog.id)}
    >
      <div className="w-12 h-12 rounded-full mr-3">
        <PhotoUser photo={sender.photo} size={50} />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{sender.name}</h2>
        <p className="text-gray-600">{dialog.content}</p>
      </div>
    </div>
  );
};

const MainChatArea = ({ selectedDialog, dialogs, sendMessage, message, setMessage }) => {
  return (
    <div className="flex-1">
      {selectedDialog && (
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{selectedDialog.sender.name}</h1>
        </header>
      )}
      <div className="h-screen overflow-y-auto p-4 pb-36">
        {selectedDialog &&
          dialogs
            .filter(
              (dialog) =>
                (dialog.sender.id === selectedDialog.sender.id &&
                  dialog.recipient.id === selectedDialog.recipient.id) ||
                (dialog.sender.id === selectedDialog.recipient.id &&
                  dialog.recipient.id === selectedDialog.sender.id)
            )
            .map((dialog) => (
              <ChatMessage key={dialog.id} dialog={dialog} />
            ))}
      </div>
      {selectedDialog && (
        <ChatInput sendMessage={sendMessage} message={message} setMessage={setMessage} />
      )}
    </div>
  );
};

const ChatMessage = ({ dialog }) => {
  return (
    <div className="flex mb-4 cursor-pointer">
      <div className="w-9 h-9 rounded-full flex flex-col gap-2 items-center justify-center mr-2">
        {dialog.sender.name}
        <PhotoUser photo={dialog.sender.photo} size={35} />
      </div>
      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
        <p className="text-gray-700">{dialog.content}</p>
      </div>
    </div>
  );
};

const ChatInput = ({ sendMessage, message, setMessage }) => {
  return (
    <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
          Send
        </button>
      </div>
    </footer>
  );
};

export default Dialogs;