import React, { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Form } from 'antd';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import Button from '../../../../../../components/button/button';
import editIcon from '../../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import ModalComponent from '../../../../../../components/modal/modal';
import FormComponent from './formComponents/formComponents';
import TableComponent from '../../../../../../components/table/table';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import { useEditParkingStand, useGetParkingStand, usePostParkingStand, useDeleteParkingStand } from '../../../../../../services/planairportmaster/resources/parkingstand/parkingstand';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { GET_PARKING_STAND } from '../../../../../../api';
import './parkingstand.scss';

const ParkingStand = () => {
	const queryClient = useQueryClient();
	const [parkingData, setparkingData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const [form] = Form.useForm();

	const getParkingStandHandler = {
		onSuccess: (data) => handleGetParkingStandSuccess(data),
		onError: (error) => handleGetParkingStandError(error),
	};

	const handleGetParkingStandSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setparkingData([...newData]);
		}
	};

	const handleGetParkingStandError = (error) => {
		toast.error(error?.message);
	}
	const {
		data: fetchParking,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getParkingStandRefetch
	} = useGetParkingStand(getParkingStandHandler);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setRowData({});
		form.resetFields();
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setRowData({});
		setIsEditModalOpen(false);
		setIsReadOnly(false);
		form.resetFields();
	};

	const openDeleteModal = (record) => {
		setRowData(record);
		setIsDeleteConfirm(true);
	}

	const closeDeleteModal = () => {
		setRowData({});
		setIsDeleteConfirm(false);

	}

	//CREATE
	const handleAddParkingStandSuccess = (data) => {
		setparkingData([])
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-parking-stand');
	}

	const handleAddParkingStandError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addParkingStandHandler = {
		onSuccess: (data) => handleAddParkingStandSuccess(data),
		onError: (error) => handleAddParkingStandError(error),
	};

	const { mutate: postParkingStand, isLoading: isPostLoading } = usePostParkingStand(addParkingStandHandler);

	const handleSaveButton = useCallback((value) => {
		value && postParkingStand(value);
	}, []);

	const handleCloseButton = () => {
		setRowData({});
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		form.resetFields();
	};

	//EDIT 
	const editParkingStandHandler = {
		onSuccess: (data) => handleEditParkingStandSuccess(data),
		onError: (error) => handleEditParkingStandError(error),
	};

	const { mutate: editParkingStand, isLoading: isEditLoading } = useEditParkingStand(rowData?.id, editParkingStandHandler)

	const handleEditParkingStandSuccess = (data) => {
		closeEditModal();
		setparkingData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-parking-stand');
	}

	const handleEditParkingStandError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : "",
			validTill: record?.validTill ? dayjs(record?.validTill) : "",
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : "",
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : "",
		}
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		editParkingStand(value);
	};

	//DELETE
	const deleteParkingStandHandler = {
		onSuccess: (data) => handleDeleteParkingStandSuccess(data),
		onError: (error) => handleDeleteParkingStandError(error),
	};

	const handleDeleteParkingStandSuccess = (data) => {
		queryClient.invalidateQueries('get-parking-stand');
		closeDeleteModal();
		toast.success(data?.message);
	}

	const handleDeleteParkingStandError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const { mutate: deleteParkingStand } = useDeleteParkingStand(deleteParkingStandHandler);
	const handleDelete = () => {
		deleteParkingStand(rowData.id);
	}

	const columns = [
		{
			title: 'Actions',
			key: 'actions',
			render: (text, record) => (
				<div className="action_buttons">
					<Button
						onClick={() => handleEdit(record)}
						type="iconWithBorder"
						icon={editIcon}
						className="custom_icon_buttons"
					/>
					<Button
						onClick={() => openDeleteModal(record)}
						type="iconWithBorder"
						icon={deleteIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
		{
			title: 'POS',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (standName) => standName ?? '-',
		},
		{
			title: 'AIRPORT',
			dataIndex: 'airport',
			key: 'airport',
			align: 'center',
			render: (airport) => airport?.name ?? '-',
		},
		{
			title: 'GAT',
			dataIndex: 'gate',
			key: 'gate',
			align: 'center',
			render: (gate) => gate?.name ?? '-',
		},
		{
			title: 'TWY',
			dataIndex: 'taxiway',
			key: 'taxiway',
			align: 'center',
			render: (taxiway) => taxiway?.name ?? '-',
		},
		{
			title: 'STS',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (text, record) => {
				const { validFrom, validTill } = record;
				const currentDate = dayjs();

				if (!validFrom || !validTill) {
					return 'O';
				}
				if (
					(validFrom && (currentDate.isSame(validFrom, 'day') || currentDate.isAfter(validFrom, 'day'))) &&
					(validTill && (currentDate.isSame(validTill, 'day') || currentDate.isBefore(validTill, 'day')))
				) {
					return 'O';
				} else {
					return 'I';
				}
			},
		},
		{
			title: 'AVAIL',
			dataIndex: 'availability',
			key: 'availability',
			align: 'center',
			render: (text, record) => {
				const { unavailableFrom, unavailableTo } = record;
				const currentDate = dayjs();

				if (!unavailableFrom || !unavailableTo) {
					return 'A';
				}
				if (
					(unavailableFrom && (currentDate.isSame(unavailableFrom, 'day') || currentDate.isAfter(unavailableFrom, 'day'))) &&
					(unavailableTo && (currentDate.isSame(unavailableTo, 'day') || currentDate.isBefore(unavailableTo, 'day')))
				) {
					return 'U/A';
				} else {
					return 'A';
				}
			},
		},
		{
			title: 'View Details',
			key: 'viewDetails',
			render: (record) => (
				<>
					<Button
						style={{ margin: 'auto' }}
						onClick={() => {
							setIsReadOnly(true);
							handleEdit(record)
						}}
						title="View Details"
						type="text" />
				</>
			),
		},
	];

	const dropdownItems = [
		{
			label: 'Add Parking Stand',
			value: 'create',
			key: '0',
		},
		// {
		// 	label: 'Upload CSV',
		// 	value: 'uploadCSV',
		// 	key: '1',
		// },
		// {
		// 	label: 'Download CSV Template',
		// 	value: 'downloadCSVTemplate',
		// 	key: '2',
		// },
	];

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};

	return (
		<>
		<SocketEventListener refetch={getParkingStandRefetch} apiName={GET_PARKING_STAND} />
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchParking?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					// title2={'Import Global Reference'}
					// title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Parking Stands'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
					/>}
					openModal={openModal}
				/>
			) : (
				<>
					<div className="parking-stand">
						<div className="parking-stand--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="parking-stand--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Parking Stands
							</CustomTypography>
							<TableComponent data={parkingData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}



			{/* modals */}
			<ModalComponent
				isModalOpen={isModalOpen}
				width="80%"
				closeModal={closeModal}
				title={'Add Parking Stands'}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
					/>
				</div>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isEditModalOpen}
				width="80%"
				closeModal={closeEditModal}
				title={`${isReadOnly ? '' : 'Edit'} Parking Stands`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={handleEditSave}
						handleButtonClose={handleCloseButton}
						isEdit={true}
						initialValues={rowData}
						isReadOnly={isReadOnly}
					/>
				</div>
			</ModalComponent>
			<ConfirmationModal
				isOpen={isDeleteConfirm}
				onClose={closeDeleteModal}
				onSave={handleDelete}
				content={`You want to delete ${rowData?.name}?`}
			/>
		</>
	);
};

export default ParkingStand;
