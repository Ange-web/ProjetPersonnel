import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../../images/logo.png';

import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error("Erreur JSON.parse sur user:", err);
        localStorage.removeItem("user");
      }
    }
    };

    loadUser();

    const handleUserUpdate = (event) => {
      if (event.detail) {
        setUser(event.detail);
      }
    };

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
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowPopup(false);
    navigate('/Login');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const toggleFullWidth = () => {
    setIsFullWidth(!isFullWidth);
  };

  return (
    <>
      <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'} ${isDarkMode ? 'header-dark' : ''} ${isFullWidth ? 'header-fullwidth' : ''}`}>
        <div className="logo">
          <img src={logo} alt="Logo NSPY" className='logo-img' />
        </div>

        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/servicehome">Services</Link>
          <a href="#">Contact</a>
          <Link to="/parcours">Mon Parcours</Link>
        </nav>

        <div className="header-actions">
          <button 
            className="header-toggle-btn" 
            onClick={toggleDarkMode}
            title={isDarkMode ? "Mode clair" : "Mode sombre"}
            aria-label={isDarkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button 
            className="header-toggle-btn" 
            onClick={toggleFullWidth}
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
            >
              <span className="username">{user.username}</span>
              {showPopup && (
                <div className="profile-popup">
                  <Link
                    to="/profil"
                    className="profile-popup-link"
                    onClick={() => setShowPopup(false)}
                  >
                  Profil
                  </Link>
                  <button
                    type="button"
                    className="profile-popup-link logout"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="btn-primary">Connexion</button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
