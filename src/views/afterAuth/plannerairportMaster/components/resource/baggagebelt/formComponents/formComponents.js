import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../../components/inputField/inputField';
import Button from '../../../../../../../components/button/button';
import Date from '../../../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../../../components/selectfield/select';
import { useDispatch, useSelector } from 'react-redux';

const FormComponent = ({ closeModal }) => {
	const SelectData = [];
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		form.resetFields();
		dispatch(addAircraftRegistration(values));
		dispatch(updateIsShowTableComponents());
	};

	return (
		<div className="main_form">
			<CustomTypography type="text" fontSize={16} fontWeight="400" color="#5C5F66">
				Airport
			</CustomTypography>
			<Form form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Belt Name"
							name="BeltName"
							placeholder="Enter the airport name"
							warning="Required field"
						/>

						<InputField
							label="Belt Type"
							name="BeltType"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<CustomSelect
							SelectData={SelectData}
							name="airport"
							label="Airport"
							placeholder={'Filled Text'}
						/>
						<InputField
							label="Status"
							name="status"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>

						<InputField
							label="Phone Number"
							name="PhoneNumber"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
					<div className="form_content">
						<CustomSelect
							SelectData={SelectData}
							name="terminal"
							label="Terminal"
							placeholder={'Filled Text'}
						/>
						<InputField
							label="Default Allocation Duration"
							name="DefaultAllocationDuration"
							placeholder="Filled Text"
							suffixText={'minutes'}
						/>
					</div>
					<div className="form_content">
						<InputField
							label="Reason, if unavailable"
							name="reasonifunavailable"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>
						<Date label="Unavailable from" name="Unavailablefrom" placeholder="Enter the airport name" />

						<Date label="Unavailable to" name="Unavailableto" placeholder="Enter the airport name" />
					</div>
				</div>
				<Divider />
				<div className="form_content">
					<Date label="Valid From" name="ValidFrom" placeholder="Enter the airport name" required />
					<Date label="Valid To" name="ValidTo" placeholder="Enter the airport name" required />
				</div>
				<Divider />
				<div className="form_section">
					<div className="form_bottomButton">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" />
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
