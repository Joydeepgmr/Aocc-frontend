import React, { useMemo, useState, useEffect } from 'react';
import Date from '../../../../../components/datapicker/datepicker';
import InputField from '../../../../../components/input/field/field';
import CustomSelect from '../../../../../components/select/select';
import NumericField from '../numericField/numericField';
import './licenseSetupForm.scss';
import ImageUpload from '../../../../../components/imageUpload/imageUpload';

const LicenseSetupForm = ({ airportDropdownData, countryDropdownData, resetCodes, setResetCodes }) => {
	const [iataCode, setIataCode] = useState([]);
	const [icaoCode, setIcaoCode] = useState([]);
	// for image
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState([]);

	const SelectAirportData = useMemo(() => {
		return airportDropdownData.map((data) => {
			return { label: data.name, value: data.id, id: data.id }
		})
	}, [airportDropdownData]);
	const SelectCountryData = useMemo(() => {
		return countryDropdownData.map((data) => {
			return { label: data.name, value: data.name, id: data.name }
		})
	}, [countryDropdownData]);

	const handleAirportChange = (selectedAirport) => {
		const selectedAirportData = airportDropdownData.find((airport) => airport.id === selectedAirport);
		if (selectedAirportData) {
			const iataValue = selectedAirportData.iataCode.split('');
			const icaoValue = selectedAirportData.icaoCode.split('');
			setIataCode(iataValue);
			setIcaoCode(icaoValue);
		} else {
			setIataCode([]);
			setIcaoCode([]);
		}
	};

	useEffect(() => {
		if (resetCodes) {
			setIataCode([]);
			setIcaoCode([]);
			setResetCodes(false);
		}
	}, [resetCodes]);

	return (
		<div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				<CustomSelect
					name="airportId"
					required
					label="Airport Name"
					placeholder="Enter the airport name"
					SelectData={SelectAirportData}
					className="custom_input"
					onChange={handleAirportChange}
				/>
				<InputField
					label="Email Address"
					name="email"
					pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
					placeholder="Enter the Email Address"
					className="custom_input"
					required
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<div className='image-input'>
					<ImageUpload
						{...{
							label: 'Airport Logo',
							previewOpen,
							setPreviewOpen,
							previewImage,
							setPreviewImage,
							previewTitle,
							setPreviewTitle,
							fileList,
							setFileList,
						}}
					/>
				</div>
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
				<InputField
					label="Abbreviated Name"
					name="abbreviatedName"
					pattern='^(?!\s).*$'
					placeholder="Enter the abbreviated name "
					className="custom_input"
					disabled={true}
				/>

			</div>
			<div className="airport_setup_form_inputfields" style={{ marginTop: '1rem' }}>
				<InputField label="City" pattern='^(?!\s).*$' name="city" placeholder="Enter the city name" className="custom_input" />
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
					disabledFor='future'
					format="MM-DD-YYYY"
					required
				/>
				<Date
					label="Valid To"
					placeholder="Select valid to date"
					className="custom_date"
					name="validTill"
					required
					format="MM-DD-YYYY" />
			</div>
		</div>
	);
};

export default LicenseSetupForm;
