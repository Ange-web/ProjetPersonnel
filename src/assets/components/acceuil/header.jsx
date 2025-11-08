import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../../images/logo.png';

import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Récupère l'utilisateur connecté depuis localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error("Erreur JSON.parse sur user:", err);
        localStorage.removeItem("user"); // nettoyage si corrompu
      }
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowPopup(false);
    navigate('/Login');
  };

  return (
    <>
      <header className="header">
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
          {/* Si utilisateur connecté */}
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
