import { Divider, Form } from 'antd';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import ButtonComponent from '../../../components/button/button';
import CustomTabs from '../../../components/customTabs/customTabs';
import Date from '../../../components/datapicker/datepicker';
import DropdownButton from '../../../components/dropdownButton/dropdownButton';
import InputField from '../../../components/input/field/field';
import ModalComponent from '../../../components/modal/modal';
import PageLoader from '../../../components/pageLoader/pageLoader';
import CustomSelect from '../../../components/select/select';
import TableComponent from '../../../components/table/table';
import TopHeader from '../../../components/topHeader/topHeader';
import { useAirlineDropdown } from '../../../services/PlannerAirportMaster/PlannerAirlineAirportMaster';
import { usePostAccessManagement } from '../../../services/accessManagement/accessManagement';
import './userAccess.scss';
import { columns, dummyData, userAccessType } from './userAccessData';

const UserAccess = () => {
	const [tab, setTab] = useState('planner');
	const [isModalOpen, setIsModalOpen] = useState({ isOpen: false, type: null });
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const accessManagementApiProps = {
		onSuccess: ({ data, message }) => {
			toast.success(message);
			closeAddUserModal();
		},
		onError,
	};
	const { mutate: postAccessManagement, isLoading } = usePostAccessManagement({ ...accessManagementApiProps });
	const { data: airlineDropdownData = [] } = useAirlineDropdown({ onError });
	const [form] = Form.useForm();
	const SelectedAirlineData = useMemo(() => {
		return airlineDropdownData.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [airlineDropdownData]);
	const dropdownItems = [
		{
			label: 'New Planner',
			value: 'planner',
			key: '0',
		},
		{
			label: 'New Vendor',
			value: 'vendor',
			key: '1',
		},
	];
	const handleDropdownItemClick = (value) => {
		if (value === 'planner') {
			openAddUserModal('planner');
		} else if (value === 'vendor') {
			openAddUserModal('vendor');
		}
	};
	const openAddUserModal = (type) => {
		setIsModalOpen({ isOpen: true, type });
	};
	const closeAddUserModal = () => {
		form.resetFields();
		setIsModalOpen({ isOpen: false, type: null });
	};
	const onFinishHandler = (values) => {
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		postAccessManagement({ type: isModalOpen?.type, values });
	};
	const operations = (
		<div className="add_access_button">
			<ButtonComponent
				title="Add Access"
				type="filledText"
				className="custom_button_save"
				onClick={() => openAddUserModal(tab == 'planner' ? 'planner' : 'vendor')}
			/>
		</div>
	);
	const handleTabChange = (key) => {
		if (key == '1') {
			setTab('planner');
		} else {
			setTab('vendor');
		}
	};
	const items = [
		{
			key: '1',
			label: 'Planner',
			children: (
				<>
					<TableComponent data={dummyData} columns={columns} />
				</>
			),
		},
		{
			key: '2',
			label: 'Vendor',
			children: (
				<>
					<TableComponent data={dummyData} columns={columns} />
				</>
			),
		},
	];

	return (
		<>
			<PageLoader isLoading={isLoading} />
			<ModalComponent
				isModalOpen={isModalOpen?.isOpen}
				closeModal={closeAddUserModal}
				title={`Add ${isModalOpen?.type}`}
			>
				<Form layout="vertical" form={form} onFinish={onFinishHandler}>
					<div className="user_form_container">
						<div className="user_form_inputfields">
							<InputField
								label="User Name"
								name="name"
								placeholder="Enter the user name"
								required
								warning="Required field"
								className="custom_input"
							/>
							<InputField
								label="User Email"
								name="email"
								isArticle={false}
								placeholder="Enter the user email"
								required
								warning="Required field"
								className="custom_input"
							/>
							{isModalOpen?.type == 'planner' && (
								<CustomSelect
									SelectData={userAccessType}
									placeholder="Select the access type"
									required
									warning="Required field"
									label="User Type"
									name="plannerType"
									className="select"
								/>
							)}
						</div>
						{isModalOpen?.type == 'vendor' && (
							<div className="user_form_inputfields">
								<CustomSelect
									SelectData={SelectedAirlineData}
									label="Airline"
									name="airline"
									multiple
									placeholder="Select Airline"
									required
									warning="Required field"
									className="select"
								/>
								<InputField
									label="Required Access Ids"
									name="accessId"
									placeholder="Enter the access id"
									required
									warning="Required field"
									className="custom_input"
								/>
							</div>
						)}
						<Divider />
						<div className="user_form_inputfields">
							<Date
								label="Valid From"
								placeholder="Select Date"
								name="validFrom"
								required
								className="custom_date"
								format="MM-DD-YYYY"
							/>
							<Date
								label="Valid To"
								placeholder="Select Date"
								name="validTill"
								format="MM-DD-YYYY"
								className="custom_date"
							/>
						</div>
					</div>
					<Divider />
					<div className="user_form_inputfields">
						<div className="form_bottomButton">
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
			<div className="user_access_container">
				{dummyData?.length ? (
					<>
						<div className="user-access-table-container">
							<TopHeader
								heading="Manage User Access"
								subHeading="Overview of access management for airport access management"
							/>
						</div>
						<div className="access-table">
							<CustomTabs
								defaultActiveKey="1"
								items={items}
								onChange={handleTabChange}
								type="simple"
								extraContent={operations}
							/>
						</div>
					</>
				) : (
					<div className="user_access_content">
						<TopHeader
							heading="Manage User Access"
							subHeading="Overview of access management for airport access management"
						/>
						<div className="user_add_button">
							<div className="down_arrow_button">
								<DropdownButton
									dropdownItems={dropdownItems}
									onChange={handleDropdownItemClick}
									buttonText="Add Access"
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default UserAccess;
