import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import CustomTypography from '../../../components/typographyComponent/typographyComponent';
import Button from '../../../components/button/button';
import TableComponent from '../../../components/table/table';
import Modal from '../../../components/modal/modal';
import InputField from '../../../components/input/field/field';
import { useGetVendor, useUpdateStatusDone, useUpdateStatusInProgress } from '../../../services/Vendor/vendor';
import './Vendor.scss';
import { Form } from 'antd';

const Vendor = () => {
	const queryClient = useQueryClient();
	const [rowData, setRowData] = useState({});
	const [vendorData, setVendorData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const watchFlightNo = Form.useWatch('flightNo', form);
	const openModal = (record) => {
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
		if (data?.pages?.length) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page || []);
			}, []);
			setVendorData([...newData]);
		}
	};

	const handleGetVendorError = (error) => {
		toast.error(error?.message);
	};
	const {
		data: fetchVendor,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
	} = useGetVendor(getVendorHandler);

	const statusHandler = {
		onSuccess: (data) => handleStatusSuccess(data),
		onError: (error) => handleStatusError(error),
	};

	const { mutate: updateStatusDone, isLoading: isStatusDoneLoading } = useUpdateStatusDone(statusHandler);
	const { mutate: updateStatusInProgress, isLoading: isStatusInProgressLoading } = useUpdateStatusInProgress(statusHandler);
	const handleStatusSuccess = (data) => {
		closeModal();
		setVendorData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-vendor');
	};

	const handleStatusError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleProgress = () => {
		if (rowData?.status === "in-progress") {
			updateStatusDone({
				flightId: rowData?.id,
				airlineId: rowData?.airline,
				taskType: rowData?.task,
			});
		}
		else if (rowData?.status === "pending") {
			updateStatusInProgress({
				flightId: rowData?.id,
				airlineId: rowData?.airlineId,
				taskType: rowData?.task,
			});
		}
	};

	const columns = [
		{
			title: 'Flight',
			dataIndex: 'callSign',
			key: 'callSign',
			align: 'center',
			render: (callSign) => callSign ?? '-',
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
					style={{ padding: 'auto', margin: 'auto', width: '10rem' }}
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
	useEffect(() => {
		let debounceTimer;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			if (watchFlightNo != undefined) {
				const updatedVendorData = fetchVendor?.pages[0].filter((data) => data?.callSign?.includes?.(watchFlightNo));
				setVendorData(updatedVendorData);
			}
		}, 300);
		return () => clearTimeout(debounceTimer);
	}, [watchFlightNo, fetchVendor]);
	return (
		<div className="vendor--container">
			<div className='vendor--header'>
				<div className="vendor--title">
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Task Overview
					</CustomTypography>
					<CustomTypography type="text" fontSize={14} fontWeight="400" color="#909296">
						Here is your overview
					</CustomTypography>
				</div>
				<Form form={form} className='vendor--search'>
					<InputField
						label="Flight number"
						name="flightNo"
						placeholder="Flight number"
						warning="Required field"
						type="search"
						className='vendor-search-input'
					/>
				</Form>
			</div>
			<div className="vendor--table">
				<TableComponent
					data={vendorData}
					columns={columns}
					loading={isFetching}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
				/>
			</div>

			<Modal
				isModalOpen={isModalOpen}
				width="21rem"
				closeModal={closeModal}
				title={rowData.status === 'pending' ? 'Start Task?' : 'Stop Task?'}
			>
				<div className="vendor--button-container">
					<Button title="Cancel" type="filledText" id="btn" className="vendor--cancel" onClick={closeModal} disabled={isStatusDoneLoading || isStatusInProgressLoading} />
					<Button
						title={rowData.status === 'pending' ? 'Start' : 'Stop'}
						className={`vendor--${rowData.status}`}
						type="filledText"
						id="btn"
						onClick={handleProgress}
						disabled={isStatusDoneLoading || isStatusInProgressLoading}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default Vendor;
