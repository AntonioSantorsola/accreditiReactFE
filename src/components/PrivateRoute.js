// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children, requiredRoles }) => {
    const { isAuthenticated, roles } = useContext(AuthContext);

    // Controlla se l'utente è autenticato
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Se sono richiesti ruoli, verifica se l'utente possiede almeno uno di quelli
    if (requiredRoles && !requiredRoles.some(role => roles.includes(role))) {
        return <Navigate to="/" />; // O mostra un messaggio di errore
    }

    // Se l'utente è autenticato e ha uno dei ruoli richiesti, mostra i bambini
    return children;
};

export default PrivateRoute;
