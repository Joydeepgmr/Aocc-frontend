import React, { useState, useEffect } from 'react';
import InputField from '../../../../../components/input/field/field';
import Date from '../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../components/select/select';
import OtpField from '../../../../../components/input/otp/otp';
import { SelectData } from '../../../userAccess/userAccessData';
import { useGetAirportName } from '../../../../../services/airportMasters/airportMasters';
import './licenseSetupForm.scss';

const LicenseSetupForm = () => {
	const [airportName, setAirportName] = useState([]);
	const [iataCode, setIataCode] = useState('');
	const [icaoCode, setIcaoCode] = useState('');
	const { data: airportData } = useGetAirportName();

	console.log('data in airportData', airportData);

	useEffect(() => {
		if (airportData) {
			setAirportName(
				airportData.map((airport, index) => {
					return {
						id: (index + 1).toString(), // Generating an id based on index
						label: airport.name, // Taking name as label
						value: airport.id,
						iataValue: airport?.iataCode,
						icaoValue: airport?.icaoCode,
					};
				})
			);
		} else {
			setAirportName([]); // Set an empty array if airportData is undefined or null
		}
	}, [airportData]);

	return (
		<div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				{/* <InputField
					label="Airport Name"
					name="airportName"
					placeholder="Enter the airport name"
					className="custom_input"
					required
				/> */}
				<CustomSelect
					required
					label="Airport Name"
					placeholder="Enter the airport name"
					SelectData={airportName}
					className="custom_input"
				/>
				<OtpField otpLength={3} label="IATA Code" required name="iataCode" required={true} />
				<OtpField otpLength={4} label="ICAO Code" required name="icaoCode" required={true} />
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
