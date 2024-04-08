import React, { useEffect, useMemo } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import { ConvertIstToUtc } from '../../../../../../../utils';
import './formComponents.scss';

const FormComponent = ({
	handleSaveButton,
	handleButtonClose,
	initialValues,
	isEdit,
	isReadOnly,
	airlineDropdownData,
}) => {
	isEdit && (initialValues['airlineId'] = initialValues?.airline?.id);
	const SelectAirlineData = useMemo(() => {
		return airlineDropdownData?.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [airlineDropdownData]);

	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		let changedValues = isEdit ? {} : values;
		Object.keys(values).forEach((key) => {
			if (!isEdit || values[key] !== initialValues[key]) {
				changedValues[key] = values[key];
			}
		});

		changedValues = {...changedValues,
			validFrom : changedValues?.validFrom ? ConvertIstToUtc(changedValues?.validFrom): undefined,
			validTill: changedValues?.validTill ? ConvertIstToUtc(changedValues?.validTill) : undefined,
		}

		handleSaveButton(changedValues);
		form.resetFields();
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	return (
		<Form form={form} layout="vertical" onFinish={onFinishHandler}>
			<div className="delay_code_form_container">
				<div className="delay_code_form_inputfields">
					<InputField
						label="Delay Code"
						name="delayCode"
						placeholder="Enter the airport name"
						warning="Required field"
						required
						className="custom_input"
						max="16"
						disabled={isReadOnly || isEdit}
					/>

					<InputField
						label="Group"
						name="group"
						placeholder="Filled Text"
						warning="Required field"
						className="custom_input"
						max="32"
						disabled={isReadOnly}
					/>
					<CustomSelect
						SelectData={SelectAirlineData}
						label="Airline"
						placeholder={'Select Airline'}
						name="airlineId"
						disabled={isReadOnly}
						className="select"
					/>
				</div>

				<Divider />
				<div className="delay_code_form_inputfields">
					<Date
						label="Valid From"
						name="validFrom"
						placeholder="Enter the airport name"
						required
						className="custom_date"
						disabled={isReadOnly || isEdit}
					/>
					<Date
						label="Valid To"
						name="validTill"
						placeholder="Enter the airport name"
						className="custom_date"
						disabled={isReadOnly}
					/>
				</div>
			</div>
			<Divider />
			{!isReadOnly && (
				<div className="delay_code_form_inputfields">
					<div className="form_bottomButton">
						<Button
							title="Cancel"
							type="filledText"
							id="btn"
							className="custom_svgButton"
							onClick={handleButtonClose}
						/>
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>
			)}
		</Form>
	);
};

export default FormComponent;
