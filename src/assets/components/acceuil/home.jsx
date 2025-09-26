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
        <div className="analyze-icon-container">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Document de base */}
            <rect x="30" y="20" width="60" height="80" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
            
            {/* Lignes de texte */}
            <rect x="40" y="35" width="40" height="2" rx="1" fill="#20B2AA"/>
            <rect x="40" y="42" width="35" height="2" rx="1" fill="#20B2AA"/>
            <rect x="40" y="49" width="30" height="2" rx="1" fill="#20B2AA"/>
            <rect x="40" y="56" width="25" height="2" rx="1" fill="#20B2AA"/>
            
            {/* Icône de loupe */}
            <circle cx="75" cy="45" r="12" fill="none" stroke="#20B2AA" strokeWidth="3"/>
            <line x1="84" y1="54" x2="90" y2="60" stroke="#20B2AA" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Graphique d'analyse */}
            <rect x="45" y="70" width="3" height="15" fill="#20B2AA"/>
            <rect x="52" y="65" width="3" height="20" fill="#20B2AA"/>
            <rect x="59" y="60" width="3" height="25" fill="#20B2AA"/>
            <rect x="66" y="70" width="3" height="15" fill="#20B2AA"/>
            
            {/* Points de données */}
            <circle cx="46.5" cy="85" r="2" fill="#20B2AA"/>
            <circle cx="53.5" cy="80" r="2" fill="#20B2AA"/>
            <circle cx="60.5" cy="75" r="2" fill="#20B2AA"/>
            <circle cx="67.5" cy="85" r="2" fill="#20B2AA"/>
            
            {/* Ligne de tendance */}
            <path d="M46.5 85 L53.5 80 L60.5 75 L67.5 85" stroke="#20B2AA" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
);

export default Home;