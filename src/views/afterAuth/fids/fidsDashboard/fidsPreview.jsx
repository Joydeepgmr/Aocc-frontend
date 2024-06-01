import React from 'react';
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
			<div className="header">
				<span className="counter_name">
					{isGate ? 'GATE NO ' : 'CHECK-IN COUNTER '} {counter}
				</span>
			</div>
			<div className="main_body">
				{flightNo ? (
					<>
						<div className="flight_info">
							<div className="flightNo">
								<span>{flightNo}</span>
							</div>
							<div className="airline">
								<img src={airlineLogo} alt="logo" />
							</div>
							<div className="departure_time">
								<div className="std_time">STD: {std ?? ''}</div>
								<div className="std_time">ETD: {etd ?? ''}</div>
							</div>
						</div>
						<div className="destination">{destination}</div>
					</>
				) : (
					<div className="only_logo">
						<img src={airlineLogo} alt="logo" />
					</div>
				)}
			</div>
			{status && (
				<div className="status_header">
					<span className="status">{status}</span>
					<span className="counter_time">{formatTime()}</span>
				</div>
			)}
		</div>
	);
};

export default FidsPreview;
