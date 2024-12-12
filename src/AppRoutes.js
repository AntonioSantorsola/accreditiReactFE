// src/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccreditoForm from './components/accreditoForm/AccreditoForm';
import HomePage from './pages/homepage/Homepage';
import About from './pages/about/About';
import NotFound from './pages/notFound/NotFound';
import Login from './components/login/Login';
import Register from './components/register/Register';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accredito" element={<AccreditoForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="*" element={<NotFound />} /> {/* Rotta per le pagine non trovate */}
        </Routes>
    );
};

export default AppRoutes;
