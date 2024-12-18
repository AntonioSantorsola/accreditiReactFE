// src/components/PrenotazioneForm.js
import React, { useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios

const PrenotazioneForm = ({ location }) => {
    const { campoId, userId, dataInizio, dataFine } = location.state; // Estrai i dati dallo stato
    const [numeroGiocatori, setNumeroGiocatori] = useState(2); // Imposta un valore di default
    const [costo, setCosto] = useState(40.0); // Imposta un valore di costo (puoi modificarlo se necessario)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const prenotazione = {
            campo: { id: campoId },
            utente: { id: userId },
            dataInizio: dataInizio.toISOString(), // Converti in formato ISO
            dataFine: dataFine.toISOString(), // Converti in formato ISO
            stato: 'ATTIVA',
            costo: costo,
            numeroGiocatori: numeroGiocatori
        };

        try {
            await axiosInstance.post('/prenotazioni', prenotazione);
            alert('Prenotazione effettuata con successo!');
            // Qui puoi reindirizzare l'utente o resettare il modulo
        } catch (error) {
            console.error('Error during booking:', error);
            alert('Errore nella prenotazione. Riprova.');
        }
    };

    return (
        <div>
            <h2>Prenotazione Campo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Data Inizio:</label>
                    <input type="text" value={dataInizio.toString()} readOnly />
                </div>
                <div>
                    <label>Data Fine:</label>
                    <input type="text" value={dataFine.toString()} readOnly />
                </div>
                <div>
                    <label>Numero Giocatori:</label>
                    <input
                        type="number"
                        value={numeroGiocatori}
                        onChange={(e) => setNumeroGiocatori(e.target.value)}
                    />
                </div>
                <div>
                    <label>Costo:</label>
                    <input
                        type="number"
                        value={costo}
                        onChange={(e) => setCosto(e.target.value)}
                    />
                </div>
                <button type="submit">Conferma Prenotazione</button>
            </form>
        </div>
    );
};

export default PrenotazioneForm;
