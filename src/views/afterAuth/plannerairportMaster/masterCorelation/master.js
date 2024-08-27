import React, { useState } from 'react';
import CustomTabs from '../../../../components/customTabs/customTabs';
import ResourceCorelation from './resourceCorelation/resourceCorelation';
import AirlineCorelation from './airlineCorelation/airlineCorelation';

const MasterCorelation = () => {
	const [tab, setTab] = useState('1');
	const handleChange = (key) => {
		setTab(key);
	};
	const items = [
		{
			key: '1',
			label: 'Airline Correlation',
			children: <AirlineCorelation />,
		},
		{
			key: '2',
			label: 'Check-in Correlation',
			children: <ResourceCorelation type='checkin' />,
		},
		{
			key: '2',
			label: 'Gate Correlation',
			children: <ResourceCorelation type='gate' />,
		},
		{
			key: '2',
			label: 'Belt Correlation',
			children: <ResourceCorelation type='belt' />,
		},
	];
	return (
		<div className="">
			<CustomTabs defaultActiveKey={'1'} activeKey={tab} items={items} onChange={handleChange} />
		</div>
	);
};

export default MasterCorelation;
