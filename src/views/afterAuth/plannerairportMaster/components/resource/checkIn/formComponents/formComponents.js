import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import './formComponent.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isError, errorMessage, isReadOnly }) => {
	isEdit && (initialValues["terminal"] = initialValues.terminal?.name)
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
			<div className="main_form" key={initialValues?.id}>
				<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Counter Name"
								name="name"
								placeholder={!isReadOnly &&"Enter the airport name"}
								warning="Required field"
								required
								disabled={isReadOnly || isEdit}
							/>
							<InputField
								label="Counter Group"
								name="group"
								placeholder={!isReadOnly &&"Filled Text"}
								warning="Required field"
								disabled={isReadOnly}
							/>
						</div>

						<div className="form_content">
							<InputField
								label="Terminal"
								name="terminal"
								placeholder={!isReadOnly &&"Filled Text"}
								warning="Required field"
								//required
								disabled={isReadOnly || isEdit}
							/>
							<InputField label="Row" name="row" placeholder={!isReadOnly &&"Filled Text"} warning="Required field" disabled={isReadOnly}/>
							<InputField
								label="Phones"
								name="phoneNumber"
								placeholder={!isReadOnly &&"Filled Text"}
								warning="Required field"
								disabled={isReadOnly}
							/>
						</div>
						<Divider />
						<div className="form_content">
							<InputField
								label="Reason, if unavailable"
								name="reason"
								placeholder={!isReadOnly &&"Filled Text"}
								warning="Required field"
								disabled={isReadOnly}
							/>
							<Date
								label="Unavailable from"
								name="unavailableFrom"
								placeholder={!isReadOnly &&"Enter the airport name"}
								format="MM-DD-YYYY"
								disabled={isReadOnly}
							/>

							<Date
								label="Unavailable to"
								name="unavailableTo"
								placeholder={!isReadOnly &&"Enter the airport name"}
								format="MM-DD-YYYY"
								disabled={isReadOnly}
							/>
						</div>

						<Divider />
						<div className="form_content">
							<Date
								label="Valid From"
								name="validFrom"
								placeholder={!isReadOnly &&"Enter the airport name"}
								required
								format="MM-DD-YYYY"
								disabled={isReadOnly || isEdit}
							/>
							<Date
								label="Valid To"
								name="validTill"
								placeholder={!isReadOnly &&"Enter the airport name"}
								format="MM-DD-YYYY"
								disabled={isReadOnly}
							/>
						</div>
					</div>
					<div className="form_section">
						<div className="form_bottomButton">
						{isError && <CustomTypography type="text" fontSize={14} fontWeight="400" color="#db0000">
							{errorMessage}
						</CustomTypography>}
							<Button
								title="Cancel"
								type="filledText"
								id="btn"
								className="custom_svgButton"
								onClick={handleButtonClose}
							/>
							<Button 
								title={isEdit ? "Edit" : "Save"}
								type="filledText" 
								id="btn" 
								isSubmit="submit" 
								disabled={isReadOnly}
							/>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default FormComponent;
