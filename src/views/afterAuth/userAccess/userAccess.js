import React, { useState } from 'react';
import ButtonComponent from '../../../components/button/button';
import downArrow from '../../../assets/logo/down-arrow.svg';
import ModalComponent from '../../../components/modal/modal';
import InputField from '../../../components/input/field/field';
import { Divider, Form } from 'antd';
import CustomSelect from '../../../components/select/select';
import { SelectData, columns, dummyData } from './userAccessData';
import Date from '../../../components/datapicker/datepicker';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import TableComponent from '../../../components/table/table';

import './userAccess.scss';

const UserAccess = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openAddUserModal = () => {
		setIsModalOpen(true);
	};

	const closeAddUserModal = () => {
		setIsModalOpen(false);
	};

	const onFinishHanlder = (values) => {
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		console.log('onFinishHanlder', values);
		closeAddUserModal();
	};

	return (
		<div className="user_access_container">
			<div className="user_access_content">
				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black" lineHeight="3.36rem">
					Manage User Access
				</CustomTypography>
				<CustomTypography type="paragraph" fontSize={14} fontWeight="400" color="#909296" lineHeight="3.36rem">
					Overview of access management for airport operating system
				</CustomTypography>
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
					<div className="user_add_dropdown">
						<p>Add Planner Access</p>
						<div className="line"></div>
						<p>Add Vendor Access</p>
					</div>
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
			<div className="user-access-table-container">
				<TopHeader
					heading="Manage User Access"
					subHeading="Overview of access management for airport access management"
				/>

				<div className="down_arrow_button">
					<ButtonComponent
						title="Add"
						type="filledText"
						className="custom_button_add"
						onClick={openAddUserModal}
					/>
					<img src={downArrow} className="down_arrow" />
				</div>
			</div>
			<div className="table_container">
				<TableComponent data={dummyData} columns={columns} />
			</div>
		</div>
	);
};

export default UserAccess;
