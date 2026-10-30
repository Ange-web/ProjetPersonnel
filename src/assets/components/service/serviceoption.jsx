import React from 'react';
import ServiceCard from './servicecard';


const Serviceoption = () => {
  return (
    <div className="card-row">
      <ServiceCard
        title="Scan URL"
        description="Analyse Nuclei limitée aux URL autorisées du laboratoire. Les observations doivent être vérifiées et ne certifient pas la sécurité du site."
        buttonLabel="Analyser une URL"
        redirectPath="/scanurl"
        iconType="url"
      />
      <ServiceCard
        title="Scan de Ports"
        description="Observe les ports TCP accessibles sur une IP de laboratoire depuis le serveur NSPY. Un port ouvert ne prouve pas une faille."
        buttonLabel="Scanner mes ports"
        redirectPath="/scanport"
        iconType="port"
      />
      <ServiceCard
        title="Votre Adresse IP Publique"
        description="Affiche l’adresse IP observée par le serveur NSPY. Aucun test de connectivité ni diagnostic de sécurité n’est réalisé."
        buttonLabel="Voir mon IP"
        redirectPath="/scanip"
        iconType="ip"
      />
      <ServiceCard
        title="Scan des Métadonnées Image"
        description="Lit, modifie certains champs et retire les métadonnées d’une image JPEG ou PNG. Fichiers privés, 5 Mo maximum, disponibles 24 heures."
        buttonLabel="Scan Image"
        redirectPath="/scanexif"
        iconType="exif"
      />

    </div>
  );
};

export default Serviceoption;
