import React, { useMemo, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ConvertToDateTime } from '../../../../utils';
import './style.scss';

const MilestoneChart = ({ data = [], hasNextPage, fetchNextPage, type, labels = [], fullScreen = false }) => {
	const containerRef = useRef(null);
	const milestoneList = useMemo(() => {
		return data.map((list) => {
			let currentMilestone = list.progress * labels.length + 100;
			let goals = [];
			for (let i = 0; i < Math.round(currentMilestone / 100); i++) {
				const markObj = {
					name: labels[i]?.value,
					value: (i + 1) * 100,
					time: list[labels[i]?.key] ?? '-',
					strokeWidth: 11,
					strokeHeight: 0,
					strokeLineCap: 'round',
					strokeColor: list[labels[i]?.key] ? '#2B8A3E' : '#FA5252',
				};
				goals.push(markObj);
			}
			return {
				x: `${list?.flight?.airline?.twoLetterCode ?? ''} ${list.flight?.flightNo ?? ''}`,
				y: list.progress * labels.length + 100,
				fillColor: '#196CFD',
				goals,
			};
		});
	}, [data]);
	const getDataLabel = (value) => {
		value = parseFloat((value - 100) / labels.length).toFixed(2);
		const blockSize = parseFloat(100 / labels.length).toFixed(2);
		const index = Math.ceil(value / blockSize);
		return labels[index]?.value;
	};
	const handleScroll = () => {
		const container = containerRef.current;
		if (container) {
			const { scrollTop, scrollHeight, clientHeight } = container;
			if (scrollTop + clientHeight >= scrollHeight && hasNextPage && fetchNextPage) {
				fetchNextPage(type);
			}
		}
	};
	const chartOptions = {
		series: [
			{
				name: 'Milestone',
				data: milestoneList,
			},
		],
		options: {
			chart: {
				type: 'bar',
				height: 350,
				animations: {
					enabled: false,
				},
				toolbar: {
					show: false,
				},
			},
			plotOptions: {
				bar: {
					borderRadius: 2,
					horizontal: true,
					barWidth: '15rem',
					barHeight: '9rem',
					barSpacing: 14,
					colors: {
						backgroundBarColors: ['#F1F3F5'],
						ranges: [],
					},
				},
			},
			dataLabels: {
				enabled: false,
			},
			xaxis: {
				position: 'top',
				labels: {
					show: true,
					formatter: function (val) {
						return getDataLabel(val);
					},
				},
			},
			yaxis: {
				min: 0,
				max: type == 'arrival' ? 100 * labels.length : 100 * (labels.length - 1),
			},
			tooltip: {
				custom: function ({ series, seriesIndex, dataPointIndex, w }) {
					const data = w.config.series[seriesIndex].data[dataPointIndex];

					return `<div class="tooltip_container">
                            <p class="header">  ${data?.x}  </p>
                            <div class="tooltip_heading">
                                <span>  Current Milestone </span>
                                <span class="tooltip_value">  ${getDataLabel(data?.y)}  </span>
                            </div>
                            <div class="milestone_container">
                                <span class="milestone_header">  Milestone achieved  </span>
                                ${data.goals
							.map((goal) => {
								return `<div class="goal_heading">
                                            <span class='goal_name'>  ${goal?.name} </span>
                                            <div class='goal_achieved'>
                                            <span class="tooltip_value">  Time:  </span>
                                            <span class="tooltip_value">  ${goal?.time}  </span>
                                            </div>
                                            </div>`;
							})
							.join('')}
                            </div>
                        </div>`;
				},
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
						show: false,
					},
				},
			},
		},
	};

	return (
		<div className={`chart-container ${fullScreen && 'full-screen'}`} onScroll={handleScroll}>
			<ReactApexChart
				options={chartOptions.options}
				series={chartOptions.series}
				type="bar"
				height={70 * data?.length}
				style={{ paddingTop: '1rem' }}
			/>
		</div>
		// <div style={{ maxHeight: 400, overflowY: 'auto', backgroundColor: 'black' }}>
		//     <InfiniteScroll hasMore={hasNextPage} next={fetchNextPage} dataLength={data?.length} >
		//         <ReactApexChart
		//             options={chartOptions.options}
		//             series={chartOptions.series}
		//             type="bar"
		//             height={100 * data?.length}
		//             style={{ paddingTop: '5rem' }}
		//             className="chart-container"
		//         />
		//     </InfiniteScroll>
		// </div>
	);
};

export default MilestoneChart;
