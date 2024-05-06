import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomTabs from '../../../components/customTabs/customTabs';
import CDMSchedule from './components/CDM/components/CDMSchedule/CDMSchedule';
import ResourceAllocation from './components/CDM/components/resourceAllocation/resourceAllocation';
import Seasonal from './components/seasonal/seasonal';
import './plans.scss';
import { addArrival } from './redux/planReducer';

const Plans = () => {
	const { state } = useLocation();
	const [index, setIndex] = useState('1');
	const [tab, setTab] = useState('seasonal');
	const planTabItems = [
		{
			key: '1',
			label: 'Seasonal',
			children: <Seasonal action={addArrival} tab={tab} />,
		},
		{
			key: '2',
			label: 'Flight Schedule',
			children: <CDMSchedule tab={'dailyOps'} />,
		},
		{
			key: '3',
			label: 'Resource Allocation',
			children: <ResourceAllocation />,
		},
	];

	const handleChange = (key) => {
		setIndex(key);
		key === '1' && setTab('seasonal');
		key === '2' && setTab('dailyOps');
	};
	return (
		<>
			<div className="box">
				<CustomTabs
					defaultActiveKey={state?.tab ?? index}
					items={planTabItems}
					onChange={handleChange}
					type="card"
					destroyInactiveTabPane={false}
				/>
			</div>
		</>
	);
};

export default Plans;
