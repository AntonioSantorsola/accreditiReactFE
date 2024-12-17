import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import axiosInstance from '../../interceptor/axiosInstance';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState(null);

    // Funzione per ottenere tutti gli utenti
    const fetchUsers = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/admin/users'); // Cambiato l'endpoint
            setUsers(response.data);
        } catch (err) {
            console.error('Errore nel recuperare gli utenti:', err);
            if (err.response && err.response.status === 403) {
                navigate('/login'); // Reindirizza alla pagina di login se 403
            }
        }
    }, [navigate]); // Aggiungi navigate come dipendenza

    // Fetch utenti all'avvio del componente
    useEffect(() => {
        fetchUsers(); // Richiama la funzione per ottenere gli utenti
    }, [fetchUsers]); // Includi fetchUsers nelle dipendenze

    // Gestisce il cambiamento dei campi del form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Gestisce il submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (editingUser) {
                // Aggiorna utente esistente
                const response = await axiosInstance.put(`/admin/update/${editingUser.id}`, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password, // Aggiungi solo se necessario
                });
                setUsers(users.map(user => (user.id === editingUser.id ? response.data : user))); // Aggiorna l'array di utenti
            } else {
                // Crea nuovo utente
                const response = await axiosInstance.post('http://localhost:8080/api/v1/auth/signup', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                });
                setUsers([...users, response.data]); // Aggiungi il nuovo utente alla lista
            }

            // Resetta il form
            setFormData({ firstName: '', lastName: '', email: '', password: '' });
            setEditingUser(null);
        } catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 409)) {
                setError(err.response.data.descrizione || 'Errore: l\'utente esiste già.');
            } else {
                setError('Errore durante la comunicazione con il server.');
            }
        }
    };

    // Gestisce l'editing di un utente
    const handleEdit = (user) => {
        setFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email, password: '' });
        setEditingUser(user);
        setError(null);
    };

    // Gestisce l'eliminazione di un utente
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/admin/delete/${id}`); // Cambiato l'endpoint
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error('Errore nella rimozione dell\'utente:', err);
        }
    };

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            {error && <p className="error">{error}</p>} {/* Mostra errori */}
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
                    name="lastName"
                    placeholder="Cognome"
                    value={formData.lastName}
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required={editingUser === null} // Richiedi password solo se non stai modificando un utente
                />
                <button type="submit">{editingUser ? 'Aggiorna Utente' : 'Aggiungi Utente'}</button>
            </form>
            <h2>Utenti Registrati</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Modifica</button>
                                <button onClick={() => handleDelete(user.id)}>Rimuovi</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
