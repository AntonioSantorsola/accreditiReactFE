// src/components/pages/NotFound.js
import React from 'react';
import './NotFound.css'; // Se desideri aggiungere stili personalizzati

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Pagina Non Trovata</h1>
            <p>
                Ci scusiamo, ma la pagina che stai cercando non esiste. 
                Controlla l'URL e riprova.
            </p>
        </div>
    );
};

export default NotFound;
