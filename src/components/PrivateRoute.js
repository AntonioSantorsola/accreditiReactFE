// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, roles } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && !roles.includes(requiredRole)) {
        return <Navigate to="/" />; // O mostra un messaggio di errore
    }

    return children; // Se l'utente è autenticato e ha il ruolo corretto, mostra i bambini
};

export default PrivateRoute;
