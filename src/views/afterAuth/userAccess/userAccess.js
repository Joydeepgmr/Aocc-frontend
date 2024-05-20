import { Divider, Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import ButtonComponent from '../../../components/button/button';
import CustomTabs from '../../../components/customTabs/customTabs';
import Date from '../../../components/datapicker/datepicker';
import InputField from '../../../components/input/field/field';
import Button from '../../../components/button/button';
import ModalComponent from '../../../components/modal/modal';
import PageLoader from '../../../components/pageLoader/pageLoader';
import CustomSelect from '../../../components/select/select';
import TableComponent from '../../../components/table/table';
import TopHeader from '../../../components/topHeader/topHeader';
import { useAirlineDropdown } from '../../../services/PlannerAirportMaster/PlannerAirlineAirportMaster';
import {
	useGetPlannerAccess,
	useGetVendorAccess,
	usePostAccessManagement,
} from '../../../services/accessManagement/accessManagement';
import { ConvertToDateTime } from '../../../utils';
import './userAccess.scss';
import dayjs from 'dayjs';

const UserAccess = () => {
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const [tab, setTab] = useState('planner');
	const [userAccessData, setUserAccessData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState({ isOpen: false, type: null });

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
			setCurrentValidFrom(null);
		} else {
			setCurrentValidFrom(dateString?.format('YYYY-MM-DD'));
		}
	};
	const userAccessType = [
		{
			id: '1',
			label: 'Planner',
			value: 'Planner',
		},
		{
			id: '2',
			label: 'Daily Ops',
			value: 'daily Ops',
		},
	];
	const getVendorAccessHandler = {
		onSuccess: (data) => handleGetVendorAccessSuccess(data),
		onError: (error) => handleGetVendorAccessError(error),
	};

	const handleGetVendorAccessSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setUserAccessData([...newData]);
		}
	};

	const handleGetVendorAccessError = (error) => {
		toast.dismiss();
		toast.error(error?.message);
	};
	const {
		data: fetchVendorAccess,
		isFetching: isFetchingVendor,
		isLoading: isFetchLoading,
		hasNextPage: hasVendorNextPage,
		fetchNextPage: fetchVendorNextPage,
		refetch: refetchVendor,
	} = useGetVendorAccess(getVendorAccessHandler);

	const {
		data: fetchPlannerAccess,
		isFetching: isFetchingPlanner,
		isLoading: isFetchPlannerLoading,
		hasNextPage: hasPlannerNextPage,
		fetchNextPage: fetchPlannerNextPage,
		refetch: refetchPlanner,
	} = useGetPlannerAccess(getVendorAccessHandler);

	const onError = ({
		response: {
			data: { message },
		},
	}) => { toast.dismiss(); toast.error(message) };
	const accessManagementApiProps = {
		onSuccess: ({ data, message }) => {
			closeAddUserModal();
			toast.success(message);
			if (tab === 'planner') {
				refetchPlanner();
			} else {
				refetchVendor();
			}
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
	const SelectedVendorTasks = [
		{
			id: '1',
			label: 'Cleaning',
			value: 'cleaning',
		},
		{
			id: '2',
			label: 'Refueling',
			value: 'refueling',
		},
		{
			id: '3',
			label: 'Catering',
			value: 'catering',
		},
		{
			id: '4',
			label: 'Baggage Loading',
			value: 'baggage-loading',
		},
	];

	useEffect(() => {
		if (tab === 'vendor') {
			refetchVendor();
		}
		if (tab === 'planner') {
			refetchPlanner();
		}
	}, [tab]);

	const columns = [
		{
			title: 'User Name',
			dataIndex: tab === 'planner' ? 'userName' : 'vendorName',
			key: 'name',
			render: (name) => name ?? '-',
			align: 'center',
		},
		{
			title: 'Email Address',
			dataIndex: tab === 'planner' ? 'userEmail' : 'vendorEmail',
			key: 'email',
			render: (email) => email ?? '-',
			align: 'center',
		},
		tab === 'planner'
			? {
				title: 'User Type',
				dataIndex: 'userType',
				key: 'userType',
				render: (userType) => userType ?? '-',
			}
			: {
				title: 'Vendor Type',
				dataIndex: 'vendorTasks',
				key: 'vendorTasks',
				render: (tasks) => (tasks ? tasks?.map((task) => task).join(', ') : '-'),
				align: 'center',
			},

		{
			title: 'Access Validity',
			dataIndex: 'accessValidity',
			key: 'accessValidity',
			render: (validity) => ConvertToDateTime(validity, 'YYYY-MM-DD') ?? '-',
			align: 'center',
		},
		{
			title: 'Access Provider',
			dataIndex: 'accessProvider',
			key: 'accessProvider',
			render: (provider) => provider ?? '-',
			align: 'center',
		},
		{
			title: 'Created On',
			dataIndex: 'createdOn',
			key: 'createdOn',
			render: (date) => ConvertToDateTime(date, 'YYYY-MM-DD') ?? '-',
			align: 'center',
		},
	];

	const openAddUserModal = (type) => {
		setIsModalOpen({ isOpen: true, type });
	};
	const closeAddUserModal = () => {
		form.resetFields();
		setIsModalOpen({ isOpen: false, type: null });
	};
	const onFinishHandler = (values) => {
		values.validFrom = values?.validFrom?.toISOString();
		values.validTill = values?.validTill?.toISOString();
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
	const noDataHandler = () => {
		return (
			<>
				<div className="user_access_empty">
					<Button
						title="Create"
						id="btn"
						type="filledText"
						isSubmit="submit"
						onClick={() => openAddUserModal(tab == 'planner' ? 'planner' : 'vendor')}
					/>
				</div>
			</>
		);
	};

	const items = [
		{
			key: '1',
			label: 'Planner',
			children: (
				<>
					{Boolean(userAccessData?.length) ? (
						<TableComponent
							data={userAccessData}
							columns={columns}
							loading={isFetchingPlanner}
							fetchData={fetchPlannerNextPage}
							pagination={hasPlannerNextPage}
						/>
					) : (
						noDataHandler()
					)}
				</>
			),
		},
		{
			key: '2',
			label: 'Vendor',
			children: (
				<>
					{Boolean(userAccessData?.length) ? (
						<div className="user_access_table">
							<TableComponent
								data={userAccessData}
								columns={columns}
								loading={isFetchingVendor}
								fetchData={fetchVendorNextPage}
								pagination={hasVendorNextPage}
							/>
						</div>
					) : (
						noDataHandler()
					)}
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
				<Form autoComplete='off' layout="vertical" form={form} onFinish={onFinishHandler}>
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
								<CustomSelect
									SelectData={SelectedVendorTasks}
									label="Vendor Type"
									name="taskList"
									multiple
									placeholder="Select Tasks"
									required
									warning="Required field"
									className="select"
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
								onChange={handleValidFrom}
							/>
							<Date
								label="Valid To"
								placeholder="Select Date"
								name="validTill"
								format="MM-DD-YYYY"
								className="custom_date"
								disabled={!currentValidFrom}
								isDisabledDate={true}
								disabledDate={(current) => {
									let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
									return current && current < dayjs(prevDate, 'YYYY-MM-DD');
								}}
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
						extraContent={Boolean(userAccessData?.length) && operations}
					/>
				</div>
			</div>
		</>
	);
};

export default UserAccess;
