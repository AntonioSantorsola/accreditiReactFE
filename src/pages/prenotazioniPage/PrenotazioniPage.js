// src/pages/PrenotazioniPage.js
import React, { useState, useEffect } from 'react';
import CampoList from '../../components/campoList/CampoList';
import DataPicker from '../../components/dataPicker/DataPicker';
import FasceOrarie from '../../components/fasceOrarie/FasceOrarie';
import PrenotazioneForm from '../../components/prenotazioneForm/PrenotazioneForm';
import axiosInstance from '../../interceptor/axiosInstance';
import './PrenotazioniPage.css'; // Importa il file CSS per PrenotazioniPage

const PrenotazioniPage = () => {
    const [campoId, setCampoId] = useState(null);
    const [costoCampo, setCostoCampo] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFasciaOraria, setSelectedFasciaOraria] = useState('');
    const [numeroGiocatori, setNumeroGiocatori] = useState(2);
    const [fasceOrarie, setFasceOrarie] = useState([]);
    const currentDate = new Date().toISOString().split('T')[0];

    const handleCampoSelect = (campo) => {
        setCampoId(campo.id);
        setCostoCampo(campo.costoTotale);
        setSelectedFasciaOraria('');
    };

    useEffect(() => {
        const fetchFasceOrarie = async () => {
            if (!campoId || !selectedDate) return;

            const giorno = selectedDate;

            try {
                const response = await axiosInstance.get(`/prenotazioni/disponibilita/${campoId}?giorno=${giorno}`);
                setFasceOrarie(response.data);
            } catch (error) {
                console.error('Errore nel recupero delle fasce orarie:', error);
                setFasceOrarie([]);
            }
        };

        fetchFasceOrarie();
    }, [campoId, selectedDate]);

    return (
        <div>
            <h1>Prenotazione Campo</h1>
            <div className="prenotazioni-container">
                <CampoList onSelectCampo={handleCampoSelect} />
                <DataPicker onSelectDate={setSelectedDate} />
                {campoId && selectedDate && fasceOrarie.length > 0 && (
                    <FasceOrarie 
                        fasceOrarie={fasceOrarie} 
                        onSelectFascia={setSelectedFasciaOraria} 
                    />
                )}
            </div>
            {campoId && selectedDate && selectedFasciaOraria && (
                <PrenotazioneForm 
                    campoId={campoId}
                    selectedDate={selectedDate}
                    selectedFasciaOraria={selectedFasciaOraria}
                    costo={costoCampo}
                    numeroGiocatori={numeroGiocatori}
                    onChangeNumeroGiocatori={setNumeroGiocatori}
                    currentDate={currentDate}
                />
            )}
        </div>
    );
};

export default PrenotazioniPage;
