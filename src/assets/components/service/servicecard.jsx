import React from 'react';
import { useNavigate } from 'react-router-dom';


const ServiceCard = ({ title, description, buttonLabel, redirectPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectPath) {
      navigate(redirectPath);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon"></div>
        <div className="card-title">{title}</div>
      </div>
      <div className="card-description">{description}</div>
      <div className="card-footer">
        <button className="card-button" onClick={handleClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
