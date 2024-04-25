import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import Button from '../../../components/button/button';
import TableComponent from '../../../components/table/table';
import Modal from '../../../components/modal/modal';
import { useGetVendor,useUpdateStatus } from '../../../services/Vendor/vendor';
import './Vendor.scss';

const Vendor = () => {
	const [rowData, setRowData] = useState({});
	const [vendorData, setVendorData] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (record) => {
		console.log(record, 'status');
		setRowData(record);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setRowData({});
		setIsModalOpen(false);
	};

	const getVendorHandler = {
		onSuccess: (data) => handleGetVendorSuccess(data),
		onError: (error) => handleGetVendorError(error),
	};

	const handleGetVendorSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setVendorData([...newData]);
		}
	};

	const handleGetVendorError = (error) => {
		toast.error(error?.message);
	}
	const { data: fetchVendor, isFetching, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetVendor(getVendorHandler);

	console.log(fetchVendor);

	const statusHandler = {
		onSuccess: (data) => handleStatusSuccess(data),
		onError: (error) => handleStatusError(error),
	};

	const { mutate: updateStatus, isLoading: isStatusLoading } = useUpdateStatus(rowData?.id, statusHandler)

	const handleStatusSuccess = (data) => {
		closeModal();
		setVendorData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-vendor');
	}

	const handleStatusError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const handleProgress = () => {
		updateStatus({task: rowData?.task});
	};

	const rows = [
		{
			id: '123435345',
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
				<TableComponent data={rows} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage}/>
			</div>

			<Modal
				isModalOpen={isModalOpen}
				width="21rem"
				height="8rem"
				closeModal={closeModal}
				title={rowData.status === 'pending' ? 'Start Task?' : 'Stop Task?'}
			>
				<div className="vendor--button-container">
					<Button title="Cancel" type="filledText" id="btn" className="vendor--cancel" onClick={closeModal} />
					<Button
						title={rowData.status === 'pending' ? 'Start' : 'Stop'}
						className={`vendor--${rowData.status}`}
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
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import Button from '../../../components/button/button';
import TableComponent from '../../../components/table/table';
import Modal from '../../../components/modal/modal';
import { useGetVendor,useUpdateStatus } from '../../../services/Vendor/Vendor';
import './Vendor.scss';

const Vendor = () => {
	const [rowData, setRowData] = useState({});
	const [vendorData, setVendorData] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (record) => {
		console.log(record, 'status');
		setRowData(record);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setRowData({});
		setIsModalOpen(false);
	};

	const getVendorHandler = {
		onSuccess: (data) => handleGetVendorSuccess(data),
		onError: (error) => handleGetVendorError(error),
	};

	const handleGetVendorSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setVendorData([...newData]);
		}
	};

	const handleGetVendorError = (error) => {
		toast.error(error?.message);
	}
	const { data: fetchVendor, isFetching, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetVendor(getVendorHandler);

	console.log(fetchVendor);

	const statusHandler = {
		onSuccess: (data) => handleStatusSuccess(data),
		onError: (error) => handleStatusError(error),
	};

	const { mutate: updateStatus, isLoading: isStatusLoading } = useUpdateStatus(rowData?.id, statusHandler)

	const handleStatusSuccess = (data) => {
		closeModal();
		setVendorData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-vendor');
	}

	const handleStatusError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const handleProgress = () => {
		updateStatus({task: rowData?.task});
	};

	const rows = [
		{
			id: '123435345',
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
				<TableComponent data={rows} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage}/>
			</div>

			<Modal
				isModalOpen={isModalOpen}
				width="21rem"
				height="8rem"
				closeModal={closeModal}
				title={rowData.status === 'pending' ? 'Start Task?' : 'Stop Task?'}
			>
				<div className="vendor--button-container">
					<Button title="Cancel" type="filledText" id="btn" className="vendor--cancel" onClick={closeModal} />
					<Button
						title={rowData.status === 'pending' ? 'Start' : 'Stop'}
						className={`vendor--${rowData.status}`}
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
