import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider, Form } from 'antd';
import Date from '../../../../../components/datapicker/datepicker';
import './airportForm.scss';
import CustomSelect from '../../../../../components/select/select';
import { SelectData } from '../../../userAccess/userAccessData';
import OtpField from '../../../../../components/input/otp/otp';

const AirportForm = () => {
	return (
		<div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Airport Name"
					name="name"
					placeholder="Enter the airport name"
					className="custom_input"
					required
				/>
				<OtpField otpLength={3} label="IATA Code" required name="iataCode"/>
				<OtpField otpLength={4} label="ICAO Code" required name="icaoCode" />
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name 1"
					name="abbreviatedName1"
					placeholder="Enter the abbreviated name 1"
					className="custom_input"
				/>
				<InputField
					label="Abbreviated Name 2"
					name="abbreviatedName2"
					placeholder="Enter the abbreviated name 2"
					className="custom_input"
				/>
				<InputField
					label="Abbreviated Name 3"
					name="abbreviatedName3"
					placeholder="Enter the abbreviated name 3"
					className="custom_input"
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name 4"
					name="abbreviatedName4"
					placeholder="Enter the abbreviated name 4"
					className="custom_input"
				/>
				<CustomSelect
					SelectData={SelectData}
					placeholder="Select the access type"
					label="Airport Type"
					name="airportType"
				/>
				<OtpField otpLength={3} label="Country Code" name="countryCode" />
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Time Change"
					name="timeChange"
					placeholder="Enter the time change"
					className="custom_input"
				/>
				<InputField
					label="Standard Flight Time"
					name="standardFlightTime"
					placeholder="Enter the standard flight time"
					className="custom_input"
					suffixText="minutes"
				/>
			</div>
			<Divider />
			<div className="airport_setup_form_inputfields">
				<Date
					label="Valid From"
					placeholder="Select valid from date"
					name="validFrom"
					className="custom_date"
					format="MM-DD-YYYY"
					required
				/>
				<Date
					label="Valid To"
					placeholder="Select valid to date"
					name="validTill"
					format="MM-DD-YYYY"
				/>
			</div>
		</div>
	);
};

export default AirportForm;
