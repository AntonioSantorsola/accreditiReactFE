// src/components/adminDashboard/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; // Assicurati di avere gli stili qui
import axios from 'axios'; // Assicurati di avere axios installato

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ firstName: '', secondName: '', email: '', username: '', password: '', role: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState(null); // Per gestire gli errori

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token"); // Assicurati di avere il token
        const response = await axios.get('http://localhost:8080/api/v1/admin/users', {
            headers: {
                Authorization: `Bearer ${token}`, // Invia il token JWT nell'header
            },
        });
        setUsers(response.data); // Imposta gli utenti ricevuti dal backend
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // Ottieni il token JWT

        try {
            if (editingUser) {
                // Aggiorna l'utente esistente
                await axios.put(`http://localhost:8080/api/v1/admin/users/${editingUser.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Invia il token JWT
                    },
                });
                setUsers(users.map(user => (user.id === editingUser.id ? { ...editingUser, ...formData } : user)));
            } else {
                // Aggiungi un nuovo utente
                await axios.post('http://localhost:8080/api/v1/admin', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Invia il token JWT
                    },
                });
                setUsers([...users, { ...formData, id: users.length + 1 }]); // Aggiungi l'utente alla lista locale (puoi aggiornare la lista più avanti con fetchUsers)
            }
            
            setFormData({ firstName: '', secondName: '', email: '', username: '', password: '', role: '' });
            setEditingUser(null);
            fetchUsers(); // Ricarica gli utenti dopo l'operazione
            setError(null); // Reset dell'errore
        } catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 409)) {
                // Mostra errore se l'email o username esistono già
                setError(err.response.data.message); // Assicurati che il backend restituisca un messaggio significativo
            } else {
                setError('Errore durante la comunicazione con il server.');
            }
        }
    };

    const handleEdit = (user) => {
        setFormData({ firstName: user.firstName, secondName: user.secondName, email: user.email, username: user.username, password: '', role: user.role }); // Mantieni la password vuota durante la modifica
        setEditingUser(user);
        setError(null); // Resetta l'errore quando si inizia a modificare
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token"); // Ottieni il token JWT
        await axios.delete(`http://localhost:8080/api/v1/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Invia il token JWT
            },
        });
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            {error && <p className="error">{error}</p>} {/* Mostra errori qui */}
            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nome"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="secondName"
                    placeholder="Cognome"
                    value={formData.secondName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
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
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="">Seleziona il ruolo</option>
                    <option value="USER">Utente</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button type="submit">{editingUser ? 'Aggiorna Utente' : 'Aggiungi Utente'}</button>
            </form>
            <h2>Utenti Registrati</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <span>{user.username} - {user.role}</span>
                        <button onClick={() => handleEdit(user)}>Modifica</button>
                        <button onClick={() => handleDelete(user.id)}>Rimuovi</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
