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

    return (
        <nav className="navbar">
            <h1 className="navbar-title">La tua App</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {roles.includes("ADMIN") && ( // Mostra Accredito se l'utente è admin
                    <li>
                        <Link to="/accredito">Richiesta Accredito</Link>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <Link to="/register">Registrati</Link>
                    </li>
                )}
                <li>
                    {isAuthenticated ? (
                        <Link to="/login" onClick={handleLogout} className="navbar-button">Logout</Link>
                    ) : (
                        <Link to="/login" className="navbar-button">Login</Link>
                    )}
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
