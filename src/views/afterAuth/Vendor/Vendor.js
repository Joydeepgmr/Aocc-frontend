import React, { useState } from 'react';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import Button from '../../../components/button/button';
import TableComponent from '../../../components/table/table';
import Modal from '../../../components/modal/modal';
import './Vendor.scss';

const Vendor = () => {
	const [row, setRow] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (record) => {
		console.log(record, 'status');
		setRow(record);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setRow({});
		setIsModalOpen(false);
	};

	const handleProgress = () => {
		if (row.status === 'pending') {
			row.status = 'in-progress';
		} else if (row.status === 'in-progress') {
			row.status = 'completed';
		}
		closeModal()
	};

	const rows = [
		{
			task: 'Fueling',
			flight: 'AI 812',
			status: 'pending',
		},
		{
			task: 'Catering',
			flight: 'AI 812',
			status: 'in-progress',
		},
		{
			task: 'Cleaning',
			flight: '6E 1234',
			status: 'completed',
		},
		{
			task: 'Fueling',
			flight: '6E 1234',
			status: 'pending',
		},
		{
			task: 'Catering',
			flight: '6E 1234',
			status: 'pending',
		},
		{
			task: 'Cleaning',
			flight: '6E 1234',
			status: 'pending',
		},
	];
	const columns = [
		{
			title: 'Flight',
			dataIndex: 'flight',
			key: 'flight',
			align: 'center',
			render: (flight) => flight ?? '-',
		},
		{
			title: 'Tasks',
			dataIndex: 'task',
			key: 'task',
			align: 'center',
			render: (task) => task ?? '-',
		},
		{
			title: 'Actions',
			key: 'status',
			render: (record) => (
				<Button
					style={{ padding: 'auto', margin: "auto", width: "10rem" }}
					className={`vendor--${record.status}`}
					onClick={() => openModal(record)}
					type="filledText"
					title={
						record.status === 'pending' ? 'Start' : record.status === 'in-progress' ? 'Stop' : 'Completed'
					}
					disabled={record.status === 'completed'}
				/>
			),
		},
	];

	return (
		<div className="vendor--container">
			<div className="vendor--header">
				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
					Task Overview
				</CustomTypography>
				<CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296">
					Here is your overview
				</CustomTypography>
			</div>
			<div className="vendor--table">
				<TableComponent data={rows} columns={columns} />
			</div>

			<Modal
				isModalOpen={isModalOpen}
				width="21rem"
				height="8rem"
				closeModal={closeModal}
				title={row.status === 'pending' ? 'Start Task?' : 'Stop Task?'}
			>
				<div className="vendor--button-container">
					<Button title="Cancel" type="filledText" id="btn" className="vendor--cancel" onClick={closeModal} />
					<Button
						title={row.status === 'pending' ? 'Start' : 'Stop'}
						className={`vendor--${row.status}`}
						type="filledText"
						id="btn"
						onClick={handleProgress}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default Vendor;
