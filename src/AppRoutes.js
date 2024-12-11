// src/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccreditoForm from './components/accreditoForm/AccreditoForm';
import HomePage from './components/pages/homepage/Homepage';
import About from './components/pages/about/About';
import NotFound from './components/pages/notFound/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accredito" element={<AccreditoForm />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} /> {/* Rotta per le pagine non trovate */}
        </Routes>
    );
};

export default AppRoutes;
