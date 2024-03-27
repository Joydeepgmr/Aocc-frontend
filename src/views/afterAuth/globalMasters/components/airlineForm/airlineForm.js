import React from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider } from 'antd';
import CustomSelect from '../../../../../components/select/select';
import { CountryData, HomeAirportData, SelectPaymentData, TerminalData } from '../../../userAccess/userAccessData';
import Date from '../../../../../components/datapicker/datepicker';
import OtpField from '../../../../../components/input/otp/otp';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import CheckBoxField from '../../../../../components/checkbox/checkbox';
import './airlineForm.scss';

const AirlineForm = ({ isReadOnly, type }) => {
	const isNotEditable = type === 'edit';
	return (
		<div className="airline_setup_form_container">
			<div className="airline_setup_form_inputfields">
				<InputField
					label="Airline Name"
					name="name"
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
					SelectData={CountryData}
					label="Country"
					name="country"
					placeholder={!isReadOnly && 'Country'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={HomeAirportData}
					label="Home Airport"
					name="homeAirport"
					placeholder={!isReadOnly && 'Select home airport'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={TerminalData}
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
					placeholder={!isReadOnly && 'Remark'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CheckBoxField
					name="domestic/International"
					label="Domestic/International"
					title="Single Checkbox"
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
					placeholder={!isReadOnly && 'Address'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<InputField
					label="Phone"
					name="phoneNumber"
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
