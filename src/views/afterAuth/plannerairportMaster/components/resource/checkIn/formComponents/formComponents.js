import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import CustomSelect from '../../../../../../../components/select/select';
import './formComponent.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly } ) => {
	const SelectData = [
		{
			id: '1',
			label: 'terminal1',
			value: 'c9634ce5-b670-4a3b-9090-799324b49866',
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
		<div className="checkin">
			<div className="checkin_form_component" key={initialValues?.id}>
				<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
						<div className="checkin_form_content">
							<InputField
								label="Counter Name"
								name="name"
<<<<<<< HEAD
=======
								// type="number"
>>>>>>> 36be803002d1fb3792075e3b116d330908562b2e
								placeholder={!isReadOnly && 'Enter the airport name'}
								warning="Required field"
								required
								disabled={isReadOnly || isEdit}
								type="number"
							/>
							<InputField
								label="Counter Group"
								name="group"
								placeholder={!isReadOnly && 'Filled Text'}
								warning="Required field"
								disabled={isReadOnly}
							/>
						</div>

						<div className="checkin_form_content">
							<CustomSelect
								SelectData={SelectData}
								label="Terminal"
								placeholder={'Select Terminal'}
								name="terminalId"
								disabled={isReadOnly || isEdit}
							/>
							<InputField
								label="Row"
								name="row"
								placeholder={!isReadOnly && 'Filled Text'}
								warning="Required field"
								disabled={isReadOnly}
								type="number"
							/>
							<InputField
								label="Phones"
								name="phoneNumber"
								type="number"
								placeholder={!isReadOnly && 'Filled Text'}
								warning="Required field"
								disabled={isReadOnly}
							/>
						</div>
						<Divider />
						<div className="checkin_form_content">
							<InputField
								label="Reason, if unavailable"
								name="reason"
								placeholder={!isReadOnly && 'Filled Text'}
								warning="Required field"
								disabled={isReadOnly}
							/>
							<Date
								label="Unavailable from"
								name="unavailableFrom"
								placeholder={!isReadOnly && 'Enter the airport name'}
								format="MM-DD-YYYY"
								disabled={isReadOnly}
							/>

							<Date
								label="Unavailable to"
								name="unavailableTo"
								placeholder={!isReadOnly && 'Enter the airport name'}
								format="MM-DD-YYYY"
								disabled={isReadOnly}
							/>
						</div>

						<Divider />
						<div className="checkin_form_content">
							<Date
								label="Valid From"
								name="validFrom"
								placeholder={!isReadOnly && 'Enter the airport name'}
								required
								format="MM-DD-YYYY"
								disabled={isReadOnly || isEdit}
							/>
							<Date
								label="Valid To"
								name="validTill"
								placeholder={!isReadOnly && 'Enter the airport name'}
								format="MM-DD-YYYY"
								disabled={isReadOnly}
							/>
						</div>
						<div className="form_bottomButton">
							<Button
								title="Cancel"
								type="filledText"
								id="btn"
								className="custom_svgButton"
								onClick={handleButtonClose}
							/>
							<Button
								title={isEdit ? 'Edit' : 'Save'}
								type="filledText"
								id="btn"
								isSubmit="submit"
								disabled={isReadOnly}
							/>
						</div>
				</Form>
			</div>
		</div>
	);
};

export default FormComponent;
