import { Divider, Form } from 'antd';
import React, { useMemo } from 'react';
import Date from '../../../../../../components/datapicker/datepicker';
import InputField from '../../../../../../components/input/field/field';
import CustomSelect from '../../../../../../components/select/select';
import { SelectTypeOfUse } from '../../../../userAccess/userAccessData';
import './formComponent.scss';
import ButtonComponent from '../../../../../../components/button/button';
import {
	useCountriesDropdown,
	useGlobalAircraftTypeDropdown,
} from '../../../../../../services/globalMasters/globalMaster';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const FormComponent = ({ isReadOnly, type, closeModal, initialValue }) => {
	const isNotEditable = type === 'edit';
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data: aircraftTypeDropdownData } = useGlobalAircraftTypeDropdown({ onError });
	const { data: countryDropdownData } = useCountriesDropdown({ onError });

	const SelectAircraftData = useMemo(() => {
		return aircraftTypeDropdownData?.map((data) => {
			return { label: data.identifier, value: data.id, id: data.id };
		});
	}, [aircraftTypeDropdownData]);
	const SelectCountryData = useMemo(() => {
		return countryDropdownData?.map((data) => {
			return { label: data.name, value: data.name, id: data.name };
		});
	}, [countryDropdownData]);

	const onFinishHandler = (value) => {
		console.log(value);
	};

	console.log(initialValue);
	return (
		<Form layout="vertical" onFinish={onFinishHandler} initialValues={initialValue} key={initialValue?.id}>
			<div className="airport_form_container">
				<div className="airport_form_inputfields">
					<InputField
						label="Registration"
						name="registration"
						placeholder={!isReadOnly && 'Enter the airport name'}
						min={6}
						max={6}
						className="custom_input"
						required
						disabled={isReadOnly}
					/>
					<InputField
						label="Internal"
						name="internal"
						min={3}
						max={3}
						placeholder={!isReadOnly && 'Enter the internal'}
						className="custom_input"
						disabled={isReadOnly}
					/>
					<InputField
						label="IATA Code"
						name="iataCode"
						min={3}
						max={3}
						placeholder={!isReadOnly && 'Enter the IATA code'}
						className="custom_input"
						required
						disabled={isReadOnly}
					/>
				</div>
				<div className="airport_form_inputfields">
					<InputField
						label="ICAO Code"
						name="icaoCode"
						min={4}
						max={4}
						placeholder={!isReadOnly && 'Enter the ICAO code'}
						className="custom_input"
						disabled={isReadOnly || isNotEditable}
					/>
					<CustomSelect
						SelectData={SelectAircraftData}
						placeholder={!isReadOnly && 'Aircraft Type'}
						className="custom_input"
						disabled={isReadOnly || isNotEditable}
						label="Aircraft Type"
						required
						name="aircraft_id"
						defaultValue={initialValue?.globalAircraftType?.identifier}
					/>
					<CustomSelect
						SelectData={SelectTypeOfUse}
						placeholder={!isReadOnly && 'Type of Use'}
						className="custom_input"
						disabled={isReadOnly}
						label="Type of Use"
						name="usage"
					/>
				</div>
				<div className="airport_form_inputfields">
					<CustomSelect
						SelectData={SelectCountryData}
						label="Nationality"
						name="nationality"
						placeholder={!isReadOnly && 'Enter the nationality'}
						className="custom_input"
						disabled={isReadOnly}
					/>
				</div>
				<div className="airport_form_inputfields">
					<InputField
						label="Cockpit Crew"
						name="cockpitCrew"
						// type='number'
						max={3}
						placeholder={!isReadOnly && 'Enter the cockpit crew'}
						className="custom_input"
						disabled={isReadOnly}
					/>
					<InputField
						label="Cabin crew"
						name="cabinCrew"
						// type='number'
						max={3}
						placeholder={!isReadOnly && 'Enter the cabin crew'}
						className="custom_input"
						disabled={isReadOnly}
					/>
				</div>
				<div className="airport_form_inputfields">
					<InputField
						label="No. of Seats"
						name="totalSeats"
						type="number"
						// placeholder={!isReadOnly && "Enter the number of seats"}
						className="custom_input"
						disabled={true}
						defaultValue={initialValue?.globalAircraftType?.totalSeats}
					/>
				</div>
				<div className="airport_form_inputfields">
					<InputField
						label="Height"
						name="height"
						type="number"
						// placeholder={!isReadOnly && "Enter the Height"}
						className="custom_input"
						suffixText="meters"
						disabled={true}
						defaultValue={initialValue?.globalAircraftType?.height}
					/>
					<InputField
						label="Length"
						name="length"
						type="number"
						// placeholder={!isReadOnly && "Enter the length"}
						className="custom_input"
						suffixText="meters"
						disabled={true}
						defaultValue={initialValue?.globalAircraftType?.length}
					/>
					<InputField
						label="Wingspan"
						name="wingspan"
						type="number"
						// placeholder={!isReadOnly && "Enter the wingspan"}
						className="custom_input"
						suffixText="meters"
						disabled={true}
						defaultValue={initialValue?.globalAircraftType?.wingspan}
					/>
				</div>
				<div className="airport_form_inputfields">
					<InputField
						label="MTOW"
						name="mtow"
						type="number"
						max={999}
						placeholder={!isReadOnly && 'Enter the MTOW'}
						className="custom_input"
						suffixText="t"
						disabled={isReadOnly}
					/>
					<InputField
						label="MOW"
						name="mow"
						max={32}
						placeholder={!isReadOnly && 'Enter the MOW'}
						className="custom_input"
						suffixText="t"
						required
						disabled={isReadOnly}
					/>
				</div>
				<div className="airport_form_inputfields">
					<InputField
						label="Annex"
						name="annex"
						max={32}
						placeholder={!isReadOnly && 'Enter the annex'}
						className="custom_input"
						required
						disabled={isReadOnly}
					/>
					<InputField
						label="Main Deck"
						name="mainDeck"
						max={32}
						placeholder={!isReadOnly && 'Enter the main deck'}
						className="custom_input"
						disabled={isReadOnly}
					/>
				</div>
				<Divider />
				<div className="airport_form_inputfields">
					<InputField
						label="Owner Name"
						name="ownerName"
						max={32}
						placeholder={!isReadOnly && 'Enter the owner name'}
						className="custom_input"
						disabled={isReadOnly}
					/>
					<CustomSelect
						SelectData={SelectCountryData}
						label="Country"
						name="country"
						placeholder={!isReadOnly && 'Enter the country name'}
						className="custom_input"
						disabled={isReadOnly}
					/>
				</div>
				<div className="airport_form_inputfields">
					<InputField
						label="Address"
						max={32}
						name="address"
						placeholder={!isReadOnly && 'Enter the address'}
						className="custom_input"
						disabled={isReadOnly}
					/>
					<InputField
						label="Remarks"
						max={32}
						name="remark"
						placeholder={!isReadOnly && 'Enter remarks'}
						className="custom_input"
						disabled={isReadOnly}
					/>
				</div>
				<Divider />
				<div className="airport_form_inputfields">
					<Date
						label="Valid From"
						placeholder={!isReadOnly && 'Select valid from date'}
						name="valid_from"
						className="custom_date"
						format="MM-DD-YYYY"
						disabledFor="future"
						required
						disabled={isReadOnly || isNotEditable}
						defaultValue={initialValue?.validFrom ? dayjs(initialValue?.validFrom) : undefined}
					/>
					<Date
						label="Valid To"
						placeholder={!isReadOnly && 'Select valid to date'}
						name="valid_till"
						format="MM-DD-YYYY"
						disabled={isReadOnly}
						defaultValue={initialValue?.validTill ? dayjs(initialValue?.validTill) : undefined}
					/>
				</div>

				<Divider />
				<div className="custom_buttons">
					<ButtonComponent
						title="Cancel"
						type="filledText"
						className="custom_button_cancel"
						onClick={closeModal}
					/>
					<ButtonComponent title={'save'} type="filledText" className="custom_button_save" isSubmit={true} />
				</div>
			</div>
		</Form>
	);
};

export default FormComponent;
