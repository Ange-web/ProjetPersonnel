import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Auth.css';
import AuthIcon from './AuthIcons';
import GoogleLoginButton from './GoogleLoginButton';

function InputLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlelogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const contentType = response.headers.get('content-type') || '';
      const rawBody = await response.text();
      let data;

      try {
        data = JSON.parse(rawBody);
      } catch {
        data = { message: rawBody };
      }

      if (response.ok) {
        if (!data.user) {
          alert("Erreur : données utilisateur non reçues du serveur");
          setLoading(false);
          return;
        }

        if (data.token) localStorage.setItem("token", data.token);

        const userData = {
          id: data.user.id,
          email: data.user.email,
          username: data.user.username,
          prenom: data.user.prenom || null,
          nom: data.user.nom || null,
          avatar_url: data.user.avatar_url || null
        };

        localStorage.setItem("user", JSON.stringify(userData));

        const event = new CustomEvent("userUpdated", { detail: userData });
        window.dispatchEvent(event);

        navigate("/");
      } else {
        alert(data.message || data.error || "Erreur lors de la connexion.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">
            <AuthIcon type="login" className="auth-icon" />
            Connexion
          </h1>
          <p className="auth-subtitle">Heureux de vous revoir ! 👋</p>
        </div>

        <div className="auth-form">
          <div className="auth-input-group">
            <label className="auth-label">Email ou Username</label>
            <input
              className="auth-input"
              type="text"
              placeholder="Entrez votre email ou pseudo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Mot de passe</label>
            <input
              className="auth-input"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-options">
            <label className="auth-checkbox-label">
              <input type="checkbox" className="auth-checkbox" />
              Se souvenir de moi
            </label>
            <a className="auth-link" href="#">Mot de passe oublié ?</a>
          </div>

          <button onClick={handlelogin} className="auth-button" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="auth-separator">
            <span className="auth-separator-line"></span>
            <span className="auth-separator-text">OU</span>
            <span className="auth-separator-line"></span>
          </div>

          <GoogleLoginButton />
        </div>

        <div className="auth-footer">
          Je n'ai pas de compte ? <Link className="auth-link" to="/signup">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}

export default InputLogin;