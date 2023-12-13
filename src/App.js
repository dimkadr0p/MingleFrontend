import React from 'react';
import logo from './logo.svg';
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import PasswordRecoveryForm from './Components/PasswordRecoveryForm'
import WelcomeHome from './Components/WelcomeHome'
import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function App() {

  const location = useLocation();

  let pageTitle;

  switch (location.pathname) {
    case '/register':
      pageTitle = 'Зарегистрироваться в Mingle';
      break;
    case '/forgot-password':
      pageTitle = 'Восстановление пароля в Mingle';
      break;
    case '/login':
      pageTitle = 'Войти в Mingle';
    default:
      pageTitle = 'Добро пожаловать в Mingle';
      break;
  }
  
  return (
    <div className="App">

      <div className='auth d-flex flex-column justify-content-center align-items-center' style={{ height: '75vh' }}>
        <img style={{ paddingLeft: "75px" }} src={logo} alt="Logo" width="500px" height="300px" />
        <h2 style={{ marginBottom: "20px" }} className="font-weight-bold">{pageTitle}</h2>

        <Routes>
          <Route exact path='/' element={<WelcomeHome/>}/>
          <Route exact path='/login' element={<LoginForm />} />
          <Route exact path='/register' element={<RegisterForm />} />
          <Route exact path='/forgot-password' element={<PasswordRecoveryForm />} />
        </Routes>

      </div>

    </div>
  );
}

export default App;
