import { Divider, Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Date from '../../../../../components/datapicker/datepicker';
import InputField from '../../../../../components/input/field/field';
import CustomSelect from '../../../../../components/select/select';
import ButtonComponent from '../../../../../components/button/button';
import dayjs from 'dayjs';
import './fidsFormComponent.scss';
import { useBaggageBeltDropdown, useCheckInDropdown, useTerminalDropdown } from '../../../../../services';
import toast from 'react-hot-toast';
import CustomRadioGroup from '../../../../../components/radioButton/radioButton';
import { useGateDropdown } from '../../../../../services/fids/fidsResources';

const FidsFormComponent = ({ isReadOnly, type, closeModal, initialValue, handleSubmit, isLoading, form }) => {
	const [isValidFrom, setIsValidFrom] = useState(type === 'edit' ? true : false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const watch = Form.useWatch('resourceType', form);
	const terminalDisplay = [
		{ label: 'Arrival Display', value: 'arrival' },
		{ label: 'Departure Display', value: 'departure' },
	];
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);

	const { data: checkInDropdownData, refetch: refetchCheckInDropdownData } = useCheckInDropdown({ onError });
	const { data: terminalDropdownData, refetch: refetchTerminalDropdownData } = useTerminalDropdown({ onError });
	const { data: baggageBeltDropdownData, refetch: refetchBaggageBeltDropdownData } = useBaggageBeltDropdown({
		onError,
	});
	const { data: gateDropdownData, refetch: refetchGateDropdownData } = useGateDropdown({
		onError,
	});

	const SelectCheckInData = useMemo(() => {
		return (
			checkInDropdownData &&
			checkInDropdownData?.map((data) => {
				return { label: data?.name, value: data?.id, id: data?.id };
			})
		);
	}, [checkInDropdownData]);
	const SelectTerminalData = useMemo(() => {
		return (
			terminalDropdownData &&
			terminalDropdownData?.map((data) => {
				return { label: data?.name, value: data?.id, id: data?.id };
			})
		);
	}, [terminalDropdownData]);
	const SelectBaggageBeltData = useMemo(() => {
		return (
			baggageBeltDropdownData &&
			baggageBeltDropdownData?.map((data) => {
				return { label: data?.name, value: data?.id, id: data?.id };
			})
		);
	}, [baggageBeltDropdownData]);
	const SelectGateData = useMemo(() => {
		return (
			gateDropdownData &&
			gateDropdownData?.map((data) => {
				return { label: data?.name, value: data?.id, id: data?.id };
			})
		);
	}, [gateDropdownData]);

	const handleValidFrom = (dateString) => {
		if (form.getFieldValue('validTill') < form.getFieldValue('validFrom')) {
			form.setFieldsValue({
				validTill: null,
			});
		}
		if (dateString === null) {
			form.setFieldsValue({
				validTill: null,
			});
			setIsValidFrom(false);
			setCurrentValidFrom(null);
		} else {
			setIsValidFrom(true);
			setCurrentValidFrom(dateString?.format('YYYY-MM-DD'));
		}
	};
	const isNotEditable = type === 'edit';

	const onFinishHandler = (value) => {
		handleSubmit(value);
	};

	useEffect(() => {
		if (watch === 'terminal') {
			refetchTerminalDropdownData();
		} else if (watch === 'check_in') {
			refetchCheckInDropdownData();
		} else if (watch === 'baggage_belt') {
			refetchBaggageBeltDropdownData();
		} else if (watch === 'gate') {
			refetchGateDropdownData();
		}
	}, [watch]);

	useEffect(() => {
		form.resetFields();
	}, [initialValue]);
	return (
		<Form
			autoComplete="off"
			form={form}
			layout="vertical"
			onFinish={onFinishHandler}
			initialValues={initialValue}
			key={initialValue?.id}
		>
			<div className="fids_resources_form_container">
				<div className="fids_resources_inputfields">
					<InputField
						label="Screen Name"
						name="screenName"
						max={32}
						placeholder={!isReadOnly && 'Enter the Screen name'}
						className="custom_input"
						disabled={isReadOnly}
						required
					/>
					<CustomSelect
						SelectData={[
							{ label: 'Check In', value: 'check_in' },
							{ label: 'Gate', value: 'gate' },
							{ label: 'Baggage Belt', value: 'baggage_belt' },
							{ label: 'Terminal', value: 'terminal' },
						]}
						label="Resource Type"
						name="resourceType"
						placeholder={!isReadOnly && 'Resource Type'}
						className="custom_input"
						disabled={isReadOnly}
						required
					/>
					{watch === 'terminal' && (
						<CustomRadioGroup
							options={terminalDisplay}
							label="Display Type"
							name="flightType"
							className="custom_input"
							required
							disabled={isReadOnly}
						/>
					)}
				</div>

				<div className="fids_resources_inputfields">
					<CustomSelect
						SelectData={
							watch === 'check_in'
								? SelectCheckInData
								: watch === 'terminal'
									? SelectTerminalData
									: watch === 'baggage_belt'
										? SelectBaggageBeltData
										: watch === 'gate'
											? SelectGateData
											: []
						}
						label="Resource"
						name="resourceId"
						placeholder={!isReadOnly && 'Resource'}
						className="custom_input"
						disabled={isReadOnly || !Boolean(watch)}
						required
					/>
					<InputField
						label="IP address"
						name="MacAddress"
						max={32}
						placeholder={!isReadOnly && 'IP address'}
						className="custom_input"
						disabled={isReadOnly}
						required={true}
					/>
					<div className="fids_resources">
						<InputField
							label="Height"
							name="height"
							type="number"
							min={100}
							max={999}
							placeholder={!isReadOnly && 'Enter the Height'}
							className="custom_number_input"
							suffixText="pixel"
							disabled={isReadOnly}
						/>
						<InputField
							label="Width"
							name="width"
							type="number"
							min={100}
							max={999}
							placeholder={!isReadOnly && 'Enter the Width'}
							className="custom_number_input"
							suffixText="pixel"
							disabled={isReadOnly}
						/>
					</div>
				</div>
				<div className="fids_resources_inputfields">
					<Date
						label="Unavailable From"
						placeholder={!isReadOnly && 'Select valid from date'}
						name="unavailableFrom"
						className="custom_date"
						format="MM-DD-YYYY"
						disabled={isReadOnly || isNotEditable}
					/>
					<Date
						label="Unavailable To"
						placeholder={!isReadOnly && 'Select valid to date'}
						name="unavailableTo"
						format="MM-DD-YYYY"
						className="custom_date"
					/>
					<InputField
						label="Reason"
						name="reason"
						max={32}
						placeholder={!isReadOnly && 'Enter the Reason'}
						className="custom_input"
						disabled={isReadOnly}
					/>
				</div>
				<div className="fids_resources_inputfields">
					<Date
						label="Valid From"
						placeholder={!isReadOnly && 'Select valid from date'}
						name="validFrom"
						className="custom_date"
						format="MM-DD-YYYY"
						disabled={isReadOnly || isNotEditable}
						required
						defaultValue={initialValue?.validFrom ? dayjs(initialValue?.validFrom) : undefined}
						onChange={handleValidFrom}
					/>
					<Date
						label="Valid To"
						placeholder={!isReadOnly && 'Select valid to date'}
						name="validTill"
						format="MM-DD-YYYY"
						className="custom_date"
						defaultValue={initialValue?.validTill ? dayjs(initialValue?.validTill) : undefined}
						disabled={isReadOnly || !isValidFrom}
						isDisabledDate={true}
						disabledDate={(current) => {
							let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
							return current && current < dayjs(prevDate, 'YYYY-MM-DD');
						}}
					/>
				</div>
			</div>

			<div className="fids_resources_inputfields">
				{!isReadOnly && (
					<>
						<Divider />
						<div className="custom_buttons">
							<ButtonComponent
								title="Cancel"
								type="filledText"
								className="custom_button_cancel"
								onClick={closeModal}
								disabled={isLoading}
							/>
							<ButtonComponent
								title={isNotEditable ? 'Update' : 'Save'}
								type="filledText"
								className="custom_button_save"
								isSubmit={true}
								disabled={isLoading}
							/>
						</div>
					</>
				)}
			</div>
		</Form>
	);
};

export default FidsFormComponent;
