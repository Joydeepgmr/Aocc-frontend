import React from 'react';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import CheckIn from './checkIn/checkIn';

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
			children: <CheckIn />,
		},
		{
			key: '3',
			label: 'Parking Stand',
			children: <CheckIn />,
		},
		{
			key: '4',
			label: 'Runway',
			children: <CheckIn />,
		},
		{
			key: '6',
			label: 'Baggage Belt',
			children: <CheckIn />,
		},
		{
			key: '7',
			label: 'Delay Code',
			children: <CheckIn />,
		},
		{
			key: '8',
			label: 'Nature Code',
			children: <CheckIn />,
		},
		{
			key: '9',
			label: 'Terminals',
			children: <CheckIn />,
		},
	];
	return (
		<div className="">
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
		</div>
	);
};

export default Resources;
