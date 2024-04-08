import React, { useEffect, useMemo } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import {ConvertIstToUtc} from '../../../../../../../utils';
import './formComponents.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly, runwayDropdownData}) => {
	
	isEdit && (initialValues['runway'] = initialValues?.runway?.id);
	
	const SelectRunwayData = useMemo(() => {
        return runwayDropdownData.map((data) => {
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
		<div key={initialValues?.id}>
			<Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinishHandler}>
				<div className='taxiway_form_container'>
					<div className="taxiway_form_inputFields">
						<InputField
							label="Taxiway Name"
							name="name"
							placeholder={!isReadOnly && "Enter the airport name"}
							warning="Required field"
							required
							disabled={isReadOnly || isEdit}
							className='custom_input'
							max="16"
						/>
						<CustomSelect
							SelectData={SelectRunwayData}
							label="Connected to Runway"
							placeholder={!isReadOnly && 'Select Runways'}
							name="runway"
							disabled={isReadOnly}
							className='custom_input'
						/>
					</div>
					<Divider />
					<div className="taxiway_form_inputFields">
						<InputField
							label="Reason, if unavailable"
							name="reason"
							placeholder={!isReadOnly && "Filled Text"}
							warning="Required field"
							disabled={isReadOnly}
							className='custom_input'
						/>
						<Date
							label="Unavailable from"
							name="unavailableFrom"
							placeholder={!isReadOnly && "Enter the airport name"}
							disabled={isReadOnly}
							className='custom_date'
						/>
						<Date
							label="Unavailable to"
							name="unavailableTo"
							placeholder={!isReadOnly && "Enter the airport name"}
							disabled={isReadOnly}
							className='custom_date'
						/>
					</div>
					<Divider />
					<div className="taxiway_form_inputFields">
						<Date
							label="Valid From"
							name="validFrom"
							placeholder={!isReadOnly && "Enter the airport name"}
							required
							disabled={isReadOnly || isEdit}
							className='custom_date' />
						<Date
							label="Valid To"
							name="validTill"
							placeholder={!isReadOnly && "Enter the airport name"}
							disabled={isReadOnly}
							className='custom_date' />
					</div>
					{!isReadOnly && <div className="custom_buttons">
						<Button title='Cancel' type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
						<Button title={isEdit ? 'Update' : 'Save'} type="filledText" id="btn" isSubmit="submit" disabled={isReadOnly} />
					</div>}
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;

// title={airportModal.type === 'edit' ? 'Update' : 'Save'}
