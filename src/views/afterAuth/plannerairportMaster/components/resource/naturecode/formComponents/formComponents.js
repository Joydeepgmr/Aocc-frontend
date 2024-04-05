import React, { useEffect } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import './formComponents.scss'

const FormComponent = ({
	handleSaveButton,
	handleButtonClose,
	initialValues,
	isEdit,
	isReadOnly,
}) => {

	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		const changedValues = isEdit ? {} : values;
		Object.keys(values).forEach((key) => {
			if (!isEdit || values[key] !== initialValues[key]) {
				changedValues[key] = values[key];
			}
		});

		handleSaveButton(changedValues);
		form.resetFields();
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	return (
			<Form form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="nature_code_form_container">
					<div className="nature_code_form_inputfields">
						<InputField
							label="Nature Code"
							name="natureCode"
							placeholder="Enter the airport name"
							warning="Required field"
							required
							className='custom_input'
							max="16"
							disabled={isReadOnly || isEdit}
						/>
						<InputField label="Name" name="name" placeholder="Filled Text" className='custom_input' max="32" disabled={isReadOnly}/>
					</div>
				
				<Divider />
				<div className="nature_code_form_inputfields">
						<Date label="Valid From" name="validFrom" placeholder="Enter the airport name" required className='custom_date' disabled={isReadOnly || isEdit}/>
						<Date label="Valid To" name="validTill" placeholder="Enter the airport name" className='custom_date' disabled={isReadOnly}/>
				</div>
				</div>
				<Divider/>
				
				{!isReadOnly && <div className="nature_code_form_inputfields">
					<div className="form_bottomButton">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose}/>
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>}
			</Form>
	);
};

export default FormComponent;
