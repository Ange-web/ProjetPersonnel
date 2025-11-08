import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../acceuil/header';
import profileImage from '../../images/profile-ange.png';
import './profil.css';

const ProfilPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      navigate('/Login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.error('Erreur lors du parsing de l\'utilisateur:', err);
      navigate('/Login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="profil-container">
          <div className="profil-loading">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="profil-container">
        <div className="profil-card">
          <div className="profil-header">
            <div className="profil-avatar">
              <img 
                src={profileImage} 
                alt="Photo de profil" 
                className="profil-avatar-img"
              />
            </div>
            <div className="profil-info">
              <h1 className="profil-name">
                {user.prenom} {user.nom}
              </h1>
              <p className="profil-username">@{user.username}</p>
              <p className="profil-email">{user.email}</p>
            </div>
          </div>

          <div className="profil-content">
            <div className="profil-section">
              <h2 className="profil-section-title">Informations personnelles</h2>
              <div className="profil-details">
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Prénom :</span>
                  <span className="profil-detail-value">{user.prenom || 'Non renseigné'}</span>
                </div>
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Nom :</span>
                  <span className="profil-detail-value">{user.nom || 'Non renseigné'}</span>
                </div>
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Nom d'utilisateur :</span>
                  <span className="profil-detail-value">{user.username}</span>
                </div>
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Email :</span>
                  <span className="profil-detail-value">{user.email}</span>
                </div>
              </div>
            </div>

            <div className="profil-section">
              <h2 className="profil-section-title">Statistiques</h2>
              <div className="profil-stats">
                <div className="profil-stat-card">
                  <div className="profil-stat-number">-</div>
                  <div className="profil-stat-label">Scans effectués</div>
                </div>
                <div className="profil-stat-card">
                  <div className="profil-stat-number">-</div>
                  <div className="profil-stat-label">Dernière activité</div>
                </div>
              </div>
            </div>

            <div className="profil-actions">
              <button 
                className="profil-btn profil-btn-primary"
                onClick={() => navigate('/servicehome')}
              >
                Accéder aux services
              </button>
              <button 
                className="profil-btn profil-btn-secondary"
                onClick={() => navigate('/parcours')}
              >
                Voir mon parcours
              </button>
              <button 
                className="profil-btn profil-btn-danger"
                onClick={handleLogout}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;

