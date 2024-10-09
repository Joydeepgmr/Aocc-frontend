import React, { useMemo, useState } from 'react';
import GraphCard from './GraphCard';
import ProgressionCard from './ProgressionCard';
import { Form } from 'antd';
import CustomSelect from '../../../../components/select/select';
import { useGetDashboardData, useGetOnTimeData } from '../../../../services/kpi/kpiService';
import './style.scss';
import FlightBarChart from './FlightBarChart';
import PageLoader from '../../../../components/pageLoader/pageLoader';

const Widgets = () => {
	const [form] = Form.useForm();
	const [chartData, setChartData] = useState([]);
	const [filter1, setFilter1] = useState('Arrival');
	const [filter2, setFilter2] = useState('Domestic');

	const dashboardApiProps = {
		duration: 'monthly',
		onSuccess: ({ data }) => {
			const label = ['Domestic', 'International'];
			const onTime = {
				data: [
					{ name: 'Arrival', data: Object.values(data?.ontime?.arrivalOnTimeCounts ?? {}) },
					{ name: 'Departure', data: Object.values(data?.ontime?.departureOnTimeCounts ?? {}) },
				],
				label: Object.keys(data?.ontime?.arrivalOnTimeCounts ?? {}),
				yLabelName: 'No. of Flights',
			};
			const onDelay = {
				data: [
					{ name: 'Arrival', data: Object.values(data?.delay?.arrivalDelayCounts ?? {}) },
					{ name: 'Departure', data: Object.values(data?.delay?.departureDelayCounts ?? {}) },
				],
				label: Object.keys(data?.ontime?.arrivalOnTimeCounts ?? {}),
				yLabelName: 'No. of Flights',
			};

			const onParking = {
				data: [
					{
						name: 'parking',
						data: data.parkingStandUtilization.reduce(
							(acc, { slotCount }) => [...acc, parseInt(slotCount)],
							[]
						),
					},
				],
				label: data.parkingStandUtilization.reduce((acc, { airlineName }) => [...acc, airlineName], []),
				yLabelName: 'No. of Hours',
			};

			const onCount = {
				data: [
					{
						name: 'Flight Status',
						data: data.counts.reduce((acc, { count }) => [...acc, count], []),
					},
				],
				label: data.counts.reduce((acc, { status }) => [...acc, status], []),
				yLabelName: 'No. of Flights',
			};

			const onAirTraffic = {
				data: [
					{
						name: 'Arrival',
						data: Object.values(data.airTrafic.timeSlotTraffic).reduce(
							(acc, { arrivals }) => [...acc, arrivals],
							[]
						),
					},
					{
						name: 'Departure',
						data: Object.values(data.airTrafic.timeSlotTraffic).reduce(
							(acc, { departures }) => [...acc, departures],
							[]
						),
					},
				],
				label: Object.keys(data.airTrafic.timeSlotTraffic),
				yLabelName: 'No. of Flights',
			};

			const onAirTrafficFlightType = {
				data: [
					{
						name: 'Domestic',
						data: Object.values(data.airTrafic.flightTypeSlotTraffic).reduce(
							(acc, { domestic }) => [...acc, domestic],
							[]
						),
					},
					{
						name: 'International',
						data: Object.values(data.airTrafic.flightTypeSlotTraffic).reduce(
							(acc, { international }) => [...acc, international],
							[]
						),
					},
				],
				label: Object.keys(data.airTrafic.flightTypeSlotTraffic),
				yLabelName: 'No. of Flights',
			};
			const onGround = { data: [], label };
			onGround.data = data?.onGroundStats?.reduce((acc, { count }) => [...acc, +count], []);
			const runway = { data: [], label };
			runway.data = data?.runwayUtilizationStats?.reduce((acc, { count }) => [...acc, +count], []);
			const airTraffic = { data: [], label };
			airTraffic.data = data?.airTrafficStats?.reduce((acc, { count }) => [...acc, +count], []);
			setChartData({
				onDelay,
				onTime,
				onParking,
				onAirTraffic,
				onAirTrafficFlightType,
				onCount,
				runway,
				airTraffic,
			});
		},
	};
	const { isLoading } = useGetDashboardData(dashboardApiProps);

	const onTimeColumns = useMemo(() => {
		const column = [
			{ title: 'Flight Number', dataIndex: ['flight', 'flight', 'callSign'], align: 'center', key: 'callSign' },
			filter1 === 'Arrival'
				? { title: 'STA', dataIndex: ['flight', 'flight', 'sta'], align: 'center', key: 'sta' }
				: { title: 'STD', dataIndex: ['flight', 'flight', 'std'], align: 'center', key: 'std' },
			filter1 === 'Arrival'
				? { title: 'ETA', dataIndex: ['flight', 'eta'], align: 'center', key: 'eta' }
				: { title: 'ETD', dataIndex: ['flight', 'etd'], align: 'center', key: 'etd' },
			{ title: 'Date', dataIndex: ['flight', 'flight', 'date'], align: 'center', key: 'date' },
			{ title: 'Sector', dataIndex: ['flight', 'flight', 'sector'], align: 'center', key: 'sector' },
			{ title: 'Type', dataIndex: ['flight', 'flight', 'type'], align: 'center', key: 'type' },
		];
		return column;
	}, [filter1]);

	const onDelayColumns = useMemo(() => {
		const column = [
			{ title: 'Flight Number', dataIndex: ['flight', 'flight', 'callSign'], align: 'center', key: 'callSign' },
			filter1 === 'Arrival'
				? { title: 'STA', dataIndex: ['flight', 'flight', 'sta'], align: 'center', key: 'sta' }
				: { title: 'STD', dataIndex: ['flight', 'flight', 'std'], align: 'center', key: 'std' },
			filter1 === 'Arrival'
				? { title: 'ETA', dataIndex: ['flight', 'eta'], align: 'center', key: 'eta' }
				: { title: 'ETD', dataIndex: ['flight', 'etd'], align: 'center', key: 'etd' },
			{ title: 'Date', dataIndex: ['flight', 'flight', 'date'], align: 'center', key: 'date' },
			{ title: 'Sector', dataIndex: ['flight', 'flight', 'sector'], align: 'center', key: 'sector' },
			{ title: 'Type', dataIndex: ['flight', 'flight', 'type'], align: 'center', key: 'type' },
		];
		return column;
	}, [filter1]);

	const trafficColumnFlightType = useMemo(() => {
		const column = [
			{ title: 'Flight Number', dataIndex: 'callSign', align: 'center', key: 'callSign' },
			filter1 === 'Arrival'
				? { title: 'STA', dataIndex: 'sta', align: 'center', key: 'sta' }
				: { title: 'STD', dataIndex: 'std', align: 'center', key: 'std' },
			{ title: 'Date', dataIndex: 'date', align: 'center', key: 'date' },
			{ title: 'Sector', dataIndex: 'sector', align: 'center', key: 'sector' },
			{ title: 'Type', dataIndex: 'type', align: 'center', key: 'type' },
		];
		return column;
	}, [filter1]);

	const trafficColumnType = useMemo(() => {
		const column = [
			{ title: 'Flight Number', dataIndex: 'callSign', align: 'center', key: 'callSign' },
			{ title: 'Type', dataIndex: 'flightType', align: 'center', key: 'flightType' },
			{
				title: 'STA/STD',
				dataIndex: 'sta',
				align: 'center',
				key: 'sta',
				render: (text, rcd) => rcd?.sta ?? rcd?.std,
			},
			{ title: 'Date', dataIndex: 'date', align: 'center', key: 'date' },
			{ title: 'Sector', dataIndex: 'sector', align: 'center', key: 'sector' },
		];
		return column;
	}, [filter2]);

	return (
		<div>
			{!isLoading && (
				<div className="widgets-containers">
					<FlightBarChart
						cardTitle="On Time Performance"
						chartData={chartData?.onTime}
						apiFilterName="onTime"
						data={filter1 === 'Arrival' ? 'filteredArrivals' : 'filteredDepartures'}
						columns={onTimeColumns}
						filter1={filter1}
						setFilter1={setFilter1}
						showFilter1
					/>
					<FlightBarChart
						cardTitle="Delay Flights"
						chartData={chartData?.onDelay}
						apiFilterName="delay"
						data={filter1 === 'Arrival' ? 'filteredArrivals' : 'filteredDepartures'}
						columns={onDelayColumns}
						filter1={filter1}
						setFilter1={setFilter1}
						showFilter1
					/>
					<FlightBarChart
						cardTitle="Air Traffic (Arrival/Departure)"
						chartData={chartData?.onAirTraffic}
						apiFilterName="traffic"
						data={filter1 === 'Arrival' ? 'arrival' : 'departure'}
						columns={trafficColumnFlightType}
						filter1={filter1}
						setFilter1={setFilter1}
						showFilter1
					/>
					<FlightBarChart
						cardTitle="Air Traffic (Domestic/International)"
						chartData={chartData?.onAirTrafficFlightType}
						isFilters={false}
						apiFilterName="traffic"
						data={filter2 === 'Domestic' ? 'domestic' : 'international'}
						columns={trafficColumnType}
						filter2={filter2}
						setFilter2={setFilter2}
						showFilter2
					/>
					<FlightBarChart
						cardTitle="Parking Utilization"
						chartData={chartData?.onParking}
						isFilters={false}
					/>
					<FlightBarChart cardTitle="Flight Status" chartData={chartData?.onCount} isFilters={false} />

					{/* <FlightBarChart cardTitle="Departure Flights" chartData={chartData?.airTraffic} />
				<FlightBarChart cardTitle="Delay Flights" chartData={chartData?.airTraffic} />
				<FlightBarChart cardTitle="Parking Stand" chartData={chartData?.airTraffic} /> */}
					{/* <ProgressionCard cardTitle="On Time Performer" airlineData={onTimeData?.data?.statistics ?? []} />
				<GraphCard cardTitle="Air Traffic Movement" chartData={chartData?.airTraffic} />
				<GraphCard cardTitle="Number of flights on Ground" chartData={chartData?.onGround} />
				<ProgressionCard cardTitle="Aircraft parking stand" airlineData={airlineData} />
				<GraphCard cardTitle="Runway Utilization" chartData={chartData?.runway} />
				<GraphCard cardTitle="CO2 Emission" chartData={{ ...chartData?.runway, data: [0, 0] }} /> */}
				</div>
			)}
			{isLoading && <PageLoader loading={isLoading} />}
		</div>
	);
};

export default Widgets;
