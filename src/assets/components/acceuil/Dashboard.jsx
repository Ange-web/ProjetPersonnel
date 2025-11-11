import React, { useEffect, useState } from 'react';
import './style.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    urlScans: 0,
    ipScans: 0,
    portScans: 0,
    exifScans: 0,
    totalUsers: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Récupérer les statistiques depuis l'API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats({
            totalScans: data.totalScans || 0,
            urlScans: data.urlScans || 0,
            ipScans: data.ipScans || 0,
            portScans: data.portScans || 0,
            exifScans: data.exifScans || 0,
            totalUsers: data.totalUsers || 0,
            loading: false
          });
        } else {
          // Si l'API n'est pas disponible, utiliser des valeurs par défaut
          setStats(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
    
    // Rafraîchir les stats toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Composant pour animer les nombres
  const AnimatedCounter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (value === 0) {
        setCount(0);
        return;
      }

      let startTime = null;
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function pour une animation fluide
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(animate);
    }, [value, duration]);

    return <span>{count.toLocaleString()}</span>;
  };

  if (stats.loading) {
    return (
      <section className="dashboard-section">
        <div className="dashboard-container">
          <h2 className="dashboard-title">Statistiques en temps réel</h2>
          <div className="dashboard-loading">Chargement des statistiques...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-section">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2 className="dashboard-title">📊 Statistiques d'utilisation</h2>
          <p className="dashboard-subtitle">Découvrez l'impact de nos outils de sécurité</p>
        </div>

        <div className="dashboard-grid">
          {/* Carte principale - Total des scans */}
          <div className="dashboard-card dashboard-card-primary">
            <div className="dashboard-card-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M24 8 L24 24 L32 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label">Total des analyses</h3>
              <div className="dashboard-card-value">
                <AnimatedCounter value={stats.totalScans} />
              </div>
              <p className="dashboard-card-description">Scans effectués sur la plateforme</p>
            </div>
          </div>

          {/* Scan d'URL */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#20B2AA" strokeWidth="2"/>
                <path d="M16 8 L16 16 L20 16" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Scan d'URL</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.urlScans} />
              </div>
            </div>
          </div>

          {/* Scan d'IP */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="8" y="12" width="16" height="12" rx="2" stroke="#20B2AA" strokeWidth="2"/>
                <circle cx="12" cy="18" r="1.5" fill="#20B2AA"/>
                <circle cx="16" cy="18" r="1.5" fill="#20B2AA"/>
                <circle cx="20" cy="18" r="1.5" fill="#20B2AA"/>
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Scan d'IP</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.ipScans} />
              </div>
            </div>
          </div>

          {/* Scan de ports */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="10" y="8" width="12" height="16" rx="2" stroke="#20B2AA" strokeWidth="2"/>
                <line x1="14" y1="12" x2="18" y2="12" stroke="#20B2AA" strokeWidth="2"/>
                <line x1="14" y1="16" x2="18" y2="16" stroke="#20B2AA" strokeWidth="2"/>
                <line x1="14" y1="20" x2="18" y2="20" stroke="#20B2AA" strokeWidth="2"/>
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Scan de ports</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.portScans} />
              </div>
            </div>
          </div>

          {/* Analyse EXIF */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="8" y="6" width="16" height="20" rx="2" stroke="#20B2AA" strokeWidth="2"/>
                <circle cx="16" cy="14" r="3" stroke="#20B2AA" strokeWidth="2"/>
                <path d="M10 22 L12 20 L14 22 L18 18 L22 22" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Analyse EXIF</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.exifScans} />
              </div>
            </div>
          </div>

          {/* Total utilisateurs */}
          <div className="dashboard-card dashboard-card-users">
            <div className="dashboard-card-icon-small">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="12" r="5" stroke="#20B2AA" strokeWidth="2"/>
                <path d="M8 26 C8 20 11 18 16 18 C21 18 24 20 24 26" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Utilisateurs actifs</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.totalUsers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

