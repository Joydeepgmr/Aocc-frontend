import React, { useState } from 'react'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../../components/customTabs/customTabs';
import TableComponent from '../../../../components/table/table';
import InputField from '../../../../components/inputField/inputField';
import Button from '../../../../components/button/button';
import Filter from '../../../../assets/Filter.svg'
import './style.scss';

const FlightSchedule = () => {
	const [loading, setLoading] = useState(false);
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};

	const columns = [
        { title: 'Flight', dataIndex: 'flight', key: 'flight' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Org', dataIndex: 'org', key: 'org' },
        { title: 'Via', dataIndex: 'via', key: 'via' },
        { title: 'STA', dataIndex: 'sta', key: 'sta' },
        { title: 'ETA', dataIndex: 'eta', key: 'eta' },
        { title: 'TMO', dataIndex: 'tmo', key: 'tmo' },
        { title: 'ATA', dataIndex: 'ata', key: 'ata' },
        { title: 'RMY', dataIndex: 'rmy', key: 'rmy' },
        { title: 'EOB', dataIndex: 'eob', key: 'eob' },
        { title: 'On Block', dataIndex: 'onBlock', key: 'onBlock' },
        { title: 'POS', dataIndex: 'pos', key: 'pos' },
        { title: 'Gate', dataIndex: 'gate', key: 'gate' },
        { title: 'Belt', dataIndex: 'belt', key: 'belt' },
        { title: 'AC/ REGN', dataIndex: 'acRegn', key: 'acRegn' },
        { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
        { title: 'Weather', dataIndex: 'weather', key: 'weather' },
    ];
	const dummyData = [
        {
            flight: 'AI 101',
            status: 'On Time',
            org: 'Delhi',
            via: 'Mumbai',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rmy: 'No Remarks',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'T2',
            gate: 'G5',
            belt: 'B7',
            acRegn: 'VT-XYZ',
            remarks: 'Smooth Flight',
            weather: 'Sunny',
        },
		{
            flight: 'AI 101',
            status: 'On Time',
            org: 'Delhi',
            via: 'Mumbai',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rmy: 'No Remarks',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'T2',
            gate: 'G5',
            belt: 'B7',
            acRegn: 'VT-XYZ',
            remarks: 'Smooth Flight',
            weather: 'Sunny',
        },
		{
            flight: 'AI 101',
            status: 'On Time',
            org: 'Delhi',
            via: 'Mumbai',
            sta: '10:00',
            eta: '10:30',
            tmo: '10:45',
            ata: '11:00',
            rmy: 'No Remarks',
            eob: '11:15',
            onBlock: '11:30',
            pos: 'T2',
            gate: 'G5',
            belt: 'B7',
            acRegn: 'VT-XYZ',
            remarks: 'Smooth Flight',
            weather: 'Sunny',
        },
        // Add more objects for more rows
    ];

	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: <><TableComponent
			columns={columns}
			data={dummyData}
			loading={loading}
			onChange={handleTableChange}
		/></>,
		},
		{
			key: '2',
			label: 'Departure',
			children: <><TableComponent
			columns={columns}
			data={dummyData}
			loading={loading}
			onChange={handleTableChange}
		/></>,
		},
	];
	const handleChange = () => {
		console.log('Tab switch');
	};

  return (
    <div className='body-container'>
       <div className='top-bar'>
       <CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Flight Schedule"}/>
        <div className='filter-section'>
        <Button
			onClick={() => {
			alert('Icon Button');
			}}
			icon={Filter}
			alt="bell icon"
			className={"filter-btn"}
			/>
        <InputField
			label="Airport Name"
			name="search"
			placeholder="Search"
			warning="Required field"
			type="search"
		/>

        </div>
        </div> 
		<div className='flights-table'>
		<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
		</div>
    </div>
  )
}

export default FlightSchedule
