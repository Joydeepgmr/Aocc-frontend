import React, { useState } from 'react';
import { Form, Divider } from 'antd';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import InputField from '../../../../../../components/input/field/field';
import CustomSelect from '../../../../../../components/select/select';
import Button from '../../../../../../components/button/button';
import Date from '../../../../../../components/datapicker/datepicker';
import { addAircraftRegistration } from '../../../redux/actionCreator';
import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsShowTableComponents } from '../../../redux/reducer';
import { SelectData } from '../../../../userAccess/userAccessData';
import './formComponent.scss';
const FormComponent = ({ closeModal }) => {
	const SelectData = [
		{
			id: '1',
			label: 'Options',
			value: 'options',
		},
		{
			id: '2',
			label: 'Options1',
			value: 'options1',
		},
		{
			id: '3',
			label: 'Options2',
			value: 'options2',
		},
	];
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const onFinishHandler = (values) => {
		console.log('abhishek', values);
		form.resetFields();
		dispatch(addAircraftRegistration(values));
		dispatch(updateIsShowTableComponents());
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

						<InputField
							label="Internal"
							name="internal"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField label="IATA Code" name="iata_code" placeholder="AI1234" warning="Required field" />
					</div>

					<div className="form_content">
						<InputField
							label="ICAO Code"
							name="icao_code"
							placeholder="Filled Text"
							warning="Required field"
							type="number"
						/>
						<CustomSelect
							required={true}
							SelectData={SelectData}
							label="Aircraft Type"
							name="aircraft_type"
							placeholder={'Select Field'}
						/>
						<InputField
							label="Type of Use"
							name="type_of_use"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<div className="form_content">
						<InputField
							label="Home Airport"
							name="home_airport"
							placeholder="Filled Text"
							required
							warning="Required field"
						/>

						<InputField
							label="Nationality"
							name="nationality"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
				</div>
				<div className="form_section">
					<div className="form_content">
						<InputField
							label="Cockpit Crew"
							name="cockpit_crew"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="Cabin Crew"
							name="cabin_crew"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
					<div className="form_content">
						<InputField
							label="No. of Seats"
							name="no_of_seats"
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
							suffixText="metric tonne"
						/>
						<InputField
							label="MOW"
							name="mow"
							placeholder="Filled Text"
							warning="Required field"
							suffixText="metric tonne"
						/>
					</div>
					<div className="form_content">
						<InputField label="Annex" name="annex" placeholder="Filled Text" warning="Required field" />
						<InputField
							label="Main Deck"
							name="main_deck"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="APU INOP"
							name="apu_inop"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
				</div>
				<Divider />
				<div className="form_section">
					<CustomTypography type="text" fontSize={16} fontWeight="400" color="#5C5F66">
						Owner
					</CustomTypography>
					<div className="form_content">
						<InputField
							label="Owner Name"
							name="owner_name"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField label="Country" name="country" placeholder="Filled Text" warning="Required field" />
					</div>
					<div className="form_content">
						<InputField label="Address" name="address" placeholder="Filled Text" warning="Required field" />
						<InputField label="Remarks" name="remarks" placeholder="Filled Text" warning="Required field" />
					</div>
				</div>
				<Divider />
				<div className="form_section">
					<div className="form_content">
						<Date label="Valid From" name="valid_from" placeholder="Enter the airport name" required />
						<Date label="Valid To" name="valid_till" placeholder="Enter the airport name" required />
					</div>
				</div>
				<div className="form_section">
					<div className="form_bottomButton">
						<Button title="Cancel" type="filledText" id="btn" className="custom_svgButton" />
						<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
					</div>
				</div>
			</Form>
		</div>
	);
};

export default FormComponent;
