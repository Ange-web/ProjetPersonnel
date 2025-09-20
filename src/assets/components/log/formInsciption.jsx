import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InputInscription.css";

function InputInscription() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/new/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, username, password, nom, prenom })
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log("Inscription réussie :", data);
                // Rediriger vers la page de connexion après une inscription réussie
                navigate("/login");
            } else {
                console.error("Erreur lors de l'inscription :", data);
                // Vous pouvez ajouter ici un message d'erreur pour l'utilisateur
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            // Vous pouvez ajouter ici un message d'erreur pour l'utilisateur
        }
    };

    return (
        <div className="inscription-container">
          <div className="inscription-box">
            <h2 className="inscription-title">Créer un compte</h2>
      
            <div className="inscription-inputs">
              <div className="input-group">
                <label className="input-title">Prénom</label>
                <input type="text" placeholder="Entrez votre prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
              </div>
      
              <div className="input-group">
                <label className="input-title">Nom</label>
                <input type="text" placeholder="Entrez votre nom" value={nom} onChange={(e) => setNom(e.target.value)} />
              </div>
      
              <div className="input-group">
                <label className="input-title">Email</label>
                <input type="email" placeholder="Entrez votre email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
      
              <div className="input-group">
                <label className="input-title">Nom d'utilisateur</label>
                <input type="text" placeholder="Entrez votre nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
      
              <div className="input-group">
                <label className="input-title">Mot de passe</label>
                <input type="password" placeholder="Entrez votre mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
      
            <div className="inscription-actions">
              <button onClick={handleSignup} className="inscription-button">S'inscrire</button>
      
              <div className="already-account">
                <p>J'ai déjà un compte, <Link className='link-connexion' to="/Login">connexion</Link></p>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default InputInscription;
