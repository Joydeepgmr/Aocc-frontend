import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/inputField/inputField';
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
							label="Counter Name"
							name="counterName"
							placeholder="Enter the airport name"
							warning="Required field"
						/>
						<InputField
							label="Counter Group"
							name="counterGroup"
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
						/>
						<InputField
							label="Row"
							name="row"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>
						<InputField
							label="Phones"
							name="phones"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>
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
