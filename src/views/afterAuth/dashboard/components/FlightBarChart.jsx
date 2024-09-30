import { Card } from 'antd';
import React, { useMemo, useState } from 'react';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import RightArrow from '../../../../assets/RightArrow.svg';
import CustomSelect from '../../../../components/select/select';
import './style.scss';
import ReactApexChart from 'react-apexcharts';

const FlightBarChart = ({ cardTitle, chartData, isFilters = true }) => {
	const [chartType, setChartType] = useState('Arrival');
	const allSeries = useMemo(() => {
		if (chartData?.data?.length) {
			return chartData.data;
		}
		return [];
	}, [chartData]);

	console.log('chart data is ', allSeries);
	const series = useMemo(() => {
		return isFilters
			? chartType === 'Both'
				? allSeries
				: chartType === 'Arrival'
					? [allSeries[0]]
					: [allSeries[1]]
			: allSeries;
	}, [chartType, allSeries]);

	const options = useMemo(() => {
		return {
			chart: {
				type: 'bar',
				height: 330,
				stacked: isFilters ? chartType === 'Both' : true,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '65%',
					endingShape: 'rounded',
				},
			},
			dataLabels: {
				enabled: true,
				// formatter: function (val, opts) {
				// 	return `${val}`;
				// },
				// offsetY: -10,
				// style: {
				// 	colors: ['#fff'],
				// },
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent'],
			},
			xaxis: {
				categories: chartData?.label ?? [],
			},
			yaxis: {
				title: {
					text: chartData?.yLabelName ?? '',
				},
			},
			fill: {
				opacity: 1,
			},
			title: {
				text: isFilters ? chartType : cardTitle,
				align: 'center',
			},
		};
	}, [chartType, chartData]);

	const selectChartType = [
		{
			id: '1',
			label: 'Arrival',
			value: 'Arrival',
		},
		{
			id: '2',
			label: 'Departure',
			value: 'Departure',
		},
		{
			id: '3',
			label: 'Both',
			value: 'Both',
		},
	];

	return (
		<Card className="progress-card">
			<div className="progress-card-body">
				<div className="progress-body">
					<div className="card-title">
						<CustomTypography
							type="title"
							fontSize={16}
							fontWeight="600"
							color="black"
							children={cardTitle}
						/>
						{isFilters && (
							<CustomSelect
								SelectData={selectChartType}
								onChange={(value) => setChartType(value)}
								value={chartType}
								allowClear={false}
								className="chart-select-field"
							/>
						)}
					</div>
					{!!chartData?.data && (
						<ReactApexChart
							options={options}
							series={series}
							type="bar"
							height={chartType === 'Both' ? 350 : 370}
						/>
					)}
				</div>
				<div className="view-details">
					<CustomTypography
						type="title"
						fontSize={12}
						fontWeight="600"
						color="black"
						children="View Details"
					/>
					<img src={RightArrow} alt="arrow" />
				</div>
			</div>
		</Card>
	);
};

export default FlightBarChart;
