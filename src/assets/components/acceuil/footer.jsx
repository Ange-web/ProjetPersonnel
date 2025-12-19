import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column">
          <div className="footer-logo">
            <div className="footer-shield">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 1L3 5V12C3 18.6 6.3 22.6 12 24C17.7 22.6 21 18.6 21 12V5L12 1Z" fill="#20B2AA" />
                <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="footer-brand">NSPY</span>
          </div>
          <p className="footer-description">
            NSPY vous accompagne dans la protection de vos données et systèmes.
            Nos experts en cybersécurité vous offrent des solutions personnalisées
            pour sécuriser votre infrastructure numérique.
          </p>
        </div>



        <div className="footer-column">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:nspy52261@gmail.com">nspy52261@gmail.com</a></li>

            <li>
              <div className="social-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" fill="#20B2AA" />
                  <text x="8" y="11" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">in</text>
                </svg>
                <a href="https://www.linkedin.com/in/ange-nono-a4480a349/" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/ange-nono-a4480a349
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Mentions légales</h4>
          <ul className="footer-links">
            <li><Link to="/privacy-policy">Politique de confidentialité</Link></li>
            <li><Link to="/terms-of-use">Conditions d'utilisation</Link></li>
            <li><Link to="/legal-mentions">Mentions légales</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 NSPY. Tous droits réservés. Protection de vos données, notre priorité.</p>
      </div>
    </footer>
  );
};

export default Footer;
