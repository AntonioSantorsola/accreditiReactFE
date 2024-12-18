// src/components/dataPicker/DataPicker.js
import React from 'react';

const DataPicker = ({ onSelectDate }) => {
    const handleChange = (event) => {
        const selectedDate = event.target.value; // Supponendo tu stia usando un input di tipo date
        onSelectDate(selectedDate); // Chiama la funzione per passare la data al genitore
    };

    return (
        <input type="date" onChange={handleChange} />
    );
};

export default DataPicker;
