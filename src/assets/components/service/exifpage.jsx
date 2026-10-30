import { useEffect, useState } from 'react';
import Header from '../acceuil/header';
import { request, download } from '../../../api';
import './ExifPage.css';
export default function ExifPage() {
  const [file, setFile] = useState(null), [preview, setPreview] = useState(''), [result, setResult] = useState(null);
  const [tag, setTag] = useState('Artist'), [value, setValue] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('');
  useEffect(() => { if (!file) return; const url = URL.createObjectURL(file); setPreview(url); return () => URL.revokeObjectURL(url); }, [file]);
  async function action(e, kind) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      if (kind === 'read') {
        if (!file || file.size > 5 * 1024 * 1024) throw new Error('Choisissez une image JPEG ou PNG de 5 Mo maximum.');
        const body = new FormData(); body.append('image', file); setResult(await request('/scan/exif/read', { method: 'POST', body }));
      } else if (kind === 'download') await download('/scan/exif/download/' + result.storedName, result.originalName);
      else if (kind === 'remove') { await request('/scan/exif/' + result.storedName, { method: 'DELETE' }); setResult(null); }
      else setResult(await request('/scan/exif/' + kind, { method: 'POST', body: JSON.stringify({ storedName: result.storedName, ...(kind === 'edit' ? { tag, value } : {}) }) }));
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return <div className="service-page-wrapper"><Header /><main className="exif-page"><div className="exif-container">
    <h1 className="exif-title">Éditeur de métadonnées EXIF</h1><p>JPEG ou PNG, 5 Mo maximum. Fichiers privés disponibles pendant 24 heures.</p>
    <form onSubmit={e => action(e, 'read')} className="exif-upload-section"><label htmlFor="exif-file">Image à analyser</label>
      <input id="exif-file" type="file" accept="image/jpeg,image/png" required disabled={busy} onChange={e => { setFile(e.target.files[0] || null); setResult(null); }} />
      <button className="exif-btn btn-primary" disabled={busy}>Analyser l’image</button></form>
    {error && <p role="alert">{error}</p>}{busy && <p role="status">Traitement en cours…</p>}
    {preview && <img src={preview} alt="Aperçu de l’image sélectionnée avant modification" className="exif-preview-img" />}
    {result && <section className="exif-actions"><h2>Métadonnées du fichier enregistré</h2><pre className="exif-data-box">{JSON.stringify(result.metadata, null, 2)}</pre>
      <form onSubmit={e => action(e, 'edit')} className="exif-edit-controls"><label>Champ à modifier<select value={tag} onChange={e => setTag(e.target.value)}>{['Artist', 'Copyright', 'ImageDescription', 'Comment'].map(t => <option key={t}>{t}</option>)}</select></label>
        <label>Nouvelle valeur<input className="exif-input" value={value} maxLength={500} onChange={e => setValue(e.target.value)} /></label><button className="exif-btn btn-success" disabled={busy}>Enregistrer</button></form>
      <button className="exif-btn btn-danger" disabled={busy} onClick={e => action(e, 'delete')}>Retirer les métadonnées</button>
      <button className="exif-btn btn-download" disabled={busy} onClick={e => action(e, 'download')}>Télécharger le fichier actuel</button>
      <button className="exif-btn btn-danger" disabled={busy} onClick={e => action(e, 'remove')}>Supprimer le fichier du serveur</button>
      <p>L’aperçu montre l’image d’origine. Téléchargez le fichier pour voir la version modifiée. Certains champs techniques nécessaires à l’image subsistent.</p>
    </section>}
  </div></main></div>;
}
