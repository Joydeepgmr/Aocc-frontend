import React, { useEffect } from 'react';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import InputField from '../../../../../components/input/field/field';
import Button from '../../../../../components/button/button';
import Date from '../../../../../components/datapicker/datepicker';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';

const FormComponent = ({ handleButtonClose, handleSaveButton, type, initialValues }) => {
	const dayjsDate = dayjs(initialValues?.date);
	initialValues? initialValues["date"] = dayjsDate: [];
	const dateFormat = 'YYYY-MM-DD';
	const [form] = Form.useForm();

	const onFinish = (values) => {
		const selectedDate = values.date;
		const formattedDate = dayjs(selectedDate).format(dateFormat);
		values['date'] = formattedDate;
		handleSaveButton({ ...values, key: initialValues?.key });
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	return (
		<div className="main_form">
			<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Flight Number"
							name="flightNumber"
							placeholder="Enter the airport name"
						/>
						<Date
							label="Date"
							name="date"
							required={true}
							placeholder="Date"
							className="date"
							format={dateFormat}
						/>
						<InputField
							label="Call Sign"
							name="callSign"
							placeholder="Filled Text"
						/>
					</div>
					<div className="form_content">
						<InputField
							label="Nature Code"
							name="natureCode"
							placeholder="D/I/F/D"
						/>
						<InputField
							label="Origin Airport"
							name="origin"
							placeholder="Filled Text"
						/>
						{type == 1 ? (
							<InputField
								label="STA"
								name="sta"
								placeholder="Filled Text"
							/>
						) : (
							<InputField
								label="STD"
								name="std"
								placeholder="Filled Text"
							/>
						)}
					</div>
					<div className="form_content">
						<InputField
							label="POS"
							name="pos"
							placeholder="Filled Text"
						/>
						<InputField
							label="Registration"
							name="registration"
							placeholder="Filled Text"
						/>
						<InputField
							label="Towing to Hanger"
							name="toh"
							placeholder="Filled Text"
						/>
					</div>
					<div className="form_content">
						<InputField
							label="Duration"
							name="duration"
							placeholder="Filled text"
						/>
					</div>
				</div>
				<Divider />

				<div className="form_section">
					<CustomTypography type="text" fontSize={14} fontWeight="400" color="#5C5F66" className="label">
						Flight Split
					</CustomTypography>
					<div className="form_content">
						<InputField label="Flight Number" name="flightNumber" placeholder="Enter the airport name" />
						<InputField label="Call Sign" name="callSign" placeholder="Filled Text" />
						<InputField label="Nature Code" name="natureCode" placeholder="Filled Text" />
					</div>

					<div className="form_content">
						<InputField label="Registration" name="registration" placeholder="Filled Text" />
						<InputField label="Destination" name="destination" placeholder="Filled Text" />
					</div>
				</div>

				<Divider />

				<div className="form_section">
					<CustomTypography type="text" fontSize={14} fontWeight="400" color="#5C5F66" className="label">
						Flight Recurrence
					</CustomTypography>
					<div className="form_content">
						<Date label="Absolute Period" placeholder="From" className="date" />
						<Date label="" placeholder="To" className="date" />
						<InputField label="Days" name="days" placeholder="Enter the total No. of days" />
					</div>

					<div className="form_content">
						<Date label="Relative Period" placeholder="From" className="date" />
						<Date label="" placeholder="To" className="date" />
					</div>
				</div>

				<Divider />

				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Aircraft Position"
							name="aircraftPosition"
							placeholder="Enter the airport name"
						/>
						<InputField label="Check In Counter" name="checkIn" placeholder="Enter the airport name" />
					</div>
				</div>
				<div className="form_bottomButton">
					<Button
						id="btn"
						title="Discard"
						className="custom_svgButton"
						type="filledText"
						// isSubmit="submit"
						onClick={handleButtonClose}
					/>
					<Button
						id="btn"
						title="Save"
						// className="custom_svgButton"
						type="filledText"
						isSubmit="submit"
					/>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
