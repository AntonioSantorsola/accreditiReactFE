import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import AccreditoForm from './components/accreditoForm/AccreditoForm';
import HomePage from './components/pages/Homepage'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <HomePage></HomePage>
      {/* Inizio del commento
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      Fine del commento */}
    </BrowserRouter>
  );
}

export default App;
