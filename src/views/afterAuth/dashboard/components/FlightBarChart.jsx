import { Card } from 'antd';
import React, { useMemo, useState } from 'react';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import RightArrow from '../../../../assets/RightArrow.svg';
import CustomSelect from '../../../../components/select/select';
import './style.scss';
import ReactApexChart from 'react-apexcharts';

const FlightBarChart = ({ cardTitle, chartData }) => {
	const [chartType, setChartType] = useState('Domestic');
	const allSeries = [
		{
			name: 'International Flights',
			data: [5, 10, 8, 12, 7, 15, 20, 18, 9, 11, 6, 13],
		},
		{
			name: 'Domestic Flights',
			data: [8, 15, 10, 18, 12, 20, 25, 22, 14, 17, 9, 16],
		},
	];

	const series = useMemo(() => {
		return chartType === 'Both' ? allSeries : chartType === 'Domestic' ? [allSeries[1]] : [allSeries[0]];
	}, [chartType]);

	const options = useMemo(() => {
		return {
			chart: {
				type: 'bar',
				height: 330,
				stacked: chartType === 'Both',
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: '55%',
					endingShape: 'rounded',
				},
			},
			dataLabels: {
				enabled: true,
				formatter: function (val, opts) {
					return `${val}`;
				},
				offsetY: -10,
				style: {
					colors: ['#fff'],
				},
			},
			stroke: {
				show: true,
				width: 2,
				colors: ['transparent'],
			},
			xaxis: {
				categories: [
					'00:00-02:00',
					'02:00-04:00',
					'04:00-06:00',
					'06:00-08:00',
					'08:00-10:00',
					'10:00-12:00',
					'12:00-14:00',
					'14:00-16:00',
					'16:00-18:00',
					'18:00-20:00',
					'20:00-22:00',
					'22:00-00:00',
				], // 2-hour intervals for the last 24 hours
			},
			yaxis: {
				title: {
					text: 'Number of Flights',
				},
			},
			fill: {
				opacity: 1,
			},
			title: {
				text: cardTitle,
				align: 'center',
			},
		};
	}, [chartType]);

	const selectChartType = [
		{
			id: '1',
			label: 'Domestic',
			value: 'Domestic',
		},
		{
			id: '2',
			label: 'International',
			value: 'International',
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
						<CustomSelect
							SelectData={selectChartType}
							onChange={(value) => setChartType(value)}
							value={chartType}
							allowClear={false}
							className="chart-select-field"
						/>
					</div>
					<ReactApexChart
						options={options}
						series={series}
						type="bar"
						height={chartType === 'Both' ? 350 : 370}
					/>
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
