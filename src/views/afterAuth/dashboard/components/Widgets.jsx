import React, { useState } from 'react';
import GraphCard from './GraphCard';
import ProgressionCard from './ProgressionCard';
import './style.scss';
import { Form } from 'antd';
import CustomSelect from '../../../../components/select/select';
import { useGetDashboardData, useGetOnTimeData } from '../../../../services/kpi/kpiService';

const Widgets = () => {
	const [form] = Form.useForm();
	const [formatValue, setFormatValue] = useState('monthly');
	const [chartData, setChartData] = useState([]);
	const dashboardApiProps = {
		duration: formatValue,
		onSuccess: ({ data }) => {
			const label = ['International', 'Domestic'];
			const onGround = { data: [], label };
			onGround.data = data?.onGroundStats?.reduce((acc, { count }) => [...acc, +count], []);
			const runway = { data: [], label };
			runway.data = data?.runwayUtilizationStats?.reduce((acc, { count }) => [...acc, +count], []);
			const airTraffic = { data: [], label };
			airTraffic.data = data?.airTrafficStats?.reduce((acc, { count }) => [...acc, +count], []);
			setChartData({ onGround, runway, airTraffic });
		},
	};
	const onTimeApiProps = {
		duration: formatValue,
	};
	const { data } = useGetDashboardData(dashboardApiProps);
	const { data: onTimeData } = useGetOnTimeData(onTimeApiProps);
	console.log('on time data is ', data);
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
			<Form form={form}>
				<CustomSelect
					SelectData={SelectFormat}
					placeholder="Select Format"
					onChange={handleFormatValueChange}
					value={formatValue}
				/>
			</Form>
			<div className="widgets-containers">
				<ProgressionCard cardTitle="On Time Performer" airlineData={onTimeData?.data?.statistics ?? []} />
				<GraphCard cardTitle="Air Traffic Movement" chartData={chartData?.airTraffic} />
				<GraphCard cardTitle="Number of flights on Ground" chartData={chartData?.onGround} />
				<ProgressionCard cardTitle="Aircraft parking stand" airlineData={airlineData} />
				<GraphCard cardTitle="Runway Utilization" chartData={chartData?.runway} />
				<GraphCard cardTitle="CO2 Emission" />
			</div>
		</div>
	);
};

export default Widgets;
