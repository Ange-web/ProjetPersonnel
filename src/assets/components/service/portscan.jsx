import React, { useState } from "react";
import Header from "../acceuil/header";
import Footer from "../acceuil/footer";
import './PortScanPage.css';

const PortScanPage = () => {
  const [scanType, setScanType] = useState("local");
  const [targetIpOrDomain, setTargetIpOrDomain] = useState("");
  const [portList, setPortList] = useState("21,22,80,443,8080");
  const [scannedTarget, setScannedTarget] = useState(null);
  const [openPorts, setOpenPorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setOpenPorts([]);
    setScannedTarget(null);

    // Convertir les ports en tableau de nombres
    const ports = portList
      .split(",")
      .map(p => parseInt(p.trim()))
      .filter(p => !isNaN(p));

    try {
      const token= localStorage.getItem("token");
      const NOT_AUTH_MSG = "Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.";

      if (!token) {
        setError(NOT_AUTH_MSG);
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/scan/port`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`},
        body: JSON.stringify({
          type: scanType,
          ip: scanType === "public" ? targetIpOrDomain : null,
          ports: ports,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setScannedTarget(data.scannedIp);
        setOpenPorts(data.openPorts);
      } else {
        if (response.status === 401) {
          setError(NOT_AUTH_MSG);
        } else {
          setError(data.error || "Erreur pendant le scan.");
        }
      }
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    }

    setLoading(false);
  };

  return (
    <div className="service-page-wrapper">
      <Header />
      <div className="portscan-wrapper">
        <h1 className="portscan-title">🔍 Scanner des ports TCP</h1>
        
        <div className="portscan-form">
          {/* Choix du type de scan */}
          <div className="form-group">
            <label className="form-label">Type de scan :</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="form-select"
            >
              <option value="local">🔒 Scan local (votre IP)</option>
              <option value="public">🌍 IP publique ou nom de domaine</option>
            </select>
          </div>
    
          {/* Input IP publique ou domaine */}
          {scanType === "public" && (
            <div className="form-group">
              <label className="form-label">IP ou domaine :</label>
              <input
                type="text"
                placeholder="Ex : 8.8.8.8 ou google.com"
                value={targetIpOrDomain}
                onChange={(e) => setTargetIpOrDomain(e.target.value)}
                className="form-input"
              />
            </div>
          )}
    
          {/* Input pour ports */}
          <div className="form-group">
            <label className="form-label">Ports à scanner :</label>
            <input
              type="text"
              placeholder="Ex : 21,22,80,443"
              value={portList}
              onChange={(e) => setPortList(e.target.value)}
              className="form-input"
            />
          </div>
    
          {/* Bouton */}
          <button
            onClick={handleScan}
            disabled={loading || (scanType === "public" && !targetIpOrDomain)}
            className="scan-button"
          >
            {loading ? "Scan en cours..." : "Lancer le scan"}
          </button>
    
          {/* Erreur */}
          {error && <p className="scan-error">{error}</p>}
        </div>
    
        {/* Résultat */}
        {scannedTarget && (
          <div className="scan-result">
            <p className="result-label">Cible scannée :</p>
            <p className="result-value">{scannedTarget}</p>
          </div>
        )}
    
        {openPorts.length > 0 && (
          <div className="openports-section">
            <h2 className="openports-title">✅ Ports ouverts :</h2>
            <ul className="openports-list">
              {openPorts.map((port, index) => (
                <li key={index}>Port {port}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>);  
};

export default PortScanPage;
