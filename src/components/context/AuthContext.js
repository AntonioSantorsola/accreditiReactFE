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
            setRoles(decodedToken.roles || []); // Imposta i ruoli, se presenti
        } else {
            setIsAuthenticated(false);
            setRoles([]); // Resetta i ruoli se non autenticato
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica il token JWT
        setIsAuthenticated(true);
        setRoles(decodedToken.roles || []); // Imposta i ruoli, se presenti
    };
    

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setRoles([]); // Resetta i ruoli al logout
    };

    const isAdmin = () => {
        return roles.includes('ADMIN'); // Funzione per controllare se l'utente è admin
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, roles, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
