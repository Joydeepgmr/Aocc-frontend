import React from 'react';
import CustomTabs from '../../../../components/customTabs/customTabs';
import CheckIn from '../components/resource/checkIn/checkIn';
import ResourceCorelation from './resourceCorelation/resourceCorelation';
import CustomRules from './customRules/customrules';

const MasterCorelation = () => {
	const handleChange = () => {
		console.log('Tab switch');
	};
	const items = [
		{
			key: '1',
			label: 'Resource Correlation',
			children: <ResourceCorelation />,
		},
		{
			key: '2',
			label: 'Custom Rules',
			children: <CustomRules />,
		},
	];
	return (
		<div className="">
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
		</div>
	);
};

export default MasterCorelation;
