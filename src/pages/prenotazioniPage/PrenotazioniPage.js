// src/pages/PrenotazioniPage.js
import React, { useState, useEffect } from 'react';
import CampoList from '../../components/campoList/CampoList';
import DataPicker from '../../components/dataPicker/DataPicker';
import FasceOrarie from '../../components/fasceOrarie/FasceOrarie';
import PrenotazioneForm from '../../components/prenotazioneForm/PrenotazioneForm';
import axiosInstance from '../../interceptor/axiosInstance';
import './PrenotazioniPage.css'; // Aggiungi il tuo CSS personalizzato

const PrenotazioniPage = () => {
    const [campoId, setCampoId] = useState(null);
    const [costoCampo, setCostoCampo] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedFasciaOraria, setSelectedFasciaOraria] = useState('');
    const [numeroGiocatori, setNumeroGiocatori] = useState(2);
    const [fasceOrarie, setFasceOrarie] = useState([]);

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
                setFasceOrarie(response.data); // Assicurati che la risposta sia nel formato corretto
            } catch (error) {
                console.error('Errore nel recupero delle fasce orarie:', error);
                setFasceOrarie([]);
            }
        };

        fetchFasceOrarie();
    }, [campoId, selectedDate]);

    const onUpdateFasceOrarie = (fasciaOraria) => {
        setFasceOrarie((prevFasce) => 
            prevFasce.map(fascia =>
                fascia.fasciaOraria === fasciaOraria
                    ? { ...fascia, disponibile: false } // Aggiorna la fascia per renderla non disponibile
                    : fascia
            )
        );
    };

    return (
        <div className="prenotazioni-page">
            <h1>Prenotazione Campo</h1>
            <div className="grid-container">
                <div className="campo-list">
                    <CampoList onSelectCampo={handleCampoSelect} />
                </div>
                <div className="data-picker">
                    <DataPicker onSelectDate={setSelectedDate} />
                </div>
                {campoId && selectedDate && fasceOrarie.length > 0 && (
                    <div className="fasce-orarie">
                        <FasceOrarie 
                            fasceOrarie={fasceOrarie} 
                            onSelectFascia={setSelectedFasciaOraria} 
                        />
                    </div>
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
                    onUpdateFasceOrarie={onUpdateFasceOrarie} // Passa la funzione qui
                />
            )}
        </div>
    );
};

export default PrenotazioniPage;
