import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import './datepicker.scss';
const Date = ({
	label,
	name,
	required,
	width,
	disabled,
	placeholder,
	disabledDate,
	isDisabledDate = false,
	acceptAllDate,
	border,
}) => {
	return (
		<Form.Item
			label={label}
			name={name}
			className="p-0"
			rules={[
				{
					required: required ? true : false,
					message: 'This field is required.',
				},
			]}
		>
			<DatePicker
				placeholder={placeholder}
				className="DateStyle"
				format={'YYYY/MM/DD'}
				disabledDate={(current) => {
					if (acceptAllDate) {
						return false;
					} else if (isDisabledDate) {
						return disabledDate(current);
					} else {
						let customDate = dayjs().format('YYYY/MM/DD');
						return current && current > dayjs(customDate, 'YYYY/MM/DD');
					}
				}}
				disabled={disabled ? true : false}
			/>
		</Form.Item>
	);
};

export default Date;
