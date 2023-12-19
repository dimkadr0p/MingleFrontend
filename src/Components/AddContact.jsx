import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';




function ContactsCenteredModal(props) {

    const [contact, setContact] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [success, setSuccess] = useState(false);


    const handleAddContact = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const url = new URL("http://localhost:8080/api/addFriend");
            url.searchParams.append("name", contact);
            const response = await axios.post(url, null, config);
            if (response.status === 200) {
                setErrorMessage('');
                setSuccess(true);
            }

        } catch (error) {
            setSuccess(false);
            handleContactError(error)
            console.log("error ", error);
        }
    };

    const handleContactError = (error) => {
        if (error.response.status === 409) {
            handleAlreadyContactError(error.response.data.message);
        } else if (error.response.status === 404) {
            handleNotFoundError(error.response.data.message);
        }
    }

    const handleAlreadyContactError = (message) => {
        if (message.includes("already in your contacts")) {
            setErrorMessage("Пользователь уже в ваших контактах");
        }
    };

    const handleNotFoundError = (message) => {
        if (message.includes("Friend not found")) {
            setErrorMessage("Такого пользователя не существует");
        }
    };


    const handleModalClose = () => {
        setErrorMessage('');
        setSuccess(false);
        props.onHide();
    };

    const handleOutsideClick = (event) => {
        if (event.target === event.currentTarget) {
            handleModalClose();
        }
    };


    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleModalClose}
            onClick={handleOutsideClick}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Контакты
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input value={contact} onChange={(e) => { setContact(e.target.value) }} minLength={5} maxLength={20} type="text" placeholder="Введите имя контакта" />
            </Modal.Body>
            <Modal.Footer>
                {success && <p style={{ color: 'green' }}>Контакт успешно добавлен</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <Button onClick={handleModalClose}>Закрыть</Button>
                <Button onClick={handleAddContact}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ContactsCenteredModal;