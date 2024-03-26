import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider } from 'antd';
import Date from '../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../components/select/select';
import { SelectAircraftTye } from '../../../userAccess/userAccessData';
import './aircraftRegistrationForm.scss';

const AircraftRegistrationForm = () => {
	return (
		<div className="airport_registration_form_container">
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Registration"
					name="registration"
					placeholder="Enter the airport name"
					className="custom_input"
					required
				/>
				<InputField
					label="Internal"
					name="internal"
					placeholder="Enter the internal"
					className="custom_input"
				/>
				<InputField
					label="IATA Code"
					name="iataCode"
					placeholder="Enter the IATA code"
					className="custom_input"
					required
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="ICAO Code"
					name="iacoCode"
					placeholder="Enter the ICAO code"
					className="custom_input"
				/>
				<CustomSelect
					SelectData={SelectAircraftTye}
					placeholder="Filled Text"
					label="Airport Type"
					name="airportType"
				/>
				<InputField
					label="Type of Use"
					name="typeOfUse"
					placeholder="Enter the type of use"
					className="custom_input"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Home Airport"
					name="homeAirport"
					placeholder="Enter the home airport"
					className="custom_input"
				/>
				<InputField
					label="Nationality"
					name="nationality"
					placeholder="Enter the nationality"
					className="custom_input"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Cockpit Crew"
					name="cockpitCrew"
					placeholder="Enter the cockpit crew"
					className="custom_input"
				/>
				<InputField
					label="Cabin crew"
					name="cabinCrew"
					placeholder="Enter the cabin crew"
					className="custom_input"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="No. of Seats"
					name="numberOfSeats"
					placeholder="Enter the number of seats"
					className="custom_input"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Height"
					name="height"
					placeholder="Enter the Height"
					className="custom_input"
					suffixText="meters"
				/>
				<InputField
					label="Length"
					name="length"
					placeholder="Enter the length"
					className="custom_input"
					suffixText="meters"
				/>
				<InputField
					label="Wingspan"
					name="wingspan"
					placeholder="Enter the wingspan"
					className="custom_input"
					suffixText="meters"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="MTOW"
					name="mtow"
					placeholder="Enter the MTOW"
					className="custom_input"
					suffixText="t"
				/>
				<InputField
					label="MOW"
					name="mow"
					placeholder="Enter the MOW"
					className="custom_input"
					suffixText="t"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Annex"
					name="annex"
					placeholder="Enter the annex"
					className="custom_input"
					required
				/>
				<InputField
					label="Main Deck"
					name="mainDeck"
					placeholder="Enter the main deck"
					className="custom_input"
				/>
				<InputField 
					label="APU INOP" 
					name="apuInop" 
					placeholder="Enter the apuInop" 
					className="custom_input" />
			</div>
			<Divider />
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Owner Name"
					name="ownerName"
					placeholder="Enter the owner name"
					className="custom_input"
				/>
				<InputField
					label="Country"
					name="country"
					placeholder="Enter the country name"
					className="custom_input"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField label="Address" name="address" placeholder="Enter the address" className="custom_input" />
				<InputField label="Remarks" name="remarks" placeholder="Enter remarks" className="custom_input" />
			</div>
			<Divider />
			<div className="airport_registration_form_inputfields">
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

export default AircraftRegistrationForm;
