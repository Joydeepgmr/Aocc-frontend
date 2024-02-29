import React from 'react'
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../../components/customTabs/customTabs';
import TableComponent from '../../../../components/table/table';
import InputField from '../../../../components/inputField/inputField';
import Button from '../../../../components/button/button';
import Filter from '../../../../assets/Filter.svg'
import './style.scss';

const FlightSchedule = () => {
	const items = [
		{
			key: '1',
			label: 'Arrival',
			children: <><h1>Hello 1</h1></>,
		},
		{
			key: '2',
			label: 'Departure',
			children: <><h1>Hello 2</h1></>,
		},
	];
	const handleChange = () => {
		console.log('Tab switch');
	};

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
		<div className='table-container'>
		<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
		</div>
    </div>
  )
}

export default FlightSchedule
