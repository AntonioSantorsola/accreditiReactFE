// src/components/prenotazioneForm/PrenotazioneForm.js
import React from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import './PrenotazioneForm.css'; // Importa il file CSS

const PrenotazioneForm = ({ campoId, selectedDate, selectedFasciaOraria, costo, numeroGiocatori, onChangeNumeroGiocatori, campoNome }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFasciaOraria || !selectedDate) {
            console.error('Data o fascia oraria non validi');
            return; // Esci dalla funzione se i dati non sono validi
        }

        // Calcola gli orari di inizio e fine
        const [oraInizio, oraFine] = selectedFasciaOraria.split('-');

        // Controlla se gli orari sono validi
        if (!oraInizio || !oraFine) {
            console.error('Fascia oraria non valida:', selectedFasciaOraria);
            return;
        }

        const dataInizioString = `${selectedDate}T${oraInizio}:00`;

        // Crea gli oggetti Date
        const dataGara = new Date(dataInizioString);
        const dataPrenotazione = new Date().toISOString().split('T')[0]; // Data attuale per dataPrenotazione

        // Controlla se le date sono valide
        if (isNaN(dataGara)) {
            console.error('Data non valida:', dataInizioString);
            return;
        }

        // Prepara i dati per la richiesta POST
        const prenotazioneData = {
            nomeCampo: campoNome, // Nome del campo
            idCampo: campoId, // ID del campo
            idUtente: 3, // Sostituisci con l'ID dell'utente attualmente autenticato
            dataGara: dataGara.toISOString(), // Data e ora di inizio
            dataPrenotazione: dataPrenotazione, // Data attuale per dataPrenotazione
            oraInizio: parseInt(oraInizio.split(':')[0], 10), // Ora di inizio come numero
            oraFine: parseInt(oraFine.split(':')[0], 10), // Ora di fine come numero
            stato: "ATTIVA", // Stato della prenotazione
            costo: costo, // Costo del campo
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
        <form onSubmit={handleSubmit} className="prenotazione-form">
            <h2>Prenotazione</h2>
            <p>Campo: <strong>{campoNome}</strong></p>
            <p>Campo ID: <strong>{campoId}</strong></p>
            <p>Data: <strong>{selectedDate}</strong></p>
            <p>Fascia Oraria: <strong>{selectedFasciaOraria}</strong></p>
            <p>Costo: <strong>€{costo.toFixed(2)}</strong></p>

            <label>
                Numero di Giocatori:
                <input 
                    type="number" 
                    value={numeroGiocatori} 
                    onChange={(e) => onChangeNumeroGiocatori(e.target.value)} 
                    min="2" 
                    max="4" 
                />
            </label>

            <button type="submit">Conferma Prenotazione</button>
        </form>
    );
};

export default PrenotazioneForm;
