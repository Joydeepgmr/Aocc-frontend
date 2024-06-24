import { Form } from 'antd';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import CustomRadioGroup from '../../../../../components/radioButton/radioButton';
import TableComponent from '../../../../../components/table/table';
import { useGetFidsDashboard, usePublishScreen, useUpdateFidsStatus } from '../../../../../services/fids/fidsResources';
import toast from 'react-hot-toast';
import FidsPreview from '../fidsPreview';
import { isAfterNow, isBeforeNow } from '../utills';

const CheckInTab = ({ airlineLogo }) => {
	const queryClient = useQueryClient();
	const [statusModal, setStatusModal] = useState({ isOpen: false, record: null });
	const [dashboardScreen, setDashboardScreen] = useState([]);
	const [isPublishLoading, setIsPublishLoading] = useState(false);
	const [form] = Form.useForm();
	const watchDisplay = Form.useWatch('displayType', form);
	const checkInStatusOptions = ['Check-In Open', 'Check-In Closed'];
	const checkInDisplayOptions = [
		{ label: 'Screen With airline logo', value: 'logo' },
		{ label: 'Screen With airline logo and Flights details', value: 'flight details' },
	];
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
	const { isLoading: isDashboardScreenLoading, isRefetching } = useGetFidsDashboard(
		'checkin',
		DashboardScreenApiProps
	);
	const { mutate: updateFidsStatus, isLoading: isFidsStatusLoading } = useUpdateFidsStatus(updateFidsStatusApiProps);
	const handlePublish = async () => {
		if (isBeforeNow(statusModal?.record?.end_time) || isAfterNow(statusModal?.record?.start_time)) {
			toast.dismiss();
			toast.error('you are not allowed to update screen status before/after the allocated time');
			return;
		}
		if (!statusModal?.record?.terminal_status) {
			try {
				const params = {
					id: statusModal?.record?.screen_id,
					data: {
						displayType: watchDisplay,
					},
				};
				setIsPublishLoading(true);
				await usePublishScreen(params);
				setIsPublishLoading(false);
				delete params.data.displayType;
				params.id = statusModal?.record?.flight_id;
				params.data.status = checkInStatusOptions[0];
				updateFidsStatus(params);
			} catch (error) {
				toast.error(error?.response?.data?.message);
				setIsPublishLoading(false);
			}
		} else {
			const params = {
				id: statusModal?.record?.flight_id,
				data: {
					status: checkInStatusOptions[1],
				},
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
				!record?.terminal_status || record?.terminal_status === checkInStatusOptions[0] ? (
					<ButtonComponent
						onClick={() => openStatusModal(record)}
						style={{ margin: 'auto' }}
						title={record?.terminal_status === checkInStatusOptions[0] ? 'Check-In Closed' : 'Publish'}
						type="text"
					/>
				) : null,
		},
	];
	return (
		<>
			<PageLoader loading={isDashboardScreenLoading || isFidsStatusLoading || isRefetching || isPublishLoading} />
			<ModalComponent
				isModalOpen={statusModal?.isOpen}
				closeModal={closeStatusModal}
				title={`${statusModal?.record?.terminal_status === checkInStatusOptions[0] ? 'Preview ' : 'Please Select '}template for the ${statusModal?.record?.screen_name}`}
				width="40vw"
			>
				<Form form={form} onFinish={handlePublish} layout="vertical" style={{ marginTop: '1rem' }}>
					{statusModal?.record?.terminal_status === checkInStatusOptions[0] ? (
						<FidsPreview
							counter={statusModal?.record?.resource_name}
							flightNo={statusModal?.record?.display_type !== 'logo' && statusModal?.record?.call_sign}
							std={statusModal?.record?.std}
							etd={statusModal?.record?.etd}
							destination={statusModal?.record?.sector}
							status={checkInStatusOptions[1]}
							airlineLogo={airlineLogo}
						/>
					) : (
						<>
							<CustomRadioGroup
								options={checkInDisplayOptions}
								name="displayType"
								className="custom_input"
								required
							/>

							{watchDisplay ? (
								watchDisplay === 'logo' ? (
									<FidsPreview
										counter={statusModal?.record?.resource_name}
										airlineLogo={airlineLogo}
										status={
											statusModal?.record?.terminal_status !== checkInStatusOptions[0]
												? checkInStatusOptions[0]
												: checkInStatusOptions[1]
										}
									/>
								) : (
									<FidsPreview
										counter={statusModal?.record?.resource_name}
										flightNo={statusModal?.record?.call_sign}
										std={statusModal?.record?.std}
										etd={statusModal?.record?.etd}
										destination={statusModal?.record?.sector}
										status="Check-In Open"
										airlineLogo={airlineLogo}
									/>
								)
							) : null}
						</>
					)}
					<div className="form_bottomButton">
						<ButtonComponent
							title="Cancel"
							type="filledText"
							className="custom_button_cancel"
							onClick={closeStatusModal}
						/>
						<ButtonComponent
							title={
								statusModal?.record?.terminal_status === checkInStatusOptions[0] ? 'Update' : 'Publish'
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

export default CheckInTab;
