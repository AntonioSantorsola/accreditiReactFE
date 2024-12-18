import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, roles, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isAdmin = () => {
        return roles.includes("ADMIN");
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">SportReserve</h1>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAdmin() && (
                    <li>
                        <Link to="/accredito">Richiesta Accredito</Link>
                    </li>
                )}
                {isAuthenticated && (
                    <li className="dropdown">
                        <span className="dropdown-toggle">Menu ▼</span>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/prenotazioniList">Storico Prenotazioni</Link>
                            </li>
                            <li>
                                <Link to="/prenotazioni">Prenota</Link>
                            </li>
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="logout-button">Logout</button>
                            </li>
                        </ul>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                )}
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
