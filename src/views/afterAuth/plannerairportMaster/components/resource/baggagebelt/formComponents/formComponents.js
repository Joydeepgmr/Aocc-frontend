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
			value: '458089e4-d6dd-4178-8b9b-16ce10984f0d',
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
		<div key={initialValues?.id}>
			<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
				<div className='baggageBelt_form_container'>
					<div className="baggageBelt_form_inputFields">
						<InputField
							label="Belt Name"
							name="name"
							placeholder={isReadOnly && "Enter the belt name"}
							warning="Required field"
							required
							disabled={isReadOnly || isEdit}
							className='custom_input'
						/>
					</div>
					<div className="baggageBelt_form_inputFields">
						<InputField
							label="Phone Number"
							name="phoneNumber"
							placeholder={isReadOnly && "Filled Text"}
							warning="Required field"
							disabled={isReadOnly}
							className='custom_input'
						/>
					</div>
					<div className="baggageBelt_form_inputFields">
						<CustomSelect
							SelectData={SelectData}
							name="terminalId"
							label="Terminal"
							placeholder={isReadOnly && 'Filled Text'}
							disabled={isReadOnly}
							className='custom_input'
						/>
						<InputField
							label="Default Allocation Duration"
							name="defaultAllocationDuration"
							placeholder={isReadOnly && "Filled Text"}
							suffixText={'minutes'}
							disabled={isReadOnly}
							className='custom_input'
						/>
					</div>
					<div className="baggageBelt_form_inputFields">
						<InputField
							label="Reason, if unavailable"
							name="reason"
							placeholder={isReadOnly && "Filled Text"}
							warning="Required field"
							disabled={isReadOnly}
							className='custom_input'
						/>
						<Date
							label="Unavailable from"
							name="unavailableFrom"
							placeholder={isReadOnly && "Enter the airport name"}
							disabled={isReadOnly}
							className='custom_date' />
						<Date
							label="Unavailable to"
							name="unavailableTo"
							placeholder={isReadOnly && "Enter the airport name"}
							disabled={isReadOnly}
							className='custom_date' />
					</div>
					<Divider />
					<div className="baggageBelt_form_inputFields">
						<Date label="Valid From" name="validFrom" placeholder={isReadOnly && "Enter the airport name"} required disabled={isReadOnly || isEdit} className='custom_date' />
						<Date label="Valid To" name="validTill" placeholder={isReadOnly && "Enter the airport name"} disabled={isReadOnly} className='custom_date' />
					</div>
					<Divider />
					<div className="custom_buttons">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" disabled={isReadOnly} />
					</div>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
