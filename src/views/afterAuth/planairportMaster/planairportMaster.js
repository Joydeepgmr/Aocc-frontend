import React, { useState } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import Aircrafts from './components/aircraft/aircraft';
import Airlines from './components/airlines/airlines';
import CustomTabs from '../../../components/customTabs/customTabs';
import './planairportMaster.scss';
import Resources from './components/resource/resource';

const PlanAirportMaster = () => {
	const [index, setIndex] = useState(0);
	const items = [
		{
			key: '1',
			label: 'Aircrafts',
			children: <Aircrafts />,
		},
		{
			key: '2',
			label: 'Airlines',
			children: <Airlines />,
		},
		{
			key: '3',
			label: 'Resources',
			children:<Resources/>,
		},
		{
			key: '4',
			label: 'Master Correlation',
			children: '',
		},
	];
	const [loading, setLoading] = useState(false);
	const handleChange = (key) => {
		setIndex(key);
	};
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};

	return (
		<>
			<div className="container-style">
				<TopHeader
					className="header-box"
					heading={'Airport Reference Data'}
					subHeading={'Overview of airport reference data'}
					searchBox={false}
					condition={false}
				/>
				<div className="tabs">
					<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} type="card" />
				</div>
			</div>
		</>
	);
};

export default React.memo(PlanAirportMaster);
