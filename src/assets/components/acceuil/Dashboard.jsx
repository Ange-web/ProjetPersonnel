import React, { useEffect, useState } from 'react';
import './style.css';
import { DashboardIcon } from './AppIcons';

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
        const apiUrl = `${import.meta.env.VITE_API_URL}/stats`;

        console.log('📊 Récupération des statistiques depuis:', apiUrl);


        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        });

        console.log('📊 Statut de la réponse:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('📊 Données reçues:', data);

          setStats({
            totalScans: data.totalScans || data.total_scans || 0,
            urlScans: data.urlScans || data.url_scans || 0,
            ipScans: data.ipScans || data.ip_scans || 0,
            portScans: data.portScans || data.port_scans || 0,
            exifScans: data.exifScans || data.exif_scans || 0,
            totalUsers: data.totalUsers || data.total_users || 0,
            loading: false
          });
        } else {
          console.warn('⚠️ Erreur lors de la récupération des stats:', response.status);

          setStats(prev => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('❌ Erreur lors de la récupération des statistiques:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();


    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);


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
          <h2 className="dashboard-title">Votre activité de sécurité</h2>
          <p className="dashboard-subtitle">
            Ces statistiques correspondent uniquement à vos analyses personnelles
            réalisées sur la plateforme NSPY.
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card dashboard-card-primary">
            <div className="dashboard-card-icon">
              <DashboardIcon type="total" />
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label">Total des analyses</h3>
              <div className="dashboard-card-value">
                <AnimatedCounter value={stats.totalScans} />
              </div>
              <p className="dashboard-card-description">Scans effectués sur la plateforme</p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <DashboardIcon type="url" />
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Scan d'URL</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.urlScans} />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <DashboardIcon type="ip" />
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Scan d'IP</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.ipScans} />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <DashboardIcon type="port" />
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Scan de ports</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.portScans} />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon-small">
              <DashboardIcon type="exif" />
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-label-small">Analyse EXIF</h3>
              <div className="dashboard-card-value-small">
                <AnimatedCounter value={stats.exifScans} />
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Dashboard;
