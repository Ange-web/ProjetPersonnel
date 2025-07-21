import React from 'react';
import ServiceCard from './servicecard'; // adapte le chemin si nécessaire


const Serviceoption = () => {
  return (
    <div className="card-row">
      <ServiceCard
        title="Scan Url"
        description="Analyse automatiquement une URL pour détecter les failles potentielles comme les injections SQL ou les failles XSS. Parfait pour vérifier la sécurité de votre site en un clic."
        buttonLabel="Analyser une URL"
        redirectPath="/scanurl"
      />
      <ServiceCard
      title="Scan port"
      description="Identifie rapidement les ports ouverts sur votre machine. Utile pour savoir quels services sont accessibles depuis l’extérieur et détecter d’éventuelles failles."
      buttonLabel="Scanner mes ports"
      redirectPath="/scanport"
      />
      <ServiceCard
       title="Votre adresse IP"
       description="Affiche l’adresse IP publique de votre appareil. Utile pour connaître votre identité réseau sur Internet ou pour des tests de connectivité."
       buttonLabel="Voir mon IP"
      redirectPath="/scanip"
      />
      <ServiceCard
      title="scan image"
      description="afficher les metadonnés des images "
      buttonLabel="scan image"
      redirectPath="/scanexif"
      />

    </div>
  );
};

export default Serviceoption;
