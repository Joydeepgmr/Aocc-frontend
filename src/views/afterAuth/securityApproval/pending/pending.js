import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import Input from '../../../../components/input/field/field';
import Button from '../../../../components/button/button';
import checkIcon from '../../../../assets/WhiteCheck.svg';
import crossIcon from '../../../../assets/X.svg';
import Table from '../../../../components/table/table';
import Modal from '../../../../components/modal/modal';
import { useStatusUser } from '../../../../services/securityApproval/securityApproval';
import getNearestTimeDifference from '../../../../utils/NearestTimeDifference';
import './pending.scss';

const Pending = ({data, hasNextPage, fetchNextPage, loading}) => {
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);

	const openModal = (data) => {
		setRowData(data);
		setIsModalOpen(true);
	}

	const closeModal = () => {
		setRowData(null);
		setIsModalOpen(false);
	}

	//approve or reject
	const handleStatusSuccess = (data) => {
		setRowData(null);
		setIsModalOpen(false);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-user');
	};

	const handleStatusError = (error) => {
		setRowData(null);
		toast.error(error?.response?.data?.message);
	};

	const statusHandler = {
		onSuccess: (data) => handleStatusSuccess(data),
		onError: (error) => handleStatusError(error),
	};
	const { mutate: postUser, isLoading: isPostLoading } = useStatusUser(rowData?.id,statusHandler);
	const handleStatus = (status) => {
		postUser(status);
	}

	const columns = [
		{
			title: 'Time',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (time) => {
				const {value, unit} = getNearestTimeDifference(time);
				return <div>{`${value} ${unit}`} ago</div>
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
					return document.type ?? '-';
				}
			},
			align: 'center',
		},
		{
			title: '% Match',
			dataIndex: 'matchPercentage',
			key: 'matchPercentage',
			render(match) {
				return {
					props: {
						style: { background: match >= 90 ? '#B2F2BB' : match < 30 ? '#FF8787' : '' },
					},
					children: <div>{`${match}%`}</div>,
				};
			},
			align: 'center',
		},
		{
			title: 'ID Match',
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
			title: '',
			key: 'actions',
			render: (record) => (
				<div className="pending--action_buttons">
					<Button
						onClick={()=>{
							setRowData(record);
							rowData && handleStatus({status: "approved"});
						}}
						type="iconWithBorder"
						icon={checkIcon}
						className="pending--approve_button"
					/>
					<Button
						onClick={()=>{
							setRowData(record);
							rowData && handleStatus({status:"rejected"});
						}}
						type="iconWithBorder"
						icon={crossIcon}
						className="pending--cross_button"
					/>
				</div>
			),
		},
	];

	return (
		<>
			<div className="pending">
				<div className="pending--top_container">
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Pending Request
					</CustomTypography>
					<Input label="search" name="search" placeholder="Search" warning="Required field" type="search" />
				</div>
				<Table data={data} columns={columns} loading={loading} fetchData={fetchNextPage} pagination={hasNextPage}/>
			</div>
			{/*Preview Modal */}
			<Modal
				isModalOpen={isModalOpen}
				width="auto"
				height="auto"
				closeModal = {closeModal}
				title="Preview"
				className="pending--custom_modal"
			>
				<div className="pending--img_container">
					<div className="pending--box_container">
						<img src={rowData?.customerDocuments[0]?.documentUrl} alt="passport" className="pending--passport" />
						<CustomTypography color="#909296">Passport: Kenya</CustomTypography>
					</div>
					<div className="pending--box_container">
						<img src={rowData?.image} alt="biometric" className="pending--biometric" />
						<CustomTypography color="#909296">Biometric Image</CustomTypography>
					</div>
				</div>
				<div className='pending--footer'>{rowData?.matchPercentage}%</div>
			</Modal>
		</>
	);
};

export default Pending;
