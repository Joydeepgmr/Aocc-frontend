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
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import {
	useGetGate,
	usePostGate,
	useEditGate,
	useDeleteGate,
} from '../../../../../../services/planairportmaster/resources/gates/gates';
import './Gates.scss';

const Gates = () => {
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const { data: fetchGates, isLoading: isFetchLoading } = useGetGate();

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

	//CREATE
	const handleAddGateSuccess = (data) => {
		queryClient.invalidateQueries('get-gate');
		closeModal();
		toast.success(data?.message);
	};

	const handleAddGateError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const addGateHandler = {
		onSuccess: (data) => handleAddGateSuccess(data),
		onError: (error) => handleAddGateError(error),
	};

	const { mutate: postGate, isLoading: isPostLoading } = usePostGate(addGateHandler);
	const handleSaveButton = (value) => {
		postGate(value);
	};

	const handleCloseButton = () => {
		closeEditModal();
		closeModal();
	};

	//EDIT
	const editGateHandler = {
		onSuccess: (data) => handleEditGateSuccess(data),
		onError: (error) => handleEditGateError(error),
	};

	const handleEditGateSuccess = (data) => {
		queryClient.invalidateQueries('get-gate');
		closeEditModal();
		toast.success(data?.message);
	};

	const handleEditGateError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : '',
			validTill: record?.validTo ? dayjs(record?.validTo) : '',
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : '',
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : '',
			terminal: record.terminal.id,
		};
		setRowData(record);
		openEditModal();
	};

	const { mutate: editGate, isLoading: isEditLoading } = useEditGate(rowData?.id, editGateHandler);
	const handleEditSave = (value) => {
		editGate(value);
	};

	//DELETE
	const openDeleteModal = (record) => {
		setRowData(record);
		setIsDeleteConfirm(true);
	};

	const closeDeleteModal = () => {
		setRowData(null);
		setIsDeleteConfirm(false);
	};

	const deleteGateHandler = {
		onSuccess: (data) => handleDeleteGateSuccess(data),
		onError: (error) => handleDeleteGateError(error),
	};

	const handleDeleteGateSuccess = (data) => {
		queryClient.invalidateQueries('get-gate');
		closeDeleteModal();
		toast.success(data?.message);
	};

	const handleDeleteGateError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const { mutate: deleteGate, isLoading: isDeleteLoading } = useDeleteGate(deleteGateHandler);
	const handleDelete = () => {
		deleteGate(rowData.id);
	};

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
			title: 'Gate Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
		},
		{
			title: 'Airport',
			dataIndex: 'airport',
			key: 'airport',
			render: (airport) => airport.name ?? '-',
		},
		{
			title: 'Bus Gate',
			dataIndex: 'busGate',
			key: 'busGate',
			render: (busGate) => (busGate ? 'Yes' : 'No'),
		},
		{
			title: 'Terminal',
			dataIndex: 'terminal',
			key: 'terminal',
			render: (terminal) => terminal.name ?? '-',
		},
		{
			title: 'Gate ID',
			dataIndex: 'gateId',
			key: 'gateId',
			render: (gateId) => gateId ?? '-',
		},
		{
			title: 'Gate Type',
			dataIndex: 'type',
			key: 'type',
			render: (type) => type ?? '-',
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
							handleEdit(record);
						}}
						title="View Details"
						type="text"
					/>
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
			{!Boolean(fetchGates?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Gate'}
					formComponent={
						<FormComponent
							handleSaveButton={handleSaveButton}
							handleButtonClose={handleCloseButton}
							key={Math.random() * 100}
						/>
					}
				/>
			) : (
				<>
					<div className="gate">
						<div className="gate--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Actions"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="gate--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Gates
							</CustomTypography>
							<TableComponent data={fetchGates} columns={columns} />
						</div>
					</div>

					{/* modals */}
					<ModalComponent
						isModalOpen={isModalOpen}
						width="80%"
						closeModal={closeModal}
						title={'Add Gate'}
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
						title={`Edit Gate`}
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

export default Gates;
