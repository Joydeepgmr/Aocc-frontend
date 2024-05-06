import React, { useEffect, useMemo, useState, memo } from 'react';
import { Form, Divider } from 'antd';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import CheckBoxField from '../../../../../../../components/checkbox/checkbox';
import { ConvertIstToUtc } from '../../../../../../../utils';
import { useTerminalDropdown } from '../../../../../../../services/planairportmaster/resources/terminal/terminal';
import './formComponents.scss';

const FormComponent = ({
	form,
	handleSaveButton,
	handleButtonClose,
	initialValues,
	isEdit,
	isReadOnly
}) => {
	const [isValidFrom, setIsValidFrom] = useState(false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const [currentValidTill, setCurrentValidTill] = useState('');
	const [isUnavailableFrom, setIsUnavailableFrom] = useState(false);
	const [currentUnavailableFrom, setCurrentUnavailableFrom] = useState('');
	isEdit && (initialValues['terminal'] = initialValues?.terminal?.id);

	const [isChecked, setIsChecked] = useState(false);

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);

	const { data: terminalDropdownData } = useTerminalDropdown({ onError });

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const SelectTerminalData = useMemo(() => {
		return terminalDropdownData.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [terminalDropdownData]);

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
		let changedValues = isEdit ? {} : { ...values, busGate: isChecked };
		changedValues &&
			Object.keys(values).forEach((key) => {
				if (isEdit && values[key] !== initialValues[key]) {
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
			busGate: isChecked,
		};
		changedValues && handleSaveButton(changedValues);
	};

	useEffect(() => {
		form.resetFields();
		if (initialValues) {
			form.setFieldsValue(initialValues);
		}
		if (isEdit) {
			setIsValidFrom(true);
			setIsUnavailableFrom(true);
			setIsChecked(initialValues?.busGate);
			setCurrentValidFrom(initialValues?.validFrom ? dayjs(initialValues.validFrom).format('YYYY-MM-DD') : '');
			setCurrentValidTill(initialValues?.validTill ? dayjs(initialValues.validTill).format('YYYY-MM-DD') : '');
			setCurrentUnavailableFrom(
				initialValues?.unavailableFrom ? dayjs(initialValues.unavailableFrom).format('YYYY-MM-DD') : ''
			);
		}
	}, [form, initialValues]);

	return (
		<div key={initialValues?.id}>
			<Form form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="gate_form_container">
					<div className="gate_form_inputfields">
						<InputField
							label="Gate Name"
							name="name"
							placeholder="Enter the airport name"
							warning="Required field"
							required
							disabled={isEdit || isReadOnly}
							className="custom_input"
							pattern="^(?!.*\s$)[A-Za-z0-9 ]+(?<!\s)$"
							max="16"
						/>
						<CheckBoxField
							name="busGate"
							label="Bus Gate"
							disabled={isReadOnly}
							checked={isChecked}
							type="custom"
							onChange={handleCheckboxChange}
						/>
					</div>
					<div className="gate_form_inputfields">
						<CustomSelect
							SelectData={SelectTerminalData}
							label="Terminal"
							placeholder={'Select Terminal'}
							name="terminal"
							disabled={isReadOnly}
						/>
						<InputField
							label="Gate ID"
							name="gateId"
							placeholder="Filled Text"
							warning="Required field"
							max={16}
							disabled={isReadOnly}
							className="custom_input"
						/>
						<InputField
							label="Default Allocation Duration"
							name="defaultAllocationDuration"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
							suffixText="min"
							disabled={isReadOnly}
							className="custom_input"
							defaultValue={15}
						/>
					</div>
					<div className="gate_form_inputfields">
						<InputField
							label="Reason, if unavailable"
							name="reasonIfUnavailable"
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
					<div className="gate_form_inputfields">
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
				<div className="gate_form_inputfields">
					{!isReadOnly && (
						<>
							<Divider />
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
						</>
					)}
				</div>
			</Form>
		</div>
	);
};

export default memo(FormComponent);
