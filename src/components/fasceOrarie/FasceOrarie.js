// src/components/FasceOrarie.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import { useNavigate } from 'react-router-dom'; // Importa useNavigate per il routing
import './FasceOrarie.css'; // Importa il file CSS

const FasceOrarie = ({ campoId, data, userId }) => {
    const [fasceOrarie, setFasceOrarie] = useState([]);
    const navigate = useNavigate(); // Inizializza useNavigate per il reindirizzamento

    useEffect(() => {
        const fetchFasceOrarie = async () => {
            try {
                const response = await axiosInstance.get(`/prenotazioni/disponibilita/${campoId}?giorno=${data}`);
                setFasceOrarie(response.data);
            } catch (error) {
                console.error('Error fetching fasce orarie:', error);
            }
        };

        if (campoId && data) {
            fetchFasceOrarie();
        }
    }, [campoId, data]);

    const handleFasciaClick = (fascia) => {
        if (fascia.disponibile) {
            // Prepara i dati per la prenotazione
            const dataInizio = new Date(data + 'T' + fascia.fasciaOraria.split('-')[0] + ':00'); // Imposta data e ora di inizio
            const dataFine = new Date(data + 'T' + fascia.fasciaOraria.split('-')[1] + ':00'); // Imposta data e ora di fine

            // Naviga al form di prenotazione con i dati
            navigate('/prenotazione', { state: { campoId, userId, dataInizio, dataFine } });
        }
    };

    return (
        <div className="fasce-orarie-container">
            <h2>Fasce Orarie Disponibili per {data}</h2>
            <div className="fasce-orarie-grid">
                {fasceOrarie.map((fascia, index) => (
                    <div
                        key={index}
                        className={`fascia-oraria ${fascia.disponibile ? 'disponibile' : 'non-disponibile'}`}
                        onClick={() => handleFasciaClick(fascia)}
                    >
                        {fascia.fasciaOraria}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FasceOrarie;
