import { Form } from 'antd';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { GET_FLIGHT_SCHEDULE } from '../../../../api';
import ButtonComponent from '../../../../components/button/button';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import ModalComponent from '../../../../components/modal/modal';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../components/table/table';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import { useGetFlightScheduled, useGetViewMap } from '../../../../services/dashboard/flightSchedule/flightSchedule';
import SocketEventListener from '../../../../socket/listner/socketListner';
import './style.scss';
import Alerts from './Alerts';
const FlightSchedule = () => {
	const [tab, setTab] = useState('arrival');
	const [FlightScheduleData, setFlightScheduleData] = useState([]);
	const [mapModalOpen, setMapModalOpen] = useState({ isOpen: false, data: null });

	const getFlightScheduleApiProps = {
		tab,
		onSuccess: (data) => {
			if (data?.pages) {
				const newData = data.pages.reduce((acc, page) => {
					return acc.concat(page.data || []);
				}, []);

				setFlightScheduleData([...newData]);
			}
		},
		onError: ({
			response: {
				data: { message },
			},
		}) => toast.error(message),
	};
	const { isFetching, fetchNextPage, hasNextPage, refetch } = useGetFlightScheduled({
		...getFlightScheduleApiProps,
	});
	const getMapViewApiProps = {
		onSuccess: (data) => {
			console.log('data is ', data);
			if (data?.isMap) {
				setMapModalOpen({ isOpen: true, base64Img: `data:image/png;base64,${data.map}` });
			}
		},
		onError: ({
			response: {
				data: { message },
			},
		}) => toast.error(message),
	};
	const { mutate: getViewMap, isLoading: isMapLoading } = useGetViewMap({ ...getMapViewApiProps });
	const [form] = Form.useForm();
	console.log('modal data is ', mapModalOpen);
	const closeMapModal = () => {
		setMapModalOpen({ isOpen: null, data: null });
	};
	const handleViewMap = (record) => {
		if (record.isMap) {
			getViewMap(record.flight);
		} else {
			toast.dismiss();
			toast.error('Map is not available once aircraft is in radar range');
		}
	};
	const columns = useMemo(() => {
		let column = [
			{
				title: '2L',
				dataIndex: 'airline',
				key: 'airline',
				align: 'center',
				render: (airline) => airline?.twoLetterCode ?? '-',
			},
			{
				title: '3L',
				dataIndex: 'airline',
				key: 'airline',
				align: 'center',
				render: (airline) => airline?.threeLetterCode ?? '-',
			},
			{ title: 'FLNR', dataIndex: 'flightNumber', key: 'flightNumber', render: (text) => text ?? '-' },
			{
				title: 'STS',
				dataIndex: 'flightType',
				key: 'flightType',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: 'REG',
				dataIndex: 'registration',
				key: 'registration',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: 'CSGN',
				dataIndex: 'callSign',
				key: 'callSign',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: tab == 'arrival' ? 'ORG' : 'DES',
				dataIndex: 'origin',
				key: 'origin',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: tab == 'arrival' ? 'STA' : 'STD',
				dataIndex: tab == 'arrival' ? 'sta' : 'std',
				key: tab == 'arrival' ? 'sta' : 'std',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: tab == 'arrival' ? 'ETA' : 'ETD',
				dataIndex: tab == 'arrival' ? 'eta' : 'etd',
				key: tab == 'arrival' ? 'eta' : 'etd',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: 'TMO',
				dataIndex: 'tmo',
				key: 'tmo',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: tab == 'arrival' ? 'ATA' : 'ATD',
				dataIndex: 'ata',
				key: 'ata',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: 'EOB',
				dataIndex: 'eob',
				key: 'eob',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: tab === 'arrival' ? 'ONB' : 'OFB',
				dataIndex: 'onBlock',
				key: 'onBlock',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: 'POS',
				dataIndex: 'parkingStandName',
				key: 'parkingStandName',
				align: 'center',
				render: (parkingStandName) => parkingStandName ?? '-',
			},
			{
				title: 'GAT',
				dataIndex: 'gateName',
				key: 'gateName',
				align: 'center',
				render: (gateName) => gateName ?? '-',
			},
			{
				title: 'BLT',
				dataIndex: 'baggageBeltName',
				key: 'baggageBeltName',
				align: 'center',
				render: (baggageBeltName) => baggageBeltName ?? '-',
			},
			{
				title: 'RWY',
				dataIndex: 'runwayName',
				key: 'runwayName',
				align: 'center',
				render: (runwayName) => runwayName ?? '-',
			},
			{ title: 'REM', dataIndex: 'remarks', key: 'remarks', align: 'center', render: (text) => text ?? '-' },
		];
		if (tab === 'arrival') {
			column.push({
				title: 'Map',
				key: 'map',
				render: (text, record) => (
					<ButtonComponent
						title="View map"
						style={{ margin: 'auto', fontSize: '1.3rem', width: '8rem' }}
						type="text"
						className="view_map_button"
						onClick={() => {
							handleViewMap(record);
						}}
					/>
				),
			});
		}
		return column;
	}, [FlightScheduleData]);
	const handleTabChange = (key) => {
		if (key == '1') {
			setTab('arrival');
		} else {
			setTab('departure');
		}
		setFlightScheduleData([]);
	};
	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: (
				<div className="daily-ops-table">
					<TableComponent
						columns={columns}
						data={FlightScheduleData}
						loading={isFetching}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
						isColored
					/>
				</div>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: (
				<div className="daily-ops-table">
					<TableComponent
						columns={columns}
						data={FlightScheduleData}
						loading={isFetching}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
						isColored
					/>
				</div>
			),
		},
	];
	return (
		<>
			<PageLoader loading={isMapLoading} message="It may take sometime..." />
			<SocketEventListener refetch={refetch} apiName={`${GET_FLIGHT_SCHEDULE}?flightType=${tab}`} />
			<ModalComponent
				isModalOpen={mapModalOpen?.isOpen}
				width="60rem"
				closeModal={closeMapModal}
				title="Map view"
				className="view_img_modal"
			>
				<img src={mapModalOpen?.base64Img} alt="base64Img" className="map_img" />
			</ModalComponent>
			<div className="critical-grid">
				<div className="body-containers">
					<div className="top-bar">
						<CustomTypography
							type="title"
							fontSize={24}
							fontWeight={600}
							color="black"
							children={'Flight Schedule'}
						/>
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
					<div className="flights-table">
						<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
					</div>
				</div>
				<Alerts />
			</div>
		</>
	);
};

export default FlightSchedule;
