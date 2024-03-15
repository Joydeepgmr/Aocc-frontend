import React from 'react';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import { Form, Divider } from 'antd';
import InputField from '../../../../../../components/inputField/inputField';
import CustomSelect from '../../../../../../components/selectfield/select';
import Button from '../../../../../../components/button/button';
import Date from '../../../../../../components/datapicker/datepicker';
import OtpField from '../../../../../../components/otpField/otpField';
import TableComponent from '../../../../../../components/table/table';
import { columns, dummyData } from './data';
import './formComponent.scss';
const FormComponent = ({ closeModal }) => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		form.resetFields();
		dispatch(addAircraftRegistration(values));
	};
	const SelectData = [];
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
							<OtpField label="Airport Code" otpLength={2} id="custom_otp" name="airportCode" />
							<OtpField label="ATC Code" name="atcCode" />
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
						</div>

						<div className="form_content">
							<InputField
								label="Country"
								name="country"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Continent"
								name="continent"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Home Airport"
								name="HomeAirport"
								placeholder="Filled Text"
								warning="Required field"
							/>
						</div>
					</div>
					<div className="form_section">
						<div className="form_content">
							<InputField
								label="Remark"
								name="remark"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Leasing"
								name="leasing"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<OtpField
								label="Domestic/International"
								otpLength={1}
								id="custom_otp"
								name="domestic/International"
							/>
						</div>

						<div className="form_content">
							<InputField
								label="Terminal"
								name="terminal"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Report"
								name="report"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Work Order"
								name="workOrder"
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
							/>
							<InputField
								label="Administrator"
								name="administrator"
								placeholder="Filled Text"
								warning="Required field"
							/>
						</div>
						<Divider />
						<div className="form_content">
							<CustomSelect
								SelectData={SelectData}
								label="Mode of Payment"
								name="ModeofPayment"
								placeholder={'Enter the airport name'}
							/>
						</div>
					</div>
					<Divider />
					<div className="wrapper_head">
						<CustomTypography type="text" fontSize={16} fontWeight="400" color="#5C5F66">
							Head Office
						</CustomTypography>
						<div className="form_content">
							<InputField
								label="Address 1"
								name="address1"
								placeholder="Filled Text"
								warning="Required field"
							/>
							<InputField
								label="Address2"
								name="Address2"
								placeholder="Filled Text"
								warning="Required field"
							/>
						</div>
					</div>
					<div className="form_content">
						<InputField
							label="Address3"
							name="address3"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="Address4"
							name="Address4"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
					<div className="form_content">
						<InputField label="Phone" name="fax" placeholder="Filled Text" warning="Required field" />
						<InputField
							label="Internet"
							name="internet"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>
					<div className="form_content">
						<InputField label="Founded" name="founded" placeholder="Filled Text" warning="Required field" />
						<InputField
							label="SITA Code"
							name="SITACode"
							placeholder="Filled Text"
							warning="Required field"
						/>
						<InputField
							label="Employees"
							name="employees"
							placeholder="Filled Text"
							warning="Required field"
						/>
					</div>

					<Divider />
					<div className="Box_airline_nested_modal">
						<div className="custom_airline_form_table">
							<CustomTypography type="text" fontSize={16} fontWeight="400" color="#5C5F66">
								Agents
							</CustomTypography>
							<div className="custom_button_airline">
								<Button title="Delete" type="filledText" id="btn" className="custom_svgButton" />
								<Button title="Add" type="filledText" id="btn" isSubmit="submit" />
							</div>
						</div>
						<TableComponent columns={columns} data={dummyData} />
					</div>
					<Divider />
					<div className="form_content">
						<Date label="Valid From" name="ValidFrom" placeholder="Enter the airport name" required />
						<Date label="Valid To" name="ValidTo" placeholder="Enter the airport name" required />
					</div>
					<div className="form_section">
						<div className="form_bottomButton">
							<Button
								title="Cancel"
								type="filledText"
								id="btn"
								className="custom_svgButton"
							/>
							<Button title="Save" type="filledText" id="btn" isSubmit="submit" />
						</div>
					</div>
				</Form>
			</div>
		</>
	);
};

export default FormComponent;
