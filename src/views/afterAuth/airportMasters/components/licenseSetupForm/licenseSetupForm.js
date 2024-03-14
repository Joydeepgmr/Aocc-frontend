import React from 'react'
import InputField from '../../../../../components/inputField/inputField'
import { Divider, Form } from 'antd';
import Date from '../../../../../components/datapicker/datepicker'
import './licenseSetupForm.scss';
import CustomSelect from '../../../../../components/selectfield/select';
import OtpField from '../../../../../components/otpField/otpField';
import { SelectData } from '../../../userAccess/userAccessData';
import { useSelector } from 'react-redux';

const LicenseSetupForm = () => {
	const { disabled } = useSelector((store)=> store.airportMasters);
    return (
        <div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Airport Name"
					name="airportName"
					placeholder="Enter the airport name"
					className="custom_input"
					required
				/>
				<OtpField otpLength={3} label="3-Letter Code" required name="threeCode" disabled={disabled}/>
				<OtpField otpLength={4} label="4-Letter Code" required name="fourCode" disabled={disabled} />

			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name"
					name="abbreviatedName"
					placeholder="Enter the abbreviated name "
					className="custom_input"
				/>
				<InputField
					label="Email Address"
					name="email"
					placeholder="Enter the Email Address"
					className="custom_input"
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="City"
					name="city"
					placeholder="Enter the city name"
					className="custom_input"
				/>
				<InputField
					label="Country"
					name="country"
					placeholder="Enter the country name"
					className="custom_input"
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<Date
					label="Valid From"
					placeholder="Select valid from date"
					name="validFrom"
					className="custom_date"
					format="MM-DD-YYYY"
				/>
				<Date label="Valid To" placeholder="Select valid to date" name="validTo" format="MM-DD-YYYY" />
			</div>
			{/* <Divider /> */}
		</div>
    )
}

export default LicenseSetupForm;