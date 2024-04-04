import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
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
import { useGetGate } from '../../../../../../services/planairportmaster/resources/gates/gates';
import './parkingstand.scss';

const ParkingStand = () => {
	const queryClient = useQueryClient();
	const [parkingData, setparkingData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

	const { data: gateDropdownData = [], isSuccess: isGetGateDropdownSuccess } = useGetGate();

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
	const { data: fetchParking, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetParkingStand(getParkingStandHandler);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setIsReadOnly(false);
	};

	const openDeleteModal = (record) => {
		setRowData(record);
		setIsDeleteConfirm(true);
	}

	const closeDeleteModal = () => {
		setRowData(null);
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

	const handleSaveButton = (value) => {
		value && postParkingStand(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
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
			validTill: record?.validTo ? dayjs(record?.validTo) : "",
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
			title: '',
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
			title: 'Stand Name',
			dataIndex: 'name',
			key: 'name',
			render: (standName) => standName ?? '-',
		},
		{
			title: 'Airport',
			dataIndex: 'airport',
			key: 'airport',
			render: (airport) => airport?.name ?? '-',
		},
		{
			title: 'Connected to Gate',
			dataIndex: 'gate',
			key: 'gate',
			render: (gate) => gate?.name ?? '-',
		},
		{
			title: 'Connected to Taxiway',
			dataIndex: 'taxiway',
			key: 'taxiway',
			render: (taxiway) => taxiway?.name ?? '-',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => status ?? '-',
		},
		{
			title: 'Availability',
			dataIndex: 'availability',
			key: 'availability',
			render: (availability) => availability ?? '-',
		},
		{
			title: '',
			key: 'viewDetails',
			render: (record) => (
				<>
					<Button onClick={() => {
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
			<PageLoader loading={isFetchLoading || isEditLoading || isPostLoading} />
			{!Boolean(fetchParking?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Parking Stands'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						key={Math.random() * 100}
						gateDropdownData={isGetGateDropdownSuccess && gateDropdownData?.pages[0]?.data}
					/>}
				/>
			) : (
				<>
					<div className="check-in">
						<div className="check-in--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="check-in--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Check-in Counters
							</CustomTypography>
							<TableComponent data={parkingData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>

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
								handleSaveButton={handleSaveButton}
								handleButtonClose={handleCloseButton}
								key={Math.random() * 100}
								gateDropdownData={isGetGateDropdownSuccess && gateDropdownData?.pages[0]?.data}
							/>
						</div>
					</ModalComponent>

					<ModalComponent
						isModalOpen={isEditModalOpen}
						width="80%"
						closeModal={closeEditModal}
						title={`Edit Parking Stands`}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
								handleSaveButton={handleEditSave}
								handleButtonClose={handleCloseButton}
								isEdit={true}
								initialValues={rowData}
								isReadOnly={isReadOnly}
								gateDropdownData={isGetGateDropdownSuccess && gateDropdownData?.pages[0]?.data}
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
			)}
		</>
	);
};

export default ParkingStand;
