import React, { useCallback, useMemo, useRef } from 'react'
import ReactApexChart from 'react-apexcharts';
import InfiniteScroll from 'react-infinite-scroll-component';

const MilestoneChart = ({ data = [], hasNextPage, fetchNextPage, type, labels = [] }) => {
    // const containerRef = useRef(null);
    const milestoneList = useMemo(() => {
        return data.map((list) => { return { x: `${list.airline ?? ''} ${list.flightNumber ?? ''}`, y: list.progress * labels.length + 100 } });
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
        <InfiniteScroll hasMore={hasNextPage} next={fetchNextPage} dataLength={data?.length} style={{ height: 400 }}>
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