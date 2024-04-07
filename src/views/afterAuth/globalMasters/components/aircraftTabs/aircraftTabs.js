import React from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import AircraftRegistrationTab from '../aircraftRegistrationTab/aircraftRegistrationTab';
import AircraftTypeTab from '../aircraftTypeTab/aircraftTypeTab';


const AircraftTabs = () => {
	const items = [
		{
			key: '1',
			label: 'Aircraft Type',
			children: (
				<AircraftTypeTab />
			),
		},
		{
			key: '2',
			label: 'Aircraft Registration',
			children: (
				<AircraftRegistrationTab />
			),
		},
	];
	return (
		<div>
			<CustomTabs defaultActiveKey="1" items={items} />
		</div>
	);
};

export default AircraftTabs;