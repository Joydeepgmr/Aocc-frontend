import React from 'react';
import './style.scss';
import Alerts from './Alerts';
import ProgressionCard from './ProgressionCard';
import GraphCard from './GraphCard';

const Widgets = () => {
	const airlineData = [
		{
			name: 'Airline 1',
			percent: 80,
		},
		{
			name: 'Airline 2',
			percent: 60,
		},
		{
			name: 'Airline 3',
			percent: 50,
		},
	];
	return (
		<div className="widgets-container">
			<div className="airport-info">
				<ProgressionCard cardTitle="On Time Performer" airlineData={airlineData} />
				<ProgressionCard cardTitle="Aircraft parking stand" airlineData={airlineData} />
			</div>
			<div className="airport-info">
				<GraphCard cardTitle="Air Traffic Movement" />
				<GraphCard cardTitle="Number of flights on Ground" />
			</div>
			<div className="airport-info">
				<GraphCard cardTitle="Runway Utilization" />
				<GraphCard cardTitle="CO2 Emission" />
			</div>
			<div className="airport-info">
				<Alerts />
			</div>
		</div>
	);
};

export default Widgets;
