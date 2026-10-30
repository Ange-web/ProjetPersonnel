import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../acceuil/header';
import { request, setUser, logout } from '../../../api';
import './profil.css';
export default function ProfilPage() {
  const [user, updateUser] = useState(null), [error, setError] = useState(''), [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false), [password, setPassword] = useState(''), [nextPassword, setNextPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => { let live = true; request('/profile').then(data => { if (live) updateUser(data.user); }).catch(e => { if (live) setError(e.message); }); return () => { live = false; }; }, []);
  async function action(event, kind) {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      if (kind === 'save') {
        const data = await request('/profile', { method: 'PUT', body: JSON.stringify({ username: user.username, nom: user.nom, prenom: user.prenom }) });
        updateUser(data.user); setUser(data.user); setMessage('Profil enregistré.');
      } else if (kind === 'password') {
        await request('/profile/password', { method: 'PUT', body: JSON.stringify({ currentPassword: password, password: nextPassword }) });
        setUser(null); navigate('/Login');
      } else if (kind === 'delete') {
        if (!window.confirm('Supprimer définitivement votre compte, vos analyses et vos fichiers ?')) return;
        await request('/profile', { method: 'DELETE', body: JSON.stringify({ password }) }); setUser(null); navigate('/');
      } else { await logout(); navigate('/Login'); }
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  }
  return <div className="profil-wrapper"><Header /><main className="profil-container"><div className="profil-card">
    <h1>Mon profil</h1>{error && <p role="alert">{error} <a href="/Login">Se connecter</a></p>}{message && <p role="status">{message}</p>}
    {user && <><p>{user.email}</p><form onSubmit={e => action(e, 'save')} className="profil-details">
      {['username', 'prenom', 'nom'].map(key => <label key={key} className="profil-detail-item">{({ username: 'Nom d’utilisateur', prenom: 'Prénom', nom: 'Nom' })[key]}
        <input className="profil-input" autoComplete={key === 'username' ? 'username' : key === 'prenom' ? 'given-name' : 'family-name'} value={user[key] || ''} required={key === 'username'} minLength={key === 'username' ? 3 : undefined} maxLength={key === 'username' ? 40 : 80} onChange={e => updateUser({ ...user, [key]: e.target.value })} /></label>)}
      <button className="profil-btn profil-btn-primary" disabled={busy}>Enregistrer le profil</button></form>
      <form onSubmit={e => action(e, 'password')} className="profil-details"><h2>Changer mon mot de passe</h2>
        <label>Mot de passe actuel<input className="profil-input" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
        <label>Nouveau mot de passe (12 caractères minimum)<input className="profil-input" type="password" autoComplete="new-password" required minLength={12} maxLength={72} value={nextPassword} onChange={e => setNextPassword(e.target.value)} /></label>
        <button className="profil-btn profil-btn-primary" disabled={busy}>Changer le mot de passe</button></form>
      <p>La suppression utilise le mot de passe actuel saisi ci-dessus et efface les données du compte.</p>
      <div className="profil-actions"><button className="profil-btn profil-btn-danger" disabled={busy || !password} onClick={e => action(e, 'delete')}>Supprimer mon compte</button>
        <button className="profil-btn profil-btn-primary" disabled={busy} onClick={e => action(e, 'logout')}>Se déconnecter</button></div></>}
  </div></main></div>;
}
