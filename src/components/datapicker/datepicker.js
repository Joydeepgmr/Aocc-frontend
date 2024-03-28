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
}) => {
	const renderLabel = () => {
		return (
			<>
				{label}
				{/* {required && <span style={{ color: 'red' }}> *</span>} */}
			</>
		);
	};
	const disablePastDates = (current) => {
		let customDate = dayjs().format(format);
		return current && current < dayjs(customDate, format);
	}
	const disableFutureDates = (current) => {
		let customDate = dayjs().format(format);
		return current && current > dayjs(customDate, format);
	}
	return (
		<Form.Item
			label={renderLabel()}
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
						return disablePastDates();
					} else if (disabledFor === 'future') {
						return disableFutureDates();
					} else if (isDisabledDate) {
						return disabledDate(current);
					} else {
						return false;
					}
				}}
			/>

		</Form.Item>
	);
};

export default Date;