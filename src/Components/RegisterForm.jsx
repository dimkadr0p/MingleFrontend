import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link  } from 'react-router-dom';

function RegisterForm() {

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            setPasswordMatchError('Пароли не совпадают');
        } else {
            // Отправка данных на сервер или другая логика регистрации
            setPasswordMatchError('');
            // Дополнительный код...
        }
    };

    return (
        <Form className="w-25" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="text" placeholder="Введите логин" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" placeholder="Введите email" />
                <Form.Text className="text-muted">
                    Мы никогда не передадим вашу электронную почту кому-либо еще.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" onChange={handlePasswordChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите повторно пароль" onChange={handlePasswordConfirmationChange} />
                {passwordMatchError && <Form.Text className="text-danger">{passwordMatchError}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Text>
                    Уже есть аккаунт? <Link to="/login" className="text-decoration-none text-primary">Войти</Link>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Зарегистрироваться
            </Button>
        </Form>
    );
}

export default RegisterForm;