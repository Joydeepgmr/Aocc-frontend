import React, { useMemo, useEffect } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
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
				<div className="checkin_form_container">
					<div className="checkin_form_inputfields">
						<InputField
							label="Counter Name"
							name="name"
							placeholder={!isReadOnly && 'Enter the airport name'}
							warning="Required field"
							required
							disabled={isReadOnly || isEdit}
							type="number"
							className="custom_input"
						/>
						<InputField
							label="Counter Group"
							name="group"
							placeholder={!isReadOnly && 'Filled Text'}
							warning="Required field"
							disabled={isReadOnly}
							className="custom_input"
						/>
					</div>

					<div className="checkin_form_inputfields">
						<CustomSelect
							SelectData={SelectTerminalData}
							label="Terminal"
							placeholder={'Select Terminal'}
							name="terminalId"
							disabled={isReadOnly || isEdit}
							className="select"
						/>
						<InputField
							label="Row"
							name="row"
							placeholder={!isReadOnly && 'Filled Text'}
							warning="Required field"
							disabled={isReadOnly}
							type="number"
							className="custom_input"
						/>
						<InputField
							label="Phones"
							name="phoneNumber"
							type="number"
							placeholder={!isReadOnly && 'Filled Text'}
							warning="Required field"
							disabled={isReadOnly}
							className="custom_input"
						/>
					</div>
					<Divider />
					<div className="checkin_form_inputfields">
						<InputField
							label="Reason, if unavailable"
							name="reason"
							placeholder={!isReadOnly && 'Filled Text'}
							warning="Required field"
							disabled={isReadOnly}
							className="custom_input"
						/>
						<Date
							label="Unavailable from"
							name="unavailableFrom"
							placeholder={!isReadOnly && 'Enter the airport name'}
							format="MM-DD-YYYY"
							disabled={isReadOnly}
							className="custom_date"
						/>

						<Date
							label="Unavailable to"
							name="unavailableTo"
							placeholder={!isReadOnly && 'Enter the airport name'}
							format="MM-DD-YYYY"
							disabled={isReadOnly}
							className="custom_date"
						/>
					</div>

					<Divider />
					<div className="checkin_form_inputfields">
						<Date
							label="Valid From"
							name="validFrom"
							placeholder={!isReadOnly && 'Enter the airport name'}
							required
							format="MM-DD-YYYY"
							disabled={isReadOnly || isEdit}
							className="custom_date"
						/>
						<Date
							label="Valid To"
							name="validTill"
							placeholder={!isReadOnly && 'Enter the airport name'}
							format="MM-DD-YYYY"
							disabled={isReadOnly}
							className="custom_date"
						/>
					</div>
				</div>
				<div className="checkin_form_inputfields">
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
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
