import { useState } from 'react';
import Header from '../acceuil/header';
import { request } from '../../../api';
import ScanResultView from './ScanResultView';
import './scanPage.css';
import './PortScanPage.css';
export default function NetworkScan({ kind }) {
  const isUrl = kind === 'url';
  const [target, setTarget] = useState(''), [ports, setPorts] = useState('22,80,443');
  const [result, setResult] = useState(null), [error, setError] = useState(''), [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault(); setLoading(true); setError(''); setResult(null);
    try {
      const list = ports.split(',').map(p => Number(p.trim()));
      if (!isUrl && (!list.length || list.length > 32 || list.some(p => !Number.isInteger(p) || p < 1 || p > 65535))) throw new Error('Indiquez de 1 à 32 ports entiers, entre 1 et 65535.');
      setResult(await request('/scan/' + kind, { method: 'POST', body: JSON.stringify(isUrl ? { url: target } : { type: 'public', ip: target, ports: list }) }));
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }
  return <div className="service-page-wrapper"><Header /><main className="scan-container">
    <h1 className="scan-title">{isUrl ? 'Scanner un site web avec Nuclei' : 'Scanner des ports TCP'}</h1>
    <p>Les analyses sont limitées aux cibles du laboratoire configurées sur le serveur et autorisées par leur propriétaire.</p>
    {!isUrl && <p>L’analyse part du serveur NSPY. Elle ne scanne pas le réseau local de votre ordinateur.</p>}
    <form onSubmit={submit} className="scan-form">
      <label htmlFor="scan-target">{isUrl ? 'URL autorisée' : 'Adresse IP autorisée'}</label>
      <input className="scan-input" id="scan-target" type={isUrl ? 'url' : 'text'} required maxLength={2048} placeholder={isUrl ? 'https://votre-laboratoire.example/' : 'IP du laboratoire'} value={target} onChange={e => setTarget(e.target.value)} disabled={loading} />
      {!isUrl && <><label htmlFor="scan-ports">Ports séparés par des virgules</label><input className="scan-input" id="scan-ports" required value={ports} onChange={e => setPorts(e.target.value)} disabled={loading} /></>}
      <button className="scan-button" disabled={loading}>{loading ? 'Analyse en cours…' : 'Lancer l’analyse'}</button>
    </form>
    {error && <p role="alert" className="scan-error">{error}</p>}
    {loading && <p role="status">Analyse en cours. Elle peut durer jusqu’à 30 secondes.</p>}
    {result && <><ScanResultView result={result} /><p>Aucune analyse automatique ne peut garantir l’absence de vulnérabilités. Un port accessible n’est pas une vulnérabilité à lui seul.</p></>}
  </main></div>;
}
