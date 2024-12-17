import React, { useEffect, useState, useCallback } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import axiosInstance from '../../interceptor/axiosInstance';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ firstName: '', secondName: '', email: '', password: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/admin/users'); 
            setUsers(response.data);
        } catch (err) {
            console.error('Errore nel recuperare gli utenti:', err);
            if (err.response && err.response.status === 403) {
                navigate('/login'); 
            }
        }
    }, [navigate]);

    useEffect(() => {
        fetchUsers(); 
    }, [fetchUsers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (editingUser) {
                // Aggiorna utente
                const response = await axiosInstance.put(`/admin/update/${editingUser.id}`, { 
                    ...formData, 
                    role: editingUser.role // Mantiene il ruolo esistente
                });
                setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
            } else {
                // Crea nuovo utente
                const response = await axiosInstance.post('/signup', formData); // Cambiato a '/signup'
                setUsers([...users, response.data]);
            }

            // Resetta il form
            setFormData({ firstName: '', secondName: '', email: '', password: '' });
            setEditingUser(null);
        } catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 409)) {
                setError(err.response.data.descrizione || 'Errore: l\'utente esiste già.');
            } else {
                setError('Errore durante la comunicazione con il server.');
            }
        }
    };

    const handleEdit = (user) => {
        setFormData({ 
            firstName: user.firstName, 
            secondName: user.secondName, 
            email: user.email, 
            password: '' // Non impostiamo la password qui
        });
        setEditingUser(user); // Imposta l'utente in modifica
        setError(null);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/admin/delete/${id}`); 
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error('Errore nella rimozione dell\'utente:', err);
        }
    };

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            {error && <p className="error">{error}</p>}
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!editingUser} // Richiede password solo se non stai modificando
                />
                {/* Mostra il ruolo solo in modalità di modifica */}
                {editingUser && (
                    <select 
                        name="role" 
                        value={editingUser.role} 
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} 
                        required
                    >
                        <option value="">Seleziona il ruolo</option>
                        <option value="USER">Utente</option>
                        {/* <option value="ADMIN">Admin</option> */}
                    </select>
                )}
                <button type="submit">{editingUser ? 'Aggiorna Utente' : 'Aggiungi Utente'}</button>
            </form>
            <h2>Utenti Registrati</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Ruolo</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.role === 'USER' && ( // Mostra i pulsanti solo per gli USER
                                    <>
                                        <button onClick={() => handleEdit(user)}>Modifica</button>
                                        <button onClick={() => handleDelete(user.id)}>Rimuovi</button>
                                    </>
                                )}
                                {user.role === 'ADMIN' && (
                                    <span>Non puoi modificare o eliminare un Admin</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
