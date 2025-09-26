import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="home">
    <div className="home-content">
      <div className="home-text">
        <h1>Protégez votre activité. Identifiez et corrigez vos failles de sécurité</h1>
        <p>
          NSPY vous fournit des évaluations de cybersécurité et assistance pour vos vulnérabilités. 
          En bref, pour vos données.
        </p>
        <button className="btn-primary">
          <Link to="/servicehome">Découvrir nos solutions d'audit</Link>
        </button>
      </div>
      <div className="home-illustration">
        <div className="security-dome">
          <div className="server-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="20" y="30" width="40" height="30" rx="2" fill="#374151"/>
              <rect x="25" y="35" width="30" height="2" fill="#20B2AA"/>
              <rect x="25" y="40" width="30" height="2" fill="#20B2AA"/>
              <rect x="25" y="45" width="30" height="2" fill="#20B2AA"/>
              <rect x="25" y="50" width="20" height="2" fill="#20B2AA"/>
            </svg>
          </div>
          <div className="network-nodes">
            <div className="node node-1"></div>
            <div className="node node-2"></div>
            <div className="node node-3"></div>
            <div className="node node-4"></div>
            <div className="node node-5"></div>
            <div className="node node-6"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Home;