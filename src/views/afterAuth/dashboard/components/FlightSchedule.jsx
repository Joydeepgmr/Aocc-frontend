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
import { ConvertToDateTime } from '../../../../utils';
import './style.scss';
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
	const columns = useMemo(() => {
		return [
			{ title: 'FLNR', dataIndex: 'flightNumber', key: 'flightNumber', render: (text) => text ?? '-' },
			{ title: 'STS', dataIndex: 'flightType', key: 'flightType', align: 'center', render: (text) => text ?? '-' },
			{
				title: tab == 'arrival' ? 'ORG' : 'DEST',
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
				render: (text) => ConvertToDateTime(text, 'HH:mm') ?? '-',
			},
			{
				title: tab == 'arrival' ? 'ETA' : 'ETD',
				dataIndex: tab == 'arrival' ? 'eta' : 'etd',
				key: tab == 'arrival' ? 'eta' : 'etd',
				align: 'center',
				render: (text) => ConvertToDateTime(text, 'HH:mm') ?? '-',
			},
			{
				title: 'TMO',
				dataIndex: 'tmo',
				key: 'tmo',
				align: 'center',
				render: (text) => ConvertToDateTime(text, 'HH:mm') ?? '-',
			},
			{
				title: 'ATA',
				dataIndex: 'ata',
				key: 'ata',
				align: 'center',
				render: (text) => ConvertToDateTime(text, 'HH:mm') ?? '-',
			},
			{ title: 'RWY', dataIndex: 'rny', key: 'rny', align: 'center', render: (_, record) => record?.resourceAllocation?.runway?.name ?? '-', },
			{
				title: 'EOB',
				dataIndex: 'eob',
				key: 'eob',
				align: 'center',
				render: (text) => ConvertToDateTime(text, 'HH:mm') ?? '-',
			},
			{
				title: 'ONBL',
				dataIndex: 'onBlock',
				key: 'onBlock',
				align: 'center',
				render: (text) => ConvertToDateTime(text, 'HH:mm') ?? '-',
			},
			{
				title: 'POS',
				dataIndex: 'pos',
				key: 'pos',
				align: 'center',
				render: (_, record) => record?.resourceAllocation?.parkingStand?.name ?? '-',
			},
			{
				title: 'GAT',
				dataIndex: 'gate',
				key: 'gate',
				align: 'center',
				render: (_, record) => record?.resourceAllocation?.gates?.name ?? '-',
			},
			{
				title: 'BLT',
				dataIndex: 'resourceAllocation',
				key: 'resourceAllocation',
				align: 'center',
				render: (_, record) => record?.resourceAllocation?.baggageBelt?.name ?? '-',
			},
			{
				title: 'REG',
				dataIndex: 'registration',
				key: 'registration',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{
				title: 'C/S',
				dataIndex: 'callSign',
				key: 'callSign',
				align: 'center',
				render: (text) => text ?? '-',
			},
			{ title: 'REM', dataIndex: 'remarks', key: 'remarks', align: 'center', render: (text) => text ?? '-' },
			tab == 'arrival'
				? {
						title: 'Map',
						key: 'map',
						render: (
							text,
							record // Use the render function to customize the content of the cell
						) => (
							<ButtonComponent
								disabled={record?.isMap}
								title="View map"
								style={{ margin: 'auto' }}
								type="text"
								className="view_map_button"
								onClick={() => {
									getViewMap(record?.flight);
								}}
							/>
						),
					}
				: {},
		];
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
				<>
					<TableComponent
						columns={columns}
						data={FlightScheduleData}
						loading={isFetching}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
						isColored
					/>
				</>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: (
				<>
					<TableComponent
						columns={columns}
						data={FlightScheduleData}
						loading={isFetching}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
						isColored
					/>
				</>
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
			<div className="body-container">
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
		</>
	);
};

export default FlightSchedule;
