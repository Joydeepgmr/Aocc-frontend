import { BellOutlined } from '@ant-design/icons';
import { Card, Drawer } from 'antd';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/button/button';
import Chip from '../../components/chip/chip';
import CustomTypography from '../../components/typographyComponent/typographyComponent';
import { useGetAllNotification, useUpdateNotification } from '../../services';
import './alerts.scss';
const Alerts = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const [notificationData, setNotificationData] = useState([]);

	const getNotificationHandler = {
		onSuccess: (data) => handleGetNotificationSuccess(data),
		onError: (error) => handleGetNotificationError(error),
	};

	const updateNotificationHandler = {
		onSuccess: (data) => handleUpdateNotificationSuccess(data),
		onError: (error) => handleGetNotificationError(error),
	};

	const { mutate: updateStatus } = useUpdateNotification(updateNotificationHandler);

	const {
		isLoading: isGetAllNotificationLoading,
		hasNextPage: hasNextPageNotification,
		fetchNextPage: fetchNextPageNotification,
		refetch,
	} = useGetAllNotification(getNotificationHandler);

	const handleGetNotificationSuccess = (data) => {
		if (data?.pages) {
			const newData = data?.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
			setNotificationData([...newData]);
		}
	};

	const handleUpdateNotificationSuccess = (data) => {
		if (data?.data?.status === 'acknowledged') {
			setOpen(false);
			refetch();
			navigate('/plans', { state: { tab: '3' } });
		} else {
			toast.success('Notification updated successfully');
			queryClient.invalidateQueries('get-all-notification');
		}
	};

	const handleGetNotificationError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleAcknowledge = (data) => {
		const status = data?.status === 'pending' ? 'acknowledged' : 'resolved';
		status && updateStatus({ id: data?.id, status: status });
	};

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const dataCount = useMemo(() => {
		let count = 0;
		notificationData.map((data) => {
			if (data.status !== 'resolved') {
				count++;
			}
		});
		return count;
	}, [notificationData]);
	return (
		<>
			<div className="bell-container" onClick={showDrawer}>
				<BellOutlined className="bell-icon" />
				{Boolean(dataCount) && !isGetAllNotificationLoading && (
					<div className="alert-count">{dataCount > 9 ? '9+' : dataCount}</div>
				)}
			</div>
			<Drawer title="Alerts" onClose={onClose} open={open}>
				{open && (
					<>
						{Boolean(notificationData?.length) ? (
							<div id="progressScroll" className="progress-container">
								<InfiniteScroll
									dataLength={notificationData?.length}
									next={!isGetAllNotificationLoading && fetchNextPageNotification}
									hasMore={hasNextPageNotification}
									className="infinite-scroll"
									scrollableTarget="progressScroll"
									height={"80vh"}
								>
									{/* <CustomTypography type="title" fontSize={16} fontWeight="600" color="black" children="Alerts" /> */}
									{notificationData &&
										notificationData?.map((data) => {
											const type =
												data?.conflictType === 'gate'
													? 'gate'
													: data?.conflictType === 'belt'
														? 'baggageBelt'
														: data?.conflictType === 'stand'
															? 'parkingStand'
															: 'check-in-counter';
											return (
												<Card className="progress-alert">
													<div className="alert-body">
														<div className="alert-status-body">
															<Chip
																text={
																	data?.type === 'conflict' ? 'Critical' : 'Attention'
																}
																className={
																	data?.type === 'conflict'
																		? 'alert-status'
																		: 'alert-warning'
																}
															/>
															<div>{data?.flight?.sta ?? data?.flight?.std}</div>
														</div>
														<div className="alert-button-body">
															<div className="alert-conflict">
																<div className="conflict-type">
																	{data?.conflictType} {data[type]?.name}{' '}
																	{data?.type === 'conflict' ? 'Conflict' : 'Remark'}
																</div>
																<div className="conflict-flight">
																	{data?.flight?.callSign}
																</div>
															</div>
															<ButtonComponent
																onClick={() => handleAcknowledge(data)}
																title={`${data?.status === 'resolved' ? 'Resolved' : data?.status === 'acknowledged' ? 'Mark as resolved' : 'Acknowledge'}`}
																type="filledText"
																disabled={data?.status === 'resolved'}
																className={
																	data?.status === 'resolved'
																		? 'custom_svgButton'
																		: ''
																}
															/>
														</div>
														{data?.status !== 'pending' && (
															<div className="conflict-flight">
																{data?.status === 'resolved'
																	? `Resolved by ${data?.resolvedBy?.email}`
																	: data?.status === 'acknowledged'
																		? `Acknowledged by ${data?.acknowledgedBy?.email}`
																		: ''}
															</div>
														)}
													</div>
												</Card>
											);
										})}
								</InfiniteScroll>
							</div>
						) : (
							<div>
								<CustomTypography
									type="title"
									fontSize={16}
									fontWeight="600"
									color="black"
									children="No Alerts"
								/>
							</div>
						)}
					</>
				)}
			</Drawer>
		</>
	);
};

export default Alerts;
