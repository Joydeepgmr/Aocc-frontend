import React from 'react';
import { DatePicker, Form } from 'antd';
import './datepicker.scss';

const Date = ({ label, placeholder, required, dateFormat = 'DD/MM/YYYY', ...rest }) => {
	const renderLabel = () => {
		return (
			<>
				{label}
				{required && <span style={{ color: 'red' }}> *</span>}
			</>
		);
	};
	return (
		<Form.Item>
			<div className="dateStyle">
				<label htmlFor="date">{renderLabel()}</label>
				<DatePicker className="DateStyle" placeholder={placeholder} format={dateFormat} />
			</div>
		</Form.Item>
	);
};

export default Date;
