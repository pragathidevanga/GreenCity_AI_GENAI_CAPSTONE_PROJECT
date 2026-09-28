import React from 'react';

const IndicatorCard = ({ icon, title, description }) => {
  return (
    <div className="indicator-card card-hover">
      <div className="indicator-icon-box">
        {icon}
      </div>
      <div>
        <h3 className="indicator-title">{title}</h3>
        <p className="indicator-desc">{description}</p>
      </div>
    </div>
  );
};

export default IndicatorCard;
