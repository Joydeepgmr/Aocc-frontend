import React, { useEffect } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CheckBoxField from '../../../../../../../components/checkbox/checkbox';
import './formComponents.scss';


const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly }) => {

	const [form] = Form.useForm();

	// const onFinishHandler = (values) => {
	// 	console.log('Values are ', values);
	// 	form.resetFields();
	// 	dispatch(addAircraftRegistration(values));
	// 	dispatch(updateIsShowTableComponents());
	// };


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
		<div className="main_form">
			<div className="main_form" key={initialValues?.id}>
				<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Stand Name"
								name="stand_name"
								placeholder={!isReadOnly && 'Enter the airport name'}
								warning="Required field"
								required
							/>
							<InputField
								label="Airport"
								name="airport"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field" />
						</div>

						<div className="form_content">
							<InputField
								label="Connected to Gate"
								name="connected_to_gate"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field"
							/>
							<InputField
								label="Connected to Taxiway"
								name="connected_to_taxiway"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field"
								type="number"
							/>
							<InputField
								label="Default Allocation Duration"
								name="default_allocation_duration"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field"
								suffixText="min"
							/>
						</div>
						<Divider />
						<div className="custom_equipped">
							<CustomTypography type="title" fontSize={16} fontWeight="600" color="#5C5F66">
								Equipped with
							</CustomTypography>

							<div className="custom_content">
								<CheckBoxField name="gpu" label="GPU" id="custom_checkbox" title="Single Checkbox" />
								<CheckBoxField name="apu" className="" label="APU" title="Single Checkbox" />
								<CheckBoxField name="fuel_pits" label="Fuel Pits" title="Single Checkbox" />
								<CheckBoxField name="push_back" label="Pushback" title="Single Checkbox" />
								<CheckBoxField name="air_bridge" label="Air Bridge" title="Single Checkbox" />
								<CheckBoxField name="air_condition" label="Air Condition" title="Single Checkbox" />
								<CheckBoxField name="docking_system" label="Docking System" title="Single Checkbox" />
							</div>
						</div>
						<Divider />
						<div className="form_content">
							<InputField
								label="Reason, if unavailable"
								name="reason_if_unavailable"
								placeholder={!isReadOnly && "Filled Text"}
								warning="Required field"
							/>
							<Date
								label="Unavailable from"
								name="unavailable_from"
								placeholder={!isReadOnly && "Enter the airport name"} 
								disabled={isReadOnly}
							/>

							<Date
								label="Unavailable to"
								name="unavailable_to"
								placeholder={!isReadOnly && "Enter the airport name"}
								disabled={isReadOnly}
							/>
						</div>
					</div>
					<Divider />
					<div className="form_section">
						<div className="form_content">
							<Date
								label="Valid From"
								name="valid_from"
								placeholder={!isReadOnly && "Enter the airport name"}
								required 
								disabled={isReadOnly || isEdit}
							/>
							<Date
								label="Valid To"
								name="valid_till"
								placeholder={!isReadOnly && "Enter the airport name"}
								disabled={isReadOnly}
							/>
						</div>
					</div>
					<Divider />
					<div className="form_section">
						<div className="form_bottomButton">
							<Button
								title="Cancel"
								type="filledText"
								id="btn"
								className="custom_svgButton"
								onClick={handleButtonClose} 
							/>
							<Button
								title="Save"
								type="filledText"
								id="btn"
								isSubmit="submit" 
								disabled={isReadOnly}
							/>
						</div>
					</div>
				</Form>
			</div>
		</div >
	);
};

export default FormComponent;
