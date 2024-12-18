// src/components/DataPicker.js
import React, { useState } from 'react';

const DataPicker = ({ onSelectData }) => {
    const [data, setData] = useState('');

    const handleChange = (e) => {
        setData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data) {
            onSelectData(data); // Passa la data selezionata al componente padre
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Seleziona Data</h2>
            <input 
                type="date" 
                value={data} 
                onChange={handleChange} 
                required 
            />
            <button type="submit">Invia</button>
        </form>
    );
};

export default DataPicker;
