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
	const renderLabel = () => {
		return (
			<>
				{label}
				{/* {required && <span style={{ color: 'red' }}> *</span>} */}
			</>
		);
	};

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
        if (acceptAllDate) {
            return false;
        } else if (isDisabledDate) {
            return disabledDate(current);
        } else {
            let customDate = dayjs().format(format);
            return current && current < dayjs(customDate, format).startOf('day');
        }
    }}
/>

		</Form.Item>
	);
};

export default Date;
