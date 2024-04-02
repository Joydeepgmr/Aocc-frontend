import React, { useEffect } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import './formComponents.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly }) => {

	const [form] = Form.useForm();
	const SelectData = [
		{
			id: '1',
			label: 'Options1',
			value: 'options1',
		},
		{
			id: '2',
			label: 'Options2',
			value: 'Options2',
		},
		{
			id: '3',
			label: 'Options3',
			value: 'Options3',
		},
	];

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
		<div className="baggage_belt">
			<div className="main_form" key={initialValues?.id}>
				<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Belt Name"
								name="belt_name"
								placeholder="Enter the airport name"
								warning="Required field"
								required
								disabled={isReadOnly || isEdit}
							/>
							<InputField
								label="Belt Type"
								name="belt_type"
								placeholder="Filled Text"
								warning="Required field"
								disabled={isReadOnly}
							/>
						</div>

						<div className="form_content">
							<CustomSelect
								SelectData={SelectData}
								name="airport"
								label="Airport"
								placeholder={'Filled Text'}
								disabled={isReadOnly}
							/>
							<InputField
								label="Status"
								name="status"
								placeholder="Filled Text"
								warning="Required field"
								type="number"
								disabled={isReadOnly}
							/>

							<InputField
								label="Phone Number"
								name="phone_number"
								placeholder="Filled Text"
								warning="Required field"
								disabled={isReadOnly}
							/>
						</div>
						<div className="form_content">
							<CustomSelect
								SelectData={SelectData}
								name="terminal"
								label="Terminal"
								placeholder={'Filled Text'}
								disabled={isReadOnly}
							/>
							<InputField
								label="Default Allocation Duration"
								name="default_allocation_duration"
								placeholder="Filled Text"
								suffixText={'minutes'}
							/>
						</div>
						<div className="form_content">
							<InputField
								label="Reason, if unavailable"
								name="reason_if_unavailable"
								placeholder="Filled Text"
								warning="Required field"
								disabled={isReadOnly}
							/>
							<Date label="Unavailable from" name="unavailable_from" placeholder="Enter the airport name" disabled={isReadOnly}/>

							<Date label="Unavailable to" name="unavailable_to" placeholder="Enter the airport name" disabled={isReadOnly}/>
						</div>
					</div>
					<Divider />
					<div className="form_section">
						<div className="form_content">
							<Date label="Valid From" name="valid_from" placeholder="Enter the airport name" required disabled={isReadOnly || isEdit} />
							<Date label="Valid To" name="valid_till" placeholder="Enter the airport name" disabled={isReadOnly} />
						</div>
					</div>
					<Divider />
					<div className="form_section">
						<div className="form_bottomButton">
							<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
							<Button title="Save" type="filledText" id="btn" isSubmit="submit"  disabled={isReadOnly}/>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default FormComponent;
