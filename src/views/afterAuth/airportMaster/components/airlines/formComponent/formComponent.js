import React from 'react';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../components/inputField/inputField';
import Button from '../../../../../../components/button/button';
import Date from '../../../../../../components/datapicker/datepicker';
import './formComponent.scss';

const FormComponent = ({ closeModal }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
	
			form.resetFields();
			dispatch(addAircraftRegistration(values));
    
	};
	return (
		<>
			<div className="main_form">
				<Form form={form} layout="vertical" onFinish={onFinish}>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Airline Name"
								name="AirlineName"
								placeholder="Enter the airport name"
								warning="Required field"
							/>
						</div>

						<div className="form_content">
							<InputField
								label="Correction Key"
								name="CorrectionKey"
								placeholder="AI1234"
								warning="Required field"
							/>
							<InputField
								label="IATA Code"
								name="IataCode"
								placeholder="Filled Text"
								warning="Required field"
								type="number"
							/>

							<InputField
								label="IATA Number"
								name="IataNumber"
								placeholder="Filled Text"
								warning="Required field"
							/>
						</div>

						<div className="form_content">
							<InputField
								label="ICAO Code"
								name="IcaoCode"
								placeholder="Filled Text"
								required
								warning="Required field"
							/>
							<InputField
								label="ICAO Call Sign"
								name="IcaoCallSign"
								placeholder="Filled Text"
								warning="Required field"
							/>

							<InputField
								label="Country"
								name="country"
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
								label="Cockpit Crew"
								name="CockpitCrew"
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
						<Date label="Valid To" name="date" placeholder="Enter the airport name" required />
						
						<Date label="Valid To" name="datepic" placeholder="Enter the airport name" required />
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
		</>
	);
};

export default FormComponent;
