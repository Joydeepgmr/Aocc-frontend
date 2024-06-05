import React, { useEffect, useMemo } from 'react';
import InputField from '../../../../../components/input/field/field';
import { Divider, Form } from 'antd';
import toast from 'react-hot-toast';
import Date from '../../../../../components/datapicker/datepicker';
import CustomSelect from '../../../../../components/select/select';
import { SelectData } from '../../../userAccess/userAccessData';
import OtpField from '../../../../../components/input/otp/otp';
import { useTimezoneDropdown, useCountriesDropdown } from '../../../../../services/globalMasters/globalMaster';
import './airportForm.scss';
import ImageUpload from '../../../../../components/imageUpload/imageUpload';

const AirportForm = ({ isReadOnly, type, fileList, setFileList }) => {

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);

	const { data: countryDropdownData } = useCountriesDropdown({ onError });
	const { data: timezoneDropdown } = useTimezoneDropdown({ onError });

	const SelectCountryData = useMemo(() => {
		return countryDropdownData?.map((data) => {
			return { label: data.name, value: data.name, id: data.name };
		})
	}, [countryDropdownData]);

	const SelectedTimeZone = useMemo(() => {
		return timezoneDropdown?.url?.map((data) => {
			return { label: data, value: data, id: data };
		})
	}, [timezoneDropdown]);

	const isNotEditable = type === 'edit';
	return (
		<div className="airport_setup_form_container">
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Airport Name"
					name="name"
					pattern='^(?!\s).*$'
					placeholder={!isReadOnly && "Enter the airport name"}
					className="custom_input"
					disabled={isReadOnly}
					max={30}
					required
				/>
				<OtpField otpLength={3} label="IATA Code" pattern='^[a-zA-Z0-9]+$' required name="iataCode" disabled={isReadOnly || isNotEditable} />
				<OtpField otpLength={4} label="ICAO Code" pattern='^[a-zA-Z0-9]+$' required name="icaoCode" disabled={isReadOnly || isNotEditable} />
				<ImageUpload
					{...{
						fileList,
						disabled: isReadOnly,
						setFileList,
						required: true,
						name: 'file',
						label: 'Airport logo',
						description: 'Please Provide high resolution logo'
					}}
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Abbreviated Name 1"
					name="abbreviatedName1"
					pattern='^(?!\s).*$'
					placeholder={!isReadOnly && "Enter the abbreviated name 1"}
					className="custom_input"
					max={32}
					disabled={isReadOnly}
				/>
				<InputField
					label="Abbreviated Name 2"
					name="abbreviatedName2"
					pattern='^(?!\s).*$'
					placeholder={!isReadOnly && "Enter the abbreviated name 2"}
					className="custom_input"
					max={32}
					disabled={isReadOnly}
				/>
				<InputField
					label="Abbreviated Name 3"
					name="abbreviatedName3"
					pattern='^(?!\s).*$'
					placeholder={!isReadOnly && "Enter the abbreviated name 3"}
					className="custom_input"
					max={32}
					disabled={isReadOnly}
				/>
				<InputField
					label="Abbreviated Name 4"
					name="abbreviatedName4"
					pattern='^(?!\s).*$'
					placeholder={!isReadOnly && "Enter the abbreviated name 4"}
					className="custom_input"
					max={32}
					disabled={isReadOnly}
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<CustomSelect
					SelectData={SelectData}
					placeholder="Select the access type"
					label="Airport Type"
					name="airportType"
					disabled={isReadOnly}
					required
				/>
				<CustomSelect
					SelectData={SelectCountryData}
					label="Country"
					name="country"
					placeholder={!isReadOnly && 'Country'}
					className="custom_input"
					disabled={isReadOnly}
				/>
				<CustomSelect
					SelectData={SelectedTimeZone}
					placeholder={!isReadOnly && "Enter the time change"}
					label="Time Zone"
					name="timeChange"
					disabled={isReadOnly}
					required
				/>
				<InputField
					label="Standard Flight Time"
					name="standardFlightTime"
					pattern='^(?!\s).*$'
					placeholder={!isReadOnly && "Enter the standard flight time"}
					className="custom_input"
					suffixText="min"
					disabled={isReadOnly}
					type='number'
				/>
			</div>
			<div className="airport_setup_form_inputfields">
				<InputField
					label="Latitude"
					name="latitude"
					type='text'
					pattern='^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$'
					patternWarning="Please enter the valid latitude"
					placeholder={!isReadOnly && "Enter the latitude"}
					className="custom_input"
					disabled={isReadOnly}
					required
				/>
				<InputField
					label="Longitude"
					name="longitude"
					pattern='^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$'
					type='text'
					patternWarning="Please enter the valid longitude"
					placeholder={!isReadOnly && "Enter the longitude"}
					className="custom_input"
					disabled={isReadOnly}
					required
				/>
				<Date
					label="Valid From"
					placeholder={!isReadOnly && "Select valid from date"}
					name="validFrom"
					className="custom_date"
					format="MM-DD-YYYY"
					disabled={isReadOnly || isNotEditable}
					disabledFor='future'
					required
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

export default AirportForm;