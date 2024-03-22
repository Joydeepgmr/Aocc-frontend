import React, {useState, useEffect} from 'react';
import InputField from '../../../../../components/input/field/field';
import Date from '../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../components/select/select';
import OtpField from '../../../../../components/input/otp/otp';
import { SelectData } from '../../../userAccess/userAccessData';
import { useGetAirportName } from '../../../../../services/airportMasters/airportMasters';
import './licenseSetupForm.scss';

const LicenseSetupForm = () => {
	const {data: airportData} = useGetAirportName();

	console.log("data in airportData", airportData);

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
				<OtpField otpLength={3} label="IATA Code" required name="iataCode" required={true} />
				<OtpField otpLength={4} label="ICAO Code" required name="icaoCode" required={true}/>
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
					required
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField label="City" name="city" placeholder="Enter the city name" className="custom_input" />
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
					required
				/>
				<Date label="Valid To" placeholder="Select valid to date" name="validTo" format="MM-DD-YYYY" />
			</div>
			{/* <Divider /> */}
		</div>
	);
};

export default LicenseSetupForm;
