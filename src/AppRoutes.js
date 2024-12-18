// src/AppRoutes.js
import React/*, { useContext } */from 'react';
import { Route, Routes/*, Navigate */} from 'react-router-dom';
import AccreditoForm from './components/accreditoForm/AccreditoForm';
import HomePage from './pages/homepage/Homepage';
import About from './pages/about/About';
import NotFound from './pages/notFound/NotFound';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './components/adminDashboard/AdminDashboard';
import PrenotazioneForm from './components/prenotazioneForm/PrenotazioneForm';
import PrenotazioniPage from './pages/prenotazioniPage/PrenotazioniPage';
import PrenotazioneList from './components/prenotazioneList/PrenotazioneList';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Nuova rotta */}
            <Route 
                path="/accredito" 
                element={
                    <PrivateRoute requiredRole="ADMIN"> 
                        <AccreditoForm /> 
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/prenotazione" 
                element={
                    <PrivateRoute requiredRoles={["USER", "ADMIN"]}> 
                        <PrenotazioneForm /> 
                    </PrivateRoute>
                } 
            />
            <Route path="/prenotazioni" element={<PrenotazioniPage />} /> {/* Nuova rotta per le prenotazioni */}
            <Route path="/prenotazioniList" element={<PrenotazioneList />} /> {/* Nuova rotta per le prenotazioni */}


            <Route path="*" element={<NotFound />} /> {/* Rotta per le pagine non trovate */}
        </Routes>
    );
};

export default AppRoutes;
