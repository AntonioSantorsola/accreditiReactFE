// src/interceptor/axiosInstance.js
import axios from 'axios';
import { getToken } from '../utils/TokenUtils';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1', // La tua base URL
});

// Aggiungi un interceptor per le richieste per includere il token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken(); // Funzione per recuperare il token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercettore per gestire le risposte
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const { response } = error;
        if (response && response.status === 403) {
            // Se il token è scaduto, non possiamo usare useNavigate qui
            // Lascialo gestire nei componenti
            console.log('Accesso negato, il token potrebbe essere scaduto.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
