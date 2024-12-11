// src/api.js
import axios from 'axios';

// Configura l'istanza di axios
const api = axios.create({
    baseURL: 'http://localhost:8080', // Cambia con l'URL della tua API
    headers: {
        'Content-Type': 'multipart/form-data', // Imposta il tipo di contenuto
    },
});

// Funzione per inviare la richiesta di accredito
export const richiediAccredito = async (formData) => {
    try {
        const response = await api.post('/accredito/richiediAccredito', formData);
        return response.data; // Restituisci i dati della risposta
    } catch (error) {
        console.error('Errore durante la richiesta di accredito:', error);
        throw error; // Rilancia l'errore per gestirlo nel componente
    }
};
