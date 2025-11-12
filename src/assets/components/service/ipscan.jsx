import React, { useEffect, useState } from "react";
import Header from "../acceuil/header";
import Footer from "../acceuil/footer";
import './IpPage.css'

const IpPage = () => {
  const [ip, setIp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const NOT_AUTH_MSG = "Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.";

    if (!token) {
      setError(NOT_AUTH_MSG);
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/scan/ip`,{
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      }, 
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) throw new Error(NOT_AUTH_MSG);
          throw new Error("Une erreur est survenue.");
        }
        return res.json();
      })
      .then((data) => {
        setIp(data.ip);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="service-page-wrapper">
      <Header />
      <div className="ip-page">
        <div className="ip-container">
          <h1 className="ip-title">Votre adresse IP</h1>
          {loading && <p className="ip-loading">Chargement...</p>}
          {error && <p className="ip-error">{error}</p>}
          {ip && <p className="ip-address">{ip}</p>}
        </div>
      </div>
      <Footer />
    </div>);  
};

export default IpPage;
