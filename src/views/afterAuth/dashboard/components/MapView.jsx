import React from 'react'
import FlightRadarPic from '../../../../assets/FlightRadar.png'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent'
import CustomTabs from '../../../../components/customTabs/customTabs'
import TableComponent from '../../../../components/table/table'
import InputField from '../../../../components/input/field/field'
import Button from '../../../../components/button/button'
import Filter from '../../../../assets/Filter.svg'
import './style.scss';

function MapView() {
  const items = [
    {
      key: '1',
      label: 'Arrival',
      children: <>
        <img src={FlightRadarPic} alt="flight radar" />
      </>,
    },
    {
      key: '2',
      label: 'Departure',
      children: <>
        <img src={FlightRadarPic} alt="radar" />
      </>,
    },
  ];

  const handleChange = () => {
    console.log('Tab switch');
  };
  return (
    <div className='body-container'>
      <div className='top-bar'>
        <CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Flight Schedule"} />
        <div className='filter-section'>
          <Button
            onClick={() => {
              alert('Icon Button');
            }}
            icon={Filter}
            alt="bell icon"
            className={"filter-btn"}
          />
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

export default MapView
