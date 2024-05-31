import React, { useEffect, useState } from 'react';
import './fidsPreview.scss';

const FidsPreview = ({ counter, status, flightNo, std, etd, destination, airlineLogo, isGate }) => {
	const formatTime = () => {
		const currentTime = new Date();
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const dayOfWeek = days[currentTime.getDay()];
		const dayOfMonth = currentTime.getDate().toString().padStart(2, '0');
		const month = months[currentTime.getMonth()];
		const year = currentTime.getFullYear();

		const hours = currentTime.getHours().toString().padStart(2, '0'); // Ensure two digits for hours
		const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes

		return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} - ${hours}:${minutes}`;
	};
	return (
		<div className="card">
			<div className="counter_header">
				<span className="counter_name">
					{isGate ? 'Gate' : 'Counter'} {counter}
				</span>
				<span className="counter_time">{formatTime()}</span>
			</div>
			<div className="icon">
				<img src={airlineLogo} alt="logo" />
			</div>
			{flightNo && (
				<div className="details">
					<div className="info">
						{destination && <div>Destination&nbsp;&nbsp; {destination}</div>}
						{std && <div>Scheduled Departure&nbsp;&nbsp; {std}</div>}
					</div>
					<div className="info">
						<div>Flight&nbsp;&nbsp;{flightNo}</div>
						{etd && <div>Estimated Departure&nbsp;&nbsp;{etd}</div>}
					</div>
				</div>
			)}
			{status && <div className="status">{status}</div>}
		</div>
	);
};

export default FidsPreview;
