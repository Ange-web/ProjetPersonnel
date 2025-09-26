import React from 'react';
import Header from '../acceuil/header';
import './parcours.css';

const Parcours = () => {
  return (
    <div>
      <Header />
      
      {/* Section À propos de moi */}
      <section className="about-section">
        <div className="about-content">
          <div className="profile-image">
            <div className="profile-placeholder">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="60" fill="#e2e8f0"/>
                <circle cx="60" cy="45" r="20" fill="#20B2AA"/>
                <path d="M30 90c0-16.569 13.431-30 30-30s30 13.431 30 30" fill="#20B2AA"/>
              </svg>
            </div>
          </div>
          <div className="about-text">
            <h1>À Propos de Moi, <span className="highlight">Ange Nono</span></h1>
            <p>
              Je suis un développeur Full-Stack en formation à Ada Tech School (Paris), 
              passionné par la cybersécurité et l'automatisation DevSecOps.
            </p>
            <p>
              J'ai fondé le projet NSPY, une plateforme rendant accessibles et compréhensibles 
              divers outils de sécurité (Nmap, Nuclei, ExifTool, etc.) pour tous, même sans connaissances techniques.
            </p>
            <p className="highlight-text">
              Je suis actuellement à la recherche d'une alternance de 12 à 36 mois à partir de 
              juin–septembre 2025, avec un rythme 4 jours en entreprise / 1 jour en école.
            </p>
          </div>
        </div>
      </section>

      {/* Section Formation & Parcours */}
      <section className="formation-section">
        <div className="container">
          <h2>Formation & Parcours</h2>
          <div className="formation-grid">
            <div className="formation-card">
              <div className="formation-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 2L6 8V20C6 26.6 9.3 32.6 20 34C30.7 32.6 34 26.6 34 20V8L20 2Z" fill="#20B2AA"/>
                  <text x="20" y="24" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🎓</text>
                </svg>
              </div>
              <h3>Ada Tech School – Paris</h3>
              <ul>
                <li>Formation en développement Full-Stack (React, Node.js, Express, PostgreSQL, Tailwind, JWT, bcrypt)</li>
                <li>Approche agile, projets collaboratifs et apprentissage par la pratique</li>
              </ul>
            </div>
            <div className="formation-card">
              <div className="formation-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 2L6 8V20C6 26.6 9.3 32.6 20 34C30.7 32.6 34 26.6 34 20V8L20 2Z" fill="#20B2AA"/>
                  <text x="20" y="24" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">🔹</text>
                </svg>
              </div>
              <h3>Apprentissage autonome</h3>
              <ul>
                <li>Formation en réseaux & cybersécurité</li>
                <li>Administration système Linux, configuration VPN (WireGuard), sécurité réseau</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Projets Académiques & Personnels */}
      <section className="projects-section">
        <div className="container">
          <h2>Projets Académiques & Personnels</h2>
          <div className="timeline">
            <div className="timeline-line"></div>
            <div className="timeline-dot active"></div>
            <div className="timeline-dot"></div>
            <div className="timeline-dot"></div>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M30 5L10 15V30C10 40 15 50 30 55C45 50 50 40 50 30V15L30 5Z" fill="#20B2AA"/>
                  <rect x="20" y="25" width="20" height="15" rx="2" fill="white"/>
                  <rect x="25" y="30" width="10" height="2" fill="#20B2AA"/>
                  <rect x="25" y="33" width="10" height="2" fill="#20B2AA"/>
                </svg>
              </div>
              <h3>NSPY – Plateforme de cybersécurité</h3>
              <p>Interface web (React + Node/Express) centralisant des outils comme Nmap, Nuclei, ExifTool, etc.</p>
            </div>
            <div className="project-card">
              <div className="project-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="20" cy="20" r="8" fill="#20B2AA"/>
                  <circle cx="40" cy="20" r="8" fill="#20B2AA"/>
                  <circle cx="20" cy="40" r="8" fill="#20B2AA"/>
                  <circle cx="40" cy="40" r="8" fill="#20B2AA"/>
                  <path d="M20 20L40 20M20 40L40 40M20 20L20 40M40 20L40 40" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Adalicious – Application de gestion de restaurant</h3>
              <p>Projet full-stack avec interface client & cuisine, API CRUD et base PostgreSQL.</p>
            </div>
            <div className="project-card">
              <div className="project-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="15" y="20" width="30" height="20" rx="2" fill="#20B2AA"/>
                  <rect x="20" y="25" width="20" height="2" fill="white"/>
                  <rect x="20" y="28" width="20" height="2" fill="white"/>
                  <rect x="20" y="31" width="15" height="2" fill="white"/>
                </svg>
              </div>
              <h3>Clinique Compassion 3S – Site médical</h3>
              <p>Site vitrine moderne avec prise de rendez-vous, design UX et charte graphique (bleu & orange).</p>
            </div>
            <div className="project-card">
              <div className="project-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="15" y="25" width="30" height="15" rx="2" fill="#20B2AA"/>
                  <rect x="20" y="30" width="20" height="2" fill="white"/>
                  <rect x="20" y="33" width="20" height="2" fill="white"/>
                  <rect x="20" y="36" width="15" height="2" fill="white"/>
                </svg>
              </div>
              <h3>Refactory – E-commerce de meubles</h3>
              <p>Application de vente en ligne (React + PostgreSQL) avec gestion des utilisateurs et catalogue produits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Objectifs */}
      <section className="objectives-section">
        <div className="container">
          <h2>Objectifs</h2>
          <div className="objectives-list">
            <div className="objective-item">
              <div className="objective-icon">👉</div>
              <p>Développer mes compétences en Full-Stack et Cybersécurité</p>
            </div>
            <div className="objective-item">
              <div className="objective-icon">👉</div>
              <p>Intégrer une équipe tech en alternance pour monter en expertise</p>
            </div>
            <div className="objective-item">
              <div className="objective-icon">👉</div>
              <p>Continuer à construire des solutions utiles et accessibles au grand public</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parcours;
