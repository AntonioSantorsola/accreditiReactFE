// src/components/login/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import './Login.css'; // Assicurati di avere gli stili qui
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

                // Decodifica il token JWT per ottenere il ruolo e username
                const decoded = jwtDecode(token);
                const userRole = decoded.roles[0]; // Assicurati di usare "roles" e non "role"
                const username = decoded.username; // Assicurati di avere username nel token

                // Utilizza il contesto per il login
                login(token, userRole);

                // Salva username nel localStorage
                localStorage.setItem("username", username);

                // Reindirizza in base al ruolo
                if (userRole === "ADMIN") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Email e/o password non validi"
            );
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
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
                <button type="submit" className="login-button">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
