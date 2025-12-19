import React from 'react';
import Header from '../acceuil/header';
import adatechLogo from '../../images/adatech.png';
import selfLearningIcon from '../../images/self-learning.png';
import profileImage from '../../images/profile-ange.png';
import './parcours.css';

const Parcours = () => {
  return (
    <div>
      <Header />
      
      <section className="about-section">
        <div className="about-content">
          <div className="profile-image">
            <div className="profile-placeholder">
              <img
                src={profileImage}
                alt="Photo de profil d'Ange Nono"
              />
            </div>
            <a
              href="/Curriculum_vitae_Ange_Nono.pdf"
              download="Curriculum_vitae_Ange_Nono.pdf"
              className="cv-download-btn"
            >
              Télécharger mon CV 
            </a>
          </div>
          <div className="about-text">
            <h1>À Propos de Moi, <span className="highlight">Ange Nono</span></h1>
            <p>
              Actuellement en préparation de mon <strong>Titre RNCP niveau 6 – Concepteur Développeur d'Applications (Bac+3)</strong> à <strong>Ada Tech School</strong>, je suis animé par une réelle volonté de découvrir, d'apprendre et de progresser dans le développement web.
            </p>
            <p>
              Passionné par la création d'outils utiles et la résolution de problèmes concrets, chaque projet représente pour moi une occasion de me challenger. Je souhaite intégrer, dans le cadre d'une alternance, une équipe innovante où je pourrai non seulement mettre à profit mes compétences, mais aussi apprendre des personnes avec qui je collaborerai, que ce soit aujourd'hui ou dans le futur, car je considère le développement comme un <strong>métier d'apprentissage permanent</strong>.
            </p>
            <p className="highlight-text">
              Je suis actuellement à la recherche d'une alternance de 12 mois dès 
              maintenant, avec un rythme 4 jours en entreprise / 1 jour en école.
            </p>
          </div>
        </div>
      </section>

      <section className="formation-experiences-section">
        <div className="container">
          <div className="formation-experiences-grid">
            <div className="formation-column">
              <h2>Formation & Parcours</h2>
              <div className="formation-cards">
                <div className="formation-card">
                  <div className="formation-icon">
                    <img src={adatechLogo} alt="Ada Tech School" className="school-logo" />
                  </div>
                  <div className="formation-content">
                    <h3>Ada Tech School – Paris</h3>
                    <p>Formation en développement Full-Stack (React, Node.js, Express, PostgreSQL, Tailwind, JWT, bcrypt). Approche agile, projets collaboratifs et apprentissage par la pratique.</p>
                  </div>
                </div>
                <div className="formation-card">
                  <div className="formation-icon">
                    <img src={selfLearningIcon} alt="Apprentissage autonome" className="school-logo" />
                  </div>
                  <div className="formation-content">
                    <h3>Apprentissage autonome</h3>
                    <p>Développement de mon projet NSPY, avec une progression continue en fullstack. J'apprends de nouvelles technologies comme Django, Python, Swift et Next.js, et je maîtrise déjà le déploiement sur AWS ainsi que l'auto-hébergement sur serveur Linux personnel (mise en place, configuration et déploiement).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="separator-bar"></div>

            <div className="experiences-column">
              <h2>Expériences Professionnelles & Associatives</h2>
              <div className="experiences-list">
                <div className="experience-card">
                  <h3>Développeur Fullstack</h3>
                  <p className="experience-subtitle">A&B PROJECT-EE — Depuis novembre 2025</p>
                  <p className="experience-description">
                    Engagé au sein de l'association afin de renforcer mes compétences techniques et approfondir mes
                    connaissances en cybersécurité à travers des projets réels et porteurs de sens.
                  </p>
                </div>
                <div className="experience-card">
                  <h3>Développeur Fullstack</h3>
                  <p className="experience-subtitle">Adess — Depuis septembre 2025</p>
                  <p className="experience-description">
                    Engagement associatif dans le but de développer mes compétences pratiques, enrichir mon expérience terrain
                    et renforcer mes aptitudes en organisation, communication et travail d'équipe, tout en contribuant à des
                    projets solidaires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <h2>Projets Académiques & Personnels</h2>
          <div className="timeline">
            <div className="timeline-line"></div>
            <div className="timeline-dot active"></div>
            <div className="timeline-dot active"></div>
            <div className="timeline-dot active"></div>
            <div className="timeline-dot"></div>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <h3>NSPY – Plateforme de cybersécurité</h3>
              <p>Interface web (React + Node/Express) centralisant des outils comme Nmap, Nuclei, ExifTool, etc.</p>
              <a href="https://projet-personnel-rust.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">
                Voir le projet
              </a>
            </div>
            <div className="project-card">
              <h3>Adalicious – Application de gestion de restaurant</h3>
              <p>Projet full-stack avec interface client & cuisine, API CRUD et base PostgreSQL.</p>
              <a href="https://adalicious-front.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">
                Voir le projet
              </a>
            </div>
            <div className="project-card">
              <h3>Clinique Compassion 3S – Site médical</h3>
              <p>Site vitrine moderne avec prise de rendez-vous, design UX et charte graphique (bleu & orange).</p>
              <button className="project-btn">Voir le projet</button>
            </div>
            <div className="project-card">
              <h3>Möbel – E-commerce de meubles</h3>
              <p>Application de vente en ligne (React + PostgreSQL) avec gestion des utilisateurs et catalogue produits.</p>
              <a href="https://moble-front.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-btn">
                Voir le projet
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="objectives-section">
        <div className="container">
          <h2>Objectifs</h2>
          <div className="objectives-container">
            <ul className="objectives-list">
              <li className="objective-item">
                <span className="objective-check">✓</span>
                <span>Développer mes compétences en Full-Stack et Cybersécurité</span>
              </li>
              <li className="objective-item">
                <span className="objective-check">✓</span>
                <span>Intégrer une équipe tech en alternance pour monter en expertise</span>
              </li>
              <li className="objective-item">
                <span className="objective-check">✓</span>
                <span>Continuer à construire des solutions utiles et accessibles au grand public</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Parcours;
