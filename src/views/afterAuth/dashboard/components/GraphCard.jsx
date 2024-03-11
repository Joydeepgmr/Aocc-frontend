import React from 'react'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import {Card} from 'antd';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(
    ArcElement, 
    Tooltip,
    Legend
);
import "./style.scss";
import Performance from '../../../../assets/performance.svg'
import Airplane_1 from '../../../../assets/Airline_1.svg'
import RightArrow from '../../../../assets/RightArrow.svg'

function GraphCard() {
    const data = {
        labels: ['International', 'Domestic'],
        datasets: [
          {
            label: "Flights",
            data: [100, 50],
            backgroundColor: ["#FF682D", "#196CFD"],
            hoverBackgroundColor: ["#FF682D", "#196CFD"],
          },
        ],
      };

      const options = {
        cutout: 40,
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          display: true,
          position: 'center',
        },
      };
  return (
    <>
    <Card className='progress-card'>
    <div className='progress-card-body'>
            <div className='progress-body'>
            <div className='card-title'>
                <CustomTypography type="title" fontSize={12} fontWeight="600" color="black" children="On-time performance" />
                <img src={Performance} alt="performance" />
            </div>
            <div className='progress-status-body'>
            <Doughnut data={data} options={options}>
            </Doughnut>
            </div>
            </div>
            <div className='view-details'>
            <CustomTypography type="title" fontSize={12} fontWeight="600" color="black" children="View Details" />
            <img src={RightArrow} alt="arrow" />
            </div>
        </div>
    </Card>
    </>
  )
}

export default GraphCard
