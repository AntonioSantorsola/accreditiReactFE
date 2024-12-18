// src/components/PrenotazioneList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import './PrenotazioneList.css'; // Importa il file CSS

const PrenotazioneList = () => {
    const [prenotazioni, setPrenotazioni] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5; // Numero massimo di prenotazioni per pagina

    useEffect(() => {
        const fetchPrenotazioni = async () => {
            const start = '2024-12-18T01:00:00'; // Inizio della prenotazione
            const end = '2024-12-18T23:00:00'; // Fine della prenotazione
            const id = 1; // ID del campo di cui si vogliono ottenere le prenotazioni

            try {
                const response = await axiosInstance.get(`/prenotazioni/${id}`, {
                    params: {
                        start: start,
                        end: end,
                    },
                });
                setPrenotazioni(response.data);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching prenotazioni:', error);
            }
        };

        fetchPrenotazioni();
    }, []);

    // Calcola gli elementi visibili nella pagina corrente
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPrenotazioni = prenotazioni.slice(startIndex, startIndex + itemsPerPage);

    // Gestione della paginazione
    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="prenotazione-list-container">
            <h2>Le mie prenotazioni</h2>
            {currentPrenotazioni.length > 0 ? (
                <ul>
                    {currentPrenotazioni.map((prenotazione) => (
                        <li key={prenotazione.id} className="prenotazione-item">
                            <p>Campo ID: {prenotazione.campo.id}</p>
                            <p>Data Inizio: {prenotazione.dataInizio}</p>
                            <p>Data Fine: {prenotazione.dataFine}</p>
                            <p>Numero Giocatori: {prenotazione.numeroGiocatori}</p>
                            <p>Stato: {prenotazione.stato}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessuna prenotazione disponibile.</p>
            )}
            {totalPages > 1 && (
                <div className="pagination-controls">
                    <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                        Pagina Precedente
                    </button>
                    <span>
                        Pagina {currentPage} di {totalPages}
                    </span>
                    <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                        Pagina Successiva
                    </button>
                </div>
            )}
        </div>
    );
};

export default PrenotazioneList;
