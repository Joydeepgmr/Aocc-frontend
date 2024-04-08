import { Form } from 'antd';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonComponent from '../../../../components/button/button';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import ModalComponent from '../../../../components/modal/modal';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../components/table/table';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import { useGetFlightScheduled, useGetViewMap } from '../../../../services/dashboard/flightSchedule/flightSchedule';
import { ConvertUtcToIst } from '../../../../utils';
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
	const { isFetching, fetchNextPage, hasNextPage } = useGetFlightScheduled({
		...getFlightScheduleApiProps,
	});
	const getMapViewApiProps = {
		onSuccess: (data) => {
			setMapModalOpen({ isOpen: true, base64Img: data });
		},
		onError: ({
			response: {
				data: { message },
			},
		}) => toast.error(message),
	};
	const { mutate: getViewMap, isLoading: isMapLoading } = useGetViewMap({ ...getMapViewApiProps });
	const [form] = Form.useForm();

	const closeMapModal = () => {
		setMapModalOpen({ isOpen: null, data: null });
	};
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
			{
				title: 'Map',
				key: 'map',
				render: (
					text,
					record // Use the render function to customize the content of the cell
				) => (
					<ButtonComponent
						title="View map"
						type="text"
						className="view_map_button"
						onClick={() => {
							getViewMap(record?.id);
						}}
					></ButtonComponent>
				),
			},
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
					/>
				</>
			),
		},
	];
	return (
		<>
			<PageLoader isLoading={isMapLoading} />
			<ModalComponent
				isModalOpen={mapModalOpen?.isOpen}
				width="60rem"
				closeModal={closeMapModal}
				title="Map view"
				className="view_img_modal"
			>
				{/* <img src={base64Img} alt="base64Img" className="map_img" /> */}
			</ModalComponent>
			<div className="body-container">
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
				<div className="flights-table">
					<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
				</div>
			</div>
		</>
	);
};

export default FlightSchedule;
