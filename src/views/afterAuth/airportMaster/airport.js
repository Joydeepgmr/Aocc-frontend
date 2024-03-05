import React, { useState } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import './airport.scss';
import Aircrafts from './components/aircraft/aircraft';

const AirportMaster = () => {
	const [index, setIndex] = useState(0);
	const items = [
		{
			key: '1',
			label: 'Aircrafts',
			children: <Aircrafts/>,
		},
		{
			key: '2',
			label: 'Aircrafts',
			children: '',
		},
		{
			key: '3',
			label: 'Airlines',
			children: '',
		},
		{
			key: '4',
			label: 'Resources',
			children: '',
		},
		{
			key: '5',
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
					className="header-style"
					heading={'Airport Reference Data'}
					subHeading={'Overview of airport reference data'}
					searchBox={false}
				/>
				<div className="tabs">
					<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} type="card" />
				</div>
			</div>
		</>
	);
};

export default React.memo(AirportMaster);
