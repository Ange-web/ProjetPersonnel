import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../../images/logo.png';

import { Link, useNavigate } from 'react-router-dom';
//import ProfilForm from '../profil/ProfilForm'; // ton composant séparé

const Header = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false);
    navigate('/login');
  };

  // Permet au formulaire ProfilForm de mettre à jour le Header
  const handleProfileUpdate = (updatedUser) => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowModal(false);
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
                  <button
                    type="button"
                    className="profile-popup-link"
                    onClick={() => setShowModal(true)}
                  >
                    Profil
                  </button>
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

      {/* Modale du formulaire de profil */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <ProfilForm user={user} onUpdate={handleProfileUpdate} onLogout={handleLogout} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
