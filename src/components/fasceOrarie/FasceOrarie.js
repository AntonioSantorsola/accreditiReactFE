// src/components/fasceOrarie/FasceOrarie.js
import React from 'react';
import './FasceOrarie.css'; // Assicurati di avere un file CSS per gli stili

const FasceOrarie = ({ fasceOrarie, campoId, selectedDate, onSelectFascia }) => {
    console.log('Fasce orarie ricevute:', fasceOrarie); // Log delle fasce orarie

    if (!fasceOrarie || fasceOrarie.length === 0) {
        return <div>Nessuna fascia oraria disponibile.</div>;
    }

    return (
        <div>
            <h2>Fasce Orarie Disponibili per il {selectedDate}</h2>
            <div className="fasce-orarie-container">
                {fasceOrarie.map((fascia, index) => (
                    <div
                        key={index}
                        className={`fascia-oraria ${fascia.disponibile ? 'disponibile' : 'non-disponibile'}`}
                        onClick={fascia.disponibile ? () => onSelectFascia(fascia.fasciaOraria) : null} // Gestisci il click solo per quelle disponibili
                    >
                        {fascia.fasciaOraria}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FasceOrarie;
