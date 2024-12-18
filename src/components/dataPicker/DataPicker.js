// src/components/dataPicker/DataPicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa il CSS per lo stile
import './DataPicker.css'; // Il tuo CSS personalizzato

const DataPicker = ({ onSelectDate }) => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date) => {
        setStartDate(date);
        onSelectDate(date.toISOString().split('T')[0]); // Passa la data formattata
    };

    const handleToday = () => {
        const today = new Date(); // Ottieni la data di oggi
        setStartDate(today);
        onSelectDate(today.toISOString().split('T')[0]); // Passa la data di oggi
    };

    return (
        <div className="data-picker">
            <label>Seleziona una data:</label>
            <DatePicker 
                selected={startDate} 
                onChange={handleChange} 
                dateFormat="yyyy/MM/dd"
                className="custom-datepicker"
                isClearable
            />
            <button type="button" onClick={handleToday} className="today-button">Oggi</button>
        </div>
    );
};

export default DataPicker;
