import React, { useCallback ,useState } from 'react';
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
import { useTerminalDropdown } from '../../../../../../services/planairportmaster/resources/terminal/terminal';
import { Form } from 'antd';
import './Gates.scss';

const Gates = () => {
	const queryClient = useQueryClient();
	const [gateData, setGateData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const [form] = Form.useForm();
	const { data: terminalDropdownData = [] } = useTerminalDropdown();

	const getGateHandler = {
		onSuccess: (data) => handleGetGateSuccess(data),
		onError: (error) => handleGetGateError(error),
	};

	const handleGetGateSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setGateData([...newData]);
		}
	};

	const handleGetGateError = (error) => {
		toast.error(error?.message);
	}
	const { data: fetchGates, isFetching, isLoading: isFetchLoading, fetchNextPage, hasNextPage } = useGetGate(getGateHandler);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
		form.resetFields();
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setIsReadOnly(false);
		form.resetFields();
	};

	//CREATE
	const handleAddGateSuccess = (data) => {
		setGateData([]);
		closeModal();
		queryClient.invalidateQueries('get-gate');
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
	
	const handleSaveButton = useCallback((value) => {
		value && postGate(value);
	}, []);

	const handleCloseButton = () => {
		closeEditModal();
		closeModal();
		form.resetFields();
	};

	//EDIT
	const editGateHandler = {
		onSuccess: (data) => handleEditGateSuccess(data),
		onError: (error) => handleEditGateError(error),
	};

	const handleEditGateSuccess = (data) => {
		setGateData([]);
		closeEditModal();
		queryClient.invalidateQueries('get-gate');
		toast.success(data?.message);
	};

	const handleEditGateError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : '',
			validTill: record?.validTill ? dayjs(record?.validTill) : '',
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : '',
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : '',
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
			title: 'Gate Name',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (name) => name ?? '-',
		},
		{
			title: 'Airport',
			dataIndex: 'airport',
			key: 'airport',
			align: 'center',
			render: (airport) => airport?.name ?? '-',
		},
		{
			title: 'Bus Gate',
			dataIndex: 'busGate',
			key: 'busGate',
			align: 'center',
			render: (busGate) => (busGate ? 'Yes' : 'No'),
		},
		{
			title: 'Terminal',
			dataIndex: 'terminal',
			key: 'terminal',
			align: 'center',
			render: (terminal) => terminal?.name ?? '-',
		},
		{
			title: 'Gate ID',
			dataIndex: 'gateId',
			key: 'gateId',
			align: 'center',
			render: (gateId) => gateId ?? '-',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (text, record) => {
				const { validFrom, validTill } = record;
				const currentDate = dayjs();

				if (!validFrom || !validTill) {
					return 'Active';
				}
				if (
					(validFrom && (currentDate.isSame(validFrom, 'day') || currentDate.isAfter(validFrom, 'day'))) &&
					(validTill && (currentDate.isSame(validTill, 'day') || currentDate.isBefore(validTill, 'day')))
				) {
					return 'Active';
				} else {
					return 'Inactive';
				}
			},
		},
		{
			title: 'Availability',
			dataIndex: 'availability',
			key: 'availability',
			align: 'center',
			render: (text, record) => {
				const { unavailableFrom, unavailableTo } = record;
				const currentDate = dayjs();

				if (!unavailableFrom || !unavailableTo) {
					return 'Available';
				}
				if (
					(unavailableFrom && (currentDate.isSame(unavailableFrom, 'day') || currentDate.isAfter(unavailableFrom, 'day'))) &&
					(unavailableTo && (currentDate.isSame(unavailableTo, 'day') || currentDate.isBefore(unavailableTo, 'day')))
				) {
					return 'Unavailable';
				} else {
					return 'Available';
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
			label: 'Add Gate',
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
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchGates?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					// title2={'Upload CSV'}
					// title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Gate'}
					formComponent={
						<FormComponent
							handleSaveButton={handleSaveButton}
							handleButtonClose={handleCloseButton}
							terminalDropdownData={terminalDropdownData}
						/>
					}
					openModal={openModal}
				/>
			) : (
				<>
					<div className="gate">
						<div className="gate--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="gate--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Gates
							</CustomTypography>
							<TableComponent data={gateData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}



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
						form={form}
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						terminalDropdownData={terminalDropdownData}
					/>
				</div>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isEditModalOpen}
				width="80%"
				closeModal={closeEditModal}
				title={`${isReadOnly ? '' : 'Edit'} Gate`}
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
						terminalDropdownData={terminalDropdownData}
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

export default Gates;
