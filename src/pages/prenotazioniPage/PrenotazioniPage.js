// src/pages/PrenotazioniPage.js
import React, { useState } from 'react';
import CampoList from '../../components/campoList/CampoList';
import PrenotazioneList from '../../components/prenotazioneList/PrenotazioneList';
import axiosInstance from '../../interceptor/axiosInstance'; // Importa l'istanza di Axios
import DataPicker from '../../components/dataPicker/DataPicker';
import FasceOrarie from '../../components/fasceOrarie/FasceOrarie';
import PrenotazioneForm from '../../components/prenotazioneForm/PrenotazioneForm'; // Importa il form di prenotazione

const PrenotazioniPage = () => {
    const [selectedCampo, setSelectedCampo] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [fasceOrarie, setFasceOrarie] = useState([]);
    const [selectedFasciaOraria, setSelectedFasciaOraria] = useState(null); // Stato per la fascia oraria selezionata

    const handleSelectCampo = (campo) => {
        setSelectedCampo(campo); // Salva il campo selezionato
        setSelectedDate(''); // Reset della data quando si seleziona un nuovo campo
        setFasceOrarie([]); // Reset delle fasce orarie
        setSelectedFasciaOraria(null); // Reset della fascia oraria selezionata
    };

    const handleDateSelect = async (date) => {
        setSelectedDate(date); // Salva la data selezionata

        // Verifica che selectedCampo e date siano definiti
        if (selectedCampo && date) {
            await fetchFasceOrarie(selectedCampo.id, date);
        }
    };

    const fetchFasceOrarie = async (campoId, date) => {
        try {
            const response = await axiosInstance.get(`/prenotazioni/disponibilita/${campoId}?giorno=${date}`);
            console.log('Response fasce orarie:', response.data); // Log della risposta
            setFasceOrarie(response.data); // Imposta le fasce orarie nello stato
        } catch (error) {
            console.error('Error fetching fasce orarie:', error);
        }
    };

    const handleSelectFascia = (fasciaOraria) => {
        setSelectedFasciaOraria(fasciaOraria); // Salva la fascia oraria selezionata
    };

    return (
        <div>
            <h1>Gestione Prenotazioni Campi Sportivi</h1>
            <CampoList onSelectCampo={handleSelectCampo} />
            {selectedCampo && <DataPicker onSelectDate={handleDateSelect} />}
            {selectedCampo && selectedDate && (
                <FasceOrarie 
                    fasceOrarie={fasceOrarie} 
                    campoId={selectedCampo.id} 
                    selectedDate={selectedDate} 
                    onSelectFascia={handleSelectFascia} // Passa la funzione per gestire la selezione delle fasce orarie
                />
            )}
            {selectedFasciaOraria && (
                <PrenotazioneForm 
                    campoId={selectedCampo.id} 
                    selectedDate={selectedDate} 
                    selectedFasciaOraria={selectedFasciaOraria} // Passa la fascia oraria selezionata al form
                />
            )}
            <PrenotazioneList />
        </div>
    );
};

export default PrenotazioniPage;
