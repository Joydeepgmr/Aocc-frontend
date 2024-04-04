import React, { useEffect } from 'react';
import { Form, Divider } from 'antd';
import InputField from "../../../../../../../components/input/field/field";
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import CheckBoxField from '../../../../../../../components/checkbox/checkbox';
import './formComponent.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly }) => {
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
		const changedValues = isEdit ? {} : {...values, busGate : values.busGate ?? false};
		
		changedValues && Object.keys(values).forEach((key) => {
			if (isEdit && values[key] !== initialValues[key]) {
				changedValues[key] = values[key];
			}
		});

		changedValues && handleSaveButton(changedValues);
		form.resetFields();
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	return (
		<div key={initialValues?.id}>
			<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
				<div className="gate_form_container">
					<div className="gate_form_inputfields">
						<InputField
							label="Gate Name"
							name="name"
							placeholder="Enter the airport name"
							warning="Required field"
							required
							disabled={isEdit || isReadOnly}
							type="number"
							className="custom_input"
						/>
						<CheckBoxField
								name="busGate"
								label="Bus Gate"
								disabled={isReadOnly}
								className="custom_input"
							/>
					</div>
					<div className="gate_form_inputfields">
					<CustomSelect
								SelectData={SelectData}
								label="Terminal"
								placeholder={'Select Terminal'}
								name="terminal"
								disabled={isReadOnly}
							/>
						<InputField
							label="Gate ID"
							name="gateId"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
							disabled={isReadOnly}
							className="custom_input"
						/>
						<InputField
							label="Default Allocation Duration"
							name="defaultAllocationDuration"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
							suffixText="min"
							disabled={isReadOnly}
							className="custom_input"
						/>
					</div>
					<Divider />
					<div className="gate_form_inputfields">
						<InputField
							label="Reason, if unavailable"
							name="reasonIdUnavailable"
							placeholder="Filled Text"
							warning="Required field"
							disabled={isReadOnly}
							className="custom_input"
						/>
						<Date label="Unavailable from" name="unavailableFrom" placeholder="Enter the airport name" disabled={isReadOnly} className="custom_date"/>

						<Date label="Unavailable to" name="unavailableTo" placeholder="Enter the airport name" disabled={isReadOnly} className="custom_date"/>
					</div>
				</div>
				<Divider />
				<div className="gate_form_inputfields">
					<div className="form_content">
						<Date label="Valid From" name="validFrom" placeholder="Enter the airport name" required disabled={isEdit || isReadOnly} className="custom_date"/>
						<Date label="Valid To" name="validTo" placeholder="Enter the airport name" disabled={isReadOnly} className="custom_date"/>
					</div>
				</div>
				<div className="gate_form_inputfields">
					<div className="form_bottomButton">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose}/>
						<Button title={isEdit ? 'Edit' : 'Save'} type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>
			</Form>
		</div>
	
	);
};

export default FormComponent;
