import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomTabs from '../../../components/customTabs/customTabs';
import TopHeader from '../../../components/topHeader/topHeader';
import "../../../styles/sass/_utils.scss";
import "../../../styles/sass/_variables.scss";
import FlightSchedule from './components/FlightSchedule';
import Milestone from './components/Milestone';
import TelexMessage from './components/TelexMessage';
import './dashboard.scss';

export const Dashboard = () => {
	const { state } = useLocation();
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

	return (
		<div className='container-div'>
			{/* <div className='container-head'>
				<TopHeader heading='Flight Information' subHeading='Access information regarding your airlines and track milestones.' />
			</div> */}
			<div className='main-container'>
				<CustomTabs defaultActiveKey={state?.tab ?? '1'} items={items} onChange={handleChange} type='card' />
			</div>
		</div>
	);
};

export default Dashboard;
