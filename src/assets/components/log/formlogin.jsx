import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function InputLogin(){
    const navigate = useNavigate();

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const handlelogin = async() =>{
        try{
            const response = await fetch("https://localhost:3000/user/login",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const data = await response.json();
            
            if (response.ok){
                console.log("Connnexion réussi !");
            } else{
                console.error("Erreur :", data.message);
            }
        }catch (error){
            console.error("Erreur lors de la requête :",error);
        }
    };

    return(
        <div className="connexion-container">
            <div className="connexion-inputs">
                <div className="input-group">
                    <label className="input-title">Email</label>
                    <input type="email"
                    placeholder="Entrez votre email ou votre nom d'utilisateur" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="input-title">Mot de passe</label>
                    <input type="password"
                    placeholder="Entrez votre Mot de passe" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="connexion-actions">
            <div className="remember-container">
                    <label>
                        <input type="checkbox" />
                        Se souvenir de moi
                    </label>
                    <a className='forgot-password' href="#">Mot de passe oublié</a>
                </div>

                <button onClick={handlelogin} className="connexion-button">Valider</button>

                <div className="already-account">
                    <p className="text">Je n'ai pas de compte, <Link className='link-connexion' to="/signup">inscription</Link></p>
                </div>
            </div>
        </div>
    )
}

export default InputLogin