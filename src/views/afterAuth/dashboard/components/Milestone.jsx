import React, { useState } from 'react'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent'
import CustomTabs from '../../../../components/customTabs/customTabs'
import TableComponent from '../../../../components/table/table'
import InputField from '../../../../components/input/field/field'
import ReactApexChart from 'react-apexcharts';
import "./style.scss"

function Milestone() {

  const [chartData, setChartData] = useState({
    series: [{
      data: [400, 430, 448, 470, 540, 580, 690, 1100]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barWidth: '50%',
          barHeight: '40%',
          barSpacing: 10,
          colors: {
            backgroundBarColors: [],
            ranges: [],
            color: '#196CFD'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        position: 'top',
        categories: ['AI 812', '6E 6172', 'UK 642', '6E 6172', 'AI 812', 'UK 642', 'UK 994',
        ],
      },
      colors: ['#196CFD']
    }
  });

  const [chartData2, setChartData2] = useState({
    series: [{
      data: [300, 500, 800, 600, 540, 580, 700, 1000]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barWidth: '50%',
          barHeight: '40%',
          barSpacing: 10,
          colors: {
            backgroundBarColors: [],
            ranges: [],
            color: '#196CFD'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        position: 'top',
        categories: ['AI 812', '6E 6172', 'UK 642', '6E 6172', 'AI 812', 'UK 642', 'UK 994',
        ],
      },
      colors: ['#196CFD']
    }
  });

  const items = [
    {
      key: '1',
      label: 'Arrival',
      children: <>
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
      </>,
    },
    {
      key: '2',
      label: 'Departure',
      children: <>
        <ReactApexChart options={chartData2.options} series={chartData2.series} type="bar" height={350} />
      </>,
    },
  ];

  const handleChange = () => {
    console.log('Tab switch');
  };
  return (
    <div className='body-container'>
      <div className='top-bar'>
        <CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Milestones"} />
        <div className='filter-section'>
          <InputField
            label="Airport Name"
            name="search"
            placeholder="Search"
            warning="Required field"
            type="search"
          />
        </div>
      </div>
      <div className='flights-table'>
        <CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
      </div>
    </div>
  )
}

export default Milestone
