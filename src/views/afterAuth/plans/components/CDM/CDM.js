import React from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import CDMSchedule from './components/CDMSchedule/CDMSchedule';
import './CDM.scss';
import ResourceAllocation from './components/resourceAllocation/resourceAllocation';

const CDM = () => {
	const items = [
		{
			key: '1',
			label: 'Flight Schedule',
			children: <CDMSchedule />,
		},
		{
			key: '2',
			label: 'Resource Allocation',
			children: <ResourceAllocation />,
		},
	];

	const handleChange = () => {
	};

	return (
		<div className="mainHead">
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
		</div>
	);
};

export default CDM;
