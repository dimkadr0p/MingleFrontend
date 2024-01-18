import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';



const AuthContext = createContext();


const CHECK_TOKEN_URL = 'http://localhost:8080/api/user/info';

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
        }

        axios.get(CHECK_TOKEN_URL, {
            headers: { Authorization: `Bearer ${token} ` }
        })
            .then(response => {
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(error => {
                setIsAuthenticated(false);
                setIsLoading(false);
                console.error('Ошибка при проверке токена:', error);
            });

    }, []);


    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}


function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };