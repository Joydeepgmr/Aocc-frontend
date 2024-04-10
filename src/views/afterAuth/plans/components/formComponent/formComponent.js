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
	const [form] = Form.useForm();
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const handleCheckboxChange = () => {
    	setTohChecked(!tohChecked);
  	};
	const onFinish = (values) => {
		values["toh"] = tohChecked;
		handleSaveButton(values);
	};

	const handleDaysChange = (newSelectedDays) => {
		form.setFieldValue('weeklySelect', newSelectedDays);
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	return (
			<div key={initialValues?.id}>
				<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
					<div className="seasonal_form_container">
						<div className="seasonal_form_inputfields">
							<InputField label="Flight Number" name="FLIGHTNO" placeholder="Enter the airport name" className="custom_input"/>
							<Date label="Date" name="date" placeholder="Date" required className="custom_date"/>
							<InputField label="Call Sign" name="callSign" placeholder="Filled Text" className="custom_input"/>
						</div>
						<div className="seasonal_form_inputfields">
							<InputField label="Nature Code" name="natureCode" placeholder="D/I/F/D" className="custom_input"/>
							<InputField label="Origin Airport" name="origin" placeholder="Filled Text" className="custom_input"/>
							{type == 1 ? (
								<InputField label="STA" name="STA" placeholder="Filled Text" required className="custom_input"/>
							) : (
								<InputField label="STD" name="STD" placeholder="Filled Text" required className="custom_input"/>
							)}
						</div>
						<div className="seasonal_form_inputfields">
							<InputField label="POS" name="pos" placeholder="Filled Text" className="custom_input"/>
							<InputField label="Registration" name="registration" placeholder="Filled Text" className="custom_input"/>
							<CheckBoxField
							name="toh"
							label="Towing to Hanger"
							checked={tohChecked}
							onChange={handleCheckboxChange}
						/>
						</div>
						<div className="seasonal_form_inputfields">
							<InputField label="Duration" name="duration" placeholder="Filled text" className="custom_input"/>
						</div>
					
					<Divider />

					{tohChecked && (
						<div>
							<CustomTypography
								type="text"
								fontSize={14}
								fontWeight="400"
								color="#5C5F66"
								className="label"
							>
								Flight Split
							</CustomTypography>
							<div className="seasonal_form_inputfields">
								<InputField
									label="Flight Number"
									name="flightNumber"
									placeholder="Enter the airport name"
									className="custom_input"
								/>
								<InputField label="Call Sign" name="callSign" placeholder="Filled Text" className="custom_input"/>
								<InputField label="Nature Code" name="natureCode" placeholder="Filled Text" className="custom_input"/>
							</div>

							<div className="seasonal_form_inputfields">
								<InputField label="Registration" name="registration" placeholder="Filled Text" className="custom_input"/>
								<InputField label="Destination" name="destination" placeholder="Filled Text" className="custom_input"/>
							</div>
							<Divider />
						</div>
					)}

					
					{!isEdit && <div>
						<CustomTypography type="text" fontSize={14} fontWeight="400" color="#5C5F66" className="label">
							Flight Recurrence
						</CustomTypography>
						<div className="seasonal_form_inputfields">
							<Date label="Absolute Period" name="start" placeholder="From" className="custom_date"/>
							<Date label="" name="end" placeholder="To" className="custom_date" />
							<InputField label="Days" name="days" placeholder="Enter the total No. of days" className="custom_input"/>
						</div>

						<div className="seasonal_form_inputfields">
							<Date label="Relative Period" placeholder="From" className="cutom_date" />
							<Date label="" placeholder="To" className="custom_date" />
							<WeeklySelect
								name="weeklySelect"
								label="Set Flight Recurrence"
								days={days}
								onChange={handleDaysChange}
								value={initialValues?.weeklySelect}
								className = "select"
							/>
						</div>
						<Divider />
					</div>}
					</div>
					<div className='seasonal_form_inputfields'>
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
					</div>
					
				</Form>
			</div>
	);
};

export default FormComponent;
