import React from 'react';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../components/input/field/field';
import CustomSelect from '../../../../../../components/select/select';
import Button from '../../../../../../components/button/button';
import Date from '../../../../../../components/datapicker/datepicker';
import OtpField from '../../../../../../components/input/otp/otp';
import TableComponent from '../../../../../../components/table/table';
import { updateIsShowTableComponents } from '../../../redux/reducer';
import { columns, dummyData } from './data';

import './formComponent.scss';

const SelectData = [
	{
		id: '1',
		label: 'Options1',
		value: 'options1',
	},
	{
		id: '2',
		label: 'Options2',
		value: 'Options2',
	},
	{
		id: '3',
		label: 'Options3',
		value: 'Options3',
	},
];
const FormComponent = ({ closeModal }) => {
	
	const [form] = Form.useForm();
	const onFinish = (values) => {
		console.log('jdjsjnjsjdjs',values);
		form.resetFields();
		dispatch(addAircraftRegistration(values));
		dispatch(updateIsShowTableComponents());
	};
	
	return (
		<>
			<div className="main_form">
				<Form form={form} layout="vertical" onFinish={onFinish}>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Airline Name"
								name="airline_name"
								placeholder="Enter the airport name"
								warning="Required field"
							/>
							<OtpField
								label="Two Letter Code"
								otpLength={2}
								id="custom_otp"
								name="two_letter_code"
								required
							/>
							<OtpField label="Three Letter Code" name="three_letter_code" required />
						</div>

						<div className="form_content">
							<InputField
								label="Country"
								name="country"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Home Airport"
								name="home_airport"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Terminal"
								name="terminal"
								placeholder="Filled Text"
								warning="Required field"
							/>
						</div>
					</div>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Remark"
								name="remark"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<OtpField
								label="Domestic/International"
								otpLength={1}
								id="custom_otp"
								name="is_domestic"
							/>
						</div>
					</div>
					<div className="form_content">
						<CustomSelect
							required={true}
							SelectData={SelectData}
							label="Mode of Payment"
							name="mode_of_payment"
							placeholder={'Mode of Payment'}
						/>
					</div>

					<Divider />

					<CustomTypography type="text" fontSize={16} fontWeight="400" color="#5C5F66">
						Head Office
					</CustomTypography>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Address 1"
								name="address1"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField label="Phone" name="phone" placeholder="Filled Text" warning="Required field" />
							<InputField label="Telex" name="telex" placeholder="Filled Text" warning="Required field" />
						</div>
					</div>
					<Divider />
					<div className="form_section">
						<div className="form_content">
							<Date label="Valid From" name="valid_from" placeholder="Enter the airport name" required />
							<Date label="Valid To" name="valid_till" placeholder="Enter the airport name" required />
						</div>
					</div>
					<div className="form_section">
						<div className="form_bottomButton">
							<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" />
							<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
						</div>
					</div>
				</Form>
			</div>
		</>
	);
};

export default FormComponent;
