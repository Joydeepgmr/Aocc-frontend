import React from 'react';
import Chart from 'react-apexcharts';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import { Card } from 'antd';
import './style.scss';
import Performance from '../../../../assets/performance.svg';
import RightArrow from '../../../../assets/RightArrow.svg';
import { useNavigate } from 'react-router-dom';

const DonutChart = ({ cardTitle }) => {
	const navigate = useNavigate();
	const navigateTOMilestone = () => {
		navigate('/dashboard', { state: { tab: '2' } });
	};
	const options = {
		chart: {
			type: 'donut',
			width: 200,
		},
		legend: {
			position: 'bottom',
		},
		labels: ['Domestic', 'International'],
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			pie: {
				donut: {
					size: '80%',
					// background: 'transparent',
				},
			},
		},
		colors: ['#ff682d', '#196cfd'],
	};

	const series = [45, 100];

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
						<img src={Performance} alt="performance" />
					</div>
					<div className="progress-status-body">
						<Chart
							options={options}
							series={series}
							type="donut"
							// width={250}
							height={200}
						/>
					</div>
				</div>
				<div className="view-details" onClick={navigateTOMilestone}>
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

export default DonutChart;
