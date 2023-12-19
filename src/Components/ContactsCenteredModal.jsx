import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import FriendsWrapper from './FriendsWrapper';



function ContactsCenteredModal(props) {
    const [friends, setFriends] = useState([]);


    useEffect(() => {
        const handleContacts = async () => {
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

        handleContacts();
    }, []);



    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
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
                            <FriendsWrapper friend={friend} />
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
    );
}


export default ContactsCenteredModal;