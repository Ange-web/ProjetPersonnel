import React, { useEffect, useState } from "react";
import Header from "../acceuil/header";
import './IpPage.css'

const IpPage = () => {
  const [ip, setIp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/scan/ip",{
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      }, 
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération");
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
    <div>
      <Header />
    <div className="ip-page">
      <h1 className="ip-title">Votre adresse IP</h1>
      {loading && <p className="ip-loading">Chargement...</p>}
      {error && <p className="ip-error">{error}</p>}
      {ip && <p className="ip-address">{ip}</p>}
    </div>
  </div>);  
};

export default IpPage;
