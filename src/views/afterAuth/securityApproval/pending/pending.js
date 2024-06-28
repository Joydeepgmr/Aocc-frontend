import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import Button from '../../../../components/button/button';
import checkIcon from '../../../../assets/WhiteCheck.svg';
import crossIcon from '../../../../assets/X.svg';
import Table from '../../../../components/table/table';
import Modal from '../../../../components/modal/modal';
import { useStatusUser } from '../../../../services/securityApproval/securityApproval';
import getNearestTimeDifference from '../../../../utils/NearestTimeDifference';
import './pending.scss';
import ConfirmationModal from '../../../../components/confirmationModal/confirmationModal';

const Pending = ({ data, hasNextPage, fetchNextPage, loading }) => {
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [openApproveModal, setOpenApproveModal] = useState(false);
	const [openRejectModal, setOpenRejectModal] = useState(false);
	const openModal = (data) => {
		setRowData(data);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setRowData(null);
		setIsModalOpen(false);
	};

	//approve or reject
	const handleStatusSuccess = (data) => {
		setRowData(null);
		setIsModalOpen(false);
		setOpenApproveModal(false);
		setOpenRejectModal(false);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-user');
	};

	const handleStatusError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const statusHandler = {
		onSuccess: (data) => handleStatusSuccess(data),
		onError: (error) => handleStatusError(error),
	};
	const { mutate: postUser, isLoading: isPostLoading } = useStatusUser(rowData?.id, statusHandler);
	const handleStatus = (status) => {
		postUser(status);
	};

	const columns = [
		{
			title: 'TIME',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (time) => {
				const { value, unit } = getNearestTimeDifference(time);
				return <div>{`${value} ${unit}`} ago</div>;
			},
			align: 'center',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
			align: 'center',
		},
		{
			title: 'DOB',
			dataIndex: 'dob',
			key: 'dob',
			render: (dob) => dob ?? '-',
			align: 'center',
		},
		{
			title: 'ID Type',
			dataIndex: 'customerDocuments',
			key: 'customerDocuments',
			render: (documents) => {
				if (!documents || documents.length === 0) {
					return '-';
				} else {
					const document = documents[0];
					return <div style={{ textTransform: 'capitalize' }}>{document.type ?? '-'}</div>
				}
			},
			align: 'center',
		},
		{
			title: 'ID MATCH',
			dataIndex: 'isMatched',
			key: 'isMatched',
			align: 'center',
			render: (_, record) => record?.customerDocuments[0]?.isMatched ? 'Matched' : 'Not Matched'
		},
		{
			title: 'DOCUMENT ID',
			dataIndex: 'documentUrl',
			key: 'documentUrl',
			align: 'center',
			render: (_, record) => {
				console.log("record is ", record)
				return record?.customerDocuments?.[0]?.documentUrl ?
					<div onClick={() => openModal(record)} >
						<img style={{ height: '5rem', width: '5rem' }} src={record?.customerDocuments?.[0]?.documentUrl} alt='document_id' />
						<img style={{ height: '5rem', width: '5rem' }} src={record?.image} alt='user_id' />
					</div> : 'No Img found'
			},
		},
		{
			title: 'PREVIEW',
			key: 'idMatch',
			render: (record) => (
				<>
					<Button
						onClick={() => openModal(record)}
						title="Preview"
						type="filledText"
						className="pending--preview"
						style={{ margin: 'auto' }}
					/>
				</>
			),
		},
		{
			title: 'ACTION',
			key: 'actions',
			render: (record) => (
				<div className="pending--action_buttons">
					<Button
						onClick={() => {
							setRowData(record);
							setOpenApproveModal(true);
						}}
						type="iconWithBorderCheck"
						icon={checkIcon}
						className="pending--approve_button"
					/>
					<Button
						onClick={() => {
							setRowData(record);
							setOpenRejectModal(true);
						}}
						type="iconWithBorderDelete"
						icon={crossIcon}
						className="pending--cross_button"
					/>
				</div>
			),
		},
	];

	const handleApprove = () => {
		handleStatus({ status: 'approved' })
	}
	const handleReject = () => {
		handleStatus({ status: 'rejected' })
	}
	return (
		<>
			<div className="pending">
				<Table
					data={data}
					columns={columns}
					loading={loading}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
				/>
			</div>
			{/* confirmation modal */}
			<ConfirmationModal
				isOpen={openApproveModal ? openApproveModal : openRejectModal}
				onClose={() => {
					openApproveModal ? setOpenApproveModal(false) : setOpenRejectModal(false);
				}}
				onSave={openApproveModal ? handleApprove : handleReject}
				content={`You want to ${openApproveModal ? 'approve' : 'reject'} this request`}
				buttonTitle2={openApproveModal ? 'Approve' : 'Reject'}
			/>
			{/*Preview Modal */}
			<Modal
				isModalOpen={isModalOpen}
				width="auto"
				height="auto"
				closeModal={closeModal}
				title={<div>Preview ({rowData?.customerDocuments[0]?.isMatched ? 'Matched' : 'Not Matched'})</div>}
				className="pending--custom_modal"
			>
				<div className="pending--img_container">
					<div className="pending--box_container">
						<img
							src={rowData?.customerDocuments[0]?.documentUrl}
							alt="passport"
							className="pending--passport"
						/>
						<CustomTypography color="#909296">
							{rowData?.customerDocuments[0]?.type}: {rowData?.name}
						</CustomTypography>
					</div>
					<div className="pending--box_container">
						<img src={rowData?.customerDocuments[0]?.userUrl} alt="biometric" className="pending--biometric" />
						<CustomTypography color="#909296">Biometric Image</CustomTypography>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Pending;
