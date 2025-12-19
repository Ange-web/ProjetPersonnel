import React from 'react';
import './style.css';
import { AcceuilServiceIcon } from './AppIcons';

const ServiceCard = ({ icon, title, description }) => (
  <div className="service-card">
    <div className="service-icon">
      {icon === "configuration-image" && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/6671/6671901.png"
          alt="Icône Évaluation de configuration"
          className="service-icon-img"
        />
      )}
      {icon === "⚙️" && (
        <AcceuilServiceIcon type="gear" />
      )}
      {icon === "etat-configuration-image" && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/4115/4115372.png"
          alt="Icône État de la configuration"
          className="service-icon-img"
        />
      )}
      {icon === "🛡️" && (
        <AcceuilServiceIcon type="shield" />
      )}
      {icon === "🔍" && (
        <AcceuilServiceIcon type="search" />
      )}
      {icon === "portscan-image" && (
        <img
          src="https://img.icons8.com/?size=512&id=83lQoaxcNkjG&format=png"
          alt="Icône Port Ethernet"
          className="service-icon-img"
        />
      )}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default ServiceCard;