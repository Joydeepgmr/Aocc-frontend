import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../components/inputField/inputField';
import Button from '../../../../../../components/button/button';
import Date from '../../../../../../components/datapicker/datepicker';
import { addAircraftRegistration } from '../../../redux/actionCreator';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsShowTableComponents } from '../../../redux/reducer';

const FormComponent = ({ closeModal }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		form.resetFields();
		dispatch(addAircraftRegistration(values));
		dispatch(updateIsShowTableComponents());
		

		closeModal();
	};

	return (
		<div className="main_form">
			<CustomTypography type="text" fontSize={16} fontWeight="400" color="#5C5F66">
				Airport
			</CustomTypography>
			<Form form={form} layout="vertical" onFinish={onFinishHandler}>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Registration"
							name="registration"
							placeholder="Enter the airport name"
							warning="Required field"
						/>
						<Date label="Select Date" name="SelectDate" placeholder="Date Picker" required />

						<InputField
							label="Internal"
							name="internal"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField label="IATA Code" name="IataCode" placeholder="AI1234" warning="Required field" />
						<InputField
							label="ICAO Code"
							name="IcaoCode"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>

						<InputField
							label="ICAO Code Modified"
							name="IcaoCodeModified"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField
							label="ATD"
							name="atd"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>
						<InputField label="SELCAL" name="selcal" placeholder="Filled Text" warning="Required field" />

						<InputField
							label="Home Airport"
							name="HomeAirport"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField label="ATA" name="ata" placeholder="Filled Text" warning="Required field" />
						<InputField
							label="Nationality"
							name="nationality"
							placeholder="Filled Text"
							warning="Required field"
						/>

						<InputField
							label="Type of Use"
							name="TypeofUse"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
				</div>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Cockpit Crew"
							name="CockpitCrew"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="Cabin Crew"
							name="CabinCrew"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField
							label="No. of Seats"
							name="NoofSeats"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="No. of Kitchens"
							name="NoofKitchens"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="No. of Toilets"
							name="NoofToilets"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
				</div>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Height"
							name="height"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="meters"
						/>
						<InputField
							label="Length"
							name="length"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="meters"
						/>
						<InputField
							label="Wingspan"
							name="wingspan"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="meters"
						/>
					</div>

					<div className="form_content">
						<InputField
							label="MTOW"
							name="mtow"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="t"
						/>
						<InputField
							label="Annex"
							name="Annex"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="t"
						/>
					</div>
					<div className="form_content">
						<InputField
							label="Main Deck"
							name="MainDeck"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="APU INOP"
							name="Apuinop"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
				</div>
				<Divider />
				<CustomTypography type="text" fontSize={16} fontWeight="400" color="#5C5F66">
					Owner
				</CustomTypography>
				<div className="form_content">
					<InputField
						label="Owner Name"
						name="OwnerName"
						placeholder="Filled Text"
						warning="Required field"
					/>
					<InputField label="Country" name="country" placeholder="Filled Text" warning="Required field" />
					<InputField
						label="Debit Number"
						name="DebitNumber"
						placeholder="Filled Text"
						warning="Required field"
					/>
				</div>
				<div className="form_content">
					<InputField label="Address" name="address" placeholder="Filled Text" warning="Required field" />
					<InputField label="Remarks" name="remarks" placeholder="Filled Text" warning="Required field" />
				</div>
				<Divider />
				<div className="form_content">
					<Date label="Valid From" name="ValidFrom" placeholder="Enter the airport name" required />
					<Date label="Valid To" name="ValidTo" placeholder="Enter the airport name" required />
				</div>
				<div className="form_section">
					<div className="form_bottomButton">
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
						<Button
							title="Cancel"
							type="filledText"
							id="btn"
							onClick={closeModal}
							className="custom_svgButton"
						/>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
