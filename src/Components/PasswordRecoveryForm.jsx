import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import BootButton from './UI/BootButton'




function PasswordRecoveryForm() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailMatchError, setEmailMatchError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setEmailMatchError('');
            setLoading(true);
            const response = await axios.post("http://localhost:8080/api/resetPassword?email=".concat(email));
            if(response.status === 200) alert("Сообщение с восстановлением пароля было отправлено вам на почту.");
        } catch {
            setEmailMatchError("Такого email не существует");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form className="w-25" onSubmit={handleResetPassword}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" />
                <Form.Text style={{ color: 'red' }}>
                    {emailMatchError}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Text>
                    Вспомнили пароль? <Link to="/login" className="text-decoration-none text-primary">Войти</Link>
                </Form.Text>
            </Form.Group>
            {loading
                ? <BootButton />
                : <Button variant="primary" type="submit">Отправить на почту</Button>}

        </Form>

    );
}

export default PasswordRecoveryForm;