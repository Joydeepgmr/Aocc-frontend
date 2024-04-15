import React, { useMemo, useEffect, useState } from 'react';
import { Form, Divider } from 'antd';
import dayjs from 'dayjs';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import CustomSelect from '../../../../../../../components/select/select';
import Date from '../../../../../../../components/datapicker/datepicker';
import CheckBoxField from '../../../../../../../components/checkbox/checkbox';
import { ConvertIstToUtc } from '../../../../../../../utils';
import './formComponents.scss';

const FormComponent = ({
	handleSaveButton,
	handleButtonClose,
	initialValues,
	isEdit,
	isReadOnly,
	gateDropdownData,
	taxiwayDropdownData,
}) => {
	const [isValidFrom, setIsValidFrom] = useState(false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const [currentValidTill, setCurrentValidTill] = useState('');
	const [isUnavailableFrom, setIsUnavailableFrom] = useState(false);
	const [currentUnavailableFrom, setCurrentUnavailableFrom] = useState('');
	isEdit && (initialValues['gate'] = initialValues?.gate?.id);
	isEdit && (initialValues['taxiway'] = initialValues?.taxiway?.id);

	const SelectGateData = useMemo(() => {
		return gateDropdownData.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [gateDropdownData]);

	const SelectTaxiwayData = useMemo(() => {
		return taxiwayDropdownData.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [taxiwayDropdownData]);

	const handleValidFrom = (dateString) => {
		form.setFieldsValue({
			validTill: null,
			unavailableFrom: null,
			unavailableTo: null,
		});
		if (dateString === null) {
			setIsValidFrom(false);
			setCurrentValidFrom(null);
		} else {
			setIsValidFrom(true);
			setCurrentValidFrom(dateString?.format('YYYY-MM-DD'));
		}
	};

	const handleValidTill = (dateString) => {
		if (dateString) {
			setCurrentValidTill(dateString?.format('YYYY-MM-DD'));
		} else {
			setCurrentValidTill(null);
		}
		if (currentUnavailableFrom > dateString?.format('YYYY-MM-DD')) {
			form.setFieldsValue({
				unavailableFrom: null,
				unavailableTo: null,
			});
			setIsUnavailableFrom(false);
		}
	};

	const handleUnavailableFrom = (dateString) => {
		form.setFieldsValue({
			unavailableTo: null,
		});

		if (dateString) {
			setIsUnavailableFrom(true);
			setCurrentUnavailableFrom(dateString?.format('YYYY-MM-DD'));
		} else {
			setIsUnavailableFrom(false);
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

		changedValues = {
			...changedValues,
			validFrom: changedValues?.validFrom ? ConvertIstToUtc(changedValues?.validFrom) : undefined,
			validTill: changedValues?.validTill ? ConvertIstToUtc(changedValues?.validTill) : undefined,
			unavailableFrom: changedValues?.unavailableFrom
				? ConvertIstToUtc(changedValues?.unavailableFrom)
				: undefined,
			unavailableTo: changedValues?.unavailableTo ? ConvertIstToUtc(changedValues?.unavailableTo) : undefined,
		};
		handleSaveButton(changedValues);
		form.resetFields();
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
		if (isEdit) {
			setIsValidFrom(true);
			setIsUnavailableFrom(true);
			setCurrentValidFrom(initialValues?.validFrom ? dayjs(initialValues.validFrom).format('YYYY-MM-DD') : '');
			setCurrentValidTill(initialValues?.validTill ? dayjs(initialValues.validTill).format('YYYY-MM-DD') : '');
			setCurrentUnavailableFrom(initialValues?.unavailableFrom ? dayjs(initialValues.unavailableFrom).format('YYYY-MM-DD') : '');
		}
	}, [form, initialValues]);

	return (
		<Form form={form} layout="vertical" onFinish={onFinishHandler}>
			<div className="parking_form_container">
				<div className="parking_form_inputfields">
					<InputField
						label="Stand Name"
						name="name"
						placeholder="Enter the stand name"
						warning="Required field"
						disabled={isReadOnly || isEdit}
						required
						className="custom_input"
						pattern="^(?!.*\s$)[A-Za-z0-9 ]+(?<!\s)$"
						max="16"
					/>
				</div>

				<div className="parking_form_inputfields">
					<CustomSelect
						SelectData={SelectGateData}
						label="Connected to Gate"
						placeholder={'Select Gate'}
						name="gate"
						disabled={isReadOnly}
						className="select"
					/>
					<CustomSelect
						SelectData={SelectTaxiwayData}
						label="Connected to Taxiway"
						placeholder={'Select Taxiway'}
						name="taxiway"
						disabled={isReadOnly}
						className="select"
					/>
					<InputField
						label="Default Allocation Duration"
						name="defaultAllocationDuration"
						placeholder="Filled Text"
						warning="Required field"
						suffixText="min"
						disabled={isReadOnly}
						className="custom_input"
						type="number"
						defaultValue={15}
					/>
				</div>
				<Divider />
				<div className="parking_form_inputfields">
					<CustomTypography type="title" fontSize={16} fontWeight="600" color="#5C5F66">
						Equipped with
					</CustomTypography>
					<CheckBoxField
						name="gpu"
						label="GPU"
						id="custom_checkbox"
						title="Single Checkbox"
						disabled={isReadOnly}
						className="custom_input"
					/>
					<CheckBoxField
						name="apu"
						label="APU"
						title="Single Checkbox"
						disabled={isReadOnly}
						className="custom_input"
					/>
					<CheckBoxField
						name="fuelPit"
						label="Fuel Pits"
						title="Single Checkbox"
						disabled={isReadOnly}
						className="custom_input"
					/>
					<CheckBoxField
						name="pushBack"
						label="Pushback"
						title="Single Checkbox"
						disabled={isReadOnly}
						className="custom_input"
					/>
					<CheckBoxField
						name="airBridge"
						label="Air Bridge"
						title="Single Checkbox"
						disabled={isReadOnly}
						className="custom_input"
					/>
					<CheckBoxField
						name="airCondition"
						label="Air Condition"
						title="Single Checkbox"
						disabled={isReadOnly}
						className="custom_input"
					/>
					<CheckBoxField
						name="dockingSystem"
						label="Docking System"
						title="Single Checkbox"
						disabled={isReadOnly}
						className="custom_input"
					/>
				</div>
				<Divider />
				<div className="parking_form_inputfields">
					<InputField
						label="Reason, if unavailable"
						name="reason"
						placeholder="Filled Text"
						warning="Required field"
						disabled={isReadOnly}
						className="custom_input"
						max="32"
					/>
					<Date
						label="Unavailable from"
						name="unavailableFrom"
						placeholder={!isReadOnly && 'Enter the airport name'}
						format="MM-DD-YYYY"
						disabled={isReadOnly || !isValidFrom}
						className="custom_date"
						onChange={handleUnavailableFrom}
						isDisabledDate={true}
						disabledDate={(current) => {
							let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
							let nextDate = dayjs(currentValidTill).format('YYYY-MM-DD');
							return (
								current &&
								(current < dayjs(prevDate, 'YYYY-MM-DD') || current > dayjs(nextDate, 'YYYY-MM-DD'))
							);
						}}
					/>

					<Date
						label="Unavailable to"
						name="unavailableTo"
						placeholder={!isReadOnly && 'Enter the airport name'}
						format="MM-DD-YYYY"
						disabled={isReadOnly || !isValidFrom || !isUnavailableFrom}
						className="custom_date"
						isDisabledDate={true}
						disabledDate={(current) => {
							let prevDate = dayjs(currentUnavailableFrom).format('YYYY-MM-DD');
							let nextDate = dayjs(currentValidTill).format('YYYY-MM-DD');
							return (
								current &&
								(current < dayjs(prevDate, 'YYYY-MM-DD') || current > dayjs(nextDate, 'YYYY-MM-DD'))
							);
						}}
					/>
				</div>

				<Divider />
				<div className="parking_form_inputfields">
					<Date
						label="Valid From"
						name="validFrom"
						placeholder={!isReadOnly && 'Enter the parking stand name'}
						required
						format="MM-DD-YYYY"
						disabled={isReadOnly || isEdit}
						className="custom_date"
						onChange={handleValidFrom}
					/>
					<Date
						label="Valid To"
						name="validTill"
						placeholder={!isReadOnly && 'Enter the airport name'}
						format="MM-DD-YYYY"
						disabled={isReadOnly || !isValidFrom}
						className="custom_date"
						isDisabledDate={true}
						disabledDate={(current) => {
							let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
							return current && current < dayjs(prevDate, 'YYYY-MM-DD');
						}}
						onChange={handleValidTill}
					/>
				</div>
			</div>
			<Divider />
			<div className="parking_form_inputfields">
				{!isReadOnly && (
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
				)}
			</div>
		</Form>
	);
};

export default FormComponent;
