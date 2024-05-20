import React, { useEffect, useMemo, memo } from 'react';
import { Form, Divider } from 'antd';
import toast from 'react-hot-toast';
import CustomSelect from '../../../../../../../components/select/select';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import { useStandDropdown } from '../../../../../../../services/planairportmaster/resources/parkingstand/parkingstand';
import { useTaxiwayDropdown } from '../../../../../../../services/planairportmaster/resources/taxiway/taxiway';
import { useRunwayDropdown } from '../../../../../../../services/planairportmaster/resources/runway/runway';
import { ConvertIstToUtc } from '../../../../../../../utils';
import './formComponents.scss';

const FormComponent = ({ handleSaveButton, form, handleButtonClose, initialValues, isEdit, isReadOnly }) => {
	isEdit && (initialValues['parkingStand'] = initialValues?.parkingStand?.id);
	isEdit && (initialValues['taxiway'] = initialValues?.taxiway?.id);
	isEdit && (initialValues['runway'] = initialValues?.runway?.id);

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);

	const { data: standDropdownData } = useStandDropdown({ onError });
	const { data: taxiwayDropdownData = [] } = useTaxiwayDropdown({ onError });
	const { data: runwayDropdownData = [] } = useRunwayDropdown({ onError });

	const SelectStandData = useMemo(() => {
		return standDropdownData?.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [standDropdownData]);

	const SelectTaxiwayData = useMemo(() => {
		return taxiwayDropdownData?.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [taxiwayDropdownData]);

	const SelectRunwayData = useMemo(() => {
		return runwayDropdownData?.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [runwayDropdownData]);

	const onFinishHandler = (values) => {
		console.log(values, 'valuessss');
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
	};

	useEffect(() => {
		form.resetFields();
		if (initialValues) {
			form.setFieldsValue(initialValues);
		}
	}, [form, initialValues]);

	return (
		<Form autoComplete='off' form={form} layout="vertical" onFinish={onFinishHandler}>
			<div className="terminal_form_container">
				<div className="terminal_form_inputfields">
					<InputField
						label="Terminal Name"
						name="name"
						placeholder="Enter the airport name"
						warning="Required field"
						required
						className="custom_input"
						max="16"
						disabled={isReadOnly || isEdit}
					/>
					<CustomSelect
						SelectData={SelectStandData}
						label="Connected to Stands"
						placeholder={'Select Stand'}
						name="parkingStand"
						disabled={isReadOnly}
						className="select"
					/>

					<CustomSelect
						SelectData={SelectRunwayData}
						label="Connected to Runway"
						placeholder={'Select Runway'}
						name="runway"
						disabled={isReadOnly}
						className="select"
					/>
				</div>
				<Divider />
				<div className="terminal_form_inputfields">
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
			<div className="terminal_form_inputfields">
				{!isReadOnly && <div className="form_bottomButton">
					<Button
						title="Cancel"
						type="filledText"
						id="btn"
						className="custom_svgButton"
						onClick={handleButtonClose}
					/>
					<Button title={isEdit ? 'Update' : 'Save'} type="filledText" id="btn" isSubmit="submit" />
				</div>}
			</div>
		</Form>
	);
};

export default memo(FormComponent);
