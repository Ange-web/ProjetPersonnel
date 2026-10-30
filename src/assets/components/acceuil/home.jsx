import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import dashboardIcon from '../../images/dashboard_icon.png';

const Home = () => (
  <section className="home">
    <div className="home-content">
      <div className="home-text">
        <h1>Comprenez les observations de votre laboratoire de sécurité.</h1>
        <p>
          NSPY rassemble des outils d’analyse pédagogique : URL autorisées, ports TCP et métadonnées, avec un historique personnel.
        </p>
        <div className="hero-cta-group">
          <Link to="/signup" className="btn-primary">
            Créer mon espace
          </Link>
          <Link to="/servicehome" className="btn-secondary">
            Découvrir les outils
          </Link>
        </div>
        <div className="hero-trust-indicators">
          <div className="trust-item">
            <span>✔️</span> Sans installation
          </div>
          <div className="trust-item">
            <span>✔️</span> Cibles de laboratoire
          </div>
          <div className="trust-item">
            <span>✔️</span> Historique personnel
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