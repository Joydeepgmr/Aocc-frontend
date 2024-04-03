import React, { useState } from 'react';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../../components/customTabs/customTabs';
import TableComponent from '../../../../components/table/table';
import InputField from '../../../../components/input/field/field';
import ReactApexChart from 'react-apexcharts';
import './style.scss';

function getChartDetails(mileStoneType = 'arrival', data) {
	let min = 600;
	let max = 1600;
	let tickAmount = 10;
	if (mileStoneType === 'arrival') {
		min = 0;
		max = 600;
		tickAmount = 6;
	}
	return {
		series: [
			{
				data,
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					borderRadius: 2,
					horizontal: true,
					barWidth: '50%',
					barHeight: '50%',
					barSpacing: 14,
					colors: {
						backgroundBarColors: [],
						ranges: [],
						color: '#196CFD',
					},
				},
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				position: 'top',
				categories: ['AI 812', '6E 6172', 'UK 642', '6E 6172', 'AI 812', 'UK 642', 'UK 994'],
				min,
				max,
				tickAmount,
				lines: {
					show: true,
				},
				// gridLines: {
				// 	show: true, // Show grid lines along x-axis labels
				// 	borderColor: '#e0e0e0', // Grid line color
				// 	position: 'back', // Place grid lines behind bars
				// 	tickAmount, // Match tickAmount for proper spacing
				// },
			},
			yaxis: {
				lines: {
					show: true,
				},
				// gridLines: {
				// 	show: true, // Show grid lines along x-axis labels
				// 	borderColor: '#e0e0e0', // Grid line color
				// 	position: 'back', // Place grid lines behind bars
				// 	tickAmount, // Match tickAmount for proper spacing
				// },
			},
		},
	};
}
function Milestone() {
	const arrivalData = [100, 200, 300, 400, 500, 600, 200];
	const departureData = [900, 1200, 1300, 700, 1500, 1600];
	const [chartData, setChartData] = useState(getChartDetails('arrival', arrivalData));
	const [chartData2, setChartData2] = useState(getChartDetails('departure', departureData));

	const objs = {
		eobt3: { value: 100, label: 'EOBT - 3hours', progress: 16.67 },
		eobt2: { value: 200, label: 'EOBT - 2hours', progress: 36.67 },
		lru: { value: 300, label: 'Local Radar Update', progress: 46.67 },
		finalApproach: { value: 400, label: 'Final Approach', progress: 76.67 },
		aldt: { value: 500, label: 'Landing - ALDT', progress: 32.67 },
		inBlock: { value: 600, label: 'In-Block', progress: 32.67 },
		aghs: { value: 700, label: 'Actual Ground Handling Stats', progress: 32.67 },
	};
	const getDataLabel = (value) => {
		if (value >= 100 && value < 200) {
			return objs.eobt3.label;
		} else if (value >= 200 && value < 300) {
			return objs.eobt2.label;
		} else if (value >= 300 && value < 400) {
			return objs.lru.label;
		} else if (value >= 400 && value < 500) {
			return objs.finalApproach.label;
		} else if (value >= 500 && value < 600) {
			return objs.aldt.label;
		} else if (value >= 600 && value < 700) {
			return objs.inBlock.label;
		} else if (value >= 700 && value < 800) {
			return objs.aghs.label;
		} else {
			return '';
		}
	};

	const dummyData = [
		{
			id: '5a8f1f61-1175-47af-a118-fc52ea969665',
			flightId: '0922177a-1b21-4692-af93-16e66a4f8eaf',
			atld: null,
			eobt3: null,
			eobt2: null,
			atot: null,
			lru: null,
			finalApproach: null,
			currentStatus: 'eobt2',
			date: '2024-03-29T00:00:00.000Z',
			createdAt: '2024-03-28T11:13:00.072Z',
			flightNumber: '4081',
			airline: '5J',
			airportId: '0b29815e-4b75-4016-9d71-f9c87a49a000',
			progress: '16.67',
		},
		{
			id: '02b966a3-7c66-4079-b4a0-ef2d4329d789',
			flightId: '0922177a-1b21-4692-af93-16e66a4f8eaf',
			atld: null,
			eobt3: null,
			eobt2: null,
			atot: null,
			lru: null,
			finalApproach: null,
			currentStatus: 'eobt2',
			date: '2024-03-29T00:00:00.000Z',
			createdAt: '2024-03-16T12:45:29.117Z',
			flightNumber: '4081',
			airline: '5J',
			airportId: '0b29815e-4b75-4016-9d71-f9c87a49a000',
			progress: '16.67',
		},
	];

	const chartData3 = {
		series: [
			{
				name: 'Data',
				// data: [
				// 	{ x: 'Flight 1', y: objs.eobt3.value + objs.eobt3.progress, label: 'EOBT - 3hours' },
				// 	{ x: 'Flight 2', y: objs.eobt2.value + objs.eobt2.progress, label: 'EOBT - 3hours' },
				// 	{ x: 'Flight 3', y: objs.lru.value + objs.lru.progress, label: 'EOBT - 3hours' },
				// 	{
				// 		x: 'Flight 4',
				// 		y: objs.finalApproach.value + objs.finalApproach.progress,
				// 		label: 'EOBT - 3hours',
				// 	},
				// 	{ x: 'Flight 5', y: objs.aldt.value + objs.aldt.progress, label: 'EOBT - 3hours' },
				// ],
				data: dummyData.map((data) => {
					return {
						x: `${data.airline} ${data.flightNumber}`,
						y: objs[data.currentStatus].value + +data.progress,
					};
				}),
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				position: 'top',
				// categories: ['flight 1', 'flight 2', 'flight 3', 'flight 4', 'flight 5', 'flight 6', 'flight 7'],
				labels: {
					show: true,
					formatter: function (val) {
						console.log('value in label is ', val);
						return getDataLabel(val);
					},
				},
				// Adjust the label position
			},
			yaxis: {
				min: 0,
				max: 900,
				tickAmount: 10,
			},
			grid: {
				show: true,
				borderColor: '#e0e0e0',
				strokeDashArray: 0,
				position: 'back',
				xaxis: {
					lines: {
						show: true,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},
			},
			colors: ['#1976D2'],
		},
	};

	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: (
				<>
					<ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
				</>
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: (
				<>
					<ReactApexChart options={chartData2.options} series={chartData2.series} type="bar" height={350} />
				</>
			),
		},
		{
			key: '3',
			label: 'Dummy',
			children: (
				<>
					<ReactApexChart options={chartData3.options} series={chartData3.series} type="bar" height={350} />
				</>
			),
		},
	];

	const handleChange = () => {
		console.log('Tab switch');
	};
	return (
		<div className="body-container">
			<div className="top-bar">
				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={'Milestones'} />
				<div className="filter-section">
					<InputField
						label="Airport Name"
						name="search"
						placeholder="Search"
						warning="Required field"
						type="search"
					/>
				</div>
			</div>
			<div className="flights-table">
				<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
			</div>
		</div>
	);
}

export default Milestone;
