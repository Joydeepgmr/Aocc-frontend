import React, { useState } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import './cdm.scss';
import TableComponent from '../../../components/table/table';
import { CombineUtcDateAndIstTime, ConvertUtcToIst, SplitTimeFromDateAndTime } from '../../../utils';
import CustomSelect from '../../../components/select/select';
import {
	useGetAllCdmArrivalDeparture,
	useGetAllCdmTurnAround,
	useUpdateCdmTurnAround,
	useUpdateCdmTypes,
} from '../../../services';
import toast from 'react-hot-toast';
import PageLoader from '../../../components/pageLoader/pageLoader';
import { useQueryClient } from 'react-query';

const CDM = () => {
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = useState('1');
	const [type, setType] = useState('arrival');
	const [selectedTimeValue, setSelectedTimeValue] = useState('24hrs');
	const [cdmData, setCdmData] = useState([]);
	const [rowData, setRowData] = useState({});

	const getCdmHandler = {
		onSuccess: (data) => handleGetCdmSuccess(data),
		onError: (error) => handleGetCdmError(error),
	};
	const editCDMHandler = {
		onSuccess: (data) => handleEditCDMSuccess(data),
		onError: (error) => handleEditCDMError(error),
	};

	const {
		data: fetchedPlannerCdmTurnAround,
		isLoading: isPlannerCdmTurnAroundLoading,
		isFetching: isPlannerCdmTurnAroundFetching,
		hasNextPage: isPlannerCdmTurnAroundHasNextPage,
		fetchNextPage: isPlannerCdmTurnAroundFetchNextPage,
		refetch: isPlannerCdmTurnAroundRefetching,
	} = useGetAllCdmTurnAround(selectedTimeValue?.slice(0, 2), getCdmHandler);

	const { mutate: onUpdateCDMTurnAround, isLoading: isUpdateCDMTurnAroundLoading } = useUpdateCdmTurnAround(
		rowData?.arrivalId,
		rowData?.departureId,
		editCDMHandler
	);

	const {
		data: fetchedPlannerCdm,
		isLoading: isPlannerCdmLoading,
		isFetching: isPlannerCdmFetching,
		hasNextPage: isPlannerCdmHasNextPage,
		fetchNextPage: isPlannerCdmFetchNextPage,
	} = useGetAllCdmArrivalDeparture(type, selectedTimeValue?.slice(0, 2), getCdmHandler);

	const { mutate: onUpdateCDM, isLoading: isUpdateCDMLoading } = useUpdateCdmTypes(rowData?.id, editCDMHandler);

	const handleGetCdmSuccess = (data) => {
		if (data?.pages) {
			const newData = data?.pages.reduce((acc, page) => {
				const modifiedPageData = page.data.map((item) => ({
					...item,
					eobt3: item?.eobt3 ?? null,
					eldt: item?.eldt ?? null,
					aldt: item?.aldt ?? null,
					eibt: item?.eibt ?? null,
					aibt: item?.aibt ?? null,
					tobt: item?.tobt ?? null,
					aobt: item?.aobt ?? null,
					tsat: item?.tsat ?? null,
					atot: item?.atot ?? null,
				}));
				return acc.concat(modifiedPageData);
			}, []);

			setCdmData([...newData]);
		}
	};

	const handleGetCdmError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleEditCDMSuccess = (data) => {
		activeTab === '3'
			? isPlannerCdmTurnAroundRefetching()
			: queryClient.invalidateQueries('get-all-cdm-arrival-departure');
		toast.success(data?.message);
		setRowData({});
	};

	const handleEditCDMError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleTimeValueChange = (value) => {
		setSelectedTimeValue(value);
	};

	const handleTabChange = (key) => {
		setActiveTab(key);
		if (key === '1') {
			setType('arrival');
		}
		if (key === '2') {
			setType('departure');
		}
		if (key === '3') {
			setType('');
			isPlannerCdmTurnAroundRefetching();
		}
	};
	const formattedTime = (data) => {
		const timeRegex = /^\d{2}:\d{2}$/;
		if (timeRegex.test(data)) {
			return `${data}`;
		} else {
			return new Date(data).toLocaleTimeString('en-US', {
				hour12: false,
				hour: '2-digit',
				minute: '2-digit',
			});
		}
	};

	const handleEditTable = (item) => {
		setRowData(item);
		const data = {
			eobt3: item?.values?.eobt3 ? `${formattedTime(item?.values?.eobt3)}` : null,
			eldt: item?.values?.eldt ? `${formattedTime(item?.values?.eldt)}` : null,
			aldt: item?.values?.aldt ? `${formattedTime(item?.values?.aldt)}` : null,
			eibt: item?.values?.eibt ? `${formattedTime(item?.values?.eibt)}` : null,
			aibt: item?.values?.aibt ? `${formattedTime(item?.values?.aibt)}` : null,
			tobt: item?.values?.tobt ? `${formattedTime(item?.values?.tobt)}` : null,
			aobt: item?.values?.aobt ? `${formattedTime(item?.values?.aobt)}` : null,
			tsat: item?.values?.tsat ? `${formattedTime(item?.values?.tsat)}` : null,
			atot: item?.values?.atot ? `${formattedTime(item?.values?.atot)}` : null,
			remark: item?.remark ?? null,
		};
		const hasNonNullValue = Object.values(data).some((value) => value !== null);
		activeTab === '3' ? hasNonNullValue && onUpdateCDMTurnAround(data) : hasNonNullValue && onUpdateCDM(data);
	};
	const columns =
		activeTab === '1'
			? [
					{
						title: 'FLNR',
						dataIndex: 'flight_number',
						key: 'flight_number',
						render: (flight_number) => flight_number ?? '-',
						align: 'center',
					},
					{
						title: '4L',
						dataIndex: 'icao_code',
						key: 'icao_code',
						render: (icao_code) => icao_code ?? '-',
						align: 'center',
					},
					{
						title: '3L',
						dataIndex: 'iata_code',
						key: 'iata_code',
						render: (iata_code) => iata_code ?? '-',
						align: 'center',
					},
					{
						title: 'A/C TYPE',
						dataIndex: 'aircraft',
						key: 'aircraft',
						render: (aircraft) => aircraft ?? '-',
						align: 'center',
					},
					{
						title: 'REG',
						dataIndex: 'registration',
						key: 'registration',
						render: (registration) => registration ?? '-',
						align: 'center',
					},
					{
						title: 'ORG',
						dataIndex: 'origin',
						key: 'origin',
						render: (origin) => origin ?? '-',
						align: 'center',
					},
					{
						title: 'FLDT',
						dataIndex: 'date',
						key: 'date',
						render: (date) => date ?? '-',
						align: 'center',
					},

					{
						title: 'ELDT',
						dataIndex: 'eldt',
						key: 'eldt',
						render: (eldt) => (eldt ? eldt : '-'),
						align: 'center',
						editable: { type: 'time' },
					},
					{
						title: 'ALDT',
						dataIndex: 'aldt',
						key: 'aldt',
						render: (aldt) => (aldt ? aldt : '-'),
						align: 'center',
						editable: { type: 'time' },
					},
					{
						title: 'EIBT',
						dataIndex: 'eibt',
						key: 'eibt',
						render: (eibt) => (eibt ? eibt : '-'),
						align: 'center',
						editable: { type: 'time' },
					},
					{
						title: 'AIBT',
						dataIndex: 'aibt',
						key: 'aibt',
						render: (aibt) => (aibt ? aibt : '-'),
						align: 'center',
						editable: { type: 'time' },
					},
					{
						title: 'RWY',
						dataIndex: 'runway',
						key: 'runway',
						render: (runway) => runway ?? '-',
						align: 'center',
					},
					{
						title: 'POS',
						dataIndex: 'stand',
						key: 'stand',
						render: (stand) => stand ?? '-',
						align: 'center',
					},
					{
						title: 'REM',
						dataIndex: 'remark',
						key: 'remark',
						render: (remark) => remark ?? '-',
						align: 'center',
						editable: { type: 'text' },
					},
					{
						title: 'LINK FLIGHT',
						dataIndex: 'link',
						key: 'link',
						render: (link) => link ?? '-',
						align: 'center',
					},
				]
			: activeTab === '2'
				? [
						{
							title: 'FLNR',
							dataIndex: 'flight_number',
							key: 'flight_number',
							render: (flight_number) => flight_number ?? '-',
							align: 'center',
						},
						{
							title: '4L',
							dataIndex: 'icao_code',
							key: 'icao_code',
							render: (icao_code) => icao_code ?? '-',
							align: 'center',
						},
						{
							title: '3L',
							dataIndex: 'iata_code',
							key: 'iata_code',
							render: (iata_code) => iata_code ?? '-',
							align: 'center',
						},
						{
							title: 'A/C TYPE',
							dataIndex: 'aircraft',
							key: 'aircraft',
							render: (aircraft) => aircraft ?? '-',
							align: 'center',
						},
						{
							title: 'REG',
							dataIndex: 'registration',
							key: 'registration',
							render: (registration) => registration ?? '-',
							align: 'center',
						},
						{
							title: 'DES',
							dataIndex: 'desination',
							key: 'destination',
							render: (destination) => destination ?? '-',
							align: 'center',
						},
						{
							title: 'FLDT',
							dataIndex: 'date',
							key: 'date',
							render: (date) => (date ? date : '-'),
							align: 'center',
						},

						{
							title: 'EOBT',
							dataIndex: 'eobt3',
							key: 'eobt3',
							render: (eobt3) => (eobt3 ? eobt3 : '-'),
							align: 'center',
							editable: { type: 'time' },
						},
						{
							title: 'TOBT',
							dataIndex: 'tobt',
							key: 'tobt',
							render: (tobt) => (tobt ? tobt : '-'),
							align: 'center',
							editable: { type: 'time' },
						},
						{
							title: 'AOBT',
							dataIndex: 'aobt',
							key: 'aobt',
							render: (aobt) => (aobt ? aobt : '-'),
							align: 'center',
							editable: { type: 'time' },
						},
						{
							title: 'TSAT',
							dataIndex: 'tsat',
							key: 'tsat',
							render: (tsat) => (tsat ? tsat : '-'),
							align: 'center',
							editable: { type: 'time' },
						},

						{
							title: 'ATOT',
							dataIndex: 'atot',
							key: 'atot',
							render: (atot) => (atot ? atot : '-'),
							align: 'center',
							editable: { type: 'time' },
						},
						{
							title: 'RWY',
							dataIndex: 'runway',
							key: 'runway',
							render: (runway) => runway ?? '-',
							align: 'center',
						},
						{
							title: 'REM',
							dataIndex: 'remark',
							key: 'remark',
							render: (remark) => remark ?? '-',
							align: 'center',
							editable: { type: 'text' },
						},
						{
							title: 'POS',
							dataIndex: 'stand',
							key: 'stand',
							render: (stand) => stand ?? '-',
							align: 'center',
						},
					]
				: [
						{
							title: 'COMMON',
							children: [
								{
									title: 'REG',
									dataIndex: 'registration',
									key: 'registration',
									render: (registration) => registration ?? '-',
									align: 'center',
								},
								{
									title: 'A/C TYPE',
									dataIndex: 'aircraft',
									key: 'aircraft',
									render: (aircraft) => aircraft ?? '-',
									align: 'center',
								},
								{
									title: 'POS',
									dataIndex: 'stand',
									key: 'stand',
									render: (stand) => stand ?? '-',
									align: 'center',
								},
							],
						},
						{
							title: 'ARR',
							editable: true,
							children: [
								{
									title: 'FLNR',
									dataIndex: 'arrivalFlightNum',
									key: 'arrivalFlightNum',
									render: (arrivalFlightNum) => arrivalFlightNum ?? '-',
									align: 'center',
								},
								{
									title: '4L',
									dataIndex: 'iataArrival',
									key: 'iataArrival',
									render: (iataArrival) => iataArrival ?? '-',
									align: 'center',
								},
								{
									title: '3L',
									dataIndex: 'icaoArrival',
									key: 'icaoArrival',
									render: (icaoArrival) => icaoArrival ?? '-',
									align: 'center',
								},
								{
									title: 'ORG',
									dataIndex: 'arrivalSector',
									key: 'arrivalSector',
									render: (arrivalSector) => arrivalSector ?? '-',
									align: 'center',
								},

								{
									title: 'ELDT',
									dataIndex: 'eldt',
									key: 'eldt',
									render: (eldt) => eldt ?? '-',
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'ALDT',
									dataIndex: 'aldt',
									key: 'aldt',
									render: (aldt) => aldt ?? '-',
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'EIBT',
									dataIndex: 'eibt',
									key: 'eibt',
									render: (eibt) => eibt ?? '-',
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'AIBT',
									dataIndex: 'aibt',
									key: 'aibt',
									render: (aibt) => aibt ?? '-',
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'RWY',
									dataIndex: 'runwayArrival',
									key: 'runwayArrival',
									render: (runwayArrival) => runwayArrival ?? '-',
									align: 'center',
								},
							],
						},
						{
							title: 'DEP',
							editable: true,
							children: [
								{
									title: 'FLNR',
									dataIndex: 'departureFlightNum',
									key: 'departureFlightNum',
									render: (departureFlightNum) => departureFlightNum ?? '-',
									align: 'center',
								},
								{
									title: '4L',
									dataIndex: 'iataDeparture',
									key: 'iataDeparture',
									render: (iataDeparture) => iataDeparture ?? '-',
									align: 'center',
								},
								{
									title: '3L',
									dataIndex: 'icaoDeparture',
									key: 'icaoDeparture',
									render: (icaoDeparture) => icaoDeparture ?? '-',
									align: 'center',
								},
								{
									title: 'DES',
									dataIndex: 'departureSector',
									key: 'departureSector',
									render: (departureSector) => departureSector ?? '-',
									align: 'center',
								},
								{
									title: 'EOBT',
									dataIndex: 'eobt3',
									key: 'eobt3',
									render: (eobt3) => (eobt3 ? eobt3 : '-'),
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'TOBT',
									dataIndex: 'tobt',
									key: 'tobt',
									render: (tobt) => (tobt ? tobt : '-'),
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'AOBT',
									dataIndex: 'aobt',
									key: 'aobt',
									render: (aobt) => (aobt ? aobt : '-'),
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'TSAT',
									dataIndex: 'tsat',
									key: 'tsat',
									render: (tsat) => (tsat ? tsat : '-'),
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'ATOT',
									dataIndex: 'atot',
									key: 'atot',
									render: (atot) => (atot ? atot : '-'),
									align: 'center',
									editable: { type: 'time' },
								},
								{
									title: 'RWY',
									dataIndex: 'runwayDeparture',
									key: 'runwayDeparture',
									render: (runwayDeparture) => runwayDeparture ?? '-',
									align: 'center',
								},
							],
						},
					];

	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: !(
				isPlannerCdmLoading ||
				isUpdateCDMLoading ||
				isUpdateCDMTurnAroundLoading ||
				isPlannerCdmTurnAroundLoading ||
				isPlannerCdmTurnAroundFetching
			) && (
				<TableComponent
					columns={columns}
					data={cdmData}
					handleEdit={handleEditTable}
					loading={
						isPlannerCdmLoading ||
						isUpdateCDMLoading ||
						isUpdateCDMTurnAroundLoading ||
						isPlannerCdmTurnAroundLoading ||
						isPlannerCdmTurnAroundFetching
					}
					fetchData={isPlannerCdmFetchNextPage}
					pagination={isPlannerCdmHasNextPage}
					isColored
				/>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: !(
				isPlannerCdmLoading ||
				isUpdateCDMLoading ||
				isUpdateCDMTurnAroundLoading ||
				isPlannerCdmTurnAroundLoading ||
				isPlannerCdmTurnAroundFetching
			) && (
				<TableComponent
					columns={columns}
					data={cdmData}
					handleEdit={handleEditTable}
					loading={
						isPlannerCdmLoading ||
						isUpdateCDMLoading ||
						isUpdateCDMTurnAroundLoading ||
						isPlannerCdmTurnAroundLoading ||
						isPlannerCdmTurnAroundFetching
					}
					fetchData={isPlannerCdmFetchNextPage}
					pagination={isPlannerCdmHasNextPage}
					isColored
				/>
			),
		},
		{
			key: '3',
			label: 'Turn Around',
			children: !(
				isPlannerCdmLoading ||
				isUpdateCDMLoading ||
				isUpdateCDMTurnAroundLoading ||
				isPlannerCdmTurnAroundLoading ||
				isPlannerCdmTurnAroundFetching
			) && (
				<TableComponent
					columns={columns}
					data={cdmData}
					handleEdit={handleEditTable}
					loading={
						isPlannerCdmLoading ||
						isUpdateCDMLoading ||
						isUpdateCDMTurnAroundLoading ||
						isPlannerCdmTurnAroundLoading ||
						isPlannerCdmTurnAroundFetching
					}
					fetchData={isPlannerCdmFetchNextPage}
					pagination={isPlannerCdmHasNextPage}
					isColored
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
				{(isUpdateCDMLoading ||
					isPlannerCdmLoading ||
					isPlannerCdmFetching ||
					isUpdateCDMTurnAroundLoading ||
					isPlannerCdmTurnAroundLoading ||
					isPlannerCdmTurnAroundFetching) && (
					<PageLoader
						loading={
							isUpdateCDMLoading ||
							isPlannerCdmLoading ||
							isPlannerCdmFetching ||
							isUpdateCDMTurnAroundLoading ||
							isPlannerCdmTurnAroundLoading ||
							isPlannerCdmTurnAroundFetching
						}
					/>
				)}
			</div>
		</>
	);
};

export default React.memo(CDM);
