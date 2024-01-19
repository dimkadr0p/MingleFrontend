import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import PhotoUser from './PhotoUser';
import { Modal, Button } from 'react-bootstrap';
import StatusUser from "./StatusUser";

const getLoginFromToken = () => {
    try {
        const token = localStorage.getItem("token");
        return jwtDecode(token).sub;
    } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        return null;
    }
};

function Dialogs() {
    const [dialogs, setDialogs] = useState([]);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [message, setMessage] = useState("");
    const [isMessageSent, setIsMessageSent] = useState(false);

    useEffect(() => {
        fetchDialogs();
        const interval = setInterval(() => {
            fetchDialogs();
        }, 1000000000);
        return () => {
            clearInterval(interval);
        };
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
            setIsMessageSent(true);
            // Обновляем список диалогов после отправки сообщения
            fetchDialogs();
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
        }
    };

    const getUniqueSenders = () => {
        const senders = dialogs.map((dialog) => dialog.sender);
        const uniqueSenders = [...new Map(senders.map((sender) => [sender.id, sender])).values()];
        return uniqueSenders;
    };

    useEffect(() => {
        if (selectedDialog) {
            const dialogContainer = document.getElementById("dialog-container");
            dialogContainer.scrollTop = dialogContainer.scrollHeight;
        }
    }, [selectedDialog]);

    const handleDeleteDialog = async (dialogName) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.post(`http://localhost:8080/api/delConversation?name=${dialogName}`, null, config);
            // Обновляем список диалогов после удаления
            fetchDialogs();
        } catch (error) {
            console.log("error ", error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar dialogs={dialogs} selectDialog={selectDialog} getUniqueSenders={getUniqueSenders} handleDeleteDialog={handleDeleteDialog} />
            <MainChatArea
                selectedDialog={selectedDialog}
                dialogs={dialogs}
                sendMessage={sendMessage}
                message={message}
                setMessage={setMessage}
                isMessageSent={isMessageSent}
                setIsMessageSent={setIsMessageSent}
            />
        </div>
    );
}

const Sidebar = ({ dialogs, selectDialog, getUniqueSenders, handleDeleteDialog }) => {
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
                            handleDeleteDialog={handleDeleteDialog}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const DialogItem = ({ sender, dialog, selectDialog, handleDeleteDialog }) => {
    const [showModalDelete, setShowModalDelete] = useState(false);

    if (sender.name === getLoginFromToken()) {
        return null;
    }
    const handleDelete = () => { //скорее всего sender
        let UserDialogName;
        if (dialog.sender.name !== getLoginFromToken()) {
            UserDialogName = dialog.sender.name;
        } else {
            UserDialogName = dialog.recipient.name;
        }
        handleDeleteDialog(UserDialogName);
        setShowModalDelete(false);
    };

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
            <div className="mr-10">
                <StatusUser isOnline={sender.online} />
            </div>
            <button className="block" onClick={() => setShowModalDelete(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none">
                    <path d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20.5001 6H3.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M9.5 11L10 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M14.5 11L14 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>
            {showModalDelete && (
                <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удалить переписку</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы уверены, что хотите удалить эту переписку?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
                            Отмена
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

const MainChatArea = ({ selectedDialog, dialogs, sendMessage, message, setMessage, isMessageSent, setIsMessageSent }) => {
    return (
        <div className="flex-1">
            {selectedDialog && (
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">{selectedDialog.sender.name}</h1>
                </header>
            )}
            <div className="h-screen overflow-y-auto p-4 pb-36" id="dialog-container">
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
                <ChatInput
                    sendMessage={sendMessage}
                    message={message}
                    setMessage={setMessage}
                    isMessageSent={isMessageSent}
                    setIsMessageSent={setIsMessageSent}
                />
            )}
        </div>
    );
};

const ChatMessage = ({ dialog }) => {

    function formatTime(timeStr) {
        const time = new Date(timeStr);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
        };
        return time.toLocaleString('ru-RU', options);
    }
    return (
        <div className="flex mb-4 cursor-pointer">
            <div className="w-9 h-9 rounded-full flex flex-col gap-2 items-center justify-center mr-2">
                {dialog.sender.name}
                <PhotoUser photo={dialog.sender.photo} size={35} />
            </div>
            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-2">
                <p className="text-gray-700">{dialog.content}</p>
                <p className="text-gray-400">{formatTime(dialog.recordingTime)}</p>
            </div>
        </div>
    );
};

const ChatInput = ({ sendMessage, message, setMessage, isMessageSent, setIsMessageSent }) => {
    const handleSendMessage = async () => {
        await sendMessage();
        setIsMessageSent(true);
    };

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
                <button onClick={handleSendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                    Отправить
                </button>
            </div>
            {isMessageSent && (
                <p className="text-green-500 mt-2">Сообщение доставлено!</p>
            )}
        </footer>
    );
};

export default Dialogs;