import React, { useEffect, useMemo, useState } from 'react';
import { Form, Divider } from 'antd';
import dayjs from 'dayjs';
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
	const [isValidFrom, setIsValidFrom] = useState(false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	isEdit && (initialValues['airlineId'] = initialValues?.airline?.id);
	
	const SelectAirlineData = useMemo(() => {
		return airlineDropdownData?.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [airlineDropdownData]);

	const handleValidFrom = (dateString) => {
		form.setFieldsValue({
			validTill: null,
		});
		if (dateString === null) {
			setIsValidFrom(false);
			setCurrentValidFrom(null);
		} else {
			setIsValidFrom(true);
			setCurrentValidFrom(dateString?.format('YYYY-MM-DD'));
		}
	};

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
		if (isEdit) {
			setIsValidFrom(true);
			setCurrentValidFrom(initialValues?.validFrom ? dayjs(initialValues.validFrom).format('YYYY-MM-DD') : '');
		}
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
						pattern="^(?!.*\s$)[A-Za-z0-9 ]+(?<!\s)$"
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
						onChange={handleValidFrom}
					/>
					<Date
						label="Valid To"
						name="validTill"
						placeholder="Enter the airport name"
						className="custom_date"
						disabled={isReadOnly || !isValidFrom}
						isDisabledDate={true}
							disabledDate={(current) => {
								let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
								return current && current < dayjs(prevDate, 'YYYY-MM-DD');
							}}
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
						<Button title={isEdit ? 'Update' : 'Save'} type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>
			)}
		</Form>
	);
};

export default FormComponent;
