import React from 'react';
import './Homepage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            {/* Header Section */}
            <header className="homepage-header">
                <div className="header-content">
                    <h1 className="header-title">Gestione Prenotazioni Campi Serie A</h1>
                    <p className="header-subtitle">Accesso esclusivo per arbitri FIGC</p>
                    <button className="header-button">Accedi al Portale</button>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Perché scegliere il nostro sistema?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3 className="feature-title">Prenotazioni Veloci</h3>
                        <p className="feature-description">Gestisci tutte le prenotazioni in pochi click con un'interfaccia intuitiva.</p>
                    </div>
                    <div className="feature-card">
                        <h3 className="feature-title">Calendario Integrato</h3>
                        <p className="feature-description">Visualizza le tue designazioni e disponibilità in tempo reale.</p>
                    </div>
                    <div className="feature-card">
                        <h3 className="feature-title">Supporto Dedicato</h3>
                        <p className="feature-description">Assistenza personalizzata per garantire la migliore esperienza.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <h2 className="cta-title">Pronto a gestire le tue prenotazioni?</h2>
                <button className="cta-button">Registrati Ora</button>
            </section>

            {/* Footer Section */}
            <footer className="homepage-footer">
                <p className="footer-text">&copy; 2024 Gestione Campi Serie A. Tutti i diritti riservati.</p>
                <p className="footer-text">Contatti: support@campiseriea.it</p>
            </footer>
        </div>
    );
};

export default HomePage;