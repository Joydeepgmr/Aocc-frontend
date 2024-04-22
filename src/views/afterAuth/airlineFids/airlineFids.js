import React from 'react';
import './airlineFids.scss';

const AirlineFids = () => {
  return (
    <div className="card">
      <div className="icon"></div>
      <div className="status">Status</div>
      <div className="details">
        <div className="destination">Destination</div>
        <div className="departure-time">Departure Time</div>
      </div>
    </div>
  );
};

export default AirlineFids;
