import React from 'react';
import ServiceCard from './servicecard';


const Serviceoption = () => {
  return (
    <div className="card-row">
      <ServiceCard
        title="Scan URL"
        description="Détection des Failles Critiques. Analyse automatique de votre URL pour les injections SQL et les failles XSS. Le Bouclier de votre Site en un Clic."
        buttonLabel="Analyser une URL"
        redirectPath="/scanurl"
        iconType="url"
        isPrimary={true}
      />
      <ServiceCard
        title="Scan de Ports"
        description="Audit Réseau Rapide. Identifie les ports ouverts sur votre machine pour sécuriser vos services accessibles à l'extérieur. Détecte les failles potentielles."
        buttonLabel="Scanner mes ports"
        redirectPath="/scanport"
        iconType="port"
        isPrimary={false}
      />
      <ServiceCard
        title="Votre Adresse IP Publique"
        description="Connaissance de votre Identité Réseau. Affiche votre IP publique. Intègre les tests de connectivité et la vérification de votre identité réseau."
        buttonLabel="Voir mon IP"
        redirectPath="/scanip"
        iconType="ip"
        isPrimary={false}
      />
      <ServiceCard
        title="Scan des Métadonnées Image"
        description="Analyse Forensique Légère. Affiche les métadonnées cachées (EXIF) des images pour identifier l'appareil, la localisation et la date de capture."
        buttonLabel="Scan Image"
        redirectPath="/scanexif"
        iconType="exif"
        isPrimary={false}
      />

    </div>
  );
};

export default Serviceoption;
