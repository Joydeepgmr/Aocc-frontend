import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
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
	const SelectData = [];

	return (
		<div className="main_form">
			<Form form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Nature Code"
							name="NatureCode"
							placeholder="Enter the airport name"
							warning="Required field"
							required
						/>
						<InputField label="Name" name="Name" placeholder="Filled Text" warning="Required field" />
					</div>
				</div>
				<Divider />
				<div className="form_content">
					<Date label="Valid From" name="ValidFrom" placeholder="Enter the airport name" required />
					<Date label="Valid To" name="ValidTo" placeholder="Enter the airport name" required />
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
