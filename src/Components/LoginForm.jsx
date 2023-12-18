import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import BootButton from './UI/BootButton';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';



function LoginForm() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:8080/api/auth', { name, password });

            if (response.status === 200) {
                setErrorMessage("");
                const { token } = response.data;
                localStorage.setItem('token', token);
                navigate('/authorized');
                window.location.reload();
                //TODO:Разобраться почему не выкидыввает на /authorized, в проивном случае перезагрузить страницу
            }

        } catch (error) {
            console.log("error ", error);
            handleLoginError(error);
        } finally {
            setLoading(false);
        }
    }


    const handleLoginError = (error) => {
        if (error.response.status === 401) {
            handleUnauthorizedError(error.response.data.message);
        } else if (error.response.status === 400) {
            handleBadRequestError(error.response.data.violations);
        }
    }

    const handleUnauthorizedError = (message) => {
        if (message.includes("login or password")) {
            setErrorMessage("Нерверный логин или пароль");
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

        <AuthWrapper pageTitle={"Войти в Mingle"}>
            <Form className="w-25" onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control type="text" minLength={5} maxLength={20} value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите логин" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" />
                    <Form.Text>
                        <Link to="/forgot-password" className="text-decoration-none text-primary">Забыли пароль?</Link>
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Text style={{ color: 'red' }}>
                        {errorMessage}
                    </Form.Text>
                    <Form.Check type="checkbox" label="Запомнить меня" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Text>
                        Еще не зарегистрированы? <Link to="/register" className="text-decoration-none text-primary">Зарегистрироваться</Link>
                    </Form.Text>
                </Form.Group>
                {loading ? <BootButton /> : <Button variant="primary" type="submit">Войти</Button>}
            </Form>
        </AuthWrapper>
    );
}

export default LoginForm;