import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../acceuil/header';
import './profil.css';
import ProfileIcon from './ProfileIcons';

const ProfilPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    prenom: '',
    nom: '',
    username: ''
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/Login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/Login');
          return;
        }

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const data = await response.json();
        const userData = data.user || data;

        if (userData && userData.id) {
          setUser(userData);
          setEditedData({
            prenom: userData.prenom || '',
            nom: userData.nom || '',
            username: userData.username || ''
          });
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          throw new Error('Données utilisateur non trouvées');
        }
      } catch (error) {
        console.error('Erreur:', error);
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          navigate('/Login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      prenom: user.prenom || '',
      nom: user.nom || '',
      username: user.username || ''
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/Login');
        return;
      }

      const apiUrl = `${import.meta.env.VITE_API_URL}/user/update`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prenom: editedData.prenom,
          nom: editedData.nom,
          username: editedData.username
        })
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }

      if (response.ok) {
        const updatedUser = data?.user || {
          ...user,
          prenom: editedData.prenom,
          nom: editedData.nom,
          username: editedData.username
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
      } else {
        alert(data?.error || 'Erreur lors de la mise à jour.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new CustomEvent('userUpdated', { detail: null }));
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profil-wrapper">
        <Header />
        <div className="profil-container">
          <div className="profil-loading">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="profil-wrapper">
      <Header />
      <div className="profil-container">
        <div className="profil-card">
          <div className="profil-header">
            <div className="profil-avatar">
              <div className="profil-avatar-placeholder">
                <ProfileIcon type="user" width={64} height={64} />
              </div>
            </div>
            <div className="profil-info">
              <h1 className="profil-name">
                {user.prenom || ''} {user.nom || ''}
              </h1>
              <p className="profil-username">@{user.username}</p>
              <div className="profil-email">
                <ProfileIcon type="mail" width={16} height={16} />
                {user.email}
              </div>
            </div>
          </div>

          <div className="profil-content">
            <div className="profil-section">
              <div className="profil-section-header">
                <h2 className="profil-section-title">Informations personnelles</h2>
                {!isEditing ? (
                  <button
                    className="profil-edit-btn"
                    onClick={handleEdit}
                  >
                    <ProfileIcon type="edit" width={18} height={18} />
                    Modifier
                  </button>
                ) : (
                  <div className="profil-edit-actions">
                    <button
                      className="profil-save-btn"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      <ProfileIcon type="save" width={18} height={18} />
                      {saving ? '...' : 'Enregistrer'}
                    </button>
                    <button
                      className="profil-cancel-btn"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      <ProfileIcon type="cancel" width={18} height={18} />
                      Annuler
                    </button>
                  </div>
                )}
              </div>

              <div className="profil-details">
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Prénom</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="profil-input"
                      value={editedData.prenom}
                      onChange={(e) => setEditedData({ ...editedData, prenom: e.target.value })}
                      placeholder="Votre prénom"
                    />
                  ) : (
                    <span className="profil-detail-value">{user.prenom || 'Non renseigné'}</span>
                  )}
                </div>
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Nom</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="profil-input"
                      value={editedData.nom}
                      onChange={(e) => setEditedData({ ...editedData, nom: e.target.value })}
                      placeholder="Votre nom"
                    />
                  ) : (
                    <span className="profil-detail-value">{user.nom || 'Non renseigné'}</span>
                  )}
                </div>
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Nom d'utilisateur</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="profil-input"
                      value={editedData.username}
                      onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                      placeholder="Nom d'utilisateur"
                    />
                  ) : (
                    <span className="profil-detail-value">{user.username}</span>
                  )}
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
                className="profil-btn profil-btn-danger"
                onClick={handleLogout}
              >
                <ProfileIcon type="logout" width={18} height={18} />
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
