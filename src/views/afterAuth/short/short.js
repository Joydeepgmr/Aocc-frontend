import React, { useState } from 'react';
import TableComponent from '../../../components/table/table';
const DetaillSchedule = () => {
	const [loading, setLoading] = useState(false);
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};

	const columns = [
		{ title: 'Flight No', dataIndex: 'FlightNo', key: 'FlightNo' },
		{ title: 'Date', dataIndex: 'Date', key: 'Date' },
		{ title: 'Flight ID', dataIndex: 'FlightID', key: 'FlightID' },
		{ title: 'Nature Code', dataIndex: 'NatureCode', key: 'NatureCode' },
		{ title: 'ORG', dataIndex: 'ORG', key: 'ORG' },
		{ title: 'VIA', dataIndex: 'VIA', key: 'VIA' },
		{ title: 'ATD', dataIndex: 'ATD', key: 'ATD' },
		{ title: 'STA', dataIndex: 'STA', key: 'STA' },
		{ title: 'ETA', dataIndex: 'address', key: 'address' },
		{ title: 'TMO', dataIndex: 'TMO', key: 'TMO' },
		{ title: 'ATA', dataIndex: 'ATA', key: 'ATA' },
		{ title: 'POS', dataIndex: 'POS', key: 'POS' },
		{ title: 'AC Type', dataIndex: 'ACType', key: 'ACType' },
		{ title: 'REG No.', dataIndex: 'REG No.', key: 'REG No.' },
	];

	const dummyData = [
		{ key: '1', name: 'AI 812', age: 30, address: 'New York' },
		{ key: '2', name: 'Jane Smith', age: 25, address: 'Los Angeles' },
		{ key: '3', name: 'Bob Johnson', age: 40, address: 'Chicago' },
	];
	return (
		<div className="">
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
			<TableComponent columns={columns} data={dummyData} loading={loading} onChange={handleTableChange} />
		</div>
	);
};

export default DetaillSchedule;
