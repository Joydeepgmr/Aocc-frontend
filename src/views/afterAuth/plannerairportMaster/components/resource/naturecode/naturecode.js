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
import { useEditNatureCode, useGetNatureCode, usePostNatureCode, useDeleteNatureCode } from '../../../../../../services/planairportmaster/resources/naturecode/naturecode';
import './naturecode.scss';

const NatureCode = () => {
	const queryClient = useQueryClient();
	const [natureCodeData, setNatureCodeData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

	const getNatureCodeHandler = {
		onSuccess: (data) => handleGetNatureCodeSuccess(data),
		onError: (error) => handleGetNatureCodeError(error),
	};

	const handleGetNatureCodeSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
		
			setNatureCodeData([...newData]);
		}
	};

	const handleGetNatureCodeError = (error) => {
		toast.error(error?.message);
	}
	const { data: fetchNatureCode, isLoading: isFetchLoading,  hasNextPage, fetchNextPage } = useGetNatureCode(getNatureCodeHandler);

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
	const handleAddNatureCodeSuccess = (data) => {
		setNatureCodeData([])
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-nature-code');
	}

	const handleAddNatureCodeError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addNatureCodeHandler = {
		onSuccess: (data) => handleAddNatureCodeSuccess(data),
		onError: (error) => handleAddNatureCodeError(error),
	};

	const { mutate: postNatureCode, isLoading: isPostLoading } = usePostNatureCode(addNatureCodeHandler);
	
	const handleSaveButton = (value) => {
		value && postNatureCode(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	//EDIT 
	const editNatureCodeHandler = {
		onSuccess: (data) => handleEditNatureCodeSuccess(data),
		onError: (error) => handleEditNatureCodeError(error),
	};

	const {mutate: editNatureCode, isLoading: isEditLoading} = useEditNatureCode(rowData?.id,editNatureCodeHandler)
	
	const handleEditNatureCodeSuccess = (data) => {
		closeEditModal();
		setNatureCodeData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-nature-code');
	}

	const handleEditNatureCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEdit = (record) => {
		record = {...record,
			validFrom : record?.validFrom ? dayjs(record?.validFrom): "",
			validTill: record?.validTo ? dayjs(record?.validTo) : "",
		}
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		editNatureCode(value);
	};

	//DELETE
	const deleteNatureCodeHandler = {
		onSuccess: (data) => handleDeleteNatureCodeSuccess(data),
		onError: (error) => handleDeleteNatureCodeError(error),
	};

	const handleDeleteNatureCodeSuccess = (data) => {
		closeDeleteModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-nature-code');
	}

	const handleDeleteNatureCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const {mutate: deleteNatureCode} = useDeleteNatureCode(deleteNatureCodeHandler);
	const handleDelete = () => {
		deleteNatureCode(rowData.id);	
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
			title: 'Nature Code',
			dataIndex: 'natureCode',
			key: 'natureCode',
			render: (natureCode) => natureCode ?? '-',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => status ?? '-',
		},
		{
			title: 'View Details',
			key: 'viewDetails',
			render: (record) => (
				<>
					<Button onClick={() => {
						setIsReadOnly(true);
						handleEdit(record)}} 
						title="View Details" 
						type="text" />
				</>
			),
		},
	];

	const dropdownItems = [
		{
			label: 'Create',
			value: 'create',
			key: '0',
		},
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
			{!Boolean(fetchNatureCode?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					// title2={'Import Global Reference'}
					// title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'NatureCode'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						key={Math.random() * 100}
					/>}
					openModal={openModal}
				/>
			) : (
				<>
					<div className="nature-code">
						<div className="nature-code--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="nature-code--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Nature Code
							</CustomTypography>
							<TableComponent data={natureCodeData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage}/>
						</div>
					</div>
					</>
			)}

					{/* modals */}
					<ModalComponent
						isModalOpen={isModalOpen}
						width="50%"
						closeModal={closeModal}
						title={'NatureCode'}
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
					width="50%"
					closeModal={closeEditModal}
					title={`${isReadOnly ? '':'Edit'} Nature Code`}
					className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						handleSaveButton={handleEditSave}
						handleButtonClose={handleCloseButton}
						isEdit = {true}
						initialValues={rowData}
						isReadOnly = {isReadOnly}
					/>
				</div>
			</ModalComponent>
			<ConfirmationModal 
			isOpen={isDeleteConfirm} 
			onClose={closeDeleteModal} 
			onSave={handleDelete} 
			content={`You want to delete ${rowData?.natureCode}?`}
			/>
		</>
	);
};

export default NatureCode;
