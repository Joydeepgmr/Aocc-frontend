import { Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import TableComponent from '../../../../components/table/table';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import { useGetFlightScheduled } from '../../../../services/dashboard/flightSchedule/flightSchedule';
import './style.scss';
import { ConvertUtcToIst } from '../../../../utils';

const FlightScheduleDataTab = ({ type }) => {
	const [FlightScheduleData, setFlightScheduleData] = useState([]);
	const { data, isLoading, fetchNextPage, hasNextPage } = useGetFlightScheduled({ type });
	const [form] = Form.useForm();
	const columns = useMemo(() => {
		return [
			{ title: 'Flight', dataIndex: 'flightNumber', key: 'flightNumber' },
			{ title: 'Status', dataIndex: 'status', key: 'status' },
			{ title: 'ORG', dataIndex: 'org', key: 'org' },
			{ title: 'STA', dataIndex: 'sta', key: 'sta' },
			{ title: 'ETA', dataIndex: 'eta', key: 'eta' },
			{ title: 'TMO', dataIndex: 'tmo', key: 'tmo' },
			{ title: 'ATA', dataIndex: 'ata', key: 'ata' },
			{ title: 'RNY', dataIndex: 'rny', key: 'rny' },
			{ title: 'EOB', dataIndex: 'eob', key: 'eob' },
			{
				title: 'ONB',
				dataIndex: 'onBlock',
				key: 'onBlock',
				render: (text) => text && ConvertUtcToIst(text, 'YYYY/MM/DD'),
			},
			{
				title: 'POS',
				dataIndex: 'pos',
				key: 'pos',
				render: (_, record) => record?.resourceAllocation?.parkingStand,
			},
			{ title: 'Gate', dataIndex: 'gate', key: 'gate', render: (_, record) => record?.resourceAllocation?.gates },
			{
				title: 'Belt',
				dataIndex: 'belt',
				key: 'belt',
				render: (_, record) => record?.resourceAllocation?.baggageBelt,
			},
			{ title: 'AC/ REGN', dataIndex: 'acRegn', key: 'acRegn' },
			{ title: 'Call Sign', dataIndex: 'cs', key: 'cs' },
			{ title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
		];
	}, [FlightScheduleData]);
	useEffect(() => {
		console.log('type data', type, data);
		if (data?.pages) {
			const lastPage = data.pages.length >= 1 ? data.pages[data.pages.length - 1] : [];
			setFlightScheduleData([...FlightScheduleData, ...lastPage.data]);
		}
	}, [data]);
	console.log('type and data ', type, FlightScheduleData);
	return (
		<>
			<div className="tab_container">
				<div className="top-bar">
					<CustomTypography
						type="title"
						fontSize={24}
						fontWeight="600"
						color="black"
						children={'Flight Schedule'}
					/>
					{/* <Button
						onClick={() => {
							alert('Icon Button');
						}}
						icon={Filter}
						alt="bell icon"
						className={'filter-btn'}
					/> */}
					<Form form={form}>
						<InputField
							label="Flight number"
							name="flightNo"
							placeholder="Flight number"
							warning="Required field"
							type="search"
						/>
					</Form>
				</div>
				<TableComponent
					columns={columns}
					data={FlightScheduleData}
					loading={isLoading}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
				/>
			</div>
		</>
	);
};
const FlightSchedule = () => {
	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: (
				<>
					<FlightScheduleDataTab type="arrival" />
				</>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: (
				<>
					<FlightScheduleDataTab type="departure" />
				</>
			),
		},
	];

	return (
		<div className="body-container">
			<div className="flights-table">
				<CustomTabs defaultActiveKey="1" items={items} />
			</div>
		</div>
	);
};

export default FlightSchedule;
