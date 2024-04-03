import React, { useMemo, useEffect } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import CustomSelect from '../../../../../../../components/select/select';
import Date from '../../../../../../../components/datapicker/datepicker';
import CheckBoxField from '../../../../../../../components/checkbox/checkbox';
import { useDispatch, useSelector } from 'react-redux';

import './formComponents.scss';

const FormComponent = ({
	handleSaveButton,
	handleButtonClose,
	initialValues,
	isEdit,
	isReadOnly,
	gateDropdownData,
}) => {
	isEdit && (initialValues['gate'] = initialValues?.gate?.id);
	const SelectGateData = useMemo(() => {
		return gateDropdownData.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [gateDropdownData]);

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
		<div className="main_form">
			<Form form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Stand Name"
							name="name"
							placeholder="Enter the stand name"
							warning="Required field"
							disabled={isReadOnly || isEdit}
							required
						/>
					</div>

					<div className="form_content">
						<CustomSelect
							SelectData={SelectGateData}
							label="Connected to Gate"
							placeholder={'Select Gate'}
							name="gate"
							disabled={isReadOnly || isEdit}
						/>
						<InputField
							label="Connected to Taxiway"
							name="taxiway"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
							disabled={isReadOnly || isEdit}
						/>
						<InputField
							label="Default Allocation Duration"
							name="defaultAllocationDuration"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="min"
							disabled={isReadOnly}
						/>
					</div>
					<Divider />
					<div className="custom_equipped">
						<CustomTypography type="title" fontSize={16} fontWeight="600" color="#5C5F66">
							Equipped with
						</CustomTypography>

						<div className="custom_content">
							<CheckBoxField name="gpu" label="GPU" id="custom_checkbox" title="Single Checkbox" disabled={isReadOnly}/>
							<CheckBoxField name="apu" className="" label="APU" title="Single Checkbox" disabled={isReadOnly}/>
							<CheckBoxField name="fuelPit" label="Fuel Pits" title="Single Checkbox" disabled={isReadOnly}/>
							<CheckBoxField name="pushBack" label="Pushback" title="Single Checkbox" disabled={isReadOnly}/>
							<CheckBoxField name="airBridge" label="Air Bridge" title="Single Checkbox" disabled={isReadOnly}/>
							<CheckBoxField name="airCondition" label="Air Condition" title="Single Checkbox" disabled={isReadOnly}/>
							<CheckBoxField name="dockingSystem" label="Docking System" title="Single Checkbox" disabled={isReadOnly}/>
						</div>
					</div>
					<Divider />
					<div className="form_content">
						<InputField
							label="Reason, if unavailable"
							name="reason"
							placeholder="Filled Text"
							warning="Required field"
							disabled={isReadOnly}
						/>
						<Date
							label="Unavailable from"
							name="unavailableFrom"
							placeholder={!isReadOnly && 'Enter the parking stand name'}
							format="MM-DD-YYYY"
							disabled={isReadOnly}
						/>

						<Date
							label="Unavailable to"
							name="unavailableTo"
							placeholder={!isReadOnly && 'Enter the parking stand name'}
							format="MM-DD-YYYY"
							disabled={isReadOnly}
						/>
					</div>
				</div>
				<Divider />
				<div className="form_section">
					<div className="form_content">
						<Date
							label="Valid From"
							name="validFrom"
							placeholder={!isReadOnly && 'Enter the parking stand name'}
							required
							format="MM-DD-YYYY"
							disabled={isReadOnly || isEdit}
						/>
						<Date
							label="Valid To"
							name="validTill"
							placeholder={!isReadOnly && 'Enter the parking stand name'}
							format="MM-DD-YYYY"
							disabled={isReadOnly}
						/>
					</div>
				</div>
				<Divider />
				<div className="form_section">
					<div className="form_bottomButton">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" />
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
