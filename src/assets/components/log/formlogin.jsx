import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css'
function InputLogin(){
    const navigate = useNavigate();

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const handlelogin = async() =>{
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const contentType = response.headers.get('content-type') || '';
            const rawBody = await response.text();
            let data;
            if (contentType.includes('application/json')){
                try {
                    data = JSON.parse(rawBody);
                } catch (e) {
                    console.error("Réponse JSON invalide:", rawBody);
                    throw new Error("Réponse du serveur invalide (JSON)");
                }
            } else {
                // Tente un parse JSON sinon garde le texte brut pour debug
                try {
                    data = JSON.parse(rawBody);
                } catch {
                    data = { message: rawBody };
                }
            }

            if (response.ok){
                console.log("Connnexion réussi !");

                localStorage.setItem("token",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                console.log("📦 Stockage user :", JSON.stringify(data.user));

                navigate("/");
            } else{
                console.error("Erreur HTTP:", response.status, data);
            }
        }catch (error){
            console.error("Erreur lors de la requête :",error);
        }
    };

    return (
        <div className="connexion-container">
          <div className="connexion-box">
            <div className="input-group">
              <label className="input-title">Email</label>
              <input
                type="email"
                placeholder="Entrez votre email ou votre nom d'utilisateur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
      
            <div className="input-group">
              <label className="input-title">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
      
            <div className="remember-container">
              <label>
                <input type="checkbox" style={{ marginRight: "6px" }} />
                Se souvenir de moi
              </label>
              <a className="forgot-password" href="#">Mot de passe oublié</a>
            </div>
      
            <button onClick={handlelogin} className="connexion-button">Valider</button>
      
            <div className="already-account">
              Je n'ai pas de compte, <Link className="link-connexion" to="/signup">inscription</Link>
            </div>
          </div>
        </div>
      );
      
}

export default InputLogin