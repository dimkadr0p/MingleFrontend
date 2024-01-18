import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import FriendsWrapper from './FriendsWrapper';

function ContactsCenteredModal(props) {
    const [friends, setFriends] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [friendToDelete, setFriendToDelete] = useState(null);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:8080/api/friends', config);
                if (response.status === 200) {
                    setFriends(response.data);
                }
            } catch (error) {
                console.log("error ", error);
            }
        };
        fetchFriends();
    }, []);

    const handleDeleteFriend = (friend) => {
        setFriendToDelete(friend);
        setShowConfirmation(true);
    };

    const confirmDeleteFriend = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.post(`http://localhost:8080/api/delFriend?name=${friendToDelete.name}`, null, config);
            setFriends(friends.filter((f) => f.id !== friendToDelete.id));
            setShowConfirmation(false);
        } catch (error) {
            console.log("error ", error);
        }
    };

    return (
        <>
            <Modal
                {...props}
                size="sm"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Контакты
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {friends.length > 0 ? (
                        friends.map((friend) => (
                            <div key={friend.id}>
                                <FriendsWrapper
                                    friend={friend}
                                    onDelete={() => handleDeleteFriend(friend)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>У вас пока нет друзей</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Удаление пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы действительно хотите удалить этого пользователя?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
                        Отмена
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteFriend}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ContactsCenteredModal;