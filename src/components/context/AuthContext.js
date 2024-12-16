// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roles, setRoles] = useState([]); // Aggiungi uno stato per i ruoli

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
            setIsAuthenticated(true);
            setRoles(decodedToken.roles); // Imposta i ruoli
        } else {
            setIsAuthenticated(false);
            setRoles([]); // Resetta i ruoli se non autenticato
        }
    }, []);

    const login = (token, role) => {
        localStorage.setItem("token", token);
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
        setIsAuthenticated(true);
        setRoles(decodedToken.roles); // Imposta i ruoli
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setRoles([]); // Resetta i ruoli al logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, roles, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
