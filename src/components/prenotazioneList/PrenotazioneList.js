// src/components/PrenotazioneList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import './PrenotazioneList.css'; // Importa il file CSS

const PrenotazioneList = () => {
    const [prenotazioni, setPrenotazioni] = useState([]);

    useEffect(() => {
        const fetchPrenotazioni = async () => {
            const start = '2024-12-17T18:30:00'; // Inizio della prenotazione
            const end = '2024-12-17T20:30:00'; // Fine della prenotazione
            const id = 1; // ID del campo di cui si vogliono ottenere le prenotazioni

            try {
                const response = await axiosInstance.get(`/prenotazioni/${id}`, { // Rimuovi "api/v1" dall'URL
                    params: {
                        start: start,
                        end: end
                    }
                });
                setPrenotazioni(response.data);
            } catch (error) {
                console.error('Error fetching prenotazioni:', error);
            }
        };

        fetchPrenotazioni(); // Non è necessario controllare il token qui, l'interceptor si occupa di aggiungerlo
    }, []); // Rimuovi il token come dipendenza, dato che non lo usiamo direttamente

    return (
        <div className="prenotazione-list-container"> {/* Aggiungi la classe del contenitore */}
            <h2>Prenotazioni Esistenti</h2>
            <ul>
                {prenotazioni.map(prenotazione => (
                    <li key={prenotazione.id}>
                        {prenotazione.campo.nome} - {prenotazione.dataOra} - {prenotazione.stato}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrenotazioneList;
