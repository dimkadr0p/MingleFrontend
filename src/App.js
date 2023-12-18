import React from 'react';
import LoginForm from './Components/LoginForm'
import RegisterForm from './Components/RegisterForm'
import PasswordRecoveryForm from './Components/PasswordRecoveryForm'
import WelcomeAuth from './Components/WelcomeAuth'
import AuthorizedPage from './Components/AuthorizedPage'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Components/AuthProvider';


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={isAuthenticated ? <AuthorizedPage /> : <WelcomeAuth />}
        />
        <Route
          path='/authorized'
          element={isAuthenticated ? <AuthorizedPage /> : <LoginForm />}
        />
        <Route
          path='/login'
          element={
            isAuthenticated ? <Navigate to="/authorized" replace /> : <LoginForm />
          }
        />
        <Route
          path='/register'
          element={
            isAuthenticated ? <Navigate to="/authorized" replace /> : <RegisterForm />
          }
        />
        <Route
          path='/forgot-password'
          element={<PasswordRecoveryForm />}
        />
      </Routes>
    </div>
  );
}
export default App;
