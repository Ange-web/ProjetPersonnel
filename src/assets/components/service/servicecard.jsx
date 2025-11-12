import React from 'react';
import { useNavigate } from 'react-router-dom';


const ServiceCard = ({ title, description, buttonLabel, redirectPath, iconType, isPrimary = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h5 className="card-title">{title}</h5>
        <p className="card-description">{description}</p>
        <button className={`card-button ${isPrimary ? 'card-button-primary' : 'card-button-secondary'}`} onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
