import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../components/table/table';
import { useGetFidsDashboard, usePublishScreen, useUpdateFidsStatus } from '../../../../../services/fids/fidsResources';
import FidsPreview from '../fidsPreview';
import BeltFids from '../beltPreview';
import { useQueryClient } from 'react-query';

const BaggageBeltTab = ({ airlineLogo }) => {
	const queryClient = useQueryClient();
	const [isPublishLoading, setIsPublishLoading] = useState(false);
	const [statusModal, setStatusModal] = useState({ isOpen: false, record: null });
	const [dashboardScreen, setDashboardScreen] = useState([]);
	const beltStatusOptions = ['Bags on belt', 'Delivery ended'];
	const [form] = Form.useForm();
	const DashboardScreenApiProps = {
		onSuccess: (data) => {
			setDashboardScreen(data ?? []);
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message);
		},
	};
	const updateFidsStatusApiProps = {
		onSuccess: ({ data, message }) => {
			toast.success(message);
			queryClient.invalidateQueries('get-fids-dashboard-screen');
			closeStatusModal();
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message);
		},
	};
	const { isLoading: isDashboardScreenLoading, isRefetching } = useGetFidsDashboard('belt', DashboardScreenApiProps);
	const { mutate: updateFidsStatus, isLoading: isFidsStatusLoading } = useUpdateFidsStatus(updateFidsStatusApiProps);
	const handlePublish = async () => {
		if (!statusModal?.record?.terminal_status) {
			try {
				const params = {
					id: statusModal?.record?.screen_id,
					data: {},
				};
				setIsPublishLoading(true);
				await usePublishScreen(params);
				setIsPublishLoading(false);
				params.id = statusModal?.record?.flight_id;
				params.data.status = beltStatusOptions[0];
				updateFidsStatus(params);
			} catch (error) {
				setIsPublishLoading(false);
			}
		} else {
			const status = beltStatusOptions[1];
			const params = {
				id: statusModal?.record?.flight_id,
				data: { status },
			};
			updateFidsStatus(params);
		}
	};
	const openStatusModal = (record) => {
		setStatusModal({ isOpen: true, record });
	};
	const closeStatusModal = () => {
		setStatusModal({ isOpen: false, record: null });
		form.resetFields();
	};
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
			title: 'Sta',
			dataIndex: 'sta',
			key: 'sta',
			align: 'center',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
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
			title: 'Status',
			dataIndex: 'terminal_status',
			key: 'terminal_status',
			align: 'center',
		},
		{
			title: 'Action',
			render: (_, record) =>
				!record?.terminal_status || record?.terminal_status === beltStatusOptions[0] ? (
					<ButtonComponent
						onClick={() => openStatusModal(record)}
						style={{ margin: 'auto' }}
						title={record?.terminal_status === beltStatusOptions[0] ? beltStatusOptions[1] : 'Publish'}
						type="text"
					/>
				) : null,
		},
	];
	return (
		<>
			<PageLoader loading={isDashboardScreenLoading || isFidsStatusLoading || isPublishLoading || isRefetching} />
			<ModalComponent
				isModalOpen={statusModal?.isOpen}
				closeModal={closeStatusModal}
				title={`Please Select template for the ${statusModal?.record?.screen_name}`}
				width="40vw"
			>
				<Form form={form} onFinish={handlePublish} layout="vertical" style={{ marginTop: '1rem' }}>
					<BeltFids
						counter={statusModal?.record?.resource_name}
						flightNo={statusModal?.record?.call_sign}
						origin={statusModal?.record?.sector}
						airlineLogo={airlineLogo}
					/>
					<div className="form_bottomButton">
						<ButtonComponent
							title="Cancel"
							type="filledText"
							className="custom_button_cancel"
							onClick={closeStatusModal}
						/>
						<ButtonComponent
							title={
								statusModal?.record?.terminal_status === beltStatusOptions[0]
									? beltStatusOptions[1]
									: 'Publish'
							}
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

export default BaggageBeltTab;
