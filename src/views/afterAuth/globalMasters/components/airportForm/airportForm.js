import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider, Form } from 'antd';
import Date from '../../../../../components/datapicker/datepicker';
import './airportForm.scss';
import CustomSelect from '../../../../../components/select/select';
import { SelectData } from '../../../userAccess/userAccessData';
import OtpField from '../../../../../components/input/otp/otp';

const AirportForm = ({isReadOnly}) => {
	return (
		<div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Airport Name"
					name="name"
					placeholder="Enter the airport name"
					className="custom_input"
					disabled={isReadOnly}
					required
				/>
				<OtpField otpLength={3} label="IATA Code" required name="iataCode" disabled={isReadOnly}/>
				<OtpField otpLength={4} label="ICAO Code" required name="icaoCode" disabled={isReadOnly} />
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name 1"
					name="abbreviatedName1"
					placeholder="Enter the abbreviated name 1"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Abbreviated Name 2"
					name="abbreviatedName2"
					placeholder="Enter the abbreviated name 2"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Abbreviated Name 3"
					name="abbreviatedName3"
					placeholder="Enter the abbreviated name 3"
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name 4"
					name="abbreviatedName4"
					placeholder="Enter the abbreviated name 4"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={SelectData}
					placeholder="Select the access type"
					label="Airport Type"
					name="airportType"
					disabled={isReadOnly}
					required
				/>
				<OtpField otpLength={3} label="Country Code" name="countryCode" disabled={isReadOnly} required/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Time Change"
					name="timeChange"
					placeholder="Enter the time change"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Standard Flight Time"
					name="standardFlightTime"
					placeholder="Enter the standard flight time"
					className="custom_input"
					suffixText="minutes"
					disabled={isReadOnly}
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
					disabled={isReadOnly}
					required
				/>
				<Date
					label="Valid To"
					placeholder="Select valid to date"
					name="validTill"
					format="MM-DD-YYYY"
					disabled={isReadOnly}
				/>
			</div>
		</div>
	);
};

export default AirportForm;
