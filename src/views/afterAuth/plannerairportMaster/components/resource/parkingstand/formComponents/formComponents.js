import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/inputField/inputField';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CheckBoxField from '../../../../../../../components/checkBoxField/checkBoxField';
import { useDispatch, useSelector } from 'react-redux';

import './formComponents.scss';

const FormComponent = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		form.resetFields();
		dispatch(addAircraftRegistration(values));
		dispatch(updateIsShowTableComponents());
	};

	return (
		<div className="main_form">
			<Form form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Stand Name"
							name="StandName"
							placeholder="Enter the airport name"
							warning="Required field"
						/>
						<InputField label="Airport" name="airport" placeholder="Filled Text" warning="Required field" />
					</div>

					<div className="form_content">
						<InputField
							label="Connected to Gate"
							name="terminal"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="Connected to Taxiway"
							name="row"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>
						<InputField
							label="Default Allocation Duration"
							name="phones"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="min"
						/>
					</div>
					<Divider />
					<div className="custom_equipped">
						<CustomTypography type="title" fontSize={16} fontWeight="600" color="#5C5F66">
							Equipped with
						</CustomTypography>

						<div className="custom_content">
							<CheckBoxField name="GPU" label="GPU" id="custom_checkbox" title="Single Checkbox" />
							<CheckBoxField name="APU" className="" label="APU" title="Single Checkbox" />
							<CheckBoxField name="FuelPits" label="Fuel Pits" title="Single Checkbox" />
							<CheckBoxField name="Pushback" label="Pushback" title="Single Checkbox" />
							<CheckBoxField name="AirBridge" label="Air Bridge" title="Single Checkbox" />
							<CheckBoxField name="AirCondition" label="Air Condition" title="Single Checkbox" />
							<CheckBoxField name="DockingSystem" label="Docking System" title="Single Checkbox" />
						</div>
					</div>
					<Divider />
					<div className="form_content">
						<InputField
							label="Reason, if unavailable"
							name="reasonifunavailable"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>
						<Date label="Unavailable from" name="Unavailablefrom" placeholder="Enter the airport name" />

						<Date label="Unavailable to" name="Unavailableto" placeholder="Enter the airport name" />
					</div>
				</div>
				<Divider />
				<div className="form_content">
					<Date label="Valid From" name="ValidFrom" placeholder="Enter the airport name" required />
					<Date label="Valid To" name="ValidTo" placeholder="Enter the airport name" required />
				</div>
				<Divider />
				<div className="form_section">
					<div className="form_bottomButton">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" />
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
