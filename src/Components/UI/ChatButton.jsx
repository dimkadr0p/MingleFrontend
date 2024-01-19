import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ChatButton({ friendId }) {
  const history = useHistory();

  const handleChatClick = () => {
    history.push(`/chat/${friendId}`);
  };

  return (
    <Button variant="primary" onClick={handleChatClick}>
      Начать чат
    </Button>
  );
}

export default ChatButton;