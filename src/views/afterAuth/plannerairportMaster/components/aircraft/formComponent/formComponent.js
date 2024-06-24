import { Divider, Form } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import Date from '../../../../../../components/datapicker/datepicker';
import InputField from '../../../../../../components/input/field/field';
import CustomSelect from '../../../../../../components/select/select';
import { SelectTypeOfUse } from '../../../../userAccess/userAccessData';
import ButtonComponent from '../../../../../../components/button/button';
import {
	useCountriesDropdown,
	useGlobalAircraftTypeDropdown,
} from '../../../../../../services/globalMasters/globalMaster';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import './formComponent.scss';
import { useGetAircraftSyncData } from '../../../../../../services/PlannerAirportMaster/PlannerAircraftAirportMaster';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';

const FormComponent = ({ isReadOnly, type, closeModal, initialValue, handleSubmit, isLoading, form }) => {
	const aircraftIdWatch = Form.useWatch('aircraft_id', form);
	console.log("initial values are ", initialValue)
	const [isValidFrom, setIsValidFrom] = useState(type === 'edit' ? true : false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const watchRegistration = Form.useWatch('registration', form);
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
			return { label: data.identifier, value: data.id, ...data };
		});
	}, [aircraftTypeDropdownData]);
	const SelectCountryData = useMemo(() => {
		return countryDropdownData?.map((data) => {
			return { label: data.name, value: data.name, id: data.name };
		});
	}, [countryDropdownData]);
	const getAircraftSyncedData = {
		onSuccess: (data) => {
			if (data) {
				data.validTill = data?.validTill ? dayjs(data?.validTill) : undefined;
				data.validFrom = data?.validFrom ? dayjs(data?.validFrom) : undefined;
				data.aircraft_id = data?.globalAircraftType?.id ?? null;
				data.cockpitCrew = data.cockpitCrew && `${data.cockpitCrew}`
				data.cabinCrew = data.cabinCrew && `${data.cabinCrew}`
				form.setFieldsValue(data);
			}
		},
	};
	const { isLoading: isSyncedDataLoading } = useGetAircraftSyncData(
		watchRegistration?.length === 5 && !isReadOnly && !isNotEditable ? watchRegistration : '',
		getAircraftSyncedData
	);
	const onFinishHandler = (value) => {
		handleSubmit(value);
	};


	const handleValidFrom = (dateString) => {
		if ((form.getFieldValue('validTill') < form.getFieldValue('validFrom'))) {
			form.setFieldsValue({
				validTill: null,
			});
		}
		if (dateString === null) {
			form.setFieldsValue({
				validTill: null,
			});
			setIsValidFrom(false);
			setCurrentValidFrom(null);
		} else {
			setIsValidFrom(true);
			setCurrentValidFrom(dateString?.format('YYYY-MM-DD'));
		}
	};

	useEffect(() => {
		form.resetFields();
		if (initialValue) {
			form.setFieldsValue(initialValue);
		}
	}, [initialValue]);

	useEffect(() => {
		if (aircraftIdWatch) {
			if (SelectAircraftData?.length) {
				const selectedAircraft = SelectAircraftData.find(({ id }) => id === aircraftIdWatch);
				console.log("selectedAircraft", selectedAircraft)
				if (selectedAircraft) {
					const { length, height, wingspan, totalSeats } = selectedAircraft;
					form.setFieldsValue({ length, height, wingspan, totalSeats });
				}
			}
		}
	}, [aircraftIdWatch]);
	return (
		<div key={initialValue?.id}>
			<PageLoader isLoading={isSyncedDataLoading} />
			<Form
				form={form}
				layout="vertical"
				onFinish={onFinishHandler}
				autoComplete='off'
			>
				<div className="airport_form_container">
					<div className="airport_form_inputfields">
						<InputField
							label="Registration"
							name="registration"
							placeholder={!isReadOnly && 'Enter the Registration'}
							min={4}
							max={12}
							className="custom_input"
							required
							disabled={isReadOnly}
							isArticle={false}
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
							disabled={isReadOnly || isNotEditable}
						/>
						<InputField
							label="ICAO Code"
							name="icaoCode"
							min={4}
							max={4}
							placeholder={!isReadOnly && 'Enter the ICAO code'}
							className="custom_input"
							required
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
					</div>
					<div className="airport_form_inputfields">
						<CustomSelect
							SelectData={SelectTypeOfUse}
							placeholder={!isReadOnly && 'Type of Use'}
							className="custom_input"
							disabled={isReadOnly}
							label="Type of Use"
							name="usage"
						/>
						<CustomSelect
							SelectData={SelectCountryData}
							label="Nationality"
							name="nationality"
							placeholder={!isReadOnly && 'Enter the nationality'}
							className="custom_input"
							disabled={isReadOnly}
						/>
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
						<InputField
							label="MTOW"
							name="mtow"
							type="number"
							max={999}
							placeholder={!isReadOnly && 'Enter the MTOW'}
							className="custom_input"
							suffixText="T"
							disabled={isReadOnly}
						/>
						<InputField
							label="MOW"
							name="mow"
							max={5}
							pattern={/^\d+(\.\d{1,2})?$/}
							// type='number'
							placeholder={!isReadOnly && 'Enter the MOW'}
							className="custom_input"
							suffixText="T"
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
						<InputField
							label="Remarks"
							max={32}
							name="remark"
							placeholder={!isReadOnly && 'Enter remarks'}
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
						<Date
							label="Valid From"
							placeholder={!isReadOnly && 'Select valid from date'}
							name="validFrom"
							className="custom_date"
							format="MM-DD-YYYY"
							required
							disabled={isReadOnly || isNotEditable}
							defaultValue={initialValue?.validFrom ? dayjs(initialValue?.validFrom) : undefined}
							onChange={handleValidFrom}
						/>
						<Date
							label="Valid To"
							placeholder={!isReadOnly && 'Select valid to date'}
							name="validTill"
							format="MM-DD-YYYY"
							className="custom_date"
							disabled={isReadOnly || isNotEditable}
							defaultValue={initialValue?.validTill ? dayjs(initialValue?.validTill) : undefined}
							isDisabledDate={true}
							disabledDate={(current) => {
								let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
								return current && current < dayjs(prevDate, 'YYYY-MM-DD');
							}}
						/>
					</div>
				</div>
				<div className="airport_form_inputfields">
					{!isReadOnly && (
						<>
							<Divider />
							<div className="form_bottomButton">
								<ButtonComponent
									title="Cancel"
									type="filledText"
									className="custom_button_cancel"
									onClick={closeModal}
									disabled={isLoading}
								/>
								<ButtonComponent
									title={isNotEditable ? 'Update' : 'Save'}
									type="filledText"
									className="custom_button_save"
									isSubmit={true}
									disabled={isLoading}
								/>
							</div>
						</>
					)}
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
