import React from 'react';
import './dashboard.scss';
import "../../../styles/sass/_variables.scss"
import "../../../styles/sass/_utils.scss"
import { Col, Row } from 'antd';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import TableComponent from '../../../components/table/table';
import CustomTabs from '../../../components/customTabs/customTabs';
import MultiSelectComponent from '../../../components/multiSelectComponent/multiSelectComponent';
import FlightSchedule from './components/FlightSchedule';

export const Dashboard = () => {
	const handleChange = () => {
		console.log('Tab switch');
	};

	const items = [
		{
			key: '1',
			label: 'Flight Schedule',
			children: <FlightSchedule/>,
		},
		{
			key: '2',
			label: 'Milestone',
			children: <><h1>Hello 2</h1></>,
		},
		{
			key: '3',
			label: 'Map View',
			children: <><h1>Hello 3</h1></>,
		},
		{
			key: '4',
			label: 'Telex Messaging Gateway',
			children: <><h1>Hello 4</h1></>,
		},
	]

	return( 
	<div className='container-div'>
		<div className='top-div'>
		<div className='title-div'>
		<CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Flight Information"}/>
		<CustomTypography type="title" fontSize={14} fontWeight="400" color="black" children={"Access information regarding your airlines and track milestones."}/>
		</div>
		<div className='main-container'>
		<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
		</div>
		</div>
	</div>
	);
};

export default Dashboard;
