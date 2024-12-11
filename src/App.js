import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import AppRoutes from './AppRoutes';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      {/* Commenti */}
    </BrowserRouter>
  );
}

export default App;
