import React, { useState } from 'react';
import { Form } from 'antd';
import InputField from '../../../../../components/inputField/inputField';
import Button from '../../../../../components/button/button';
import Date from '../../../../../components/datapicker/datepicker';
import './formComponent.scss';

const FormComponent = ({handleButtonClose, handleSaveButton}) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Form values:', values); // Output form values to console
	};

	return (
		<div className="main_form">
			<Form form={form} layout="vertical" onFinish={onFinish}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Flight Number"
							name="flightNumber"
							placeholder="Enter the airport name"
							required
							warning="Required field"
						/>
						<Date label="Select Date" required={true} placeholder="Date Picker" />

						<InputField
							label="Flight Id"
							name="flightId"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField
							label="Nature Code"
							name="natureCode"
							placeholder="AI1234"
							required
							warning="Required field"
						/>
						<InputField
							label="Origin"
							name="origin"
							placeholder="Filled Text"
							required
							warning="Required field"
							type="number"
						/>

						<InputField
							label="Via"
							name="via"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField label="ATD" name="atd" placeholder="B2345" required warning="Required field" />
						<InputField
							label="STA"
							name="sta"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>

						<InputField
							label="TMO"
							name="tmo"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField label="ATA" name="ata" placeholder="Password" required warning="Required field" />
						<InputField
							label="POS"
							name="pos"
							placeholder="Write Input Number"
							required
							warning="Required field"
						/>

						<InputField
							label="A/C Type"
							name="acType"
							placeholder="Time Difference Summer"
							required
							warning="Required field"
						/>
					</div>
				</div>

				<div className="form_section">
					<div className="form_content">
						<Date label="Absolute Period" required={true} placeholder="From" />
						<Date label="Absolute Period" required={true} placeholder="To" />

						<InputField
							label="Days"
							name="days"
							placeholder="Enter the total no. of days"
							required
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<Date label="Absolute Period" required={true} placeholder="From" />
						<Date label="" placeholder="To" />
					</div>
				</div>

				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Aircraft Position"
							name="aircraftPosition"
							placeholder="Enter the airport name"
							required
							warning="Required field"
						/>
						<InputField
							label="Belt"
							name="belt"
							placeholder="Enter the airport name"
							required
							warning="Required field"
						/>

						<InputField
							label="Gate"
							name="gate"
							placeholder="Enter the airport name"
							required
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField
							label="Lounge"
							name="lounge"
							placeholder="Enter the airport name"
							required
							warning="Required field"
						/>
						<InputField
							label="Check In Counter"
							name="checkInCounter"
							placeholder="Enter the airport name"
							required
							warning="Required field"
							type="number"
						/>
					</div>
				</div>
				<div className='form_bottomButton'>

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
					onClick={handleSaveButton}
				/>
				</div>
				
			</Form>
		</div>
	);
};

export default FormComponent;
