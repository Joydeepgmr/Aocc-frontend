import React, {useState} from 'react'
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import ButtonComponent from '../../../components/button/button';
import ModalComponent from '../../../components/modalComponent/modalComponent';
import InputField from '../../../components/inputField/inputField';
import { Divider, Form } from 'antd';
import CustomSelect from '../../../components/selectfield/select';
import Date from '../../../components/datapicker/datepicker';
import TopHeader from '../../../components/topHeader/topHeader';
import './airportMasters.scss';
const AirportMasters = () => {
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
    const SelectData = [
        {
            id: '1',
            label: 'option1',
            value: 'option1',
        },
        {
            id: '2',
            label: 'option2',
            value: 'option2',
        },
        {
            id: '3',
            label: 'option3',
            value: 'option3',
        },
    ];
    return (
        <div className="user_access_container">
			<div className="user_access_content">
				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black" lineHeight="3.36rem">
					Airport Masters
				</CustomTypography>
				<CustomTypography type="paragraph" fontSize={14} fontWeight="400" color="#909296" lineHeight="3.36rem">
                Overview of airport licenses for the Airport Operating System.
				</CustomTypography>
				<div className="user_add_button">
					<div className="down_arrow_button">
						<ButtonComponent
							title="Add"
							type="filledText"
							className="custom_button_add"
							onClick={openAddUserModal}
						/>
					</div>
				</div>
			</div>
			<ModalComponent isModalOpen={isModalOpen} closeModal={closeAddUserModal} title="New Airport License" width="87.2rem">
				<Form layout="vertical" onFinish={onFinishHanlder}>
					<div className="user_add_form">
						<div className="user_input_fields">
							<InputField
								label="Airport Name"
								name="airportName"
								placeholder="Enter the group name"
								required
								warning="Required field"
								className="custom_input"
							/>
							<InputField
								label="Abbreviated Name"
								name="abbreviatedName"
								placeholder="Select the conditional for the resources"
								className="custom_input"
							/>
						</div>
                        <div className='user_input_fields'>
                        <InputField
								label="Email Address"
								name="emailAddress"
								placeholder="Select the conditional for the resources"
								required
								warning="Required field"
								className="custom_input"
							/>
							<InputField
								label="City"
								name="city"
								placeholder="Select the city"
								className="custom_input"
							/>
						</div>
						<div className='user_input_fields'>
							<InputField
								label="City"
								name="city"
								placeholder="Select the city"
								className="custom_input"
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
			{/* <TopHeader /> */}
		</div>
    )
}

export default AirportMasters;