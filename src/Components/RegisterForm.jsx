import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BootButton from './UI/BootButton';
import { useNavigate } from 'react-router-dom';


function RegisterForm() {

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== passwordConfirmation) {
            setPasswordMatchError('Пароли не совпадают');
            return; 
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/api/registration', {
                name,
                email,
                password,
            });

            if (response.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            handleRegistrationError(error);
        } finally {
            setLoading(false);
            setPasswordMatchError('');
        }
    };

    const handleRegistrationError = (error) => {
        if (error.response.status === 409) {
            handleConflictError(error.response.data.message);
        } else if (error.response.status === 400) {
            handleBadRequestError(error.response.data.violations);
        }
    };

    const handleConflictError = (message) => {
        if (message.includes("mail")) {
            setErrorMessage("Такой email уже существует");
        } else {
            setErrorMessage("Такой логин уже существует");
        }
    };

    const handleBadRequestError = (violations) => {
        violations.forEach((violation) => {
            if (violation.fieldName === "name") {
                setErrorMessage("Логин должен содержать как минимум одну латинскую букву в начале");
            }
            if (violation.fieldName === "password") {
                setErrorMessage("Пароль должен содержать по крайней мере одну цифру, одну строчную букву, одну заглавную букву");
            }
        });
    };

    return (
        <Form className="w-25" onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="text" minLength={5} maxLength={20} value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите логин" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" />
                <Form.Text className="text-muted">
                    Мы никогда не передадим вашу электронную почту кому-либо еще.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" minLength={8} placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                <Form.Label>Подтвердите пароль</Form.Label>
                <Form.Control type="password" minLength={8} placeholder="Введите повторно пароль" onChange={(e) => setPasswordConfirmation(e.target.value)} />
                {passwordMatchError && <Form.Text className="text-danger">{passwordMatchError}</Form.Text>}
            </Form.Group>
            {errorMessage && <Form.Text className="text-danger">{errorMessage}</Form.Text>}
            <Form.Group className="mb-3">
                <Form.Text>
                    Уже есть аккаунт? <Link to="/login" className="text-decoration-none text-primary">Войти</Link>
                </Form.Text>
            </Form.Group>
            {loading
                ? <BootButton />
                : <Button variant="primary" type="submit">Зарегистрироваться</Button>}
        </Form>
    );
}

export default RegisterForm;