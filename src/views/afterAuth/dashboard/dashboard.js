import React from 'react';
import CustomTabs from '../../../components/customTabs/customTabs';
import TopHeader from '../../../components/topHeader/topHeader';
import "../../../styles/sass/_utils.scss";
import "../../../styles/sass/_variables.scss";
import FlightSchedule from './components/FlightSchedule';
import GraphCard from './components/GraphCard';
import Milestone from './components/Milestone';
import ProgressionCard from './components/ProgressionCard';
import TelexMessage from './components/TelexMessage';
import './dashboard.scss';
import Alerts from './components/Alerts';

export const Dashboard = () => {
	const handleChange = () => {
		console.log('Tab switch');
	};

	const items = [
		{
			key: '1',
			label: 'Flight Schedule',
			children: <FlightSchedule />,
		},
		{
			key: '2',
			label: 'Milestone',
			children: <Milestone />,
		},
		// {
		// 	key: '3',
		// 	label: 'Map View',
		// 	children: <MapView />,
		// },
		{
			key: '4',
			label: 'Telex Messaging Gateway',
			children: <TelexMessage />,
		},
	]

	const airlineData = [
		{
			name: "Airline 1",
			percent: 80
		},
		{
			name: "Airline 2",
			percent: 60
		},
		{
			name: "Airline 3",
			percent: 50
		},
	]

	return (
		<div className='container-div'>
			<div className='widgets-container'>
				<div className='airport-info'>
					<ProgressionCard cardTitle="On Time Performer" airlineData={airlineData} />
					<ProgressionCard cardTitle="Aircraft parking stand" airlineData={airlineData} />
				</div>
				<div className='airport-info'>
					<GraphCard cardTitle="Air Traffic Movement" />
					<GraphCard cardTitle="Number of flights on Ground" />
				</div>
				<div className='airport-info'>
					<GraphCard cardTitle="Runway Utilization" />
					<GraphCard cardTitle="CO2 Emission" />
				</div>
				<div className='airport-info'>
					<Alerts />
				</div>
			</div>
			<TopHeader heading='Flight Information' subHeading='Access information regarding your airlines and track milestones.' />
			<div className='main-container'>
				<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
			</div>
		</div>
	);
};

export default Dashboard;
