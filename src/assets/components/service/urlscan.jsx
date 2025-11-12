import React, { useState } from 'react';
import Header from '../acceuil/header';
import './scanPage.css';

const ScanPage = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [iaExplanation, setIaExplanation] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);
    setIaExplanation('');

    try {
      const token= localStorage.getItem("token");
      const NOT_AUTH_MSG = 'Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.';

      if (!token) {
        setError(NOT_AUTH_MSG);
        setLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/scan/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.results || []);
      } else {
        if (response.status === 401) setError(NOT_AUTH_MSG);
        else setError(data.error || 'Erreur inconnue.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion au serveur.');
    }

    setLoading(false);
  };

  const expliquerResultats = async () => {
    setIaExplanation('Chargement de l’explication IA...');
    try {
      const prompt = `Explique les vulnérabilités suivantes de façon simple pour un utilisateur débutant :\n\n${JSON.stringify(results, null, 2)}`;
      const token = localStorage.getItem('token');
      const NOT_AUTH_MSG = 'Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.';

      if (!token) {
        setIaExplanation(NOT_AUTH_MSG);
        return;
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/scan/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: prompt })
      });

      const data = await response.json();
      if (response.status === 401) setIaExplanation(NOT_AUTH_MSG);
      else setIaExplanation(data.message?.content || 'Pas de réponse reçue.');
    } catch (err) {
      console.error(err);
      setIaExplanation('Erreur lors de l’appel à l’IA.');
    }
  };

  return (
    <div className="service-page-wrapper">
      <Header />
      <div className="scan-container">
      <h1 className="scan-title">🔍 Scanner un site web avec Nuclei</h1>

      <form onSubmit={handleScan} className="scan-form">
        <input
          type="text"
          placeholder="https://exemple.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="scan-input"
          disabled={loading}
        />
        <button type="submit" className="scan-button" disabled={loading}>
          {loading ? 'Scan en cours...' : 'Lancer le scan'}
        </button>
      </form>

      {error && <p className="scan-error">❌ {error}</p>}
      {loading && <p className="scan-loader">⏳ Analyse en cours...</p>}

      {!loading && results.length > 0 && (
        <div className="scan-results">
          <h2>📋 Résultats du scan :</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="scan-result-item">
                <strong>{result.templateID}</strong><br />
                <em>{result.info?.name}</em> —{' '}
                <span style={{ color: 'orange' }}>{result.info?.severity}</span><br />
                <code>{result.matched_at || result['matched-at']}</code>
              </li>
            ))}
          </ul>

          <button onClick={expliquerResultats} className="scan-button">
            🧠 Expliquer les résultats avec l’IA
          </button>

          {iaExplanation && (
            <div className="ai-explanation-box">
              <h3>🧠 Explication IA :</h3>
              <pre>{iaExplanation}</pre>
            </div>
          )}
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <p>Aucun résultat pour l'instant. Essayez avec un autre site.</p>
      )}
      </div>
    </div>
  );
};

export default ScanPage;
