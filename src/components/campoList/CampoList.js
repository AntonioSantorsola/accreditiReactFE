// src/components/CampoList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import './CampoList.css'; // Importa il file CSS

const CampoList = ({ onSelectCampo }) => {
    const [campi, setCampi] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Stato di caricamento
    const [selectedCampoId, setSelectedCampoId] = useState(null); // Stato per il campo selezionato

    useEffect(() => {
        const fetchCampi = async () => {
            setLoading(true); // Inizia il caricamento
            try {
                // Aggiungi l'intestazione di autorizzazione
                const token = 'YOUR_JWT_TOKEN'; // Sostituisci con il metodo per ottenere il token dall'autenticazione
                const response = await axiosInstance.get('/campi', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCampi(response.data);
                if (response.data.length === 0) {
                    setError('Nessun campo disponibile.');
                } else {
                    setError(null);
                }
            } catch (error) {
                console.error('Error fetching campi:', error);
                setError('Errore nel recupero dei campi.');
            } finally {
                setLoading(false); // Ferma il caricamento
            }
        };

        fetchCampi();
    }, []);

    const handleCampoSelect = (campo) => {
        if (campo.disponibile) {
            setSelectedCampoId(campo.id); // Aggiorna il campo selezionato
            onSelectCampo(campo); // Passa il campo al genitore
        }
    };

    return (
        <div className="campo-list-container">
            <h2>Campi Disponibili</h2>
            {loading && <p>Caricamento in corso...</p>} {/* Mostra messaggio di caricamento */}
            {error && <p className="error-message">{error}</p>}
            <ul>
                {campi.map(campo => (
                    <li 
                        key={campo.id} 
                        onClick={() => handleCampoSelect(campo)} // Usa la funzione di selezione del campo
                        className={`campo-item ${campo.disponibile ? 'disponibile' : 'non-disponibile'} ${selectedCampoId === campo.id ? 'selected' : ''}`} // Aggiungi classe selezionata
                    >
                        {campo.nome} - {campo.tipo} ({campo.disponibile ? 'Disponibile' : 'Non Disponibile'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CampoList;
