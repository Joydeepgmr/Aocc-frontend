import React, { useEffect, useMemo } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import {ConvertIstToUtc} from '../../../../../../../utils';
import './formComponents.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly, terminalDropdownData }) => {

	isEdit && (initialValues['terminalId'] = initialValues?.terminal?.name);
	

	const SelectTerminalData = useMemo(() => {
        return terminalDropdownData.map((data) => {
            return { label: data.name, value: data.id };
        });
    }, [terminalDropdownData]);

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
		<div key={initialValues?.id}>
			<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
				<div className='baggageBelt_form_container'>
					<div className="baggageBelt_form_inputFields">
						<InputField
							label="Belt Name"
							name="name"
							placeholder={isReadOnly && "Enter the belt name"}
							warning="Required field"
							required
							disabled={isReadOnly || isEdit}
							className='custom_input'
							max="16"
						/>
					</div>
					<div className="baggageBelt_form_inputFields">
						<InputField
							label="Phone Number"
							name="phoneNumber"
							placeholder={isReadOnly && "Filled Text"}
							warning="Required field"
							disabled={isReadOnly}
							className='custom_input'
						/>
					</div>
					<div className="baggageBelt_form_inputFields">
						<CustomSelect
							SelectData={SelectTerminalData}
							name="terminalId"
							label="Terminal"
							placeholder={isReadOnly && 'Filled Text'}
							disabled={isReadOnly}
							className='custom_input'
						/>
						<InputField
							label="Default Allocation Duration"
							name="defaultAllocationDuration"
							placeholder={isReadOnly && "Filled Text"}
							suffixText={'minutes'}
							disabled={isReadOnly}
							type='number'
							className='custom_input'
						/>
					</div>
					<div className="baggageBelt_form_inputFields">
						<InputField
							label="Reason, if unavailable"
							name="reason"
							placeholder={isReadOnly && "Filled Text"}
							warning="Required field"
							disabled={isReadOnly}
							className='custom_input'
						/>
						<Date
							label="Unavailable from"
							name="unavailableFrom"
							placeholder={isReadOnly && "Enter the airport name"}
							disabled={isReadOnly}
							format="MM-DD-YYYY"
							className='custom_date' />
						<Date
							label="Unavailable to"
							name="unavailableTo"
							placeholder={isReadOnly && "Enter the airport name"}
							format="MM-DD-YYYY"
							disabled={isReadOnly}
							className='custom_date' />
					</div>
					<Divider />
					<div className="baggageBelt_form_inputFields">
						<Date label="Valid From" name="validFrom" placeholder={isReadOnly && "Enter the airport name"} required disabled={isReadOnly || isEdit} format="MM-DD-YYYY" className='custom_date' />
						<Date label="Valid To" name="validTill" placeholder={isReadOnly && "Enter the airport name"} disabled={isReadOnly} format="MM-DD-YYYY" className='custom_date' />
					</div>
					<Divider />
					{ !isReadOnly && <div className="custom_buttons">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
						<Button title={isEdit ? 'Update' : 'Save'} type="filledText" id="btn" isSubmit="submit" disabled={isReadOnly} />
					</div>}
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
