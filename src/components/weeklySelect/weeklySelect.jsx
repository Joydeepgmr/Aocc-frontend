import React, { useState } from 'react';
import { Form } from 'antd';
import './weeklySelect.scss';

const WeeklySelect = (props) => {
	const { days, onChange, className, isError, errorMessage, value, name, label, required, message, rest } = props;
	const [selectedDays, setSelectedDays] = useState(value || []);

	const toggleDay = (dayIndex) => {
		const updatedDays = selectedDays.includes(dayIndex)
			? selectedDays.filter((selectedDay) => selectedDay !== dayIndex)
			: [...selectedDays, dayIndex];

		setSelectedDays(updatedDays);
		onChange(updatedDays);
	};

	const errorClassName = isError ? 'WeeklySelect--Error' : '';

	return (

		<Form.Item
					name={name}
					label={label}
					rules={[
						{
							required: required ? true : false,
							message: message ? message : 'This field is required.',
						},
					]}
					{...rest}
				>
			<div className={`WeeklySelect ${className}`}>
				{days.map((day, index) => (
					<div
						key={day}
						className={
							isError
								? `${errorClassName}`
								: `WeeklySelect--Chip ${
										selectedDays.includes(index) ? 'WeeklySelect--Active' : 'WeeklySelect--Inactive'
								  }`
						}
						onClick={() => toggleDay(index)}
					>
						{day.substring(0, 1)}
					</div>
				))}
			</div>
            </Form.Item>
	);
};

export default WeeklySelect;
