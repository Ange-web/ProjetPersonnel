import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import AuthIcon from "./AuthIcons";
import GoogleLoginButton from "./GoogleLoginButton";

function InputInscription() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/new/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, nom, prenom })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inscription réussie :", data);
        navigate("/Login");
      } else {
        alert(data.error || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
      alert("Erreur de connexion au serveur.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">
            <AuthIcon type="register" className="auth-icon" />
            Créer un compte
          </h1>
          <p className="auth-subtitle">Rejoignez-nous dès aujourd'hui ! 🚀</p>
        </div>

        <div className="auth-form">
          <div className="auth-row">
            <div className="auth-input-group">
              <label className="auth-label">Prénom</label>
              <input className="auth-input" type="text" placeholder="John" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>

            <div className="auth-input-group">
              <label className="auth-label">Nom</label>
              <input className="auth-input" type="text" placeholder="Doe" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input className="auth-input" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Nom d'utilisateur</label>
            <input className="auth-input" type="text" placeholder="johndoe123" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Mot de passe</label>
            <input className="auth-input" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button onClick={handleSignup} className="auth-button" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>

          <div className="auth-separator">
            <span className="auth-separator-line"></span>
            <span className="auth-separator-text">OU</span>
            <span className="auth-separator-line"></span>
          </div>

          <GoogleLoginButton />
        </div>

        <div className="auth-footer">
          Déjà un compte ? <Link className='auth-link' to="/Login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}

export default InputInscription;
