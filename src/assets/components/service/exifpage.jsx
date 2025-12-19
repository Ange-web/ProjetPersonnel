import React, { useState } from "react";
import axios from "axios";
import Header from "../acceuil/header";
import ScanResultView from './ScanResultView';
import "./ExifPage.css";
import ServiceIcon from './ServiceIcons';

function ExifPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [tag, setTag] = useState("");
  const [value, setValue] = useState("");
  const [storedName, setStoredName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const NOT_AUTH_MSG = "Merci de vous connecter ou vous reconnecter afin d'accéder à l'outil.";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      setScanResult(null);
      setMetadata(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      if (!token) { alert(NOT_AUTH_MSG); return; }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/scan/exif/read`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );


      if (res.data.scan) {
        setScanResult(res.data);
        setMetadata(res.data.metadata);
      } else {

        setMetadata(res.data.metadata);
        setScanResult(null);
      }

      const name = res.data.storedName || res.data.file;
      setStoredName(name);

      if (res.data.imageUrl) {
        setPreviewUrl(`${import.meta.env.VITE_API_URL}${res.data.imageUrl}`);
      }
      if (res.data.downloadUrl) {
        setDownloadUrl(`${import.meta.env.VITE_API_URL}${res.data.downloadUrl}`);
      }
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) alert("Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.");
      else alert("❌ Erreur lors de l'upload");
    }
  };

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { alert(NOT_AUTH_MSG); return; }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/scan/exif/edit`,
        {
          storedName,
          tag,
          value,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.imageUrl) {
        const ts = Date.now();
        setPreviewUrl(`${import.meta.env.VITE_API_URL}${res.data.imageUrl}?ts=${ts}`);
      }
      if (res.data.downloadUrl) {
        setDownloadUrl(`${import.meta.env.VITE_API_URL}${res.data.downloadUrl}`);
      }

      alert("✅ Métadonnée modifiée");
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) alert("Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.");
      else alert("❌ Erreur lors de la modification");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour supprimer les métadonnées.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/scan/exif/delete`,
        { storedName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.refreshUrl) {
        setPreviewUrl(`${import.meta.env.VITE_API_URL}${data.refreshUrl}`);
      } else if (data.imageUrl) {
        const ts = Date.now();
        setPreviewUrl(`${import.meta.env.VITE_API_URL}${data.imageUrl}?ts=${ts}`);
      }

      if (data.downloadUrl) {
        setDownloadUrl(`${import.meta.env.VITE_API_URL}${data.downloadUrl}`);
      }

      alert("✅ Métadonnées supprimées");
      setMetadata({});
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 401) alert("Merci de vous connecter ou vous reconnecter afin d’accéder à l’outil.");
      else alert("❌ Erreur lors de la suppression");
    }
  };

  const handleDownload = async () => {
    if (!storedName) {
      alert("Aucun fichier à télécharger.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour télécharger.");
      return;
    }

    try {
      const url = downloadUrl || `${import.meta.env.VITE_API_URL}/scan/exif/download/${encodeURIComponent(storedName)}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        alert(NOT_AUTH_MSG);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Erreur lors du téléchargement.');
        return;
      }

      const blob = await res.blob();
      const url_blob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url_blob;
      a.download = storedName || 'fichier-modifie';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url_blob);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Erreur lors du téléchargement:", err);
      alert("❌ Erreur lors du téléchargement");
    }
  };

  return (
    <div className="service-page-wrapper">
      <Header />
      <div className="exif-page">
        <div className="exif-container">
          <h1 className="exif-title">
            <ServiceIcon type="exif" className="title-icon" width="32" height="32" strokeWidth="3" />
            Éditeur de Métadonnées (Exif)
          </h1>

          <form onSubmit={handleUpload} className="exif-upload-section">
            <input type="file" onChange={handleFileChange} required className="exif-file-input" />
            <button type="submit" className="exif-btn btn-primary">
              📸 Analyser l'image
            </button>
          </form>

          {previewUrl && (
            <div className="exif-preview-wrapper">
              <img
                src={previewUrl}
                alt="Aperçu"
                className="exif-preview-img"
                key={previewUrl}
              />
            </div>
          )}

          {scanResult && (
            <div style={{ marginBottom: '2rem' }}>
              <ScanResultView result={scanResult} />
            </div>
          )}

          {metadata && (
            <div className="exif-actions">
              <h2 className="exif-subtitle">📊 Métadonnées détectées :</h2>
              <pre className="exif-data-box">
                {JSON.stringify(metadata, null, 2)}
              </pre>

              <h2 className="exif-subtitle">✏️ Modifier :</h2>
              <div className="exif-edit-controls">
                <input
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="Tag (ex: Artist)"
                  className="exif-input"
                />
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Valeur"
                  className="exif-input"
                />
                <button onClick={handleEdit} className="exif-btn btn-success">
                  Enregistrer
                </button>
              </div>

              <button onClick={handleDelete} className="exif-btn btn-danger btn-full">
                🗑️ Supprimer toutes les métadonnées
              </button>

              {storedName && (
                <button onClick={handleDownload} className="exif-btn btn-download">
                  💾 Télécharger le fichier modifié
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExifPage;
