import React, { useEffect, useState } from "react";
import Header from "../acceuil/header";
import ScanResultView from './ScanResultView';
import './IpPage.css'
import ServiceIcon from './ServiceIcons';

const IpPage = () => {
  const [scanResult, setScanResult] = useState(null);
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

    fetch(`${import.meta.env.VITE_API_URL}/scan/ip`, {
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


        if (data.scan) {
          setScanResult(data);
        } else if (data.ip) {

          setScanResult({
            scan: { status: 'success', severity: 'info', started_at: new Date().toISOString() },
            stats: {},
            findings: [],
            ipData: { ip: data.ip }
          });
        }
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
          <h1 className="ip-title">
            <ServiceIcon type="ip-alt" className="title-icon" width="32" height="32" strokeWidth="3" />
            Votre adresse IP
          </h1>
          {loading && <p className="ip-loading">Chargement...</p>}
          {error && <p className="ip-error">{error}</p>}

          {scanResult && <ScanResultView result={scanResult} />}
        </div>
      </div>
    </div>);
};

export default IpPage;
