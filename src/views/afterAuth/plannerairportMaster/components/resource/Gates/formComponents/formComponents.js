import React, { useEffect, useMemo } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import CheckBoxField from '../../../../../../../components/checkbox/checkbox';
import './formComponent.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly, terminalDropdownData }) => {
	isEdit && (initialValues['terminal'] = initialValues?.terminal?.id);
	
	const SelectTerminalData = useMemo(() => {
		return terminalDropdownData.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [terminalDropdownData]);
	
	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		const changedValues = isEdit ? {} : { ...values, busGate: values.busGate ?? false };

		changedValues &&
			Object.keys(values).forEach((key) => {
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
							className="custom_input"
						/>
						<CheckBoxField name="busGate" label="Bus Gate" disabled={isReadOnly} className="custom_input" />
					</div>
					<div className="gate_form_inputfields">
						<CustomSelect
							SelectData={SelectTerminalData}
							label="Terminal"
							placeholder={'Select Terminal'}
							name="terminal"
							disabled={isReadOnly || isEdit}
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
							name="reasonIfUnavailable"
							placeholder="Filled Text"
							warning="Required field"
							disabled={isReadOnly}
							className="custom_input"
						/>
						<Date
							label="Unavailable from"
							name="unavailableFrom"
							placeholder="Enter the airport name"
							disabled={isReadOnly}
							className="custom_date"
						/>

						<Date
							label="Unavailable to"
							name="unavailableTo"
							placeholder="Enter the airport name"
							disabled={isReadOnly}
							className="custom_date"
						/>
					</div>
					<div className="gate_form_inputfields">
						<Date
							label="Valid From"
							name="validFrom"
							placeholder="Enter the airport name"
							required
							disabled={isEdit || isReadOnly}
							className="custom_date"
						/>
						<Date
							label="Valid To"
							name="validTo"
							placeholder="Enter the airport name"
							disabled={isReadOnly}
							className="custom_date"
						/>
					</div>
				</div>
				<Divider />
				<div className="gate_form_inputfields">
				{ !isReadOnly && <div className="form_bottomButton">
						<Button
							title="Cancel"
							type="filledText"
							id="btn"
							className="custom_svgButton"
							onClick={handleButtonClose}
						/>
						<Button title={isEdit ? 'Edit' : 'Save'} type="filledText" id="btn" isSubmit="submit" />
					</div>}
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
