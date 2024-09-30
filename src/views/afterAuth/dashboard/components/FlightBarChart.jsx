import { Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import RightArrow from '../../../../assets/RightArrow.svg';
import CustomSelect from '../../../../components/select/select';
import ModalComponent from '../../../../components/modal/modal';
import TableComponent from '../../../../components/table/table';
import DateFilter from '../../../../components/dateFilter/DateFilter';
import ReactApexChart from 'react-apexcharts';
import './style.scss';
import dayjs from 'dayjs';
import { useGetKpiDetails } from '../../../../services/kpi/kpiService';

const FlightBarChart = ({
	cardTitle,
	chartData,
	isFilters = true,
	columns = [],
	data,
	filter1,
	setFilter1,
	filter2,
	setFilter2,
	showFilter1,
	showFilter2,
	apiFilterName,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [chartType, setChartType] = useState('Arrival');
	const [dateFilter, setDateFilter] = useState({
		startDate: null,
		endDate: null,
	});
	const allSeries = useMemo(() => {
		if (chartData?.data?.length) {
			return chartData.data;
		}
		return [];
	}, [chartData]);

	const {
		mutate: executeKpiDetailApi,
		data: kpiDetailData,
		isLoading: isKpiDetailsLoading,
	} = useGetKpiDetails({ enabled: showFilter1 || showFilter2 });

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

	const filterType1 = [
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
	];

	const filterType2 = [
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

	useEffect(() => {
		const payload = {
			filter: apiFilterName,
			startDate: dateFilter.startDate ?? dayjs().format('YYYY-MM-DD'),
			endDate: dateFilter.endDate ?? dayjs().format('YYYY-MM-DD'),
		};
		executeKpiDetailApi(payload);
	}, [apiFilterName, dateFilter]);

	return (
		<>
			<ModalComponent
				isModalOpen={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				width={'90rem'}
				height="90rem"
				className="custom_modal"
			>
				<div className="chart_table-container">
					<div className="table-header">
						<div className="table-title">{cardTitle}</div>
						<div className="table-filters">
							{showFilter1 && (
								<CustomSelect
									SelectData={filterType1}
									onChange={(value) => setFilter1(value)}
									value={filter1}
									allowClear={false}
									className="chart-select-field"
								/>
							)}
							{showFilter2 && (
								<CustomSelect
									SelectData={filterType2}
									onChange={(value) => setFilter2(value)}
									value={filter2}
									allowClear={false}
									className="chart-select-field"
								/>
							)}
							<DateFilter filter={dateFilter} setFilter={setDateFilter} />
						</div>
					</div>
					<div className="table-body">
						<TableComponent
							isLoading={isKpiDetailsLoading}
							columns={columns}
							data={kpiDetailData?.[data] ?? []}
							isColored
						/>
					</div>
				</div>
			</ModalComponent>
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
					{showFilter1 || showFilter2 ? (
						<div onClick={() => setIsModalOpen(true)} className="view-details">
							<CustomTypography
								type="title"
								fontSize={12}
								fontWeight="600"
								color="black"
								children="View Details"
							/>
							<img src={RightArrow} alt="arrow" />
						</div>
					) : null}
				</div>
			</Card>
		</>
	);
};

export default FlightBarChart;
