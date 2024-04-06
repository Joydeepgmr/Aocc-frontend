import React, { useEffect } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomRadioGroup from '../../../../../../../components/radioButton/radioButton';
import './formComponents.scss';
const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly }) => {

	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		console.log(values, 'valuesssss');
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
				<div className='runway_form_container'>

					<div className="runway_form_inputFields">
						<InputField
							label="Runway Name"
							name="name"
							placeholder={isReadOnly && "Enter the airport name"}
							warning="Required field"
							disabled={isReadOnly || isEdit}
							required
							className='custom_input'
						/>
					</div>
					<Divider />
					<div className="runway_form_inputFields">
						<CustomTypography type="title" fontSize={16} fontWeight="600" color="#5C5F66">
							Runway Type
						</CustomTypography>
					</div>
					<div className="runway_form_inputFields">
						<CustomRadioGroup
							name="status"
							options={[
								{ label: 'Take-off', value: 'take-off' },
								{ label: 'Landing', value: 'landing' },
							]}
							// onChange={(e) => console.log('Radio button Selected:', e.target.value)}
							disabled={isReadOnly}
						/>
					</div>
					<Divider />
					<div className="runway_form_inputFields">
						<InputField
							label="Reason, if unavailable"
							name="reason"
							placeholder={isReadOnly && "Filled Text"}
							disabled={isReadOnly}
							warning="Required field"
							className='custom_input'
						/>
						<Date label="Unavailable from" name="unavailableFrom" placeholder={isReadOnly && "Enter the airport name"} disabled={isReadOnly} className='custom_date' />
						<Date label="Unavailable to" name="unavailableTo" placeholder={isReadOnly && "Enter the airport name"} disabled={isReadOnly} className='custom_date' />
					</div>
					<Divider />
					<div className="runway_form_inputFields">
						<Date label="Valid From" name="validFrom" placeholder={isReadOnly && "Enter the airport name"} required disabled={isReadOnly || isEdit} className='custom_date' />
						<Date label="Valid To" name="validTill" placeholder={isReadOnly && "Enter the airport name"} disabled={isReadOnly} className='custom_date' />
					</div>
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
