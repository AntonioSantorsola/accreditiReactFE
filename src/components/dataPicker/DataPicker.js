// src/components/DataPicker.js
import React from 'react';

const DataPicker = ({ onSelectDate }) => {
    const handleChange = (event) => {
        const selectedDate = event.target.value; // Ottieni la data selezionata dall'input
        onSelectDate(selectedDate); // Chiama la funzione passata come prop per notificare il cambiamento
    };

    return (
        <div className="data-picker">
            <label htmlFor="date">Seleziona una data:</label>
            <input
                type="date"
                id="date"
                onChange={handleChange} // Gestisci il cambiamento della data
            />
        </div>
    );
};

export default DataPicker;
