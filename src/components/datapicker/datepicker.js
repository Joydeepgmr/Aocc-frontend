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
	format,
	className,
}) => {
	return (
		<Form.Item
			label={label}
			name={name}
			className={`${className} date_form_item`}
			rules={[
				{
					required: required ? true : false,
					message: 'This field is required.',
				},
			]}
		>
			<DatePicker
				placeholder={placeholder}
				className="date_style"
				format={format}
				disabledDate={(current) => {
					if (acceptAllDate) {
						return false;
					} else if (isDisabledDate) {
						return disabledDate(current);
					} else {
						let customDate = dayjs().format('YYYY/MM/DD');
						return current && current < dayjs(customDate, 'YYYY/MM/DD');
					}
				}}
				disabled={disabled ? true : false}
			/>
		</Form.Item>
	);
};

export default Date;
