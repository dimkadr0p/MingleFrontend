import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



function WelcomeHome() {

    return (
        <div className="flex gap-2">
            <Button variant="primary" type="submit">
                <Link className='text-white text-decoration-none' to="/login">Войти</Link>
            </Button>
            <Button variant="primary" type="submit">
                <Link className='text-white text-decoration-none' to="/register">Зарегистрироваться</Link>
            </Button>
        </div>
    );
}

export default WelcomeHome;


