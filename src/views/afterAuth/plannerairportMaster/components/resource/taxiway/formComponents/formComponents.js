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
			value: 'bbf94541-45f2-416b-8bd3-7357cc49da96',
		},
		{
			id: '2',
			label: 'terminal2',
			value: 'xyz',
		},
		{
			id: '3',
			label: 'terminal3',
			value: 'xyz',
		},
		{
			id: '4',
			label: 'Cargo',
			value: 'xyz',
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
			<div className="main_form" >
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
							{/* <InputField
								label="Airport"
								name="airport"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field" 
								disabled={isReadOnly}
							/> */}
							<CustomSelect
								SelectData={SelectData}
								label="Connected to Runway"
								placeholder={!isReadOnly && 'Select Runways'}
								name="runwayId"
								disabled={isReadOnly | isEdit}
							/>
						</div>
						<Divider />
						<div className="form_content">
							<InputField
								label="Reason, if unavailable"
								name="reason"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field"
								disabled={isReadOnly}
							/>
							<Date
								label="Unavailable from"
								name="unavailableFrom"
								placeholder={!isReadOnly && "Enter the airport name" }
								disabled={isReadOnly}
							/>

							<Date
								label="Unavailable to"
								name="unavailableTo"
								placeholder={!isReadOnly && "Enter the airport name"}
								disabled={isReadOnly}
							/>
						</div>
					</div>
					<Divider />
					<div className="form_section">
						<div className="form_content">
							<Date label="Valid From" name="validFrom" placeholder={!isReadOnly && "Enter the airport name"} required disabled={isReadOnly || isEdit} />
							<Date label="Valid To" name="validTill" placeholder={!isReadOnly && "Enter the airport name"} disabled={isReadOnly} />
						</div>
					</div>
					<div className="form_section">
						<div className="form_bottomButton">
							<Button title='Cancel' type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
							<Button title="Save" type="filledText" id="btn" isSubmit="submit" disabled={isReadOnly} />
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default FormComponent;
