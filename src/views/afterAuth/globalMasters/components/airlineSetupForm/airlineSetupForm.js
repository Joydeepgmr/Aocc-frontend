import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider } from 'antd';
import CustomSelect from '../../../../../components/select/select';
import { SelectData } from '../../../userAccess/userAccessData';
import Date from '../../../../../components/datapicker/datepicker';
import OtpField from '../../../../../components/input/otp/otp';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import CheckBoxField from '../../../../../components/checkbox/checkbox';
import './airlineSetupForm.scss';

const AirlineSetupForm = () => {
	return (
		<div className="airline_setup_form_container">
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Airline Name"
					name="name"
					placeholder="Enter the airline name"
					className="custom_input"
					required
				/>
				<OtpField otpLength={2} label="Two Letter Code" name="twoLetterCode" required />
				<OtpField otpLength={3} label="Three Letter Code" name="threeLetterCode" required />
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Country"
					name="country"
					placeholder="Country"
					className="custom_input" />
				<InputField
					label="Home Airport"
					name="homeAirport"
					placeholder="Enter the home airport"
					className="custom_input"
				/>
				<InputField
					label="Terminal"
					name="terminal"
					placeholder="Filled Text"
					className="custom_input"
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Remark" name="remark" placeholder="Remark" className="custom_input" />
				<CheckBoxField name="domestic/International" label="Domestic/International" title="Single Checkbox" />
			</div>
			<Divider />
			<div className="airline_setup_form_inputfields">
				<CustomSelect
					SelectData={SelectData}
					placeholder="Select the access type"
					label="Mode of payment"
					name="modeOfPayment"
				/>
			</div>
			<div className='customTypo'><CustomTypography type="title" fontSize={14} fontWeight="600" color='#5C5F66'>Head Office</CustomTypography></div>
			
			<div className="airline_setup_form_inputfields">
				<InputField label="Address 1" name="address1" placeholder="Address 1" className="custom_input" />
				<InputField label="Phone" name="phone" placeholder="Enter your Phone No." className="custom_input" />
				<InputField label="Telex" name="telex" placeholder="Telex" className="custom_input" />
			</div>
			<Divider />
			<div className="airline_setup_form_inputfields">
				<Date
					label="Valid From"
					placeholder="Select valid from date"
					name="validFrom"
					className="custom_date"
					format="MM-DD-YYYY"
					required
				/>
				<Date label="Valid To" placeholder="Select valid to date" name="validTo" format="MM-DD-YYYY" />
			</div>
		</div>
	);
};

export default AirlineSetupForm;
