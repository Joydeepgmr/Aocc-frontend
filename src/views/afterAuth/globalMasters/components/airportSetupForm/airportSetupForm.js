import React from 'react';
import InputField from '../../../../../components/inputField/inputField';
import { Divider, Form } from 'antd';
import Date from '../../../../../components/datapicker/datepicker';
import './airportSetupForm.scss';
import CustomSelect from '../../../../../components/selectfield/select';
import { SelectData } from '../../../userAccess/userAccessData';
import OtpField from '../../../../../components/otpField/otpField';
import { useSelector } from 'react-redux';

const AirportSetupForm = () => {
	const { disabled } = useSelector((store) => store.globalMasters);
	return (
		<div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Airport Name"
					name="airportName"
					placeholder="Enter the airport name"
					className="custom_input"
					required
					disabled={disabled}
				/>
				<OtpField otpLength={3} label="IATA Code" required name="iataCode" disabled={disabled} />
				<OtpField otpLength={4} label="ATC Code" required name="atcCode" disabled={disabled} />
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name 1"
					name="abbreviatedName1"
					placeholder="Enter the abbreviated name 1"
					className="custom_input"
					disabled={disabled}
				/>
				<InputField
					label="Abbreviated Name 2"
					name="abbreviatedName2"
					placeholder="Enter the abbreviated name 2"
					className="custom_input"
					disabled={disabled}
				/>
				<InputField
					label="Abbreviated Name 3"
					name="abbreviatedName3"
					placeholder="Enter the abbreviated name 3"
					className="custom_input"
					disabled={disabled}
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name 4"
					name="abbreviatedName4"
					placeholder="Enter the abbreviated name 4"
					className="custom_input"
					disabled={disabled}
				/>
				<CustomSelect
					SelectData={SelectData}
					placeholder="Select the access type"
					label="Airport Type"
					name="airportType"
					disabled={disabled}
				/>
				<OtpField otpLength={3} label="Country Code" required name="countryCode" disabled={disabled} />
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Time Change"
					name="timeChange"
					placeholder="Enter the time change"
					className="custom_input"
					disabled={disabled}
				/>
				<InputField
					label="Standard Flight Time"
					name="standardFlightTime"
					placeholder="Enter the standard flight time"
					className="custom_input"
					suffixText="minutes"
					disabled={disabled}
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Time Difference Before"
					name="timeDifferenceBefore"
					placeholder="Enter the time difference before"
					className="custom_input"
					suffixText="hours"
					disabled={disabled}
				/>
				<InputField
					label="Time Difference After"
					name="timeDifferenceAfter"
					placeholder="Enter the time difference after"
					className="custom_input"
					suffixText="hours"
					disabled={disabled}
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Time Difference Summer"
					name="timeDifferenceSummer"
					placeholder="Enter the time difference summer"
					className="custom_input"
					suffixText="hours"
					disabled={disabled}
				/>
				<InputField
					label="Time Difference Winter"
					name="timeDifferenceWinter"
					placeholder="Enter the time difference winter"
					className="custom_input"
					suffixText="hours"
					disabled={disabled}
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
					disabled={disabled}
				/>
				<Date
					label="Valid To"
					placeholder="Select valid to date"
					name="validTo"
					format="MM-DD-YYYY"
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default AirportSetupForm;
