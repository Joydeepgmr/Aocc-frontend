import React from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import { items } from './aircraftTabsData';

const AircraftTabs = () => {
	return (
		<div>
			<CustomTabs defaultActiveKey="1" items={items} />
		</div>
	);
};

export default AircraftTabs;
