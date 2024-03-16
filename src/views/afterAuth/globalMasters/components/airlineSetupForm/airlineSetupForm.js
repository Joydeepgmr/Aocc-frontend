import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider } from 'antd';
import CustomSelect from '../../../../../components/select/select';
import { SelectData } from '../../../userAccess/userAccessData';
import Date from '../../../../../components/datapicker/datepicker';

const AirlineSetupForm = () => {
	return (
		<div className="airline_setup_form_container">
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Airline Name"
					name="airlineName"
					placeholder="Enter the airline name"
					className="custom_input"
					required
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Connection key"
					name="connectionKey"
					placeholder="Enter the connection key"
					className="custom_input"
				/>
				<InputField
					label="IATA Code"
					name="iataCode"
					placeholder="Enter the IATA code"
					className="custom_input"
				/>
				<InputField
					label="IATA Number"
					name="iataNumber"
					placeholder="Enter the IATA number"
					className="custom_input"
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Connection key"
					name="connectionKey"
					placeholder="Enter the connection key"
					className="custom_input"
				/>
				<InputField
					label="IATA Code"
					name="iataCode"
					placeholder="Enter the IATA code"
					className="custom_input"
				/>
				<InputField
					label="IATA Number"
					name="iataNumber"
					placeholder="Enter the IATA number"
					className="custom_input"
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField
					label="ICAO Code"
					name="icaoCode"
					placeholder="Enter the ICAO Code"
					className="custom_input"
				/>
				<InputField
					label="ICAO Call Sign"
					name="icaoCallSign"
					placeholder="Enter the ICAO call sign"
					className="custom_input"
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Country" name="country" placeholder="Country" className="custom_input" />
				<InputField
					label="Continent"
					name="continent"
					placeholder="Enter the continent"
					className="custom_input"
				/>
				<InputField
					label="Home Airport"
					name="homeAirport"
					placeholder="Enter the home airport"
					className="custom_input"
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Country" name="country" placeholder="Country" className="custom_input" />
				<InputField
					label="Continent"
					name="continent"
					placeholder="Enter the continent"
					className="custom_input"
				/>
				<InputField
					label="Home Airport"
					name="homeAirport"
					placeholder="Enter the home airport"
					className="custom_input"
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Remark" name="remark" placeholder="Remark" className="custom_input" />
				<InputField label="Leasing" name="leasing" placeholder="Enter the leasing" className="custom_input" />
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Terminal" name="terminal" placeholder="Terminal" className="custom_input" />
				<InputField label="Report" name="report" placeholder="Report" className="custom_input" />
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Work Order" name="workOrder" placeholder="Work Order" className="custom_input" />
				<InputField
					label="Administrator"
					name="administrator"
					placeholder="Adminstrator"
					className="custom_input"
				/>
			</div>
			<Divider />
			<div>
				<CustomSelect SelectData={SelectData} placeholder="Select the access type" label="Access Type" />
			</div>
			<Divider />
			<div className="airline_setup_form_inputfields">
				<InputField label="Address 1" name="address1" placeholder="Address 1" className="custom_input" />
				<InputField label="Address 2" name="address2" placeholder="Address 2" className="custom_input" />
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Address 3" name="address3" placeholder="Address 3" className="custom_input" />
				<InputField label="Address 4" name="address4" placeholder="Address 4" className="custom_input" />
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Phone" name="phone" placeholder="Enter your Phone No." className="custom_input" />
				<InputField label="Fax" name="fax" placeholder="FAX" className="custom_input" />
				<InputField label="Internet" name="Internet" placeholder="Internet" className="custom_input" />
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Telex" name="telex" placeholder="Telex" className="custom_input" />
				<InputField label="Executive" name="executive" placeholder="Executive" className="custom_input" />
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField label="Founded" name="founded" placeholder="Founded" className="custom_input" />
				<InputField label="SITA Code" name="sitaCode" placeholder="SITA Code" className="custom_input" />
				<InputField label="Employees" name="employees" placeholder="Employees" className="custom_input" />
			</div>
			<Divider />
			<div className="airline_setup_form_inputfields">
				<Date
					label="Valid From"
					placeholder="Select valid from date"
					name="validFrom"
					className="custom_date"
					format="MM-DD-YYYY"
				/>
				<Date label="Valid To" placeholder="Select valid to date" name="validTo" format="MM-DD-YYYY" />
			</div>
		</div>
	);
};

export default AirlineSetupForm;
