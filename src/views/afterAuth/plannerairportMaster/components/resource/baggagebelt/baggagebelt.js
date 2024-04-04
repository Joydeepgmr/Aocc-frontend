import React, { useState } from 'react';
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
import { useEditBaggageBelt, useGetBaggageBelt, useDeleteBaggageBelt, usePostBaggageBelt } from '../../../../../../services/planairportmaster/resources/baggagebelt/baggagebelt';
import './baggagebelt.js';

const BaggageBelt = () => {

	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [baggageBeltData, setBaggageBeltData] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

	const getBaggageBeltHandler = {
		onSuccess: (data) => handleGetBaggageBeltSuccess(data),
		onError: (error) => handleGetBaggageBeltError(error),
	};

	const handleGetBaggageBeltSuccess = (data) => {
		console.log(data, "data here");
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setBaggageBeltData([...newData]);
		}
	};

	const handleGetBaggageBeltError = (error) => {
		toast.error(error?.response?.data?.message);
	}
	const { data: fetchBaggageBelt, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetBaggageBelt(getBaggageBeltHandler);

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
		setBaggageBeltData([]);
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

	const { mutate: postBaggageBelt, isLoading: isPostLoading } = usePostBaggageBelt(addBaggageBeltHandler);

	const handleSaveButton = (value) => {
		value["name"] = value?.name.toString();
		value && postBaggageBelt(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		setIsReadOnly(false)
	};

	//EDIT 
	const editBaggageBeltHandler = {
		onSuccess: (data) => handleEditBaggageBeltSuccess(data),
		onError: (error) => handleEditBaggageBeltError(error),
	};

	const { mutate: editBaggageBelt, isLoading: isEditLoading } = useEditBaggageBelt(editBaggageBeltHandler)

	const handleEditBaggageBeltSuccess = (data) => {
		queryClient.invalidateQueries('get-baggage-belt');
		setBaggageBeltData([]);
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
			validTill: record?.validTill ? dayjs(record?.validTill) : "",
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : "",
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : "",
			terminalId: record?.terminalId?.id,
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
		queryClient.invalidateQueries('get-baggage-belt');
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
			title: 'Belt Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
		},
		{
			title: 'Terminal',
			dataIndex: 'terminal',
			key: 'terminal',
			render: (terminal) => terminal?.name ?? '-',
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
			label: 'Add New Baggage Belt',
			value: 'addNewBaggageBelt',
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
		if (value === 'addNewBaggageBelt') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};
	return (
		<>
			<PageLoader loading={isFetchLoading || isEditLoading || isPostLoading} />
			{!Boolean(fetchBaggageBelt?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add belts'}
					formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton} />}
				/>
			) : (
				<>
					<div className="baggage_belt">
						<div className="baggage_belt--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="baggage_belt--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Baggage Belt Counters
							</CustomTypography>
							<TableComponent data={baggageBeltData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>

					<ModalComponent
						isModalOpen={isModalOpen}
						width="120rem"
						closeModal={closeModal}
						title={'Add Baggage Belt Counters'}
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
