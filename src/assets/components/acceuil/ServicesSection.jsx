import React from 'react';
import ServiceCard from '../service/servicecard';
import './style.css';

const ServicesSection = () => (
  <section className="services">
    <ServiceCard
      iconType="ip"
      title="Évaluation de configuration"
      description="Je teste les paramètres réseau comme les adresses IP et les serveurs DNS de manière simple pour détecter d’éventuelles erreurs ou incohérences dans votre système."
      buttonLabel="En savoir plus"
    />
    <ServiceCard
      iconType="url"
      title="État de la sécurité"
      description="Je vérifie de manière claire et rapide si les mesures de protection (pare-feu, double authentification…) sont bien en place et efficaces."
      buttonLabel="En savoir plus"
    />
    <ServiceCard
      iconType="port"
      title="Scan des ports ouverts"
      description="Je teste les outils pour détecter les services visibles sur Internet et vérifier s’ils présentent des risques potentiels, sans jargon technique."
      buttonLabel="En savoir plus"
    />
  </section>
);

export default ServicesSection;