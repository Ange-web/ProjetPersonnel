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
              Je suis actuellement à la recherche d'une alternance de 12 mois dès 
              maintenant, avec un rythme 4 jours en entreprise / 1 jour en école.
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
                <li>Développement de projet personnel (NSPY)</li>
                <li>Veille technologique et formation continue en cybersécurité</li>
                <li>Pratique des outils de sécurité (Nmap, Nuclei, ExifTool)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section Expériences Professionnelles & Associatives */}
      <section className="projects-section">
        <div className="container">
          <h2>Expériences Professionnelles & Associatives</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Développeur Fullstack — Depuis novembre 2025</h3>
              <p><strong>A&B PROJECT-EE France</strong></p>
              <p>
                Engagé au sein de l’association afin de renforcer mes compétences techniques et approfondir mes
                connaissances en cybersécurité à travers des projets réels et porteurs de sens.
              </p>
            </div>
            <div className="project-card">
              <h3>Développeur Fullstack — Depuis septembre 2025</h3>
              <p><strong>Adess France</strong></p>
              <p>
                Engagement associatif dans le but de développer mes compétences pratiques, enrichir mon expérience terrain
                et renforcer mes aptitudes en organisation, communication et travail d’équipe, tout en contribuant à des
                projets solidaires.
              </p>
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
              <h3>NSPY – Plateforme de cybersécurité</h3>
              <p>Interface web (React + Node/Express) centralisant des outils comme Nmap, Nuclei, ExifTool, etc.</p>
            </div>
            <div className="project-card">
              <h3>Adalicious – Application de gestion de restaurant</h3>
              <p>Projet full-stack avec interface client & cuisine, API CRUD et base PostgreSQL.</p>
              <a href="https://adalicious-front.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                Voir le projet →
              </a>
            </div>
            <div className="project-card">
              <h3>Clinique Compassion 3S – Site médical</h3>
              <p>Site vitrine moderne avec prise de rendez-vous, design UX et charte graphique (bleu & orange).</p>
            </div>
            <div className="project-card">
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
