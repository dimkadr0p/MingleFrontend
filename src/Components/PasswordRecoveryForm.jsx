import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link  } from 'react-router-dom';


function PasswordRecoveryForm() {

    return (
        <Form className="w-25" onSubmit={(e) => { e.preventDefault() }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" placeholder="Введите email" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Text>
                    Вспомнили пароль? <Link to="/login" className="text-decoration-none text-primary">Войти</Link>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Отправить на почту
            </Button>
            
        </Form>

    );
}

export default PasswordRecoveryForm;