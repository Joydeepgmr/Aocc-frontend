import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomRadioGroup from '../../../../../../../components/radioButton/radioButton';
import { ConvertIstToUtc } from '../../../../../../../utils';
import dayjs from 'dayjs';
import './formComponents.scss';


const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly }) => {

	const [isValidFrom, setIsValidFrom] = useState(false);
	const [currentValidFrom, setCurrentValidFrom] = useState("");
	const [currentValidTill, setCurrentValidTill] = useState("");
	const [isUnavailableFrom, setIsUnavailableFrom] = useState(false);
	const [currentUnavailableFrom, setCurrentUnavailableFrom] = useState("");
	const [form] = Form.useForm();

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
			unavailableFrom: changedValues?.unavailableFrom ? ConvertIstToUtc(changedValues?.unavailableFrom) : undefined,
			unavailableTo: changedValues?.unavailableTo ? ConvertIstToUtc(changedValues?.unavailableTo) : undefined,
		}

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
		<div key={initialValues?.id}>
			<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
				<div className='runway_form_container'>

					<div className="runway_form_inputFields">
						<InputField
							label="Runway Name"
							name="name"
							placeholder={!isReadOnly && "Enter the airport name"}
							warning="Required field"
							disabled={isReadOnly || isEdit}
							required
							className='custom_input'
							pattern="^(?!.*\s$)[A-Za-z0-9 ]+(?<!\s)$"
							max="16"
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
							disabled={isReadOnly}
						/>

					</div>
					<Divider />
					<div className="runway_form_inputFields">
						<InputField
							label="Reason, if unavailable"
							name="reason"
							placeholder={!isReadOnly && "Filled Text"}
							disabled={isReadOnly}
							warning="Required field"
							className='custom_input'
						/>
						<Date
							label="Unavailable from"
							name="unavailableFrom"
							placeholder={!isReadOnly && "Enter the airport name"}
							disabled={isReadOnly || !isValidFrom}
							format="MM-DD-YYYY"
							className='custom_date'
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
							placeholder={!isReadOnly && "Enter the airport name"}
							disabled={isReadOnly || !isValidFrom || !isUnavailableFrom}
							className='custom_date'
							format="MM-DD-YYYY"
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
					<div className="runway_form_inputFields">
						<Date
							label="Valid From"
							name="validFrom"
							placeholder={!isReadOnly && "Enter the airport name"}
							required disabled={isReadOnly || isEdit}
							format="MM-DD-YYYY"
							className='custom_date'
							onChange={handleValidFrom}
						/>
						<Date
							label="Valid To"
							name="validTill"
							placeholder={!isReadOnly && "Enter the airport name"}
							disabled={isReadOnly || !isValidFrom}
							className='custom_date'
							format="MM-DD-YYYY"
							isDisabledDate={true}
							disabledDate={(current) => {
								let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
								return current && current < dayjs(prevDate, 'YYYY-MM-DD');
							}}
							onChange={handleValidTill}
						/>
					</div>
					{!isReadOnly && <div className="custom_buttons">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
						<Button title={isEdit ? 'Update' : 'Save'} type="filledText" id="btn" isSubmit="submit" disabled={isReadOnly} />
					</div>}
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
