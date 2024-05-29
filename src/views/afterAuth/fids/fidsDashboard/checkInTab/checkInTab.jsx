import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import CustomRadioGroup from '../../../../../components/radioButton/radioButton';
import TableComponent from '../../../../../components/table/table';
import { useGetFidsDashboard } from '../../../../../services/fids/fidsResources';

const CheckInTab = () => {
	const [statusModal, setStatusModal] = useState({ isOpen: false, record: null });
	const [dashboardScreen, setDashboardScreen] = useState([]);
	const [airlineLogo, setAirlineLogo] = useState([]);
	const [form] = Form.useForm();
	const DashboardScreenApiProps = {
		onSuccess: ({ result, airlineLogo }) => {
			setDashboardScreen(result ?? []);
			if (airlineLogo?.value) {
				setAirlineLogo(airlineLogo?.value);
			}
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message);
		},
	};
	const { isLoading: isDashboardScreenLoading } = useGetFidsDashboard(DashboardScreenApiProps);

	const handlePublish = (values) => {
		closeStatusModal();
	};
	const openStatusModal = (record) => {
		setStatusModal({ isOpen: true, record });
	};
	const closeStatusModal = () => {
		setStatusModal({ isOpen: false, record: null });
		form.resetFields();
	};
	const checkInDisplayOptions = [
		{ label: 'Screen With airline logo', value: 'logo' },
		{ label: 'Screen With airline logo and Flights details', value: 'flight details' },
	];
	const columns = [
		{
			title: 'Airline',
			dataIndex: 'logo',
			key: 'logo',
			align: 'center',
			render: () => airlineLogo && <img className="fids_airline_logo" src={airlineLogo} alt="logo" />,
		},
		{
			title: 'Screen Name',
			dataIndex: 'screen_name',
			key: 'screen_name',
			align: 'center',
		},
		{
			title: 'Call Sign',
			dataIndex: 'call_sign',
			key: 'call_sign',
			align: 'center',
		},
		{
			title: 'Sector',
			dataIndex: 'sector',
			key: 'sector',
			align: 'center',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			align: 'center',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
		},
		{
			title: 'Start Time',
			dataIndex: 'start_time',
			key: 'start_time',
			align: 'center',
			render: (time) => (time ? dayjs(time).format('HH:mm') : null),
		},
		{
			title: 'End Time',
			dataIndex: 'end_time',
			key: 'end_time',
			align: 'center',
			render: (time) => (time ? dayjs(time).format('HH:mm') : null),
		},
		{
			title: 'Terminal',
		},
		{
			title: 'Action',
			render: (_, record) => (
				<ButtonComponent
					onClick={() => openStatusModal(record)}
					style={{ margin: 'auto' }}
					title="Publish"
					type="text"
				/>
			),
		},
	];
	return (
		<>
			<PageLoader loading={isDashboardScreenLoading} />
			<ModalComponent
				isModalOpen={statusModal?.isOpen}
				closeModal={closeStatusModal}
				title={`Please Select template for the ${statusModal?.record?.screen_name}`}
				width="40vw"
			>
				<Form form={form} onFinish={handlePublish} layout="vertical" style={{ marginTop: '1rem' }}>
					<CustomRadioGroup
						options={checkInDisplayOptions}
						name="displayType"
						className="custom_input"
						required
					/>
					<div className="form_bottomButton">
						<ButtonComponent
							title="Cancel"
							type="filledText"
							className="custom_button_cancel"
							onClick={closeStatusModal}
						/>
						<ButtonComponent
							title="Publish"
							type="filledText"
							className="custom_button_save"
							isSubmit={true}
						/>
					</div>
				</Form>
			</ModalComponent>
			<TableComponent
				columns={columns}
				data={dashboardScreen}
				// loading={loading}
				// fetchData={fetchData}
				// pagination={pagination}
			/>
		</>
	);
};

export default CheckInTab;
