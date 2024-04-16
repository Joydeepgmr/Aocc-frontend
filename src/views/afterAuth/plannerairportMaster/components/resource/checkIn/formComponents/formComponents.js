import React, { useMemo, useEffect, useState } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import { ConvertIstToUtc } from '../../../../../../../utils';
import './formComponent.scss';
import dayjs from 'dayjs';

const FormComponent = ({
	handleSaveButton,
	form,
	handleButtonClose,
	initialValues,
	isEdit,
	isReadOnly,
	terminalDropdownData,
}) => {
	const [isValidFrom, setIsValidFrom] = useState(false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const [currentValidTill, setCurrentValidTill] = useState('');
	const [isUnavailableFrom, setIsUnavailableFrom] = useState(false);
	const [currentUnavailableFrom, setCurrentUnavailableFrom] = useState('');
	isEdit && (initialValues['terminal'] = initialValues?.terminal?.id);

	const SelectTerminalData = useMemo(() => {
		return terminalDropdownData.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [terminalDropdownData]);

	// const [form] = Form.useForm();

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
			unavailableFrom: changedValues?.unavailableFrom
				? ConvertIstToUtc(changedValues?.unavailableFrom)
				: undefined,
			unavailableTo: changedValues?.unavailableTo ? ConvertIstToUtc(changedValues?.unavailableTo) : undefined,
		};
		handleSaveButton(changedValues);
		// form.resetFields();
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
				<div className="checkin_form_container">
					<div className="checkin_form_inputfields">
						<InputField
							label="Counter Name"
							name="name"
							placeholder={!isReadOnly && 'Enter the airport name'}
							warning="Required field"
							required
							disabled={isReadOnly || isEdit}
							className="custom_input"
							pattern="^(?!.*\s$)[A-Za-z0-9 ]+(?<!\s)$"
							max="16"
						/>
						<InputField
							label="Counter Group"
							name="group"
							placeholder={!isReadOnly && 'Filled Text'}
							warning="Required field"
							disabled={isReadOnly}
							className="custom_input"
							max="32"
						/>
					</div>

					<div className="checkin_form_inputfields">
						<CustomSelect
							SelectData={SelectTerminalData}
							label="Terminal"
							placeholder={'Select Terminal'}
							name="terminalId"
							disabled={isReadOnly}
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
							max="999"
						/>
						<InputField
							label="Phones"
							name="phoneNumber"
							placeholder={!isReadOnly && 'Filled Text'}
							warning="Required field"
							disabled={isReadOnly}
							className="custom_input"
							type='text'
							pattern="^\d+$"
							title="Please enter only numbers."
							max="15"
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
					<div className="checkin_form_inputfields">
						<Date
							label="Valid From"
							name="validFrom"
							placeholder={!isReadOnly && 'Enter the airport name'}
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
				<div className="checkin_form_inputfields">
					{!isReadOnly && (
						<div className="form_bottomButton">
							<Button
								title="Cancel"
								type="filledText"
								id="btn"
								className="custom_svgButton"
								onClick={handleButtonClose}
							/>
							<Button
								title={isEdit ? 'Update' : 'Save'}
								type="filledText"
								id="btn"
								isSubmit="submit"
								disabled={isReadOnly}
							/>
						</div>
					)}
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
