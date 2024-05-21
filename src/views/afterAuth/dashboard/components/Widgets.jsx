import React from 'react';
import GraphCard from './GraphCard';
import ProgressionCard from './ProgressionCard';
import './style.scss';

const Widgets = () => {
	const airlineData = [
		{
			name: 'Air India',
			percent: 80,
		},
		{
			name: 'Vistara',
			percent: 60,
		},
		{
			name: 'Indigo',
			percent: 50,
		},
	];
	return (
		<div className="widgets-containers">
			<ProgressionCard cardTitle="On Time Performer" airlineData={airlineData} />
			<GraphCard cardTitle="Air Traffic Movement" />
			<GraphCard cardTitle="Number of flights on Ground" />
			<ProgressionCard cardTitle="Aircraft parking stand" airlineData={airlineData} />
			<GraphCard cardTitle="Runway Utilization" />
			<GraphCard cardTitle="CO2 Emission" />
		</div>
	);
};

export default Widgets;
