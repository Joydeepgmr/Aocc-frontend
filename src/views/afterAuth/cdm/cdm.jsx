import React, { Children, useState } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import './cdm.scss';
import TableComponent from '../../../components/table/table';
import { ArrivalData, DepartureData, TurnAroundData } from './dummyData/dummy-data';
import { ConvertUtcToIst } from '../../../utils';
import CustomSelect from '../../../components/select/select';

const CDM = () => {
	const [activeTab, setActiveTab] = useState('1');
	const [data, setData] = useState(ArrivalData);
	const [selectedTimeValue, setSelectedTimeValue] = useState('24hrs');

	const handleTimeValueChange = (value) => {
		setSelectedTimeValue(value);
	};

	const handleTabChange = (key) => {
		setActiveTab(key);

		if (key === '1') {
			setData(ArrivalData);
		}
		if (key === '2') {
			setData(DepartureData);
		}
		if (key === '3') {
			setData(TurnAroundData);
		}
	};
	const handleEditTable = (row, data) => {
		console.log(row, data);
		setData(data);
	};
	const columns =
		activeTab === '1'
			? [
					{
						title: 'Flight ID',
						dataIndex: 'flightID',
						key: 'flightID',
						render: (flightID) => flightID ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'ICAO Code',
						dataIndex: 'icao',
						key: 'icao',
						render: (icao) => icao ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'IATA Code',
						dataIndex: 'iata',
						key: 'iata',
						render: (iata) => iata ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Aircraft Type',
						dataIndex: 'aircraftType',
						key: 'aircraftType',
						render: (aircraftType) => aircraftType ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Registration',
						dataIndex: 'registration',
						key: 'registration',
						render: (registration) => registration ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Origin',
						dataIndex: 'origin',
						key: 'origin',
						render: (origin) => origin ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Status',
						dataIndex: 'status',
						key: 'status',
						render: (status) => status ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Flight Date',
						dataIndex: 'date',
						key: 'date',
						render: (date) => date ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'SIBT',
						dataIndex: 'sibt',
						key: 'sibt',
						render: (sibt) => sibt ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'ELDT',
						dataIndex: 'eldt',
						key: 'eldt',
						render: (eldt) => eldt ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'ALDT',
						dataIndex: 'aldt',
						key: 'aldt',
						render: (aldt) => aldt ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'EIBT',
						dataIndex: 'eibt',
						key: 'eibt',
						render: (eibt) => eibt ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'AIBT',
						dataIndex: 'aibt',
						key: 'aibt',
						render: (aibt) => aibt ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Runway',
						dataIndex: 'runway',
						key: 'runway',
						render: (runway) => runway ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Stand',
						dataIndex: 'stand',
						key: 'stand',
						render: (stand) => stand ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Remark',
						dataIndex: 'remark',
						key: 'remark',
						render: (remark) => remark ?? '-',
						align: 'center',
						editable: true,
					},
					{
						title: 'Link Flight',
						dataIndex: 'link',
						key: 'link',
						render: (link) => link ?? '-',
						align: 'center',
						editable: true,
					},
				]
			: activeTab === '2'
				? [
						{
							title: 'Flight ID',
							dataIndex: 'flightID',
							key: 'flightID',
							render: (flightID) => flightID ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'ICAO Code',
							dataIndex: 'icao',
							key: 'icao',
							render: (icao) => icao ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'IATA Code',
							dataIndex: 'iata',
							key: 'iata',
							render: (iata) => iata ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Aircraft Type',
							dataIndex: 'aircraftType',
							key: 'aircraftType',
							render: (aircraftType) => aircraftType ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Registration',
							dataIndex: 'registration',
							key: 'registration',
							render: (registration) => registration ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Des',
							dataIndex: 'des',
							key: 'des',
							render: (des) => des ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Status',
							dataIndex: 'status',
							key: 'status',
							render: (status) => status ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Flight Date',
							dataIndex: 'date',
							key: 'date',
							render: (date) => date ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'SOBT',
							dataIndex: 'sobt',
							key: 'sobt',
							render: (sobt) => sobt ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'EOBT',
							dataIndex: 'eobt',
							key: 'eobt',
							render: (eobt) => eobt ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'TOBT',
							dataIndex: 'tobt',
							key: 'tobt',
							render: (tobt) => tobt ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'AOBT',
							dataIndex: 'aobt',
							key: 'aobt',
							render: (aobt) => aobt ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'TSAT',
							dataIndex: 'tsat',
							key: 'tsat',
							render: (tsat) => tsat ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'TTOT',
							dataIndex: 'ttot',
							key: 'ttot',
							render: (ttot) => ttot ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'ATOT',
							dataIndex: 'atot',
							key: 'atot',
							render: (atot) => atot ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Runway',
							dataIndex: 'runway',
							key: 'runway',
							render: (runway) => runway ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Remark',
							dataIndex: 'remark',
							key: 'remark',
							render: (remark) => remark ?? '-',
							align: 'center',
							editable: true,
						},
						{
							title: 'Stand',
							dataIndex: 'stand',
							key: 'stand',
							render: (stand) => stand ?? '-',
							align: 'center',
							editable: true,
						},
					]
				: [
						{
							title: 'Common',
							children: [
								{
									title: 'Flight ID',
									dataIndex: 'flightID',
									key: 'flightID',
									render: (flightID) => flightID ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'Registration',
									dataIndex: 'registration',
									key: 'registration',
									render: (registration) => registration ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'Aircraft Type',
									dataIndex: 'aircraftType',
									key: 'aircraftType',
									render: (aircraftType) => aircraftType ?? '-',
									align: 'center',
									editable: true,
								},
							],
						},
						{
							title: 'Arrival',
							children: [
								{
									title: 'IATA Code',
									dataIndex: 'iata',
									key: 'iata',
									render: (iata) => iata ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'ICAO Code',
									dataIndex: 'icao',
									key: 'icao',
									render: (icao) => icao ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'Origin',
									dataIndex: 'origin',
									key: 'origin',
									render: (origin) => origin ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'SIBT',
									dataIndex: 'sibt',
									key: 'sibt',
									render: (sibt) => sibt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'ELDT',
									dataIndex: 'eldt',
									key: 'eldt',
									render: (eldt) => eldt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'ALDT',
									dataIndex: 'aldt',
									key: 'aldt',
									render: (aldt) => aldt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'EIBT',
									dataIndex: 'eibt',
									key: 'eibt',
									render: (eibt) => eibt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'AIBT',
									dataIndex: 'aibt',
									key: 'aibt',
									render: (aibt) => aibt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'Runway',
									dataIndex: 'runway',
									key: 'runway',
									render: (runway) => runway ?? '-',
									align: 'center',
									editable: true,
								},
							],
						},
						{
							title: 'Departure',
							children: [
								{
									title: 'Stand',
									dataIndex: 'stand',
									key: 'stand',
									render: (stand) => stand ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'Status',
									dataIndex: 'status',
									key: 'status',
									render: (status) => status ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'STAT',
									dataIndex: 'stat',
									key: 'stat',
									render: (stat) => stat ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'IATA Code',
									dataIndex: 'iata',
									key: 'iata',
									render: (iata) => iata ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'ICAO Code',
									dataIndex: 'icao',
									key: 'icao',
									render: (icao) => icao ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'Dest',
									dataIndex: 'dest',
									key: 'dest',
									render: (dest) => dest ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'SOBT',
									dataIndex: 'sobt',
									key: 'sobt',
									render: (sobt) => sobt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'EOBT',
									dataIndex: 'eobt',
									key: 'eobt',
									render: (eobt) => eobt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'TOBT',
									dataIndex: 'tobt',
									key: 'tobt',
									render: (tobt) => tobt ?? '-',
									align: 'center',
									editable: true,
								},
								{
									title: 'AOBT',
									dataIndex: 'aobt',
									key: 'aobt',
									render: (aobt) => aobt ?? '-',
									align: 'center',
									editable: true,
								},
							],
						},
					];

	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: (
				<TableComponent
					columns={columns}
					data={data}
					handleEdit={handleEditTable}
					// loading={loading}
					fetchData={data}
					// pagination={pagination}
				/>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: (
				<TableComponent
					columns={columns}
					data={data}
					handleEdit={handleEditTable}
					// loading={loading}
					fetchData={data}
					// pagination={pagination}
				/>
			),
		},
		{
			key: '3',
			label: 'Turn Around',
			children: (
				<TableComponent
					columns={columns}
					data={data}
					handleEdit={handleEditTable}
					// loading={loading}
					fetchData={data}
					// pagination={pagination}
				/>
			),
		},
	];

	const SelectTime = [
		{
			id: '1',
			label: '12hr',
			value: '12hrs',
		},
		{
			id: '2',
			label: '24hr',
			value: '24hrs',
		},
	];

	return (
		<>
			<div className="container-style">
				<TopHeader
					className="header-box"
					heading={'CDM'}
					subHeading={'Overview of Arrival , Departure , and Turn Around '}
					searchBox={false}
					condition={false}
				/>
				<div className="tabs">
					<CustomTabs
						defaultActiveKey="1"
						items={items}
						type="simple"
						onChange={handleTabChange}
						extraContent={
							<CustomSelect
								SelectData={SelectTime}
								placeholder={'Select Format'}
								onChange={handleTimeValueChange}
								value={selectedTimeValue}
							/>
						}
					/>
				</div>
			</div>
		</>
	);
};

export default React.memo(CDM);
