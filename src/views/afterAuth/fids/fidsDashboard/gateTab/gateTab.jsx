import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../components/table/table';
import { useGetFidsDashboard, usePublishScreen, useUpdateFidsStatus } from '../../../../../services/fids/fidsResources';
import FidsPreview from '../fidsPreview';

const GateTab = ({ airlineLogo }) => {
	const queryClient = useQueryClient();
	const [isPublishLoading, setIsPublishLoading] = useState(false);
	const [statusModal, setStatusModal] = useState({ isOpen: false, record: null });
	const [dashboardScreen, setDashboardScreen] = useState([]);
	const [form] = Form.useForm();
	const gateStatusOptions = ['Gate Open', 'Boarding Started', 'Final call', 'Gate Closed'];
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
	const { isLoading: isDashboardScreenLoading, isRefetching: isDashboardScreenRefetch } = useGetFidsDashboard(
		'gate',
		DashboardScreenApiProps
	);
	const { mutate: updateFidsStatus, isLoading: isFidsStatusLoading } = useUpdateFidsStatus(updateFidsStatusApiProps);
	const handlePublish = async () => {
		if (!statusModal?.record?.terminal_status || statusModal?.record?.terminal_status === 'Check-In Open') {
			try {
				const params = {
					id: statusModal?.record?.screen_id,
					data: {},
				};
				setIsPublishLoading(true);
				await usePublishScreen(params);
				setIsPublishLoading(false);
				params.id = statusModal?.record?.flight_id;
				params.data.status = gateStatusOptions[0];
				updateFidsStatus(params);
			} catch (error) {
				setIsPublishLoading(false);
			}
		} else {
			const { terminal_status } = statusModal?.record;
			const status =
				terminal_status === gateStatusOptions[0]
					? gateStatusOptions[1]
					: terminal_status === gateStatusOptions[1]
						? gateStatusOptions[2]
						: gateStatusOptions[3];
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
			title: 'Std',
			dataIndex: 'std',
			key: 'std',
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
				record?.terminal_status !== gateStatusOptions[3] && (
					<ButtonComponent
						onClick={() => openStatusModal(record)}
						style={{ margin: 'auto' }}
						title={
							record?.terminal_status === gateStatusOptions[0]
								? gateStatusOptions[1]
								: record?.terminal_status === gateStatusOptions[1]
									? gateStatusOptions[2]
									: record?.terminal_status === gateStatusOptions[2]
										? gateStatusOptions[3]
										: 'Publish'
						}
						type="text"
					/>
				),
		},
	];
	return (
		<>
			<PageLoader
				loading={
					isDashboardScreenLoading || isFidsStatusLoading || isDashboardScreenRefetch || isPublishLoading
				}
			/>
			<ModalComponent
				isModalOpen={statusModal?.isOpen}
				closeModal={closeStatusModal}
				title={`${statusModal?.record?.screen_name}`}
				width="32vw"
			>
				<Form form={form} onFinish={handlePublish} layout="vertical" style={{ marginTop: '1rem' }}>
					<FidsPreview
						flightNo={statusModal?.record?.call_sign}
						std={statusModal?.record?.std}
						etd={statusModal?.record?.etd}
						destination={statusModal?.record?.sector}
						status={
							statusModal?.record?.terminal_status === gateStatusOptions[0]
								? gateStatusOptions[1]
								: statusModal?.record?.terminal_status === gateStatusOptions[1]
									? gateStatusOptions[2]
									: statusModal?.record?.terminal_status === gateStatusOptions[2]
										? gateStatusOptions[3]
										: gateStatusOptions[0]
						}
						airlineLogo={airlineLogo}
						counter="G7"
						isGate
					/>
					<div className="form_bottomButton" style={{ marginTop: '1rem' }}>
						<ButtonComponent
							title="Cancel"
							type="filledText"
							className="custom_button_cancel"
							onClick={closeStatusModal}
						/>
						<ButtonComponent
							title={statusModal?.record?.terminal_status === gateStatusOptions[0] ? 'Update' : 'Publish'}
							type="filledText"
							className="custom_button_save"
							isSubmit
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

export default GateTab;
