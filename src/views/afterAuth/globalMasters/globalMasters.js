import React, { useState } from 'react';
import CustomTabs from '../../../components/customTabs/customTabs';
import TopHeader from '../../../components/topHeader/topHeader';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineTab from './components/airlineTab/airlineTab';
import AirportTab from './components/airportTab/airportTab';
import './globalMasters.scss';

const GlobalMasters = () => {
	const [activeTab, setActiveTab] = useState('1');
	const items = [
		{
			key: '1',
			label: 'Airports',
			children: (
				<AirportTab />
			),
		},
		{
			key: '2',
			label: 'Aircrafts',
			children: <AircraftTabs />,
		},
		{
			key: '3',
			label: 'Airlines',
			children: (
				<AirlineTab />
			),
		},
	];
	return (
		<div className="global_masters_container">
			<div className="global_master_header">
				<TopHeader heading="Global Reference Data" subHeading="overview of global reference data" />
			</div>
			<div>
				<CustomTabs defaultActiveKey="1" items={items} type="card" />
			</div>
		</div>
	);
};

export default GlobalMasters;