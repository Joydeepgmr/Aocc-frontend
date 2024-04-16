import React, { useCallback, useMemo, useRef } from 'react'
import ReactApexChart from 'react-apexcharts';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';

const MilestoneChart = ({ data = [], hasNextPage, fetchNextPage, type, labels = [] }) => {
    // const containerRef = useRef(null);
    const milestoneList = useMemo(() => {
        return data.map((list) => {
            return {
                x: `${list.airline ?? ''} ${list.flightNumber ?? ''}`,
                y: list.progress * labels.length + 100,
                // goals: [
                //     {
                //         name: 'EOBT-3 hour',
                //         value: 100,
                //         time: '16:30',
                //         strokeWidth: 15,
                //         strokeHeight: 0,
                //         strokeLineCap: 'round',
                //         strokeColor: '#FA5252'
                //     },
                //     {
                //         name: 'EOBT-3 hour',
                //         value: 200,
                //         time: null,
                //         strokeWidth: 15,
                //         strokeHeight: 0,
                //         strokeLineCap: 'round',
                //         strokeColor: '#2B8A3E'
                //     }
                // ]
            }
        });
    }, [data]);
    const getDataLabel = (value) => {
        value = parseFloat((value - 100) / labels.length).toFixed(2);
        const blockSize = parseFloat(100 / labels.length).toFixed(2);
        const index = Math.ceil(value / blockSize);
        return labels[index]
    }
    // const handleScroll = useCallback(() => {
    //     const container = containerRef.current;
    //     if (container) {
    //         const { scrollTop, scrollHeight, clientHeight } = container;
    //         if (scrollTop + clientHeight >= scrollHeight && hasNextPage && fetchNextPage) {
    //             fetchNext(type);
    //         }
    //     }
    // }, []);
    const chartOptions = {
        series: [
            {
                name: 'Milestone',
                data: milestoneList
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
                    barWidth: '15rem',
                    barHeight: '15rem',
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
                labels: {
                    show: true,
                    formatter: function (val) {
                        return getDataLabel(val);
                    },
                },
            },
            yaxis: {
                min: 0,
                max: 100 * labels.length,
            },
            // tooltip: {
            //     custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            //         const data = w.config.series[seriesIndex].data[dataPointIndex];
            //         console.log("data and goal", data)
            //         return (
            //             `<div class="tooltip_container">
            //                 <p class="header">  ${data?.x}  </p>
            //                 <div class="tooltip_heading">
            //                     <span>  Current Milestone </span>
            //                     <span class="tooltip_value">  ${getDataLabel(data?.y)}  </span>
            //                 </div>
            //                 <div class="milestone_container">
            //                     <span class="milestone_header">  Milestone achieved  </span>
            //                     ${data.goals.map((goal) => {
            //                 return `<div class="tooltip_heading">
            //                                 <span>  ${getDataLabel(data?.y)}  </span>
            //                                 <span class="tooltip_value">  ${goal.time ?? 'N/A'}  </span>
            //                                 </div>`
            //             }).join('')}
            //                 </div>
            //             </div>`
            //         );
            //     }
            // },
            tooltip: {
                enabled: true,
                y: {
                    formatter: function (val) {
                        // return parseFloat((val - 100) / labels.length).toFixed(2);
                        return getDataLabel(val);
                    },
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
            colors: ['#1976D2'],
        },
    };

    return (
        // <div
        //     ref={containerRef}
        //     className="chart-container"
        //     style={{ height: '40rem', overflowY: 'scroll' }}
        //     onScroll={handleScroll}
        // >
        // <ReactApexChart
        //     options={chartOptions.options}
        //     series={chartOptions.series}
        //     type="bar"
        //     height={400}
        //     className="chart-container"
        // />
        // </div>
        <InfiniteScroll  hasMore={hasNextPage} next={fetchNextPage} dataLength={data?.length} style={{ height: 400 }}>
            <ReactApexChart
                options={chartOptions.options}
                series={chartOptions.series}
                type="bar"
                height={400}
                className="chart-container"
            />
        </InfiniteScroll>

    )
}

export default MilestoneChart