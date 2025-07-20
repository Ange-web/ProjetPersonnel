// ExifPage.jsx
import React, { useState } from "react";
import axios from "axios";

function ExifPage() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [tag, setTag] = useState("");
  const [value, setValue] = useState("");
  const [filename, setFilename] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:3000/read", formData);
      setMetadata(res.data.metadata);
      setFilename(res.data.file);
    } catch (err) {
      alert("Erreur lors de l'upload");
    }
  };

  const handleEdit = async () => {
    try {
      await axios.post("http://localhost:3000/edit", {
        file: filename,
        tag,
        value,
      });
      alert("Métadonnée modifiée");
    } catch (err) {
      alert("Erreur modification");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.post("http://localhost:3000/delete", {
        file: filename,
      });
      alert("Métadonnées supprimées");
    } catch (err) {
      alert("Erreur suppression");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Éditeur de Métadonnées</h1>

      <form onSubmit={handleUpload} className="mb-4">
        <input type="file" onChange={handleFileChange} required className="mb-2" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Lire Métadonnées
        </button>
      </form>

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
        </div>
      )}
    </div>
  );
}

export default ExifPage;
