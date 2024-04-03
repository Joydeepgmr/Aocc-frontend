import React, {useState} from 'react';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import Button from '../../../../../../components/button/button';
import editIcon from '../../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import {useEditBaggageBelt, useGetBaggageBelt,useDeleteBaggageBelt,usePostBaggageBelt} from '../../../../../../services/planairportmaster/resources/baggagebelt/baggagebelt';
import './baggagebelt.js';

const BaggageBelt = () => {

	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const { data: fetchBaggageBelt, isLoading: isFetchLoading  } = useGetBaggageBelt();

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
	const handleAddBaggageBeltSuccess = (data) => {
		queryClient.invalidateQueries('get-baggage-belt');
		closeModal();
		toast.success(data?.message);
	}

	const handleAddBaggageBeltError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addBaggageBeltHandler = {
		onSuccess: (data) => handleAddBaggageBeltSuccess(data),
		onError: (error) => handleAddBaggageBeltError(error),
	};

	const { mutate: postBaggageBelt, isLoading: isPostLoading  } = usePostBaggageBelt(addBaggageBeltHandler);

	const handleSaveButton = (value) => {
		value && postBaggageBelt(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	//EDIT 
	const editBaggageBeltHandler = {
		onSuccess: (data) => handleEditBaggageBeltSuccess(data),
		onError: (error) => handleEditBaggageBeltError(error),
	};

	const { mutate: editBaggageBelt, isLoading: isEditLoading } = useEditBaggageBelt(editBaggageBeltHandler)

	const handleEditBaggageBeltSuccess = (data) => {
		queryClient.invalidateQueries('get-baggage-belt');
		closeEditModal();
		toast.success(data?.message);
	}

	const handleEditBaggageBeltError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : "",
			validTill: record?.validTo ? dayjs(record?.validTo) : "",
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : "",
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : "",
			// runwayId: record?.runway?.id,
		}
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		value["id"] = rowData.id;
		editBaggageBelt(value);
	};

	//DELETE
	const deleteBaggageBeltHandler = {
		onSuccess: (data) => handleDeleteBaggageBeltSuccess(data),
		onError: (error) => handleDeleteBaggageBeltError(error),
	};

	const handleDeleteBaggageBeltSuccess = (data) => {
		queryClient.invalidateQueries('get-taxiway');
		closeDeleteModal();
		toast.success(data?.message);
	}

	const handleDeleteBaggageBeltError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const { mutate: deleteBaggageBelt } = useDeleteBaggageBelt(deleteBaggageBeltHandler);
	const handleDelete = () => {
		deleteBaggageBelt(rowData.id);
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
			title: 'Taxiway Name',
			dataIndex: 'name',
			key: 'name',
			render: (counterName) => counterName ?? '-',
		},
		{
			title: 'Airport',
			dataIndex: 'airport',
			key: 'airport',
			render: (group) => group ?? '-',
		},
		{
			title: 'Connected to Runway',
			dataIndex: 'runwayId',
			key: 'runwayId',
			render: (runway) => runway ?? '-',
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
					<Button
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
			label: 'Add New Taxi',
			value: 'addNewTaxi',
			key: '0',
		},
		{
			label: 'Upload CSV',
			value: 'uploadCSV',
			key: '1',
		},
		{
			label: 'Download CSV Template',
			value: 'downloadCSVTemplate',
			key: '2',
		},
	];

	const handleDropdownItemClick = (value) => {
		if (value === 'addNewTaxi') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};
	return (
		<>
			<PageLoader loading={isFetchLoading || isEditLoading || isPostLoading} />
			{!Boolean(fetchBaggageBelt?.length) ? (
				<Common_Card
                title1="Create"
                title2={'Import Global Reference'}
                title3={'Download CSV Template'}
                btnCondition={true}
                Heading={'Add belts'}
                formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton}/>}
            />
			) : (
				<>
					<div className="taxiway">
						<div className="taxiway--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="taxiway--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Taxiway Counters
							</CustomTypography>
							<TableComponent data={fetchTaxiway} columns={columns} />
						</div>
					</div>

					<ModalComponent
						isModalOpen={isModalOpen}
						width="120rem"
						closeModal={closeModal}
						title={'Add taxiway Counters'}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
								handleSaveButton={handleSaveButton}
								handleButtonClose={handleCloseButton}
							/>
						</div>
					</ModalComponent>

					<ModalComponent
						isModalOpen={isEditModalOpen}
						width="120rem"
						closeModal={closeEditModal}
						title={`Edit taxiway Counters`}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
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
			)}
		</>
	);
};

export default BaggageBelt;
