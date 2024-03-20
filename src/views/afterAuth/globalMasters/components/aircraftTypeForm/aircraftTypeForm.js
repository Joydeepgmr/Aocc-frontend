import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider } from 'antd';
import Date from '../../../../../components/datapicker/datepicker';
import './aircraftTypeForm.scss';
import CheckBoxField from '../../../../../components/checkbox/checkbox';

const AircraftTypeForm = () => {
	return (
		<div className="airport_type_form_container">
			<div className="airport_type_form_inputfields">
				<InputField
					label="Identifier"
					name="itentifier"
					placeholder="Enter the identifier name"
					className="custom_input"
					required
				/>
				<InputField
					label="IATA Code"
					name="IataCode"
					placeholder="Enter the IATA Code"
					className="custom_input"
					required
				/>
				<InputField
					label="Model"
					name="model"
					placeholder="Enter the model name"
					className="custom_input"
					required
				/>
			</div>
			<div className="airport_type_form_inputfields">
				<InputField
					label="Airline"
					name="airline"
					placeholder="Enter the airline name"
					className="custom_input"
				/>
				<InputField
					label="ICAO Code"
					name="icaoCode"
					placeholder="Enter the ICAO Code"
					className="custom_input"
				/>
				<InputField
					label="ICAO Code Modified"
					name="icaoCodeModified"
					placeholder="Enter the ICAO code modified"
					className="custom_input"
				/>
			</div>
			<div className="airport_type_form_inputfields">
				<InputField
					label="A/C Family"
					name="acFamily"
					placeholder="Enter the aircraft family"
					className="custom_input"
				/>
				<InputField
					label="A/C Body Type"
					name="acBodyType"
					placeholder="Enter the Aircraft Body Type"
					className="custom_input"
				/>
				<CheckBoxField name="dockersystem" label="Don't use docking system" title="Single Checkbox" />
			</div>
			<div className="airport_type_form_inputfields">
				<InputField
					label="Minimum Ground Time"
					name="minimumGroundTime"
					placeholder="Enter the minimum ground time"
					className="custom_input"
					suffixText="minutes"
				/>
			</div>
			<div className="airport_type_form_inputfields">
				<InputField
					label="Wingspan"
					name="wingspan"
					placeholder="Enter the wingspan"
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
					label="Height"
					name="height"
					placeholder="Enter the Height"
					className="custom_input"
					suffixText="meters"
				/>
			</div>
			<div className="airport_type_form_inputfields">
				<InputField
					label="Engine Type"
					name="engineType"
					placeholder="Enter the engine type"
					className="custom_input"
				/>
				<InputField
					label="Number of Engines"
					name="numberOfEngines"
					placeholder="Enter the number of engines"
					className="custom_input"
				/>
			</div>
			<Divider />
			<div className="airport_type_form_inputfields">
				<InputField
					label="Total Seats"
					name="totalSeats"
					placeholder="Enter the total seats"
					className="custom_input"
				/>
				<InputField
					label="First Class"
					name="firstClass"
					placeholder="Enter the first class seats"
					className="custom_input"
				/>
				<InputField
					label="Business Class"
					name="businessClass"
					placeholder="Enter the business class seats"
					className="custom_input"
				/>
				<InputField
					label="Economy Class"
					name="economyClass"
					placeholder="Enter the economy class seats"
					className="custom_input"
				/>
			</div>
			<div className="airport_type_form_inputfields">
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

export default AircraftTypeForm;
