import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Importa il file CSS

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/signup", formData);
      if (response.status === 200) {
        setSuccess(true);
        alert("Registrazione completata! Reindirizzamento al login...");
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Errore durante la registrazione. Riprova."
      );
    }
  };

  return (
    <div className="registration-container">
      <h1>Registrati</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="registration-input"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Cognome"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="registration-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="registration-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="registration-input"
        />
        <button type="submit" className="registration-button">
          Registrati
        </button>
        {error && <p className="registration-error">{error}</p>}
        {success && <p className="registration-success">Registrazione completata!</p>}
      </form>
    </div>
  );
}

export default RegistrationForm;
