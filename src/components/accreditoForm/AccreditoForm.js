// src/components/AccreditoForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './AccreditoForm.css'; // Importiamo il CSS per stili personalizzati

const AccreditoForm = () => {
    const [formData, setFormData] = useState({
        squadraCasa: '',
        squadraOspite: '',
        dataDiNascita: '',
        nomeRichiedente: '',
        cognomeRichiedente: '',
        luogoDiNascita: '',
        emailRichiedenteAccredito: '',
        recapitoTelefonico: '',
        nazionalita: '',
        tipoTessera: '',
        settoreStadio: '',
        residenteA: '',
        via: '',
        numeroCivico: '',
        numeroTessera: '',
        qualifica: '',
        sezione: '',
        dataGara: '',
        firma: null,
        sezioneDiAppartenenza: '',
        provinciaSezioneAIA: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/accredito/richiediAccredito', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                console.log('Response:', response.data); // Logga la risposta per verificarla
                alert('Richiesta inviata con successo!');
            } else {
                console.error('Errore:', response.status, response.statusText);
                alert('Si è verificato un errore.');
            }
        } catch (error) {
            console.error('Si è verificato un errore:', error);
            alert('Errore durante l\'invio della richiesta.');
        }
    };
    

    return (
        <div className="form-container">
            <h2>Richiesta Accredito</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="squadraCasa" value={formData.squadraCasa} onChange={handleChange} placeholder="Squadra Casa" required />
                    <input type="text" name="squadraOspite" value={formData.squadraOspite} onChange={handleChange} placeholder="Squadra Ospite" required />
                    <input type="date" name="dataDiNascita" value={formData.dataDiNascita} onChange={handleChange} placeholder="Data di Nascita" required />
                    <input type="text" name="nomeRichiedente" value={formData.nomeRichiedente} onChange={handleChange} placeholder="Nome" required />
                    <input type="text" name="cognomeRichiedente" value={formData.cognomeRichiedente} onChange={handleChange} placeholder="Cognome" required />
                    <input type="text" name="luogoDiNascita" value={formData.luogoDiNascita} onChange={handleChange} placeholder="Luogo di Nascita" required />
                    <input type="email" name="emailRichiedenteAccredito" value={formData.emailRichiedenteAccredito} onChange={handleChange} placeholder="Email" required />
                    <input type="tel" name="recapitoTelefonico" value={formData.recapitoTelefonico} onChange={handleChange} placeholder="Recapito Telefonico" required />
                    <input type="text" name="nazionalita" value={formData.nazionalita} onChange={handleChange} placeholder="Nazionalità" required />
                    <input type="text" name="tipoTessera" value={formData.tipoTessera} onChange={handleChange} placeholder="Tipo Tessera" required />
                    <input type="text" name="settoreStadio" value={formData.settoreStadio} onChange={handleChange} placeholder="Settore Stadio" required />
                    <input type="text" name="residenteA" value={formData.residenteA} onChange={handleChange} placeholder="Residente a" required />
                    <input type="text" name="via" value={formData.via} onChange={handleChange} placeholder="Via" required />
                    <input type="text" name="numeroCivico" value={formData.numeroCivico} onChange={handleChange} placeholder="Numero Civico" required />
                    <input type="text" name="numeroTessera" value={formData.numeroTessera} onChange={handleChange} placeholder="Numero Tessera" required />
                    <input type="text" name="qualifica" value={formData.qualifica} onChange={handleChange} placeholder="Qualifica" required />
                    <input type="text" name="sezione" value={formData.sezione} onChange={handleChange} placeholder="Sezione" required />
                    <input type="date" name="dataGara" value={formData.dataGara} onChange={handleChange} placeholder="Data Gara" required />
                    <input type="file" name="firma" onChange={handleChange} required />
                    <input type="text" name="sezioneDiAppartenenza" value={formData.sezioneDiAppartenenza} onChange={handleChange} placeholder="Sezione di Appartenenza" required />
                    <input type="text" name="provinciaSezioneAIA" value={formData.provinciaSezioneAIA} onChange={handleChange} placeholder="Provincia Sezione AIA" required />
                </div>
                <button type="submit">Invia Richiesta</button>
            </form>
        </div>
    );
};

export default AccreditoForm;
