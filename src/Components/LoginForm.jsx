import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function LoginForm() {

    return (
        <Form className="w-25" onSubmit={(e) => { e.preventDefault() }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="text" placeholder="Введите логин" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Введите пароль" />
                <Form.Text>
                    <Link to="/forgot-password" className="text-decoration-none text-primary">Забыли пароль?</Link>
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Запомнить меня" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Text>
                    Еще не зарегистрированы? <Link to="/register" className="text-decoration-none text-primary">Зарегистрироваться</Link>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Войти
            </Button>
        </Form>
    );
}

export default LoginForm;