import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider } from 'antd';
import Date from '../../../../../components/datapicker/datepicker';
import CheckBoxField from '../../../../../components/checkbox/checkbox';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import './aircraftTypeForm.scss';
import { SelectAcBodyType, SelectEngineType } from '../../../userAccess/userAccessData';
import CustomSelect from '../../../../../components/select/select';

const AircraftTypeForm = ({ isReadOnly, type }) => {
	const isNotEditable = type === 'edit'
	return (
		<div className="aircraft_type_form_container">
			<div className="aircraft_type_form_inputfields">
				<InputField
					label="Identifier"
					name="identifier"
					placeholder={!isReadOnly && "Enter the identifier name"}
					className="custom_input"
					required
					disabled={isReadOnly}
				/>
				<InputField
					label="IATA Code"
					name="iataCode"
					placeholder={!isReadOnly && "Enter the IATA Code"}
					className="custom_input"
					required
					disabled={isReadOnly || isNotEditable}
				/>
				<InputField
					label="Model"
					name="model"
					placeholder={!isReadOnly && "Enter the model name"}
					className="custom_input"
					required
					disabled={isReadOnly || isNotEditable}
				/>
			</div>
			<div className="aircraft_type_form_inputfields">
				<InputField
					label="Airline"
					name="airline"
					placeholder={!isReadOnly && "Enter the airline name"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="ICAO Code"
					name="icaoCode"
					placeholder={!isReadOnly && "Enter the ICAO Code"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="ICAO Code Modified"
					name="icaoCodeModified"
					placeholder={!isReadOnly && "Enter the ICAO code modified"}
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="aircraft_type_form_inputfields">
				<InputField
					label="A/C Family"
					name="acFamily"
					placeholder={!isReadOnly && "Enter the aircraft family"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={SelectAcBodyType}
					label="A/C Body Type"
					name="acBodyType"
					placeholder={!isReadOnly && "Enter the Aircraft Body Type"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CheckBoxField
					name="dockersystem"
					disabled={isReadOnly}
					label="Don't use docking system"
					title="Single Checkbox"
				/>
			</div>
			<div className="aircraft_type_form_inputfields">
				<InputField
					label="Minimum Ground Time"
					name="minimumGroundTime"
					placeholder={!isReadOnly && "Enter the minimum ground time"}
					className="custom_input"
					suffixText="minutes"
					disabled={isReadOnly}
				/>
			</div>
			<div className="aircraft_type_form_inputfields">
				<InputField
					label="Wingspan"
					name="wingspan"
					placeholder={!isReadOnly && "Enter the wingspan"}
					className="custom_input"
					suffixText="meters"
					disabled={isReadOnly}
				/>
				<InputField
					label="Length"
					name="length"
					placeholder={!isReadOnly && "Enter the length"}
					className="custom_input"
					suffixText="meters"
					disabled={isReadOnly}
				/>
				<InputField
					label="Height"
					name="height"
					placeholder={!isReadOnly && "Enter the Height"}
					className="custom_input"
					suffixText="meters"
					disabled={isReadOnly}
				/>
			</div>
			<div className="aircraft_type_form_inputfields">
				<CustomSelect
					SelectData={SelectEngineType}
					label="Engine Type"
					name="engineType"
					placeholder={!isReadOnly && "Enter the engine type"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Number of Engines"
					name="numberOfEngines"
					placeholder={!isReadOnly && "Enter the number of engines"}
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<Divider />
			<div className='customTypo'><CustomTypography type="title" fontSize={14} fontWeight="600" color='#5C5F66'>Seats</CustomTypography></div>
			<div className="aircraft_type_form_inputfields">
				<InputField
					label="Total Seats"
					name="totalSeats"
					placeholder={!isReadOnly && "Enter the total seats"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="First Class"
					name="firstClass"
					placeholder={!isReadOnly && "Enter the first class seats"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Business Class"
					name="businessClass"
					placeholder={!isReadOnly && "Enter the business class seats"}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Economy Class"
					name="economyClass"
					placeholder={!isReadOnly && "Enter the economy class seats"}
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="aircraft_type_form_inputfields">
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
					name="validTo"
					disabledFor='past'
					format="MM-DD-YYYY"
					disabled={isReadOnly} />
			</div>
		</div>
	);
};

export default AircraftTypeForm;