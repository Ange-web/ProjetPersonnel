import React from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceIcon from './ServiceIcons';
const ServiceCard = ({ title, description, buttonLabel, redirectPath, iconType, isPrimary = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectPath) {
      navigate(redirectPath);
    }
  };


  const renderIcon = () => {
    return <ServiceIcon type={iconType} />;
  };

  return (
    <div className={`service-card service-card-${iconType}`}>
      <div className="card-content">
        <div className="service-icon-container">
          {renderIcon()}
        </div>
        <h5 className="card-title">{title}</h5>
        <p className="card-description">{description}</p>
        <button className="card-button" onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
