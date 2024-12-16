// src/components/login/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import './Login.css';
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Accedi al contesto di autenticazione

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/signin", formData);
            if (response.status === 200) {
                const { token } = response.data;

                // Decodifica il token JWT per ottenere il ruolo
                const decoded = jwtDecode(token);
                const userRole = decoded.role;

                // Utilizza il contesto per il login
                login(token, userRole);

                // Reindirizza in base al ruolo
                if (userRole === "ADMIN") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Errore durante il login. Controlla email e password."
            );
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
