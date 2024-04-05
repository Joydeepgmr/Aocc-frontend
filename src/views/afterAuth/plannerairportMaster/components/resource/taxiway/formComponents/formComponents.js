import React, { useEffect, useMemo } from 'react';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../../components/input/field/field';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/select/select';
import './formComponents.scss';

const FormComponent = ({ handleSaveButton, handleButtonClose, initialValues, isEdit, isReadOnly, terminalDropdownData}) => {
	
	isEdit && (initialValues['terminal'] = initialValues?.terminal?.id);
	const SelectTerminalData = useMemo(() => {
        return terminalDropdownData.map((data) => {
            return { label: data.name, value: data.id };
        });
    }, [terminalDropdownData]);

	const SelectData = [
		{
			id: '1',
			label: 'terminal1',
			value: 'bbf94541-45f2-416b-8bd3-7357cc49da96',
		},
		{
			id: '2',
			label: 'terminal2',
			value: 'xyz',
		},
		{
			id: '3',
			label: 'terminal3',
			value: 'xyz',
		},
		{
			id: '4',
			label: 'Cargo',
			value: 'xyz',
		},
	];

	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		const changedValues = isEdit ? {} : values;
		Object.keys(values).forEach((key) => {
			if (!isEdit || values[key] !== initialValues[key]) {
				changedValues[key] = values[key];
			}
		});

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
						/>
						<CustomSelect
							SelectData={SelectTerminalData}
							label="Connected to Runway"
							placeholder={!isReadOnly && 'Select Runways'}
							name="runway"
							disabled={isReadOnly || isEdit}
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
					<div className="custom_buttons">
						<Button title='Cancel' type="filledText" id="btn" className="custom_svgButton" onClick={handleButtonClose} />
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" disabled={isReadOnly} />
					</div>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
