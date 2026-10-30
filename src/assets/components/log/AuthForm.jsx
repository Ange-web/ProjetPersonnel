import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { request, setUser } from '../../../api';
import AuthIcon from './AuthIcons';
import './Auth.css';
export default function AuthForm({ signup = false }) {
  const [values, setValues] = useState({ email: '', password: '', username: '', nom: '', prenom: '' });
  const [loading, setLoading] = useState(false), [error, setError] = useState('');
  const navigate = useNavigate();
  const fields = signup ? ['prenom', 'nom', 'email', 'username', 'password'] : ['email', 'password'];
  const labels = { prenom: 'Prénom', nom: 'Nom', email: 'Adresse email', username: 'Nom d’utilisateur', password: 'Mot de passe' };
  async function submit(event) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const data = await request(signup ? '/new/signup' : '/user/login', { method: 'POST', body: JSON.stringify(signup ? values : { email: values.email, password: values.password }) });
      if (!signup) setUser(data.user);
      navigate(signup ? '/Login?inscription=ok' : '/servicehome');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }
  return <main className="auth-page-wrapper"><div className="auth-container">
    <div className="auth-header"><h1 className="auth-title"><AuthIcon type={signup ? 'register' : 'login'} className="auth-icon" />{signup ? 'Créer un compte' : 'Connexion'}</h1>
      <p className="auth-subtitle">{signup ? 'Retrouvez vos analyses dans votre espace personnel.' : 'Heureux de vous revoir !'}</p></div>
    <form className="auth-form" onSubmit={submit}>
      {fields.map(name => <div className="auth-input-group" key={name}>
        <label className="auth-label" htmlFor={'auth-' + name}>{labels[name]}</label>
        <input className="auth-input" id={'auth-' + name} name={name} type={name === 'password' ? 'password' : name === 'email' ? 'email' : 'text'}
          required={!['prenom', 'nom'].includes(name)} minLength={name === 'password' && signup ? 12 : name === 'username' ? 3 : undefined}
          maxLength={name === 'password' ? 72 : name === 'username' ? 40 : name === 'email' ? 254 : 80}
          autoComplete={name === 'password' ? (signup ? 'new-password' : 'current-password') : name === 'email' ? 'email' : name === 'username' ? 'username' : name === 'prenom' ? 'given-name' : 'family-name'}
          value={values[name]} onChange={e => setValues({ ...values, [name]: e.target.value })} />
      </div>)}
      {signup && <p>Mot de passe : au moins 12 caractères, au maximum 72 octets.</p>}
      {error && <p role="alert" className="scan-error">{error}</p>}
      <button className="auth-button" disabled={loading}>{loading ? 'Veuillez patienter…' : signup ? 'S’inscrire' : 'Se connecter'}</button>
    </form>
    <p className="auth-footer">{signup ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}<Link className="auth-link" to={signup ? '/Login' : '/signup'}>{signup ? 'Se connecter' : 'Créer un compte'}</Link></p>
    <Link className="auth-link" to="/">Retour à l’accueil</Link>
  </div></main>;
}
