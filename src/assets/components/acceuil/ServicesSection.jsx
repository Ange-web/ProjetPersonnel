import React from 'react';
import ServiceCard from './ServiceCard';
import './style.css';

const ServicesSection = () => (
  <section className="services">
    <ServiceCard
      icon="configuration-image"
      title="Évaluation de configuration"
      description="Je teste les paramètres réseau comme les adresses IP et les serveurs DNS de manière simple pour détecter d’éventuelles erreurs ou incohérences dans votre système."
    />
    <ServiceCard
      icon="🛡️"
      title="État de la sécurité"
      description="Je vérifie de manière claire et rapide si les mesures de protection (pare-feu, double authentification…) sont bien en place et efficaces."
    />
    <ServiceCard
      icon="🔍"
      title="Scan des ports ouverts"
      description="Je teste les outils pour détecter les services visibles sur Internet et vérifier s’ils présentent des risques potentiels, sans jargon technique."
    />
  </section>
);

export default ServicesSection;