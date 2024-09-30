import React, { useState } from 'react';
import GraphCard from './GraphCard';
import ProgressionCard from './ProgressionCard';
import { Form } from 'antd';
import CustomSelect from '../../../../components/select/select';
import { useGetDashboardData, useGetOnTimeData } from '../../../../services/kpi/kpiService';
import './style.scss';
import FlightBarChart from './FlightBarChart';

const Widgets = () => {
	const [form] = Form.useForm();
	const [formatValue, setFormatValue] = useState('monthly');
	const [chartData, setChartData] = useState([]);
	const dashboardApiProps = {
		duration: formatValue,
		onSuccess: ({ data }) => {
			const label = ['Domestic', 'International'];
			const onTime = {
				data: [
					{ name: 'Arrival', data: Object.values(data?.ontime?.arrivalOnTimeCounts ?? {}) },
					{ name: 'Departure', data: Object.values(data?.ontime?.departureOnTimeCounts ?? {}) },
				],
				label: Object.keys(data?.ontime?.arrivalOnTimeCounts ?? {}),
				yLabelName: 'Number of Flights',
			};
			const onDelay = {
				data: [
					{ name: 'Arrival', data: Object.values(data?.delay?.arrivalDelayCounts ?? {}) },
					{ name: 'Departure', data: Object.values(data?.delay?.departureDelayCounts ?? {}) },
				],
				label: Object.keys(data?.ontime?.arrivalOnTimeCounts ?? {}),
				yLabelName: 'Number of Flights',
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
				yLabelName: 'Number of Flights',
			};

			const onCount = {
				data: [
					{
						name: 'Flight Status',
						data: data.counts.reduce((acc, { count }) => [...acc, count], []),
					},
				],
				label: data.counts.reduce((acc, { status }) => [...acc, status], []),
				yLabelName: 'Number of Flights',
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
				yLabelName: 'Number of Flights',
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
				yLabelName: 'Number of Flights',
			};
			console.log('on traffic is', onAirTrafficFlightType);
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
	const onTimeApiProps = {
		duration: formatValue,
	};
	const { data } = useGetDashboardData(dashboardApiProps);
	const { data: onTimeData } = useGetOnTimeData(onTimeApiProps);
	const SelectFormat = [
		{
			label: 'Monthly',
			value: 'monthly',
		},
	];
	const airlineData = [
		{
			airlineName: 'Air India',
			percentageOnTime: 80,
		},
		{
			airlineName: 'Vistara',
			percentageOnTime: 60,
		},
		{
			airlineName: 'Indigo',
			percentageOnTime: 50,
		},
		{
			airlineName: 'Indigo',
			percentageOnTime: 50,
		},
	];
	const handleFormatValueChange = (value) => {
		setFormatValue(value);
	};

	return (
		<div>
			{/* <Form form={form}>
				<CustomSelect
					SelectData={SelectFormat}
					placeholder="Select Format"
					onChange={handleFormatValueChange}
					value={formatValue}
				/>
			</Form> */}
			<div className="widgets-containers">
				<FlightBarChart cardTitle="On Time Performance" chartData={chartData?.onTime} />
				<FlightBarChart cardTitle="Delay Flights" chartData={chartData?.onDelay} />
				<FlightBarChart cardTitle="Air Traffic (Arrival/Departure)" chartData={chartData?.onAirTraffic} />
				<FlightBarChart
					cardTitle="Air Traffic (Domestic/International)"
					chartData={chartData?.onAirTrafficFlightType}
					isFilters={false}
				/>
				<FlightBarChart cardTitle="Parking Utilization" chartData={chartData?.onParking} isFilters={false} />
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
		</div>
	);
};

export default Widgets;
