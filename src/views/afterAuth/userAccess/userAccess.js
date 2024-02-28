import React, { useState } from 'react';
import './userAccess.scss';
import ButtonComponent from '../../../components/button/button';
import downArrow from '../../../assets/logo/down-arrow.svg';
import ModalComponent from '../../../components/modalComponent/modalComponent';
import InputField from '../../../components/inputField/inputField';
import { Divider, Form } from 'antd';
import CustomSelect from '../../../components/selectfield/select';
import { SelectData } from './userAccessData';
import Date from '../../../components/datapicker/datepicker';

const UserAccess = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openAddUserModal = () => {
		setIsModalOpen(true);
	};

	const closeAddUserModal = () => {
		setIsModalOpen(false);
	};

	const onFinishHanlder = (values) => {
		values.validFrom = values.validFrom.toISOString();
		values.validTo = values.validTo.toISOString();
		console.log('onFinishHanlder', values);
		closeAddUserModal();
	};

	return (
		<div className="user_access_container">
			<div className="user_access_content">
				<p>Manage User Access</p>
				<p>Overview of access management for airport operation system</p>
				<div className="user_add_button">
					<div className="down_arrow_button">
						<ButtonComponent
							title="Add"
							type="filledText"
							className="custom_button_add"
							onClick={openAddUserModal}
						/>
						<img src={downArrow} className="down_arrow" />
					</div>
					<ButtonComponent title="Upload CSV" type="filledText" className="custom_button" />
					<ButtonComponent title="Download CSV Template" type="filledText" className="custom_button" />
				</div>
			</div>
			<ModalComponent isModalOpen={isModalOpen} closeModal={closeAddUserModal} title="Add User" width="87.2rem">
				<Form layout="vertical" onFinish={onFinishHanlder}>
					<div className="user_add_form">
						<div className="user_input_fields">
							<InputField
								label="User Name"
								name="userName"
								placeholder="Enter the user name"
								required
								warning="Required field"
								className="custom_input"
							/>
							<InputField
								label="User Type"
								name="userType"
								placeholder="Enter the user type"
								className="custom_input"
							/>
						</div>
						<div>
							<CustomSelect
								SelectData={SelectData}
								placeholder="Select the access type"
								label="Access Type"
							/>
						</div>
						<Divider />
						<div className="user_input_fields">
							<Date
								label="Valid From"
								placeholder="Select Date"
								name="validFrom"
								className="custom_date"
								format="MM-DD-YYYY"
							/>
							<Date label="Valid To" placeholder="Select Date" name="validTo" format="MM-DD-YYYY" />
						</div>
						<div className="custom_buttons">
							<ButtonComponent
								title="Cancel"
								type="filledText"
								className="custom_button_cancel"
								onClick={closeAddUserModal}
							/>
							<ButtonComponent
								title="Save"
								type="filledText"
								className="custom_button_save"
								isSubmit={true}
							/>
						</div>
					</div>
				</Form>
			</ModalComponent>
		</div>
	);
};

export default UserAccess;
