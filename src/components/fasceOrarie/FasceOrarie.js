// src/components/fasceOrarie/FasceOrarie.js
import React, { useState } from 'react';
import './FasceOrarie.css'; // Assicurati di avere un file CSS per gli stili

const FasceOrarie = ({ fasceOrarie, onSelectFascia }) => {
    // Stato per tenere traccia della fascia oraria selezionata
    const [selectedFascia, setSelectedFascia] = useState('');

    const handleFasciaClick = (fascia) => {
        if (fascia.disponibile) {
            setSelectedFascia(fascia.fasciaOraria); // Aggiorna la fascia oraria selezionata
            onSelectFascia(fascia.fasciaOraria); // Passa la fascia oraria selezionata al genitore
        }
    };

    if (!fasceOrarie || fasceOrarie.length === 0) {
        return <div>Nessuna fascia oraria disponibile.</div>;
    }

    return (
        <div>
            <h2>Orari</h2>
            <div className="fasce-orarie-container">
                {fasceOrarie.map((fascia, index) => (
                    <div
                        key={index}
                        className={`fascia-oraria ${fascia.disponibile ? 'disponibile' : 'non-disponibile'} ${selectedFascia === fascia.fasciaOraria ? 'selected' : ''}`}
                        onClick={() => handleFasciaClick(fascia)} // Usa la funzione di gestione del click
                    >
                        {fascia.fasciaOraria}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FasceOrarie;
