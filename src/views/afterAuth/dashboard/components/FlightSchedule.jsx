import React from 'react'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../../components/customTabs/customTabs';
import TableComponent from '../../../../components/table/table';
import InputField from '../../../../components/inputField/inputField';
import Button from '../../../../components/button/button';
import Filter from "../../../../assets/Filter.svg"
import './style.scss';

const FlightSchedule = () => {
  return (
    <div className='body-container'>
       <div className='top-bar'>
       <CustomTypography type="title" fontSize={24} fontWeight="600" color="black" children={"Flight Schedule"}/>
        <div className='filter-section'>
        <Button
			onClick={() => {
			alert('Icon Button');
			}}
			icon={Filter}
			alt="bell icon"
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
    </div>
  )
}

export default FlightSchedule
