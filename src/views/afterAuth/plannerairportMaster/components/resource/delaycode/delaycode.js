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
import { useEditDelayCode, useGetDelayCode, usePostDelayCode, useDeleteDelayCode } from '../../../../../../services/planairportmaster/resources/delaycode/delaycode';
import './delaycode.scss';

const DelayCode = () => {
	const queryClient = useQueryClient();
	const [delayCodeData, setDelayCodeData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

	const getDelayCodeHandler = {
		onSuccess: (data) => handleGetDelayCodeSuccess(data),
		onError: (error) => handleGetDelayCodeError(error),
	};

	const handleGetDelayCodeSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
		
			setDelayCodeData([...newData]);
		}
	};

	const handleGetDelayCodeError = (error) => {
		toast.error(error?.message);
	}
	const { data: fetchDelayCode, isLoading: isFetchLoading,  hasNextPage, fetchNextPage } = useGetDelayCode(getDelayCodeHandler);

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
	const handleAddDelayCodeSuccess = (data) => {
		setDelayCodeData([])
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-delay-code');
	}

	const handleAddDelayCodeError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addDelayCodeHandler = {
		onSuccess: (data) => handleAddDelayCodeSuccess(data),
		onError: (error) => handleAddDelayCodeError(error),
	};

	const { mutate: postDelayCode, isLoading: isPostLoading } = usePostDelayCode(addDelayCodeHandler);
	
	const handleSaveButton = (value) => {
		value && postDelayCode(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	//EDIT 
	const editDelayCodeHandler = {
		onSuccess: (data) => handleEditDelayCodeSuccess(data),
		onError: (error) => handleEditDelayCodeError(error),
	};

	const {mutate: editDelayCode, isLoading: isEditLoading} = useEditDelayCode(rowData?.id,editDelayCodeHandler)
	
	const handleEditDelayCodeSuccess = (data) => {
		closeEditModal();
		setDelayCodeData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-delay-code');
	}

	const handleEditDelayCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEdit = (record) => {
		record = {...record,
			validFrom : record?.validFrom ? dayjs(record?.validFrom): "",
			validTill: record?.validTo ? dayjs(record?.validTo) : "",
			unavailableFrom: record?.unavailableFrom ?  dayjs(record?.unavailableFrom) : "",
			unavailableTo:record?.unavailableTo ? dayjs(record?.unavailableTo)  : "",
		}
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		editDelayCode(value);
	};

	//DELETE
	const deleteDelayCodeHandler = {
		onSuccess: (data) => handleDeleteDelayCodeSuccess(data),
		onError: (error) => handleDeleteDelayCodeError(error),
	};

	const handleDeleteDelayCodeSuccess = (data) => {
		closeDeleteModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-delay-code');
	}

	const handleDeleteDelayCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const {mutate: deleteDelayCode} = useDeleteDelayCode(deleteDelayCodeHandler);
	const handleDelete = () => {
		deleteDelayCode(rowData.id);	
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
			title: 'Delay Code',
			dataIndex: 'delayCode',
			key: 'delayCode',
			render: (delayCode) => delayCode ?? '-',
		},
		{
			title: 'Group',
			dataIndex: 'group',
			key: 'group',
			render: (group) => group ?? '-',
		},
		{
			title: 'Airline',
			dataIndex: 'airline',
			key: 'airline',
			render: (airline) => airline?.name ?? '-',
		},
		{
			title: 'Status',
			dataIndex: 'runway',
			key: 'runway',
			render: (runway) => runway?.name ?? '-',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => status ?? '-',
		},
		{
			title: '',
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
		if (value === 'create') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};	

	return (
		<>
			<PageLoader loading={isFetchLoading || isEditLoading || isPostLoading} />
			{!Boolean(fetchDelayCode?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'DelayCode'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						key={Math.random() * 100}
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
							<TableComponent data={delayCodeData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage}/>
						</div>
					</div>

					{/* modals */}
					<ModalComponent
						isModalOpen={isModalOpen}
						width="50%"
						closeModal={closeModal}
						title={'DelayCode'}
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
					title={`Edit Delay Code`}
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
			content={`You want to delete ${rowData?.name}?`}
			/>
				</>
			)}
		</>
	);
};

export default DelayCode;
