import { Card } from 'antd';
import React, { useState } from 'react';
import './style.scss';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import Chip from '../../../../components/chip/chip';
import ButtonComponent from '../../../../components/button/button';
import { useNavigate } from 'react-router-dom';
import { useGetAllNotification, useUpdateNotification } from '../../../../services';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQueryClient } from 'react-query';

const Alerts = () => {
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

	return (
		<Card className="progress-alert" id="progress-alert">
			<CustomTypography type="title" fontSize={16} fontWeight="600" color="black" children="Alerts" />
			<InfiniteScroll
				dataLength={notificationData?.length}
				next={!isGetAllNotificationLoading && fetchNextPageNotification}
				hasMore={hasNextPageNotification}
				scrollableTarget="progress-alert"
			>
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
							<div className="alert-body">
								<div className="alert-status-body">
									<Chip
										text={data?.type === 'conflict' ? 'Critical' : 'Attention'}
										className={data?.type === 'conflict' ? 'alert-status' : 'alert-warning'}
									/>
									<div>{data?.flight?.sta ?? data?.flight?.std}</div>
								</div>
								<div className="alert-button-body">
									<div className="alert-conflict">
										<div className="conflict-type">
											{data?.conflictType} {data[type]?.name}{' '}
											{data?.type === 'conflict' ? 'Conflict' : 'Remark'}
										</div>
										<div className="conflict-flight">{data?.flight?.callSign}</div>
									</div>
									<ButtonComponent
										onClick={() => handleAcknowledge(data)}
										title={`${data?.status === 'resolved' ? 'Resolved' : data?.status === 'acknowledged' ? 'Mark as resolved' : 'Acknowledge'}`}
										type="filledText"
										disabled={data?.status === 'resolved'}
										className={data?.status === 'resolved' ? 'custom_svgButton' : ''}
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
						);
					})}
			</InfiniteScroll>
		</Card>
	);
};

export default Alerts;
