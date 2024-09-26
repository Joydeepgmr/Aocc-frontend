import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../components/input/field/field';
import Button from '../../../../../../components/button/button';
import Date from '../../../../../../components/datapicker/datepicker';
import { useDispatch, useSelector } from 'react-redux';
const FormComponent = () => {
	const [resourceTypeA, setResourceTypeA] = useState('');
	const [resourceNames, setResourceNames] = useState('');
	const [generatedContent, setGeneratedContent] = useState('');
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		form.resetFields();
		dispatch(addAircraftRegistration(values));
		dispatch(updateIsShowTableComponents());
	};

	return (
		<div className="main_form">
			<Form autoComplete='off' form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Group Name"
							name="GroupName"
							placeholder="Enter the group name"
							warning="Required field"
							required
						/>
						<InputField
							label="Conditional"
							name="Conditional"
							placeholder="Filled Text"
							warning="Required field"
							required
						/>
					</div>
					<div className="form_content">
						<InputField
							label="Aircraft Type"
							name="AircraftType"
							placeholder="Enter the aircraft type"
							warning="Required field"
						/>
						<InputField
							label="Aircraft ID(s)"
							name="AircraftID(s)"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
					<div className="form_content">
						<InputField
							label="Resource Type A"
							name="ResourceTypeA"
							placeholder="Enter the Resource Type A"
							warning="Required field"
						/>

						<InputField
							label="Resource Name(s)"
							name="Resource Name(s)"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
				</div>
				<Divider />
				<div className="form_section">
					<div className="form_content">
						<Date label="Valid From" name="ValidFrom" placeholder="Enter the valid from" required />
						<Date label="Valid To" name="ValidTo" placeholder="Enter the valid to" required />
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
