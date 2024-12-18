// src/pages/PrenotazioniPage.js
import React, { useState } from 'react';
import CampoList from '../../components/campoList/CampoList';
import DataPicker from '../../components/dataPicker/DataPicker'; // Aggiunto import per DataPicker
import FasceOrarie from '../../components/fasceOrarie/FasceOrarie'; // Aggiunto import per FasceOrarie
import PrenotazioneList from '../../components/prenotazioneList/PrenotazioneList';

const PrenotazioniPage = () => {
    const [selectedCampo, setSelectedCampo] = useState(null);
    const [selectedData, setSelectedData] = useState('');

    const handleSelectCampo = (campo) => {
        setSelectedCampo(campo); // Imposta il campo selezionato
        setSelectedData(''); // Reset della data quando si seleziona un nuovo campo
    };

    const handleSelectData = (data) => {
        setSelectedData(data); // Imposta la data selezionata
    };

    return (
        <div>
            <h1>Gestione Prenotazioni Campi Sportivi</h1>
            <CampoList onSelectCampo={handleSelectCampo} />
            {selectedCampo && <DataPicker onSelectData={handleSelectData} />} {/* Mostra il DataPicker solo se un campo è selezionato */}
            {selectedCampo && selectedData && (
                <FasceOrarie campoId={selectedCampo.id} data={selectedData} /> // Mostra le fasce orarie se un campo e una data sono selezionati
            )}
            <PrenotazioneList />
        </div>
    );
};

export default PrenotazioniPage;
