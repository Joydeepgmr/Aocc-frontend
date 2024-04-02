import React, { useEffect } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import './formComponents.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly }) => {

	const SelectData = [
		{
			id: '1',
			label: 'terminal1',
			value: 'c44cf6c1-8da0-485f-8d54-dbd0e72aae84',
		},
		{
			id: '2',
			label: 'terminal2',
			value: 'ed35e026-8b67-43c7-a9d2-4af2fd470a5a',
		},
		{
			id: '3',
			label: 'terminal3',
			value: 'ed7ffe96-4506-4f67-ab24-07eee49e59a7',
		},
		{
			id: '4',
			label: 'Cargo',
			value: 'f1bff7a4-02f6-4c9d-98cc-6e5917e60e1f',
		},
	];
	
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
		<div className="taxiway">
			<div className="main_form" key={initialValues?.id}>
				<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Taxiway Name"
								name="name"
								placeholder={!isReadOnly && "Enter the airport name"}
								warning="Required field"
								required
								disabled={isReadOnly || isEdit}
							/>
							<InputField
								label="Airport"
								name="airport"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field" 
								disabled={isReadOnly}
							/>
							<CustomSelect
								SelectData={SelectData}
								label="Connected to Runway"
								placeholder={!isReadOnly && 'Select Terminal'}
								name="terminalId"
								disabled={isReadOnly}
							/>
						</div>
						<Divider />
						<div className="form_content">
							<InputField
								label="Reason, if unavailable"
								name="reason_if_unavailable"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field"
								disabled={isReadOnly}
							/>
							<Date
								label="Unavailable from"
								name="unavailable_from"
								placeholder={!isReadOnly && "Enter the airport name" }
							/>

							<Date
								label="Unavailable to"
								name="unavailable_to"
								placeholder={!isReadOnly && "Enter the airport name"}
							/>
						</div>
					</div>
					<Divider />
					<div className="form_section">
						<div className="form_content">
							<Date label="Valid From" name="valid_from" placeholder={!isReadOnly && "Enter the airport name"} required disabled={isReadOnly || isEdit} />
							<Date label="Valid To" name="valid_till" placeholder={!isReadOnly && "Enter the airport name"} disabled={isReadOnly} />
						</div>
					</div>
					<div className="form_section">
						<div className="form_bottomButton">
							<Button title={isEdit ? 'Edit' : 'Save'} type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
							<Button title="Save" type="filledText" id="btn" isSubmit="submit" disabled={isReadOnly} />
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default FormComponent;
