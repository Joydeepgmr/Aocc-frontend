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
	disabledFor, // 'past' | 'future'
	format,
	className,
	defaultValue,
	onChange,
}) => {
	const disablePastDates = (current) => {
		let customDate = dayjs().format('YYYY-MM-DD');
		return current && current < dayjs(customDate, 'YYYY-MM-DD');
	};
	const disableFutureDates = (current) => {
		let customDate = dayjs().format('YYYY-MM-DD');
		return current && current > dayjs(customDate, 'YYYY-MM-DD');
	};
	return (
		<Form.Item
			label={label ?? null}
			name={name}
			className={`${className} date_form_item`}
			rules={[
				{
					required: required,
					message: 'This field is required',
				},
			]}
		>
			<DatePicker
				placeholder={placeholder}
				className="date_style"
				format={format}
				disabled={disabled}
				disabledDate={(current) => {
					if (disabledFor === 'past') {
						return disablePastDates(current);
					} else if (disabledFor === 'future') {
						return disableFutureDates(current);
					} else if (isDisabledDate) {
						return disabledDate(current);
					} else {
						return false;
					}
				}}
				defaultValue={defaultValue}
				onChange={onChange}
			/>
		</Form.Item>
	);
};

export default Date;
