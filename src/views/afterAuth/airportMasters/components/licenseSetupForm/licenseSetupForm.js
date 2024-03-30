import React, { useState, useEffect } from 'react';
import InputField from '../../../../../components/input/field/field';
import Date from '../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../components/select/select';
import OtpField from '../../../../../components/input/otp/otp';
import NumericField from '../numericField/numericField';
import { SelectData } from '../../../userAccess/userAccessData';
import { useGlobalCountries } from '../../../../../services/globalMasters/globalMaster';
import { usePostAirportName } from '../../../../../services/airportMasters/airportMasters';
import './licenseSetupForm.scss';

const LicenseSetupForm = () => {
	const [airportName, setAirportName] = useState([]);
	const [iataCode, setIataCode] = useState([]);
	const [icaoCode, setIcaoCode] = useState([]);
	// const { data: airportData } = useGetAirportName();
	const { mutate: postLicenseAirportName, isLoading, isSucess, isError, data, response } = usePostAirportName();

	const { getGlobalCountries, countryData = [] } = useGlobalCountries();
	const { mutate: getCountriesData } = getGlobalCountries;

	console.log('countryData:', countryData);
	useEffect(() => {
		if (!countryData?.length) {
			getCountriesData();
		}
	}, []);

	const SelectCountryData = countryData?.map((data) => {
		return { label: data.name, value: data.name, id: data.name };
	});

	// console.log('data from api', airportData);

	useEffect(() => {
		if (data) {
			setAirportName(
				data?.data?.map((airport, index) => {
					return {
						id: (index + 1).toString(),
						label: airport.name,
						value: airport.id,
						iataValue: airport?.iataCode,
						icaoValue: airport?.icaoCode,
					};
				})
			);
		} else {
			setAirportName([]);
		}
	}, [data]);

	const handleAirportChange = (selectedAirport) => {
		const selectedAirportData = data?.data?.find((airport) => airport.id === selectedAirport);
		console.log('what is selected Airport Data', selectedAirportData);
		const iataValue = selectedAirportData.iataCode.split('');
		const icaoValue = selectedAirportData.icaoCode.split('');
		console.log('arrays...', iataValue, icaoValue);
		if (selectedAirportData) {
			setIataCode(iataValue);
			setIcaoCode(icaoValue);
			// alert(`Iata Code: ${selectedAirportData.iataCode}`);
			// alert(`Icao Code: ${selectedAirportData.icaoCode}`);
		} else {
			setIataCode([]);
			setIcaoCode([]);
		}
	};

	useEffect(() => {
		postLicenseAirportName();
	}, []);

	return (
		<div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				<CustomSelect
					name="airportId"
					required
					label="Airport Name"
					placeholder="Enter the airport name"
					SelectData={airportName}
					className="custom_input"
					onChange={handleAirportChange}
				/>
				{/* <OtpField
					otpLength={3}
					label="IATA Code"
					required
					name="iataCode"
					value={iataCode}
					onChange={setIataCode}
				/>
				<OtpField
					otpLength={4}
					label="ICAO Code"
					required
					name="icaoCode"
					value={icaoCode}
					onChange={setIcaoCode}
				/> */}
				<NumericField
					otpLength={3}
					label="IATA Code"
					required
					name="iataCode"
					value={iataCode}
					onChange={setIataCode}
					disabled
				/>
				<NumericField
					otpLength={4}
					label="ICAO Code"
					required
					name="icaoCode"
					value={icaoCode}
					onChange={setIcaoCode}
					disabled
				/>
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

				<CustomSelect
					SelectData={SelectCountryData}
					label="Country"
					name="country"
					placeholder="Select country"
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
				<Date label="Valid To" placeholder="Select valid to date" name="validTill" format="MM-DD-YYYY" />
			</div>
		</div>
	);
};

export default LicenseSetupForm;
