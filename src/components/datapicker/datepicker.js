import React from 'react';
import { DatePicker } from 'antd';
import './datepicker.scss';

const Date = ({ label, placeholder, dateFormat = 'DD/MM/YYYY', handleChange,  ...rest }) => {
  const handleDateChange = (date,dateString) => {		
		handleChange(dateString);
  };
	return (
		<div {...rest}>
			<div className="dateStyle">
				<label for="date">{label}</label>
				<DatePicker
					className="DateStyle"
					placeholder={placeholder}
					format={dateFormat}
					// onChange={handleDateChange}
				/>
			</div>
		</div>
	);
};

export default Date;
