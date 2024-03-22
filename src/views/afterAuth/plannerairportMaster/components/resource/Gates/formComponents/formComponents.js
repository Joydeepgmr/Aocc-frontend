import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from "../../../../../../../components/input/field/field";
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import { useDispatch, useSelector } from 'react-redux';

const FormComponent = ({ closeModal }) => {
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
							label="Gate Name"
							name="gate_name"
							placeholder="Enter the airport name"
							warning="Required field"
							required
						/>
						<InputField label="Airport" name="airport" placeholder="Filled Text" warning="Required field" />
						<InputField
							label="Bus Gate"
							name="bus_gate"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField
							label="Terminal"
							name="terminal"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>
						<InputField
							label="Gate ID"
							name="gate_id"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>
						<InputField
							label="Gate Type"
							name="gate_type"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
					<div className="form_content">
						<InputField
							label="Default Allocation Duration"
							name="default_allocation_duration"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
							suffixText="min"
						/>
					</div>
					<Divider />
					<div className="form_content">
						<InputField
							label="Reason, if unavailable"
							name="reason_if_unavailable"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<Date label="Unavailable from" name="unavailable_from" placeholder="Enter the airport name" />

						<Date label="Unavailable to" name="unavailable_to" placeholder="Enter the airport name" />
					</div>
				</div>
				<Divider />
				<div className="form_section">
					<div className="form_content">
						<Date label="Valid From" name="valid_from" placeholder="Enter the airport name" required />
						<Date label="Valid To" name="valid_to" placeholder="Enter the airport name" />
					</div>
				</div>
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
