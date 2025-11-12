import React, { useState } from "react";
import axios from "axios";
import Header from "../acceuil/header";

function ExifPage() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [tag, setTag] = useState("");
  const [value, setValue] = useState("");
  const [storedName, setStoredName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const NOT_AUTH_MSG = "Merci de vous connecter ou vous reconnecter afin d'accéder à l'outil.";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
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
      setMetadata(res.data.metadata);
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
      <Header/>
      <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Éditeur de Métadonnées</h1>

      <form onSubmit={handleUpload} className="mb-4">
        <input type="file" onChange={handleFileChange} required className="mb-2" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Lire Métadonnées
        </button>
      </form>

      {previewUrl && (
        <div className="mb-4">
          <img 
            src={previewUrl} 
            alt="Aperçu" 
            className="max-w-full h-auto rounded shadow" 
            style={{ maxWidth: "500px", maxHeight: "500px" }}
            key={previewUrl}
          />
        </div>
      )}

      {metadata && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Métadonnées :</h2>
          <pre className="bg-gray-100 p-2 overflow-x-auto mb-4">
            {JSON.stringify(metadata, null, 2)}
          </pre>

          <div className="mb-2">
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Tag (ex: Artist)"
              className="border p-2 mr-2"
            />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Valeur"
              className="border p-2 mr-2"
            />
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Modifier
            </button>
          </div>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Supprimer toutes les métadonnées
          </button>

          {storedName && (
            <div className="mt-4">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Télécharger le fichier modifié
              </button>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

export default ExifPage;
