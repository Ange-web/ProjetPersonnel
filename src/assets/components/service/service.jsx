import React, { useState } from 'react';
import Header from '../acceuil/header';
const ScanPage = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('http://localhost:3000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data.results || []);
      } else {
        setError(data.error || 'Erreur inconnue.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion au serveur.');
    }

    setLoading(false);
  };

  return (

    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <Header/>
      <h1>🔍 Scanner un site web avec Nuclei</h1>

      <form onSubmit={handleScan} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="https://exemple.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '300px',
            marginRight: '1rem'
          }}
          disabled={loading}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }} disabled={loading}>
          {loading ? 'Scan en cours...' : 'Lancer le scan'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {loading && <p>⏳ Analyse en cours...</p>}

      {!loading && results.length > 0 && (
        <div>
          <h2>📋 Résultats du scan :</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>{result.templateID}</strong><br />
                <em>{result.info?.name}</em> —{' '}
                <span style={{ color: 'orange' }}>{result.info?.severity}</span><br />
                <code>{result.matched_at || result['matched-at']}</code>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && results.length === 0 && (
        <p>Aucun résultat pour l’instant. Essayez avec un autre site.</p>
      )}
    </div>
  );
};

export default ScanPage;
