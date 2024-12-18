// src/components/FasceOrarie.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FasceOrarie = ({ fasceOrarie = [], campoId, selectedDate }) => {
    const navigate = useNavigate();

    const handleOrarioClick = (fasciaOraria) => {
        if (fasciaOraria.disponibile) {
            // Naviga al modulo di prenotazione
            const dataInizio = `${selectedDate}T${fasciaOraria.fasciaOraria.split('-')[0]}:00`;
            const dataFine = `${selectedDate}T${fasciaOraria.fasciaOraria.split('-')[1]}:00`;
            navigate(`/prenotazione`, { state: { campoId, dataInizio, dataFine } });
        }
    };

    return (
        <div className="fasce-orarie">
            {fasceOrarie.length > 0 ? (
                fasceOrarie.map((fascia) => (
                    <div
                        key={fascia.fasciaOraria}
                        className={`fascia ${fascia.disponibile ? 'disponibile' : 'non-disponibile'}`}
                        onClick={() => handleOrarioClick(fascia)}
                    >
                        {fascia.fasciaOraria}
                    </div>
                ))
            ) : (
                <p>Nessuna fascia oraria disponibile.</p>
            )}
        </div>
    );
};

export default FasceOrarie;
