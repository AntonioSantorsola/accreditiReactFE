// src/components/CampoList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import './CampoList.css'; // Importa il file CSS

const CampoList = ({ onSelectCampo }) => {
    const [campi, setCampi] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampi = async () => {
            try {
                const response = await axiosInstance.get('/campi');
                setCampi(response.data);
                if (response.data.length === 0) {
                    setError('Nessun campo disponibile.');
                } else {
                    setError(null);
                }
            } catch (error) {
                console.error('Error fetching campi:', error);
                setError('Errore nel recupero dei campi.');
            }
        };

        fetchCampi();
    }, []);

    return (
        <div className="campo-list-container">
            <h2>Campi Disponibili</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {campi.map(campo => (
                    <li 
                        key={campo.id} 
                        onClick={() => campo.disponibile && onSelectCampo(campo)} 
                        className={campo.disponibile ? 'disponibile' : 'non-disponibile'}
                    >
                        {campo.nome} - {campo.tipo} ({campo.disponibile ? 'Disponibile' : 'Non Disponibile'})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CampoList;
