// src/App.js
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import AppRoutes from './AppRoutes';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> {/* Avvolgi tutto nel provider di autenticazione */}
        <Navbar />
        <AppRoutes />
        {/* Commenti */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
