import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import dashboardIcon from '../../images/dashboard_icon.png';

const Home = () => (
  <section className="home">
    <div className="home-content">
      <div className="home-text">
        <h1>Identifiez vos failles de sécurité avant qu’un attaquant ne le fasse.</h1>
        <p>
          NSPY analyse vos services exposés, détecte les risques critiques et vous explique comment les corriger, sans jargon technique.
        </p>
        <div className="hero-cta-group">
          <Link to="/signup" className="btn-primary">
            Lancer un audit gratuit
          </Link>
          <Link to="/servicehome" className="btn-secondary">
            Découvrir nos solutions
          </Link>
        </div>
        <div className="hero-trust-indicators">
          <div className="trust-item">
            <span>✔️</span> Sans installation
          </div>
          <div className="trust-item">
            <span>✔️</span> Résultats en quelques minutes
          </div>
          <div className="trust-item">
            <span>✔️</span> Données hébergées en Europe
          </div>
        </div>
      </div>
      <div className="home-illustration">
        <div className="analyze-icon-container">
          <img src={dashboardIcon} alt="Illustration de sécurité" style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
        </div>
      </div>
    </div>
  </section>
);

export default Home;