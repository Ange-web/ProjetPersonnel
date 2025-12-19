import React, { useState } from "react";
import Header from "../acceuil/header";
import ScanResultView from './ScanResultView';
import './PortScanPage.css';
import ServiceIcon from './ServiceIcons';

const PortScanPage = () => {
  const [scanType, setScanType] = useState("local");
  const [targetIpOrDomain, setTargetIpOrDomain] = useState("");
  const [portList, setPortList] = useState("21,22,80,443,8080");
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);
    setScanResult(null);


    const ports = portList
      .split(",")
      .map(p => parseInt(p.trim()))
      .filter(p => !isNaN(p));

    try {
      const token = localStorage.getItem("token");
      const NOT_AUTH_MSG = "Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.";

      if (!token) {
        setError(NOT_AUTH_MSG);
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/scan/port`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          type: scanType,
          ip: scanType === "public" ? targetIpOrDomain : null,
          ports: ports,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        if (data.scan) {
          setScanResult(data);
        } else {

          const findings = (data.openPorts || []).map(p => ({
            severity: 'high',
            title: `Port ouvert : ${p}/tcp`,
            description: `Le port ${p} est accessible de l'extérieur.`,
            evidence: `Port ${p} responded to SYN`
          }));

          setScanResult({
            scan: {
              status: 'success',
              severity: findings.length > 0 ? 'high' : 'low',
              target: data.scannedIp,
              duration_ms: 0,
              started_at: new Date().toISOString()
            },
            stats: { high_count: findings.length },
            findings: findings
          });
        }
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
        <h1 className="portscan-title">
          <ServiceIcon type="port-alt" className="title-icon" width="32" height="32" strokeWidth="3" />
          Scanner des ports TCP
        </h1>

        <div className="portscan-form">
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

          <button
            onClick={handleScan}
            disabled={loading || (scanType === "public" && !targetIpOrDomain)}
            className="scan-button"
          >
            {loading ? "Scan en cours..." : "Lancer le scan"}
          </button>

          {error && <p className="scan-error">{error}</p>}
        </div>

        {scanResult && (
          <div className="scan-result-container" style={{ marginTop: '2rem' }}>
            <ScanResultView result={scanResult} />
          </div>
        )}
      </div>
    </div>);
};

export default PortScanPage;
