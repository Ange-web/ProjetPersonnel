import { loadSession, logout } from '../../../api';
import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../../images/logo.png';

import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isFullWidth, setIsFullWidth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    return () => document.body.classList.remove('mobile-menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    loadSession().then(setUser).catch(() => setUser(null));
    const handleUserUpdate = event => setUser(event.detail || null);

    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  const handleLogout = async () => {
    try { await logout(); setShowPopup(false); navigate('/Login'); }
    catch (error) { alert(error.message); }
  };

  const toggleFullWidth = () => {
    setIsFullWidth(!isFullWidth);
  };

  return (
    <>
      <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'} ${isFullWidth ? 'header-fullwidth' : ''} ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="header-main-content">
          <div className="logo">
            <img src={logo} alt="Logo NSPY" className='logo-img' />
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Ouvrir ou fermer le menu" aria-expanded={isMenuOpen}
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
          <nav className="nav">
            <Link to="/" onClick={closeMenu}>Accueil</Link>
            <Link to="/servicehome" onClick={closeMenu}>Services</Link>
            <a href="mailto:nspy52261@gmail.com" onClick={closeMenu}>Contact</a>
            <Link to="/parcours" onClick={closeMenu}>Mon Parcours</Link>
          </nav>

          <div className="header-actions">
            <button
              className="header-toggle-btn"
              onClick={() => { toggleFullWidth(); closeMenu(); }}
              title={isFullWidth ? "Navbar flottante" : "Navbar pleine largeur"}
              aria-label={isFullWidth ? "Activer navbar flottante" : "Activer navbar pleine largeur"}
            >
              {isFullWidth ? '📌' : '🔓'}
            </button>
            {user ? (
              <div
                className="user-info"
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
                role="button" tabIndex={0} aria-expanded={showPopup}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShowPopup(!showPopup); } if (e.key === "Escape") setShowPopup(false); }}
                onClick={() => setShowPopup(!showPopup)}
              >
                <span className="username">{user.username}</span>
                {showPopup && (
                  <div className="profile-popup">
                    <Link
                      to="/profil"
                      className="profile-popup-link"
                      onClick={() => { setShowPopup(false); closeMenu(); }}
                    >
                      Profil
                    </Link>
                    <Link
                      to="/dashboard"
                      className="profile-popup-link"
                      onClick={() => { setShowPopup(false); closeMenu(); }}
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      className="profile-popup-link logout"
                      onClick={() => { handleLogout(); closeMenu(); }}
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" onClick={closeMenu} className="btn-primary">Connexion</Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
