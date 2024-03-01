import React, { useState } from 'react';
import CustomTypography from '../typographyComponent/typographyComponent';
import ButtonComponent from '../button/button';
import InputField from '../inputField/inputField';
import Button from '../button/button';
import Bell from '../../assets/Bell.svg';
import CustomTabs from '../customTabs/customTabs';
import './detailsTable.scss';
import TableComponent from '../table/table';
const DetailsTable = () => {
	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: <MainTable />,
		},
		{
			key: '2',
			label: 'Departure',
			children: <MainTable />,
		},
	];

	const handleChange = () => {
		console.log('Tab switch');
	};
	return (
		<>
			<div className="main-wrapper">
				<div className="wrapper-gap">
					<div className="wrapper">
						<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
							Short Term Schedule Planning
						</CustomTypography>
						<div className="main-gap">
							<div className="main">
								<Button
									onClick={() => {
										alert('Icon Button');
									}}
									icon={Bell}
									alt="bell icon"
									className="icon_withoutBorder"
								/>
								<InputField
									className="search_input"
									name="search"
									placeholder="Search"
									warning="Required field"
									type="search"
								/>
							</div>
						</div>
					</div>

					<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
				</div>
			</div>
		</>
	);
};

export default DetailsTable;
const MainTable = () => {
	const [loading, setLoading] = useState(false);
	const dummyData = [
		{
			key: '1',
			'Flight No. ': 'ABC123',
			Date: '2024-02-29',
			'Flight ID': 'FL123',
			'Nature Code': 'Domestic',
			ORG: 'JFK',
			VIA: 'ORD',
			ATD: '08:00',
			STA: '10:30',
			ETA: '10:45',
			TMO: '10:15',
			ATA: '10:50',
			POS: 'Gate 5',
			'AC Type': 'Boeing 737',
			'REG No.': 'N12345',
		},
		{
			key: '2',
			'Flight No. ': 'XYZ789',
			Date: '2024-02-29',
			'Flight ID': 'FL456',
			'Nature Code': 'International',
			ORG: 'LAX',
			VIA: 'LHR',
			ATD: '12:00',
			STA: '18:00',
			ETA: '18:30',
			TMO: '18:15',
			ATA: '18:45',
			POS: 'Gate 10',
			'AC Type': 'Airbus A380',
			'REG No.': 'N54321',
		},
	];

	const columns = [
		{ title: 'Flight No. ', dataIndex: 'Flight No. ', key: 'Flight No. ' },
		{ title: 'Date', dataIndex: 'Date', key: 'Date' },
		{ title: 'Flight ID', dataIndex: 'Flight ID', key: 'Flight ID' },
		{ title: 'Nature Code', dataIndex: 'Nature Code', key: 'Nature Code' },
		{ title: 'ORG', dataIndex: 'ORG', key: 'ORG' },
		{ title: 'VIA', dataIndex: 'VIA', key: 'VIA' },
		{ title: 'ATD', dataIndex: 'ATD', key: 'ATD' },
		{ title: 'STA', dataIndex: 'STA', key: 'STA' },
		{ title: 'ETA', dataIndex: 'ETA', key: 'ETA' },
		{ title: 'TMO', dataIndex: 'TMO', key: 'TMO' },
		{ title: 'ATA', dataIndex: 'ATA', key: 'ATA' },
		{ title: 'POS', dataIndex: 'POS', key: 'POS' },
		{ title: 'AC Type', dataIndex: 'AC Type', key: 'AC Type' },
		{ title: 'REG No.', dataIndex: 'REG No.', key: 'REG No.' },
	];
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};
	return (
		<>
			<TableComponent columns={columns} data={dummyData} loading={loading} onChange={handleTableChange} />
		</>
	);
};
