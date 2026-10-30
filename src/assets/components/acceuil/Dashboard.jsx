import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../api';
import { DashboardIcon } from './AppIcons';
import './style.css';
export default function Dashboard() {
  const [stats, setStats] = useState(null), [error, setError] = useState('');
  useEffect(() => { let live = true; request('/stats').then(data => { if (live) setStats(data); }).catch(e => { if (live) setError(e.message); }); return () => { live = false; }; }, []);
  return <section className="dashboard-section"><div className="dashboard-container"><h2 className="dashboard-title">Votre activité de sécurité</h2><p className="dashboard-subtitle">Vos analyses personnelles enregistrées sur NSPY.</p>
    {error ? <p>{error} <Link to="/Login">Connexion</Link></p> : !stats ? <p role="status">Chargement…</p> : <div className="dashboard-grid">
      {Object.entries({ totalScans: 'Total des analyses', urlScans: 'Analyses URL', ipScans: 'Adresses IP', portScans: 'Analyses de ports' }).map(([key, label], i) => <div className="dashboard-card" key={key}><DashboardIcon type={['total', 'url', 'ip', 'port'][i]} /><div className="dashboard-card-content"><h3>{label}</h3><div className="dashboard-card-value">{stats[key]}</div></div></div>)}
    </div>}</div></section>;
}
