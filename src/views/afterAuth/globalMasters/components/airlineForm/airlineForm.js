import { Divider } from 'antd';
import React from 'react';
import Date from '../../../../../components/datapicker/datepicker';
import InputField from '../../../../../components/input/field/field';
import OtpField from '../../../../../components/input/otp/otp';
import CustomSelect from '../../../../../components/select/select';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import { useGlobalAirport, useGlobalCountries } from '../../../../../services/globalMasters/globalMaster';
import { AirlineTypeData, SelectPaymentData } from '../../../userAccess/userAccessData';
import './airlineForm.scss';

const AirlineForm = ({ isReadOnly, type }) => {
	const { updatedData: globalAirportData = [] } = useGlobalAirport();
	const { countryData = [] } = useGlobalCountries();
	const SelectAirportData = globalAirportData.map((data) => {
		return { label: data.name, value: data.id, id: data.id }
	})
	const SelectCountryData = countryData.map((data) => {
		return { label: data.name, value: data.name, id: data.name }
	})
	const isNotEditable = type === 'edit';
	return (
		<div className="airline_setup_form_container">
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Airline Name"
					name="name"
					max={32}
					placeholder={!isReadOnly && 'Enter the airline name'}
					className="custom_input"
					disabled={isReadOnly}
					required
				/>
				<OtpField
					otpLength={2}
					label="Two Letter Code"
					name="twoLetterCode"
					disabled={isReadOnly || isNotEditable}
					required
				/>
				<OtpField
					otpLength={3}
					label="Three Letter Code"
					name="threeLetterCode"
					disabled={isReadOnly || isNotEditable}
					required
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<CustomSelect
					SelectData={SelectCountryData}
					label="Country"
					name="country"
					placeholder={!isReadOnly && 'Country'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={SelectAirportData}
					label="Home Airport"
					name="globalAirport"
					placeholder={!isReadOnly && 'Select home airport'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Terminal"
					name="terminal"
					placeholder={!isReadOnly && 'Filled Text'}
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Remark"
					name="remark"
					max={32}
					placeholder={!isReadOnly && 'Remark'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={AirlineTypeData}
					label="Airline Type"
					name="airlineType"
					multiple
					placeholder={!isReadOnly && 'Filled Text'}
					className="custom_input"
					disabled={isReadOnly}
				/>
			</div>
			<Divider />
			<div className="airline_setup_form_inputfields">
				<CustomSelect
					SelectData={SelectPaymentData}
					placeholder={!isReadOnly && 'Select the access type'}
					label="Mode of payment"
					name="paymentMode"
					disabled={isReadOnly}
				/>
			</div>
			<div className="customTypo">
				<CustomTypography type="title" fontSize={14} fontWeight="600" color="#5C5F66">
					Head Office
				</CustomTypography>
			</div>

			<div className="airline_setup_form_inputfields">
				<InputField
					label="Address 1"
					name="address"
					max={32}
					placeholder={!isReadOnly && 'Address'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Phone"
					name="phoneNumber"
					max={20}
					placeholder={!isReadOnly && 'Enter your Phone No.'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				{/* <InputField label="Telex" name="telex" placeholder="Telex" className="custom_input" /> */}
			</div>
			<Divider />
			<div className="airline_setup_form_inputfields">
				<Date
					label="Valid From"
					placeholder={!isReadOnly && 'Select valid from date'}
					name="validFrom"
					className="custom_date"
					format="MM-DD-YYYY"
					disabledFor='future'
					disabled={isReadOnly || isNotEditable}
					required
				/>
				<Date
					label="Valid To"
					placeholder={!isReadOnly && 'Select valid to date'}
					name="validTill"
					format="MM-DD-YYYY"
					disabled={isReadOnly}
				/>
			</div>
		</div>
	);
};

export default AirlineForm;
