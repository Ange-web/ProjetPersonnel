import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../acceuil/header';
import profileImage from '../../images/profile-ange.png';
import './profil.css';

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
        // Récupérer les données utilisateur depuis l'API avec le token
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          // Token invalide ou expiré
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          alert('Merci de vous connecter ou vous reconnecter afin d\'accéder à l\'outil.');
          navigate('/Login');
          return;
        }

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }

        const data = await response.json();
        
        // Le backend peut renvoyer directement l'objet user ou dans data.user
        const userData = data.user || data;
        
        if (userData && userData.id) {
          setUser(userData);
          setEditedData({
            prenom: userData.prenom || '',
            nom: userData.nom || '',
            username: userData.username || ''
          });
          
          // Mettre à jour localStorage avec les données à jour depuis l'API
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('✅ Données utilisateur récupérées depuis l\'API :', userData);
          console.log('📝 Prénom depuis API :', userData.prenom);
          console.log('📝 Nom depuis API :', userData.nom);
        } else {
          throw new Error('Données utilisateur non trouvées dans la réponse');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        // En cas d'erreur, essayer de récupérer depuis localStorage comme fallback
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setEditedData({
              prenom: parsedUser.prenom || '',
              nom: parsedUser.nom || '',
              username: parsedUser.username || ''
            });
            console.warn('⚠️ Utilisation des données en cache (localStorage)');
          } catch (err) {
            navigate('/Login');
          }
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

      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
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

      const data = await response.json();

      if (response.ok) {
        const updatedUser = {
          ...user,
          prenom: editedData.prenom,
          nom: editedData.nom,
          username: editedData.username
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        
        // Déclencher un événement pour mettre à jour le header
        window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
        
        alert('Profil mis à jour avec succès !');
      } else {
        if (response.status === 401) {
          alert('Merci de vous connecter ou vous reconnecter afin d\'accéder à l\'outil.');
          navigate('/Login');
        } else {
          alert(data.error || 'Erreur lors de la mise à jour du profil.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Erreur de connexion au serveur. Veuillez réessayer.');
    } finally {
      setSaving(false);
    }
  };

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
                {user.prenom || ''} {user.nom || ''}
              </h1>
              <p className="profil-username">@{user.username}</p>
              <p className="profil-email">{user.email}</p>
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
                    ✏️ Modifier
                  </button>
                ) : (
                  <div className="profil-edit-actions">
                    <button 
                      className="profil-save-btn"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? 'Enregistrement...' : '💾 Enregistrer'}
                    </button>
                    <button 
                      className="profil-cancel-btn"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>
              <div className="profil-details">
                <div className="profil-detail-item">
                  <span className="profil-detail-label">Prénom :</span>
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
                  <span className="profil-detail-label">Nom :</span>
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
                  <span className="profil-detail-label">Nom d'utilisateur :</span>
                  {isEditing ? (
                    <input
                      type="text"
                      className="profil-input"
                      value={editedData.username}
                      onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                      placeholder="Votre nom d'utilisateur"
                    />
                  ) : (
                    <span className="profil-detail-value">{user.username}</span>
                  )}
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

