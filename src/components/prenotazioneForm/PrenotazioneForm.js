// src/components/prenotazioneForm/PrenotazioneForm.js
import React, { useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios

const PrenotazioneForm = ({ campoId, selectedDate, selectedFasciaOraria }) => {
    const [numeroGiocatori, setNumeroGiocatori] = useState(1); // Stato per il numero di giocatori
    const [costo, setCosto] = useState(40.0); // Stato per il costo della prenotazione

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Calcola gli orari di inizio e fine
        const [oraInizio, oraFine] = selectedFasciaOraria.split('-');
        const dataInizio = new Date(`${selectedDate}T${oraInizio}:00`).toISOString(); // Inizio della prenotazione
        const dataFine = new Date(`${selectedDate}T${oraFine}:00`).toISOString(); // Fine della prenotazione

        // Prepara i dati per la richiesta POST
        const prenotazioneData = {
            campo: {
                id: campoId, // ID del campo
            },
            utente: {
                id: 3, // Sostituisci con l'ID dell'utente attualmente autenticato
            },
            dataInizio: dataInizio, // Data e ora di inizio
            dataFine: dataFine, // Data e ora di fine
            stato: "ATTIVA", // Stato della prenotazione
            costo: costo, // Costo della prenotazione
            numeroGiocatori: numeroGiocatori, // Numero di giocatori
        };

        try {
            // Esegui la richiesta POST
            const response = await axiosInstance.post('/prenotazioni', prenotazioneData);
            console.log('Prenotazione effettuata con successo:', response.data);
            // Aggiungi logica per gestire il successo della prenotazione (es. mostrare un messaggio di successo)
        } catch (error) {
            console.error('Errore nella prenotazione:', error);
            // Aggiungi logica per gestire l'errore nella prenotazione (es. mostrare un messaggio di errore)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Prenotazione</h2>
            <p>Campo ID: {campoId}</p>
            <p>Data: {selectedDate}</p>
            <p>Fascia Oraria: {selectedFasciaOraria}</p>
            
            {/* Campo per il numero di giocatori */}
            <label>
                Numero di Giocatori:
                <input 
                    type="number" 
                    value={numeroGiocatori} 
                    onChange={(e) => setNumeroGiocatori(e.target.value)} 
                    min="1" 
                />
            </label>
            
            {/* Campo per il costo */}
            <label>
                Costo:
                <input 
                    type="number" 
                    value={costo} 
                    onChange={(e) => setCosto(parseFloat(e.target.value))} 
                    step="0.01" 
                />
            </label>
            
            <button type="submit">Conferma Prenotazione</button>
        </form>
    );
};

export default PrenotazioneForm;
