import React from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import CheckIn from './checkIn/checkIn';
import Gates from './Gates/Gates';
import ParkingStand from './parkingstand/parkingstand';
import Runway from './runway/runway';
import DelayCode from './delaycode/delaycode';
import Taxiway from './taxiway/taxiway';
import BaggageBelt from './baggagebelt/baggagebelt';
import NatureCode from './naturecode/naturecode';
import Terminal from './terminals/terminals';

const Resources = () => {
	const handleChange = () => {
		console.log('Tab switch');
	};
	const items = [
		{
			key: '1',
			label: 'Check In',
			children: <CheckIn />,
		},
		{
			key: '2',
			label: 'Gates',
			children: <Gates />,
		},
		{
			key: '3',
			label: 'Parking Stand',
			children: <ParkingStand />,
		},
		{
			key: '4',
			label: 'Runway',
			children: <Runway />,
		},
		// {
		// 	key: '5',
		// 	label: 'Taxiway',
		// 	children: <Taxiway />,
		// },
		{
			key: '6',
			label: 'Baggage Belt',
			children: <BaggageBelt/>,
		},
		{
			key: '7',
			label: 'Delay Code',
			children: <DelayCode/>,
		},
		{
			key: '8',
			label: 'Nature Code',
			children: <NatureCode />,
		},
		{
			key: '9',
			label: 'Terminals',
			children: <Terminal/>,
		},
	];
	return (
		<div className="">
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
		</div>
	);
};

export default Resources;
