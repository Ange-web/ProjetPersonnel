import { useState } from "react";
import { Link } from "react-router-dom";
import "./InputInscription.css";

function InputInscription() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:3000/new/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, username, password, nom, prenom })
            });

            const data = await response.json();
            console.log("Inscription réussie :", data);
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
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
              <button onClick={handleSignup} className="inscription-button"><Link to="/login">S'inscrire</Link></button>
      
              <div className="already-account">
                <p>J'ai déjà un compte, <Link className='link-connexion' to="/Login">connexion</Link></p>
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default InputInscription;
