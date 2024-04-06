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
import { useEditRunway, useGetRunway, usePostRunway, useDeleteRunway } from '../../../../../../services/planairportmaster/resources/runway/runway';
import './runway.scss';

const Runway = () => {

	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [runwayData, setRunwayData] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

	const getRunwayHandler = {
		onSuccess: (data) => handleGetRunwaySuccess(data),
		onError: (error) => handleGetRunwayError(error),
	};

	const handleGetRunwaySuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setRunwayData([...newData]);
		}
	};

	const handleGetRunwayError = (error) => {
		toast.error(error?.response?.data?.message);
	}
	const { data: fetchRunway, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetRunway(getRunwayHandler);


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
	const handleAddRunwaySuccess = (data) => {
		setRunwayData([]);
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-runway');
	}

	const handleAddRunwayError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addRunwayHandler = {
		onSuccess: (data) => handleAddRunwaySuccess(data),
		onError: (error) => handleAddRunwayError(error),
	};

	const { mutate: postRunway, isLoading: isPostLoading } = usePostRunway(addRunwayHandler);

	const handleSaveButton = (value) => {
		value && postRunway(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		setIsReadOnly(false)
	};

	//EDIT 
	const editRunwayHandler = {
		onSuccess: (data) => handleEditRunwaySuccess(data),
		onError: (error) => handleEditRunwayError(error),
	};

	const { mutate: editRunway, isLoading: isEditLoading } = useEditRunway(rowData?.id, editRunwayHandler)

	const handleEditRunwaySuccess = (data) => {
		closeEditModal();
		setRunwayData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-runway');
	}

	const handleEditRunwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : "",
			validTill: record?.validTill ? dayjs(record?.validTill) : "",
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : "",
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : "",
			runway: record?.runway?.id,
		}
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		value && editRunway(value);
	};

	//DELETE
	const deleteRunwayHandler = {
		onSuccess: (data) => handleDeleteRunwaySuccess(data),
		onError: (error) => handleDeleteRunwayError(error),
	};

	const handleDeleteRunwaySuccess = (data) => {
		queryClient.invalidateQueries('get-runway');
		closeDeleteModal();
		toast.success(data?.message);
	}

	const handleDeleteRunwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const { mutate: deleteRunway } = useDeleteRunway(deleteRunwayHandler);
	const handleDelete = () => {
		deleteRunway(rowData.id);
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
			title: 'Runway Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
		},
		{
			title: 'Type',
			dataIndex: 'status',
			key: 'status',
			render: (status) => status ?? '-',
		},
		{
			title: 'Reason',
			dataIndex: 'reason',
			key: 'reason',
			render: (reason) => reason ?? '-',
		},
		{
			title: 'Availability',
			dataIndex: 'availability',
			key: 'availability',
			render: (availability) => availability ?? '-',
		},
		{
			title: 'View Details',
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
			label: 'Add New Runway',
			value: 'addNewRunway',
			key: '0',
		},
	];

	const handleDropdownItemClick = (value) => {
		if (value === 'addNewRunway') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};


	return (
		<>
			<PageLoader loading={isFetchLoading || isEditLoading || isPostLoading} />
			{!Boolean(fetchRunway?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					// title2={'Import Global Reference'}
					// title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Runway'}
					formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton} key={Math.random() * 100} />}
					openModal={openModal}
				/>
			) : (
				<>
					<div className="runway">
						<div className="runway--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="runway--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Runway
							</CustomTypography>
							<TableComponent data={runwayData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
					</>
			)}
					<ModalComponent
						isModalOpen={isModalOpen}
						width="120rem"
						closeModal={closeModal}
						title={'Add Runway'}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
								handleSaveButton={handleSaveButton}
								handleButtonClose={handleCloseButton}
								key={Math.random() * 100}
							/>
						</div>
					</ModalComponent>

					<ModalComponent
						isModalOpen={isEditModalOpen}
						width="80%"
						closeModal={closeEditModal}
						title={`${isReadOnly? '' : 'Edit'} Runway`}
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
	);
};

export default Runway;
