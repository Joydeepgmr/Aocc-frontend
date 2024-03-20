import React, { useEffect, useState } from 'react';
import { Divider, Form } from 'antd';
import InputField from '../../../../../components/input/field/field';
import Button from '../../../../../components/button/button';
import CheckBoxField from '../../../../../components/checkbox/checkbox';
import WeeklySelect from '../../../../../components/weeklySelect/weeklySelect';
import Date from '../../../../../components/datapicker/datepicker';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';

import './formComponent.scss';

const FormComponent = ({ handleButtonClose, handleSaveButton, type, initialValues, isEdit }) => {
	const [tohChecked, setTohChecked] = useState(false);
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const [form] = Form.useForm();

	const onFinish = (values) => {
		handleSaveButton(values);
	};

	const handleDaysChange = (newSelectedDays) => {
		form.setFieldValue('weeklySelect', newSelectedDays);
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	return (
		<div className="plan">
			<div className="main_form" key={initialValues?.id}>
				<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
					<div className="form_section">
						<div className="form_content">
							<InputField label="Flight Number" name="FLIGHTNO" placeholder="Enter the airport name" />
							<Date label="Date" name="date" placeholder="Date" className="date" />
							<InputField label="Call Sign" name="callSign" placeholder="Filled Text" />
						</div>
						<div className="form_content">
							<InputField label="Nature Code" name="natureCode" placeholder="D/I/F/D" />
							<InputField label="Origin Airport" name="origin" placeholder="Filled Text" />
							{type == 1 ? (
								<InputField label="STA" name="STA" placeholder="Filled Text" type="time" required/>
							) : (
								<InputField label="STD" name="STD" placeholder="Filled Text" required/>
							)}
						</div>
						<div className="form_content">
							<InputField label="POS" name="pos" placeholder="Filled Text" />
							<InputField label="Registration" name="registration" placeholder="Filled Text" />
							<CheckBoxField
								name="toh"
								label="Tower to Hanger"
								checked={tohChecked}
								onChange={(e) => {
									setTohChecked(e.target.checked);
								}}
								className="check_box"
							/>
						</div>
						<div className="form_content">
							<InputField label="Duration" name="duration" placeholder="Filled text" />
						</div>
					</div>
					<Divider />

					{tohChecked && (
						<div className="form_section">
							<CustomTypography
								type="text"
								fontSize={14}
								fontWeight="400"
								color="#5C5F66"
								className="label"
							>
								Flight Split
							</CustomTypography>
							<div className="form_content">
								<InputField
									label="Flight Number"
									name="flightNumber"
									placeholder="Enter the airport name"
								/>
								<InputField label="Call Sign" name="callSign" placeholder="Filled Text" />
								<InputField label="Nature Code" name="natureCode" placeholder="Filled Text" />
							</div>

							<div className="form_content">
								<InputField label="Registration" name="registration" placeholder="Filled Text" />
								<InputField label="Destination" name="destination" placeholder="Filled Text" />
							</div>
							<Divider />
						</div>
					)}

					{!isEdit && <div className="form_section">
						<CustomTypography type="text" fontSize={14} fontWeight="400" color="#5C5F66" className="label">
							Flight Recurrence
						</CustomTypography>
						<div className="form_content">
							<Date label="Absolute Period" name="start" placeholder="From" className="date" />
							<Date label="" name="end" placeholder="To" className="date" />
							<InputField label="Days" name="days" placeholder="Enter the total No. of days" />
						</div>

						<div className="form_content">
							<Date label="Relative Period" placeholder="From" className="date" />
							<Date label="" placeholder="To" className="date" />
							<WeeklySelect
								name="weeklySelect"
								label="Set Flight Recurrence"
								days={days}
								onChange={handleDaysChange}
								value={initialValues?.weeklySelect}
							/>
						</div>
						<Divider />
					</div>}
					<div className="form_bottomButton">
						<Button
							id="btn"
							title="Discard"
							className="custom_svgButton"
							type="filledText"
							onClick={handleButtonClose}
						/>
						<Button id="btn" title="Save" type="filledText" isSubmit="submit" />
					</div>
				</Form>
			</div>
		</div>
	);
};

export default FormComponent;
