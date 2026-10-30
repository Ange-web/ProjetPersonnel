import { useEffect, useState } from 'react';
import Header from '../acceuil/header';
import { request, download } from '../../../api';
import ScanResultView from '../service/ScanResultView';
import './dashboard.css';
export default function NSPYScanHistoryDashboard() {
  const [scans, setScans] = useState([]), [detail, setDetail] = useState(null), [query, setQuery] = useState('');
  const [error, setError] = useState(''), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [offset, setOffset] = useState(0);
  useEffect(() => {
    let live = true;
    request('/api/scans?limit=50&offset=' + offset).then(data => { if (live) { setScans(data.scans); setDetail(null); setError(''); } }).catch(e => { if (live) setError(e.message); }).finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [offset]);
  async function select(id) { setBusy(true); setDetail(null); setError(''); try { setDetail(await request('/api/scans/' + id)); } catch (e) { setError(e.message); } finally { setBusy(false); } }
  async function report() { setBusy(true); try { await download('/api/scans/' + detail.scan.id + '/report/latest', 'NSPY-analyse-' + detail.scan.id + '.pdf'); } catch (e) { setError(e.message); } finally { setBusy(false); } }
  function exportPage() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(scans, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'NSPY-historique-page.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const filtered = scans.filter(s => (s.target + ' ' + s.tool_type).toLowerCase().includes(query.toLowerCase()));
  const TOOL = { url: 'Scan d’URL', port: 'Scan de ports', ip: 'Adresse IP', exif: 'Métadonnées EXIF' };
  const STATUS = { success: 'Terminée', failed: 'Échec', running: 'En cours' };
  const selectedId = detail?.scan?.id;
  return <><Header /><main className="hist-main">
    <header className="hist-header">
      <div><h1>Mes analyses</h1><p className="hist-sub">Observations personnelles. Ces résultats ne constituent pas une certification de sécurité.</p></div>
      <div className="hist-tools">
        <label className="hist-search">Rechercher dans cette page<input className="scan-input" type="search" value={query} onChange={e => setQuery(e.target.value)} /></label>
        <button className="nspy-btn-outline" onClick={exportPage} disabled={!scans.length}>Exporter cette page</button>
      </div>
    </header>
    {error && <p role="alert" className="scan-error">{error}</p>}{loading && <p role="status">Chargement…</p>}
    <div className="hist-layout"><section className="hist-list" aria-label="Liste des analyses">
      {!loading && !filtered.length && <p className="hist-empty">Aucune analyse à afficher.</p>}
      <ul>{filtered.map(s => <li key={s.id}><button type="button" className={'hist-row' + (s.id === selectedId ? ' is-selected' : '')} aria-pressed={s.id === selectedId} disabled={busy} onClick={() => select(s.id)}>
        <span className="hist-tool">{TOOL[s.tool_type] || s.tool_type}</span>
        <strong className="hist-target">{s.target}</strong>
        <span className="hist-date">{new Date(s.created_at).toLocaleString('fr-FR')}</span>
        <span className={'hist-status st-' + s.status}>{STATUS[s.status] || s.status}</span>
        <span className={'hist-badge sev-' + s.severity}>{s.severity}</span>
      </button></li>)}</ul>
      <div className="hist-pager"><button className="nspy-btn-outline" disabled={offset === 0 || loading} onClick={() => { setLoading(true); setOffset(Math.max(0, offset - 50)); }}>Précédent</button>
        <span>Page {Math.floor(offset / 50) + 1}</span><button className="nspy-btn-outline" disabled={scans.length < 50 || loading} onClick={() => { setLoading(true); setOffset(offset + 50); }}>Suivant</button></div>
    </section><section className="hist-detail" aria-label="Détail de l’analyse" aria-live="polite">
      {busy && <p>Chargement…</p>}{detail ? <div className="nspy-preview"><ScanResultView result={detail} /><button className="nspy-btn-primary" disabled={busy} onClick={report}>Télécharger le rapport PDF</button></div> : <p className="hist-empty">Sélectionnez une analyse pour voir les observations.</p>}
    </section></div>
  </main></>;
}
