import React, {useEffect, useRef, useState} from 'react';
import './airlineFids.scss';

const AirlineFids = () => {
  const [status,setStatus] = useState('Available');
  const [flightInfo, setFlightInfo] = useState({
    flightNo: "IX 1596",
    departureTime: "10:25",
    destination: "DEL",
    currentTime: "4:00",
  })

  return (
    <div className="card">
      <div className="icon" >
        <img src='https://logos-download.com/wp-content/uploads/2016/12/Air_India_Express_logo.png' alt='logo'/>
      </div>
      {status && <div className="status">Status : {status}</div>}
      {flightInfo && <div className="details">
        <div className='info'>
          <div>Flight No. : {flightInfo?.flightNo}</div>
          <div>Departure Time : {flightInfo?.departureTime}</div>
        </div>
        <div className='info'>
        <div>Destination: {flightInfo?.destination}</div>
        <div>Time: {flightInfo?.currentTime}</div>
        </div>
      </div>}
    </div>
  );
};

export default AirlineFids;