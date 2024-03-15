// import React, {useState} from 'react'
// import CustomTypography from '../../../components/typographyComponent/typographyComponent';
// import ButtonComponent from '../../../components/button/button';
// import ModalComponent from '../../../components/modal/modal';
// import InputField from '../../../components/input/field/field';
// import { Divider, Form } from 'antd';
// import CustomSelect from '../../../components/select/select';
// import Date from '../../../components/datapicker/datepicker';
// import TopHeader from '../../../components/topHeader/topHeader';
// import TableComponent from '../../../components/table/table';
// import './airportMasters.scss';
// const AirportMasters = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
// 	const openAddUserModal = () => {
// 		setIsModalOpen(true);
// 	};

// 	const closeAddUserModal = () => {
// 		setIsModalOpen(false);
// 	};

// 	const onFinishHanlder = (values) => {
// 		values.validFrom = values.validFrom.toISOString();
// 		values.validTo = values.validTo.toISOString();
// 		console.log('onFinishHanlder', values);
// 		closeAddUserModal();
// 	};
// 	const handleTableChange = (pagination, filters, sorter) => {
// 		console.log('Table changed:', pagination, filters, sorter);
// 	};
//     const SelectData = [
//         {
//             id: '1',
//             label: 'option1',
//             value: 'option1',
//         },
//         {
//             id: '2',
//             label: 'option2',
//             value: 'option2',
//         },
//         {
//             id: '3',
//             label: 'option3',
//             value: 'option3',
//         },
//     ];

// 	const columns = [
// 		{ title: 'Airport', dataIndex: 'airport', key: 'airport' },
// 		{ title: '3 Letter Code', dataIndex: 'threeCode', key: 'threeCode' },
// 		{ title: '4 Letter Code', dataIndex: 'fourCode', key: 'fourCode' },
// 		{ title: 'City', dataIndex: 'city', key: 'city' },
// 		{ title: 'Country', dataIndex: 'country', key: 'country'},
// 		{ title: 'Email Address', dataIndex: 'email', key: 'email'},
// 		{ title: 'Validity', dataIndex: 'validity', key: 'validity'},
// 		{ title: 'Created By', dataIndex: 'createdBy', key: 'createdBy'},
// 		{ title: 'Created On', dataIndex: 'createdOn', key: 'createdOn'},
// 	];

// 	const tableData = [
// 		{key: "1", airport:"Airport 1", threeCode:"123", fourCode:"1234", city:"Delhi", country:"India", email:"John1@gmail.com", validity:"Valid", createdBy:"John Singh", createdOn:"27.02.2024"}
// 	]
//     return (
//         <div className="user_access_container">
// 			<div className="user_access_content">
// 				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black" lineHeight="3.36rem">
// 					Airport Masters
// 				</CustomTypography>
// 				<CustomTypography type="paragraph" fontSize={14} fontWeight="400" color="#909296" lineHeight="3.36rem">
//                 Overview of airport licenses for the Airport Operating System.
// 				</CustomTypography>
// 				<div className="user_add_button">
// 					{/* <div className="down_arrow_button">
// 						<ButtonComponent
// 							title="Add"
// 							type="filledText"
// 							className="custom_button_add"
// 							onClick={openAddUserModal}
// 						/>
// 					</div> */}

// 				</div>
// 			</div>
// 			<ModalComponent isModalOpen={isModalOpen} closeModal={closeAddUserModal} title="New Airport License" width="87.2rem">
// 				<Form layout="vertical" onFinish={onFinishHanlder}>
// 					<div className="user_add_form">
// 						<div className="user_input_fields">
// 							<InputField
// 								label="Airport Name"
// 								name="airportName"
// 								placeholder="Enter the group name"
// 								required
// 								warning="Required field"
// 								className="custom_input"
// 							/>
// 							<InputField
// 								label="Abbreviated Name"
// 								name="abbreviatedName"
// 								placeholder="Select the conditional for the resources"
// 								className="custom_input"
// 							/>
// 						</div>
//                         <div className='user_input_fields'>
//                         <InputField
// 								label="Email Address"
// 								name="emailAddress"
// 								placeholder="Select the conditional for the resources"
// 								required
// 								warning="Required field"
// 								className="custom_input"
// 							/>
// 							<InputField
// 								label="City"
// 								name="city"
// 								placeholder="Select the city"
// 								className="custom_input"
// 							/>
// 						</div>
// 						<div className='user_input_fields'>
// 							<InputField
// 								label="City"
// 								name="city"
// 								placeholder="Select the city"
// 								className="custom_input"
// 							/>
// 						</div>
// 						<Divider />
// 						<div className="user_input_fields">
// 							<Date
// 								label="Valid From"
// 								placeholder="Select Date"
// 								name="validFrom"
// 								className="custom_date"
// 								format="MM-DD-YYYY"
// 							/>
// 							<Date label="Valid To" placeholder="Select Date" name="validTo" format="MM-DD-YYYY" />
// 						</div>
// 						<div className="custom_buttons">
// 							<ButtonComponent
// 								title="Cancel"
// 								type="filledText"
// 								className="custom_button_cancel"
// 								onClick={closeAddUserModal}
// 							/>
// 							<ButtonComponent
// 								title="Save"
// 								type="filledText"
// 								className="custom_button_save"
// 								isSubmit={true}
// 							/>
// 						</div>
// 					</div>
// 				</Form>
// 			</ModalComponent>
// 			{/* <TopHeader /> */}
// 		</div>
//     )
// }

// export default AirportMasters;

import React, { useState } from 'react';
import './airportMasters.scss';
import TopHeader from '../../../components/topHeader/topHeader'
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from '../globalMasters/components/createWrapper/createWrapper';
import { addAirportLicense } from './redux/reducer';
import LicenseSetupForm from './components/licenseSetupForm/licenseSetupForm';
import LicenseSetupTable from './components/licenseSetupTable/licenseSetupTable';

const AirportMasters = () => {
	return (
		<div className='airport_masters_container'>
			<div className='airport_master_header'>
				<TopHeader heading="Airport Masters" subHeading="Overview of airport licenses for the Airport Operating System" />
			</div>
			<div>
				<CreateWrapper
					formComponent={<LicenseSetupForm />}
					title="New Airport License"
					width="87.2rem"
					tableComponent={<LicenseSetupTable formComponent={<LicenseSetupForm />} />}
					action={addAirportLicense}
				/>
			</div>
		</div>
	)
}

export default AirportMasters;