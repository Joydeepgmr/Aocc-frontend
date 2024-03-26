import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider } from 'antd';
import Date from '../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../components/select/select';
import { SelectAircraftTye } from '../../../userAccess/userAccessData';
import './aircraftRegistrationForm.scss';

const AircraftRegistrationForm = ({ isReadOnly }) => {
	return (
		<div className="airport_registration_form_container">
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Registration"
					name="registration"
					placeholder="Enter the airport name"
					className="custom_input"
					required
					disabled={isReadOnly}
				/>
				<InputField
					label="Internal"
					name="internal"
					placeholder="Enter the internal"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="IATA Code"
					name="iataCode"
					placeholder="Enter the IATA code"
					className="custom_input"
					required
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="ICAO Code"
					name="iacoCode"
					placeholder="Enter the ICAO code"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={SelectAircraftTye}
					placeholder="Filled Text"
					className="custom_input"
					disabled={isReadOnly}
					label="Airport Type"
					name="airportType"
				/>
				<InputField
					label="Type of Use"
					name="typeOfUse"
					placeholder="Enter the type of use"
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Home Airport"
					name="homeAirport"
					placeholder="Enter the home airport"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Nationality"
					name="nationality"
					placeholder="Enter the nationality"
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Cockpit Crew"
					name="cockpitCrew"
					placeholder="Enter the cockpit crew"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Cabin crew"
					name="cabinCrew"
					placeholder="Enter the cabin crew"
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="No. of Seats"
					name="numberOfSeats"
					placeholder="Enter the number of seats"
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Height"
					name="height"
					placeholder="Enter the Height"
					className="custom_input"
					suffixText="meters"
					disabled={isReadOnly}
				/>
				<InputField
					label="Length"
					name="length"
					placeholder="Enter the length"
					className="custom_input"
					suffixText="meters"
					disabled={isReadOnly}
				/>
				<InputField
					label="Wingspan"
					name="wingspan"
					placeholder="Enter the wingspan"
					className="custom_input"
					suffixText="meters"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="MTOW"
					name="mtow"
					placeholder="Enter the MTOW"
					className="custom_input"
					suffixText="t"
					disabled={isReadOnly}
				/>
				<InputField
					label="MOW"
					name="mow"
					placeholder="Enter the MOW"
					className="custom_input"
					suffixText="t"
					required
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Annex"
					name="annex"
					placeholder="Enter the annex"
					className="custom_input"
					required
					disabled={isReadOnly}
				/>
				<InputField
					label="Main Deck"
					name="mainDeck"
					placeholder="Enter the main deck"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="APU INOP"
					name="apuInop"
					placeholder="Enter the apuInop"
					className="custom_input"
					disabled={isReadOnly} />
			</div>
			<Divider />
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Owner Name"
					name="ownerName"
					placeholder="Enter the owner name"
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Country"
					name="country"
					placeholder="Enter the country name"
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField label="Address" name="address" placeholder="Enter the address" className="custom_input"
					disabled={isReadOnly} />
				<InputField label="Remarks" name="remarks" placeholder="Enter remarks" className="custom_input"
					disabled={isReadOnly} />
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
					disabled={isReadOnly}
				/>
				<Date
					label="Valid To"
					placeholder="Select valid to date"
					name="validTo"
					format="MM-DD-YYYY"
					disabled={isReadOnly}
				/>
			</div>
		</div>
	);
};

export default AircraftRegistrationForm;
