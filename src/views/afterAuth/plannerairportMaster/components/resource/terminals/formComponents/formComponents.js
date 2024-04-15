import React, { useEffect, useMemo } from 'react';
import { Form, Divider } from 'antd';
import CustomSelect from '../../../../../../../components/select/select';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import './formComponents.scss';
import { ConvertIstToUtc } from '../../../../../../../utils';

const FormComponent = ({handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly, standDropdownData, taxiwayDropdownData, runwayDropdownData}) => {
	isEdit && (initialValues['parkingStand'] = initialValues?.parkingStand?.id);
	isEdit && (initialValues['taxiway'] = initialValues?.taxiway?.id);
	isEdit && (initialValues['runway'] = initialValues?.runway?.id);
	
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
			unavailableFrom: changedValues?.unavailableFrom ?  ConvertIstToUtc(changedValues?.unavailableFrom) : undefined,
			unavailableTo:changedValues?.unavailableTo ? ConvertIstToUtc(changedValues?.unavailableTo)  : undefined,
		}

		handleSaveButton(changedValues);
		form.resetFields();
	};

	useEffect(() => {
		form.setFieldsValue(initialValues);
	}, [form, initialValues]);

	return (
		<Form form={form} layout="vertical" onFinish={onFinishHandler}>
			<div className="terminal_form_container">
				<div className="terminal_form_inputfields">
					<InputField
						label="Terminal Name"
						name="name"
						placeholder="Enter the airport name"
						warning="Required field"
						required
						className="custom_input"
						pattern="^(?!.*\s$)[A-Za-z0-9 ]+(?<!\s)$"
						max="16"
						disabled={isReadOnly || isEdit}
					/>
					<CustomSelect
						SelectData={SelectTaxiwayData}
						label="Connected to Taxiway"
						placeholder={'Select Taxiway'}
						name="taxiway"
						disabled={isReadOnly}
						className="select"
					/>
				</div>
				<div className="terminal_form_inputfields">
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
			{ !isReadOnly && <div className="form_bottomButton">
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

export default FormComponent;
