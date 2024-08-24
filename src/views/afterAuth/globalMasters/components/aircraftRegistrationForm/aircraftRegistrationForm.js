import { Divider } from 'antd';
import React, { useMemo } from 'react';
import Date from '../../../../../components/datapicker/datepicker';
import InputField from '../../../../../components/input/field/field';
import CustomSelect from '../../../../../components/select/select';
import { SelectTypeOfUse } from '../../../userAccess/userAccessData';
import { useGlobalAirportDropdown, useCountriesDropdown } from '../../../../../services';
import './aircraftRegistrationForm.scss';

const AircraftRegistrationForm = ({ isReadOnly, type, aircraftTypeDropdownData }) => {
	const isNotEditable = type === 'edit';
	const onError = ({ response: { data: { message } } }) => toast.error(message);
	const { data: airportDropdownData } = useGlobalAirportDropdown({ onError });
	const { data: countryDropdownData } = useCountriesDropdown({ onError });

	const SelectAircraftData = useMemo(() => {
		return aircraftTypeDropdownData?.map((data) => {
			return { label: data.identifier, value: data.id, id: data.id }
		})
	}, [aircraftTypeDropdownData])
	const SelectAirportData = useMemo(() => {
		return airportDropdownData?.map((data) => {
			return { label: data.name, value: data.id, id: data.id }
		})
	}, [airportDropdownData])
	const SelectCountryData = useMemo(() => {
		return countryDropdownData?.map((data) => {
			return { label: data.name, value: data.name, id: data.name }
		})
	}, [countryDropdownData])
	return (
		<div className="airport_registration_form_container">
			<div className="airport_registration_form_inputfields">
				<InputField
					label="Registration"
					name="registration"
					pattern='^(?!\s).*\S(?<!\s)$'
					patternWarning='Space not allowed'
					placeholder={!isReadOnly && "Enter the airport name"}
					min={5}
					max={5}
					className="custom_input"
					required
					disabled={isReadOnly}
				/>
				<InputField
					label="Internal"
					name="internal"
					pattern='^(?!\s).*\S(?<!\s)$'
					patternWarning='Space not allowed'
					min={3}
					max={3}
					placeholder={!isReadOnly && "Enter the internal"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="IATA Code"
					name="iataCode"
					pattern='^(?!\s).*\S(?<!\s)$'
					patternWarning='Space not allowed'
					min={3}
					max={3}
					placeholder={!isReadOnly && "Enter the IATA code"}
					className="custom_input"
					required
					disabled={isReadOnly}
				/>
				<InputField
					label="ICAO Code"
					name="icaoCode"
					pattern='^(?!\s).*\S(?<!\s)$'
					patternWarning='Space not allowed'
					min={4}
					max={4}
					required
					placeholder={!isReadOnly && "Enter the ICAO code"}
					className="custom_input"
					disabled={isReadOnly || isNotEditable}
				/>
				<CustomSelect
					SelectData={SelectAircraftData}
					placeholder={!isReadOnly && "Aircraft Type"}
					className="custom_input"
					disabled={isReadOnly || isNotEditable}
					label="Aircraft Type"
					required
					name="aircraft_id"
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<CustomSelect
					SelectData={SelectTypeOfUse}
					placeholder={!isReadOnly && "Type of Use"}
					className="custom_input"
					disabled={isReadOnly}
					label="Type of Use"
					name="usage"
				/>
				<CustomSelect
					SelectData={SelectAirportData}
					label="Home Airport"
					name="airportId"
					placeholder={!isReadOnly && "Enter the home airport"}
					className="custom_input"
					disabled={isReadOnly || isNotEditable}
					required
				/>
				<CustomSelect
					SelectData={SelectCountryData}
					label="Nationality"
					name="nationality"
					placeholder={!isReadOnly && "Enter the nationality"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Cockpit Crew"
					name="cockpitCrew"
					max={999}
					type='number'
					placeholder={!isReadOnly && "Enter the cockpit crew"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Cabin crew"
					name="cabinCrew"
					max={999}
					type='number'
					placeholder={!isReadOnly && "Enter the cabin crew"}
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="No. of Seats"
					name="totalSeats"
					type='number'
					// placeholder={!isReadOnly && "Enter the number of seats"}
					className="custom_input"
					disabled={true}
				/>
				<InputField
					label="Height"
					name="height"
					type='number'
					// placeholder={!isReadOnly && "Enter the Height"}
					className="custom_input"
					suffixText="meters"
					disabled={true}
				/>
				<InputField
					label="Length"
					name="length"
					type='number'
					// placeholder={!isReadOnly && "Enter the length"}
					className="custom_input"
					suffixText="meters"
					disabled={true}
				/>
				<InputField
					label="Wingspan"
					name="wingspan"
					type='number'
					// placeholder={!isReadOnly && "Enter the wingspan"}
					className="custom_input"
					suffixText="meters"
					disabled={true}
				/>
				<InputField
					label="MTOW"
					name="mtow"
					type='number'
					max={999}
					placeholder={!isReadOnly && "Enter the MTOW"}
					className="custom_input"
					suffixText="T"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="MOW"
					name="mow"
					max={6}
					pattern='^\d+(\.\d{1,2})?$'
					placeholder={!isReadOnly && "Enter the MOW"}
					className="custom_input"
					suffixText="t"
					required
					disabled={isReadOnly}
				/>
				<InputField
					label="Annex"
					name="annex"
					pattern='^(?!\s).*$'
					max={32}
					placeholder={!isReadOnly && "Enter the annex"}
					className="custom_input"
					required
					disabled={isReadOnly}
				/>
				<InputField
					label="Main Deck"
					name="mainDeck"
					pattern='^(?!\s).*$'
					max={32}
					placeholder={!isReadOnly && "Enter the main deck"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				{/* <InputField
					label="APU INOP"
					name="apuInop"
					placeholder={!isReadOnly && "Enter the apuInop"}
					className="custom_input"
					disabled={isReadOnly} /> */}
				<InputField
					label="Owner Name"
					name="ownerName"
					pattern='^(?!\s).*$'
					max={32}
					placeholder={!isReadOnly && "Enter the owner name"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={SelectCountryData}
					label="Country"
					name="country"
					pattern='^(?!\s).*$'
					placeholder={!isReadOnly && "Enter the country name"}
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_registration_form_inputfields">
				<InputField
					label="No. of Baggage-belt"
					name="checkinCounterCount"
					type='number'
					placeholder={!isReadOnly && "No. of check-in counter"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="No. of Check-in Counter"
					name="baggageBeltCount"
					type='number'
					placeholder={!isReadOnly && "No. of check-in counter"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField label="Address" pattern='^(?!\s).*$' max={32} name="address" placeholder={!isReadOnly && "Enter the address"} className="custom_input"
					disabled={isReadOnly} />
				<InputField label="Remarks" pattern='^(?!\s).*$' max={32} name="remark" placeholder={!isReadOnly && "Enter remarks"} className="custom_input"
					disabled={isReadOnly} />
			</div>
			<div className="airport_registration_form_inputfields">
				<Date
					label="Valid From"
					placeholder={!isReadOnly && "Select valid from date"}
					name="validFrom"
					className="custom_date"
					format="MM-DD-YYYY"
					disabledFor='future'
					required
					disabled={isReadOnly || isNotEditable}
				/>
				<Date
					label="Valid To"
					placeholder={!isReadOnly && "Select valid to date"}
					name="validTill"
					className="custom_date"
					format="MM-DD-YYYY"
					disabled={isReadOnly}
				/>
			</div>
		</div>
	);
};

export default AircraftRegistrationForm;
