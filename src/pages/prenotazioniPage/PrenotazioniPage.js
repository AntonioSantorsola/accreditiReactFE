// src/pages/prenotazioniPage/PrenotazioniPage.js
import React, { useState } from 'react';
import CampoList from '../../components/campoList/CampoList';
import PrenotazioneList from '../../components/prenotazioneList/PrenotazioneList';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import DataPicker from '../../components/dataPicker/DataPicker';
import FasceOrarie from '../../components/fasceOrarie/FasceOrarie';

const PrenotazioniPage = () => {
    const [selectedCampo, setSelectedCampo] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [fasceOrarie, setFasceOrarie] = useState([]); // Cambia la F maiuscola in f minuscola

    const handleSelectCampo = (campo) => {
        setSelectedCampo(campo); // Salva il campo selezionato
        setSelectedDate(''); // Reset della data quando si seleziona un nuovo campo
        setFasceOrarie([]); // Reset delle fasce orarie
    };

    const handleDateSelect = async (date) => {
        setSelectedDate(date); // Salva la data selezionata

        // Log per il debug
        console.log('Campo ID:', selectedCampo.id);
        console.log('Data Selezionata:', date);

        // Recupera le fasce orarie disponibili
        await fetchFasceOrarie(selectedCampo.id, date);
    };

    const fetchFasceOrarie = async (campoId, date) => {
        try {
            const response = await axiosInstance.get(`/api/v1/prenotazioni/disponibilita/${campoId}?giorno=${date}`);
            console.log('Response fasce orarie:', response.data); // Log della risposta
            setFasceOrarie(response.data); // Imposta le fasce orarie nello stato
        } catch (error) {
            console.error('Error fetching fasce orarie:', error);
        }
    };

    return (
        <div>
            <h1>Gestione Prenotazioni Campi Sportivi</h1>
            <CampoList onSelectCampo={handleSelectCampo} />
            {selectedCampo && <DataPicker onSelectDate={handleDateSelect} />} {/* Assicurati che il componente DataPicker chiami onSelectDate */}
            {selectedCampo && selectedDate && <FasceOrarie fasceOrarie={fasceOrarie} campoId={selectedCampo.id} selectedDate={selectedDate} />}
            <PrenotazioneList />
        </div>
    );
};

export default PrenotazioniPage;
