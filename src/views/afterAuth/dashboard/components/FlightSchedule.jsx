import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { GET_FLIGHT_SCHEDULE } from '../../../../api';
import ButtonComponent from '../../../../components/button/button';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import ModalComponent from '../../../../components/modal/modal';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../components/table/table';
import {
	useEditFlightSchedule,
	useGetFlightMileStone,
	useGetFlightScheduled,
	useGetUtw,
	useGetViewMap,
} from '../../../../services/dashboard/flightSchedule/flightSchedule';
import { useBaggageBeltDropdown } from '../../../../services/planairportmaster/resources/baggagebelt/baggagebelt';
import { useCheckInDropdown } from '../../../../services/planairportmaster/resources/checkin/checkin';
import { useGateDropdown } from '../../../../services/planairportmaster/resources/gates/gates';
import { useStandDropdown } from '../../../../services/planairportmaster/resources/parkingstand/parkingstand';
import { useRunwayDropdown } from '../../../../services/planairportmaster/resources/runway/runway';
import SocketEventListener from '../../../../socket/listner/socketListner';
import MilestoneChart from './MilestoneChart';
import VendorMileStone from './VendorMileStone';
import './style.scss';
import { ConvertToDateTime } from '../../../../utils';
const FlightSchedule = () => {
	const divRef = useRef(null);
	const [tab, setTab] = useState('arrival');
	const [FlightScheduleData, setFlightScheduleData] = useState([]);
	const [mapModalOpen, setMapModalOpen] = useState({ isOpen: false, data: null });
	const [milestoneModal, setMilestoneModal] = useState({ isOpen: false, data: { labels: [], milestoneList: [] } });
	const [utwModal, setUtwModal] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);
	const writeAccess = !!localStorage.getItem('dailyOpsAccess');

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
	const getMilestoneApiProps = {
		onSuccess: ({ data }) => {
			console.log('data is ', data);
			const labels = data.milestones.map((milestoneObj) => {
				const [key] = Object.keys(milestoneObj);
				const value = milestoneObj[key];
				return { key: key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`), value };
			});
			console.log('labels are', labels);
			setMilestoneModal({ isOpen: true, milestoneList: data.milestoneList, labels });
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
	const { mutate: getMilestoneData, isLoading: isMilestoneLoading } = useGetFlightMileStone(getMilestoneApiProps);
	const editFlightScheduleApiProps = {
		onSuccess: ({ message, data: items }) => {
			toast.success(message);
			refetch();
			// const updatedFlightData = FlightScheduleData.map((data) => {
			// 	if (data.flightId === items.flightId) {
			// 		return { ...data, ...items };
			// 	}
			// 	return data;
			// });
			// setFlightScheduleData(updatedFlightData);
		},
		onError: ({
			response: {
				data: { message },
			},
		}) => toast.error(message),
	};
	const { mutate: editFlightData, isLoading: isUpdateLoading } = useEditFlightSchedule(editFlightScheduleApiProps);
	const { data: posData } = useStandDropdown();
	const { data: gateData } = useGateDropdown();
	const { data: runwayData } = useRunwayDropdown();
	const { data: beltData } = useBaggageBeltDropdown();
	const { data: checkInData } = useCheckInDropdown();
	const { mutate: getUtw, data: getUtwData, isLoading: isUtwLoading } = useGetUtw();
	const posDropdownData = useMemo(() => {
		return posData?.map((data) => ({ value: data.id, label: data.name }));
	}, [posData]);
	const gateDropdownData = useMemo(() => {
		return gateData?.map((data) => ({ value: data.id, label: data.name }));
	}, [gateData]);
	const runwayDropdownData = useMemo(() => {
		return runwayData?.map((data) => ({ value: data.id, label: data.name }));
	}, [runwayData]);
	const beltDropdownData = useMemo(() => {
		return beltData?.map((data) => ({ value: data.id, label: data.name }));
	}, [beltData]);
	const checkInDropdownData = useMemo(() => {
		return checkInData?.map((data) => ({ value: data.id, label: data.name }));
	}, [checkInData]);
	const [form] = Form.useForm();
	const closeMapModal = () => {
		setMapModalOpen({ isOpen: null, data: null });
	};
	const closeMilestoneModal = () => {
		setMilestoneModal({ isOpen: false });
	};
	const handleViewMap = (record) => {
		if (record.isMap) {
			getViewMap(record.flightId);
		} else {
			toast.dismiss();
			toast.error('Map is not available once aircraft is in radar range');
		}
	};
	const handleViewMilestone = (record) => {
		getMilestoneData({ id: record.flightId, type: tab });
	};
	const handleEditTable = (items) => {
		const hasNonNullValue = Object.values(items?.values).some(
			(value) => value !== null && value !== undefined && value !== ''
		);
		hasNonNullValue && editFlightData({ id: items.flightId, data: items.values });
	};

	const toggleFullscreen = () => {
		setFullScreen(!fullScreen);
		if (document.fullscreenElement === null) {
			if (divRef.current?.requestFullscreen) {
				divRef.current.requestFullscreen();
			} else if (divRef.current?.mozRequestFullScreen) {
				divRef.current.mozRequestFullScreen();
			} else if (divRef.current?.webkitRequestFullscreen) {
				divRef.current.webkitRequestFullscreen();
			} else if (divRef.current?.msRequestFullscreen) {
				divRef.current.msRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document?.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document?.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document?.msExitFullscreen) {
				document.msExitFullscreen();
			}
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
				render: (text) => <div style={{ textTransform: 'capitalize' }}>{text ?? '-'}</div>,
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
				title: 'DATE',
				dataIndex: 'date',
				key: 'date',
				align: 'center',
				render: (date) => date && ConvertToDateTime(date),
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
				editable: writeAccess && {
					type: 'time',
				},
				render: (text) => text ?? '-',
			},
			{
				title: 'TMO',
				dataIndex: 'tmo',
				key: 'tmo',
				align: 'center',
				editable: writeAccess && {
					type: 'time',
				},
				render: (text) => text ?? '-',
			},
			{
				title: tab == 'arrival' ? 'ATA' : 'ATD',
				dataIndex: 'ata',
				key: 'ata',
				align: 'center',
				editable: writeAccess && {
					type: 'time',
				},
				render: (text) => text ?? '-',
			},
			{
				title: 'EOB',
				dataIndex: 'eob',
				key: 'eob',
				align: 'center',
				editable: writeAccess && {
					type: 'time',
				},
				render: (text) => text ?? '-',
			},
			{
				title: tab === 'arrival' ? 'ONB' : 'OFB',
				dataIndex: 'onBlock',
				key: 'onBlock',
				align: 'center',
				editable: writeAccess && {
					type: 'time',
				},
				render: (text) => text ?? '-',
			},
			tab === 'arrival'
				? {
						title: 'POS',
						dataIndex: 'parkingStandId',
						key: 'parkingStandId',
						align: 'center',
						editable: writeAccess && {
							type: 'select',
							dropdownData: posDropdownData,
						},
						render: (_, record) => record?.parkingStandName ?? '-',
					}
				: {
						title: 'GAT',
						dataIndex: 'gateId',
						key: 'gateId',
						align: 'center',
						editable: writeAccess && {
							type: 'select',
							dropdownData: gateDropdownData,
						},
						render: (_, record) => record?.gateName ?? '-',
					},
			// {
			// 	title: 'GAT',
			// 	dataIndex: 'gateId',
			// 	key: 'gateId',
			// 	align: 'center',
			// 	editable: writeAccess && {
			// 		type: 'select',
			// 		dropdownData: gateDropdownData,
			// 	},
			// 	render: (_, record) => record?.gateName ?? '-',
			// },
			tab === 'arrival'
				? {
						title: 'BLT',
						dataIndex: 'baggageBeltId',
						key: 'baggageBeltId',
						align: 'center',
						editable: writeAccess && {
							type: 'select',
							dropdownData: beltDropdownData,
						},
						render: (_, record) => record?.baggageBeltName ?? '-',
					}
				: {
						title: 'CIN',
						dataIndex: 'checkinCounterId',
						key: 'checkinCounterId',
						align: 'center',
						editable: writeAccess && {
							type: 'select',
							dropdownData: checkInDropdownData,
						},
						render: (_, record) => record?.checkInCounterName ?? '-',
					},
			// {
			// 	title: 'RWY',
			// 	dataIndex: 'runwayId',
			// 	key: 'runwayId',
			// 	align: 'center',
			// 	editable: writeAccess && {
			// 		type: 'select',
			// 		dropdownData: runwayDropdownData,
			// 	},
			// 	render: (_, record) => record?.runwayName ?? '-',
			// },
			{
				title: 'REM',
				dataIndex: 'remarks',
				key: 'remarks',
				align: 'center',
				editable: writeAccess && {
					type: 'text',
				},
				render: (text) => text ?? '-',
			},
			{
				title: 'DETAIL',
				key: 'milestone',
				render: (_, record) => (
					<div className="top-bar">
						<ButtonComponent
							title="Status"
							style={{ margin: 'auto', fontSize: '1.3rem', width: '5rem' }}
							type="text"
							className="view_map_button"
							onClick={() => {
								setUtwModal(true);
								getUtw(record?.flightId);
							}}
						/>
						<ButtonComponent
							title="Milestone"
							style={{ margin: 'auto', fontSize: '1.3rem', width: '7rem' }}
							type="text"
							className="view_map_button"
							onClick={() => {
								handleViewMilestone(record);
							}}
						/>
					</div>
				),
			},
		];
		if (tab === 'arrival') {
			column.push({
				title: 'RADAR',
				key: 'Track',
				render: (text, record) => (
					<ButtonComponent
						title="Track"
						style={{ margin: 'auto', fontSize: '1.3rem', width: '4rem' }}
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
	}, [
		FlightScheduleData,
		posDropdownData,
		gateDropdownData,
		runwayDropdownData,
		beltDropdownData,
		checkInDropdownData,
	]);
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
						handleEdit={handleEditTable}
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
						handleEdit={handleEditTable}
						isColored
					/>
				</div>
			),
		},
	];
	return (
		<>
			<PageLoader loading={isMapLoading || isUpdateLoading} message="It may take sometime..." />
			<SocketEventListener refetch={refetch} apiName={`${GET_FLIGHT_SCHEDULE}?flightType=${tab}`} />
			<div ref={divRef} className={`body-containers ${fullScreen && 'fullScreen_flight_schedule--FullScreen'}`}>
				<ModalComponent isModalOpen={utwModal} width="80rem" closeModal={() => setUtwModal(false)}>
					<VendorMileStone isUtwLoading={isUtwLoading} getUtwData={getUtwData} tab={tab} />
				</ModalComponent>
				<ModalComponent
					isModalOpen={milestoneModal?.isOpen}
					width="80rem"
					closeModal={closeMilestoneModal}
					className="view_milestone_modal"
				>
					<MilestoneChart type={tab} data={milestoneModal?.milestoneList} labels={milestoneModal?.labels} />
				</ModalComponent>
				<ModalComponent
					isModalOpen={mapModalOpen?.isOpen}
					width="60rem"
					closeModal={closeMapModal}
					title="Map view"
					className="view_img_modal"
				>
					<img src={mapModalOpen?.base64Img} alt="base64Img" className="map_img" />
				</ModalComponent>
				<div className="flights-table">
					<CustomTabs
						defaultActiveKey="1"
						items={items}
						onChange={handleTabChange}
						extraContent={
							<div className="fullScreen_flight_schedule--Container">
								{!fullScreen && (
									<FullscreenOutlined
										onClick={toggleFullscreen}
										className="fullScreen_flight_schedule--FullScreenIcon"
									/>
								)}
								{fullScreen && (
									<FullscreenExitOutlined
										className="fullScreen_flight_schedule--FullScreenIcon"
										onClick={toggleFullscreen}
									/>
								)}
							</div>
						}
					/>
				</div>
			</div>
		</>
	);
};

export default FlightSchedule;
