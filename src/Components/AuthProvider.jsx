import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';



const AuthContext = createContext();


const CHECK_TOKEN_URL = 'http://localhost:8080/api/info';

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        axios.get(CHECK_TOKEN_URL, {
            headers: { Authorization: `Bearer ${token} ` }
        })
            .then(response => {
                setIsAuthenticated(true);
            })
            .catch(error => {
                setIsAuthenticated(false);
                console.error('Ошибка при проверке токена:', error);
            });

    }, []);


    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}


function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };