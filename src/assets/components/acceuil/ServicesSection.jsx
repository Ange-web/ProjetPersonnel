import React from 'react';
import ServiceCard from '../service/servicecard';
import './style.css';

const ServicesSection = () => (
  <section className="services">
    <ServiceCard
      iconType="ip" redirectPath="/scanip"
      title="Votre adresse IP"
      description="Affichez l’adresse IP observée par le serveur. Cet outil ne vérifie pas votre configuration DNS."
      buttonLabel="En savoir plus"
    />
    <ServiceCard
      iconType="url" redirectPath="/scanurl"
      title="Analyse d’une URL autorisée"
      description="Lancez Nuclei sur une cible du laboratoire autorisé. Les observations nécessitent une vérification humaine."
      buttonLabel="En savoir plus"
    />
    <ServiceCard
      iconType="port" redirectPath="/scanport"
      title="Scan des ports ouverts"
      description="Observez les ports TCP accessibles d’une IP autorisée. Un port ouvert ne constitue pas à lui seul une vulnérabilité."
      buttonLabel="En savoir plus"
    />
  </section>
);

export default ServicesSection;