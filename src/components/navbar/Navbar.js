// src/components/navbar/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, roles, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Chiama la funzione di logout
        navigate("/login"); // Reindirizza alla pagina di login
    };

    const isAdmin = () => {
        return roles.includes("ADMIN"); // Funzione per verificare se l'utente è admin
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">SportReserve</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAdmin() && ( // Mostra "Richiesta Accredito" solo se l'utente è admin
                    <li>
                        <Link to="/accredito">Richiesta Accredito</Link>
                    </li>
                )}
                {isAuthenticated && isAdmin() && ( // Mostra "Admin Dashboard" solo se l'utente è loggato e admin
                    <li>
                        <Link to="/admin-dashboard">Admin Dashboard</Link>
                    </li>
                )}
                {!isAuthenticated && ( // Mostra il link alla registrazione solo se non autenticato
                    <li>
                        <Link to="/register">Registrati</Link>
                    </li>
                )}
                <li>
                    {isAuthenticated ? ( // Mostra il pulsante di logout se autenticato
                        <Link to="/login" onClick={handleLogout} className="navbar-button">Logout</Link>
                    ) : ( // Mostra il link di login se non autenticato
                        <Link to="/login" className="navbar-button">Login</Link>
                    )}
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {isAuthenticated && ( // Mostra "Prenotazioni" solo se l'utente è autenticato
                    <li>
                        <Link to="/prenotazioni">Prenotazioni</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
