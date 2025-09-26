import React from 'react';
import Header from '../acceuil/header';
import adatechLogo from '../../images/adatech.png';
import selfLearningIcon from '../../images/self-learning.png';
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
              Octobre 2025, avec un rythme 4 jours en entreprise / 1 jour en école.
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
              <div className="formation-logo">
                <img src={adatechLogo} alt="Ada Tech School" className="school-logo" />
              </div>
              <h3>Ada Tech School – Paris</h3>
              <ul>
                <li>Formation en développement Full-Stack (React, Node.js, Express, PostgreSQL, Tailwind, JWT, bcrypt)</li>
                <li>Approche agile, projets collaboratifs et apprentissage par la pratique</li>
              </ul>
            </div>
            <div className="formation-card">
              <div className="formation-logo">
                <img src={selfLearningIcon} alt="Apprentissage autonome" className="school-logo" />
              </div>
              <h3>Apprentissage autonome</h3>
              <ul>
                <li>Développement de projets personnels (NSPY, Adalicious, Mobel)</li>
                <li>Veille technologique et formation continue en cybersécurité</li>
                <li>Pratique des outils de sécurité (Nmap, Nuclei, ExifTool)</li>
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
                <div className="nspy-logo">
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                    <path d="M10 5L5 8V20C5 28 8 35 15 37C22 35 25 28 25 20V8L20 5Z" fill="#20B2AA"/>
                    <text x="20" y="25" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">N</text>
                    <text x="45" y="25" textAnchor="middle" fill="#2d3748" fontSize="16" fontWeight="bold" fontFamily="Arial, sans-serif">NSPY</text>
                  </svg>
                </div>
              </div>
              <h3>NSPY – Plateforme de cybersécurité</h3>
              <p>Interface web (React + Node/Express) centralisant des outils comme Nmap, Nuclei, ExifTool, etc.</p>
            </div>
            <div className="project-card">
              <div className="project-icon">
                <div className="adalicious-logo">
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                    <circle cx="15" cy="20" r="12" fill="#ff6b35"/>
                    <text x="15" y="26" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🍽️</text>
                    <text x="45" y="25" textAnchor="middle" fill="#2d3748" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">Adalicious</text>
                  </svg>
                </div>
              </div>
              <h3>Adalicious – Application de gestion de restaurant</h3>
              <p>Projet full-stack avec interface client & cuisine, API CRUD et base PostgreSQL.</p>
              <a href="https://adalicious-front.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                Voir le projet →
              </a>
            </div>
            <div className="project-card">
              <div className="project-icon">
                <div className="clinique-logo">
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                    {/* Cercle extérieur avec couronne de laurier */}
                    <circle cx="20" cy="20" r="18" fill="none" stroke="#4a5568" strokeWidth="2"/>
                    <path d="M8 12 Q12 8 20 8 Q28 8 32 12 Q32 16 30 20 Q28 24 20 24 Q12 24 10 20 Q8 16 8 12" fill="none" stroke="#4a5568" strokeWidth="1.5"/>
                    
                    {/* Cercle intérieur bleu */}
                    <circle cx="20" cy="20" r="12" fill="#87ceeb" stroke="#4682b4" strokeWidth="1"/>
                    
                    {/* Lignes de globe */}
                    <path d="M12 20 Q20 12 28 20" stroke="white" strokeWidth="0.5" opacity="0.7"/>
                    <path d="M12 20 Q20 28 28 20" stroke="white" strokeWidth="0.5" opacity="0.7"/>
                    <path d="M20 8 Q12 20 20 32" stroke="white" strokeWidth="0.5" opacity="0.7"/>
                    <path d="M20 8 Q28 20 20 32" stroke="white" strokeWidth="0.5" opacity="0.7"/>
                    
                    {/* Symbole 3S orange */}
                    <text x="20" y="25" textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">3S</text>
                    
                    {/* Croix médicales */}
                    <circle cx="25" cy="12" r="2" fill="white" stroke="#ff6b35" strokeWidth="0.5"/>
                    <path d="M24 12 L26 12 M25 11 L25 13" stroke="#ff6b35" strokeWidth="0.8"/>
                    <circle cx="28" cy="14" r="1.5" fill="white" stroke="#ff6b35" strokeWidth="0.5"/>
                    <path d="M27.5 14 L28.5 14 M28 13.5 L28 14.5" stroke="#ff6b35" strokeWidth="0.6"/>
                    
                    {/* Texte Compassion */}
                    <text x="50" y="25" textAnchor="middle" fill="#2d3748" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">Compassion</text>
                  </svg>
                </div>
              </div>
              <h3>Clinique Compassion 3S – Site médical</h3>
              <p>Site vitrine moderne avec prise de rendez-vous, design UX et charte graphique (bleu & orange).</p>
            </div>
            <div className="project-card">
              <div className="project-icon">
                <div className="mobel-logo">
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                    <text x="40" y="25" textAnchor="middle" fill="#4a5568" fontSize="18" fontWeight="bold" fontFamily="Arial, sans-serif">Möbel</text>
                  </svg>
                </div>
              </div>
              <h3>Möbel – E-commerce de meubles</h3>
              <p>Application de vente en ligne (React + PostgreSQL) avec gestion des utilisateurs et catalogue produits.</p>
              <a href="https://moble-front.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                Voir le projet →
              </a>
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
              <div className="objective-icon"></div>
              <p>Développer mes compétences en Full-Stack et Cybersécurité</p>
            </div>
            <div className="objective-item">
              <div className="objective-icon"></div>
              <p>Intégrer une équipe tech en alternance pour monter en expertise</p>
            </div>
            <div className="objective-item">
              <div className="objective-icon"></div>
              <p>Continuer à construire des solutions utiles et accessibles au grand public</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parcours;
