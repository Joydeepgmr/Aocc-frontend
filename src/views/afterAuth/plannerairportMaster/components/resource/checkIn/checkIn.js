import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { Form } from 'antd';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../../assets/logo/edit.svg';
import Button from '../../../../../../components/button/button';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import {
	useDeleteCheckin,
	useEditCheckin,
	useGetCheckIn,
	usePostCheckIn,
} from '../../../../../../services/planairportmaster/resources/checkin/checkin';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { GET_CHECKIN_COUNTER } from '../../../../../../api';
import './checkIn.scss';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';

const CheckIn = () => {
	const queryClient = useQueryClient();
	const [checkinData, setCheckinData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [form] = Form.useForm();

	const getCheckinHandler = {
		onSuccess: (data) => handleGetCheckinSuccess(data),
		onError: (error) => handleGetCheckinError(error),
	};

	const handleGetCheckinSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setCheckinData([...newData]);
		}
	};

	const handleGetCheckinError = (error) => {
		toast.error(error?.message);
	};
	const {
		data: fetchCheckIn,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getCheckInRefetch,
	} = useGetCheckIn(getCheckinHandler);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		form.resetFields();
		setRowData({});
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		console.log('under close modal edit');
		setRowData({});
		setIsEditModalOpen(false);
		setIsReadOnly(false);
		form.resetFields();
	};

	const openDeleteModal = (record) => {
		setRowData(record);
		setIsDeleteConfirm(true);
	};

	const closeDeleteModal = () => {
		setRowData({});
		setIsDeleteConfirm(false);
	};

	//CREATE
	const handleAddCheckinSuccess = (data) => {
		setCheckinData([]);
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-check-in');
	};

	const handleAddCheckinError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const addCheckinHandler = {
		onSuccess: (data) => handleAddCheckinSuccess(data),
		onError: (error) => handleAddCheckinError(error),
	};

	const { mutate: postCheckIn, isLoading: isPostLoading } = usePostCheckIn(addCheckinHandler);

	const handleSaveButton = useCallback((value) => {
		value['isAllocatedToLounge'] = false;
		value['row'] = value?.row?.toString();
		value['phoneNumber'] = value?.phoneNumber?.toString();
		if (!value.phoneNumber) {
			delete value.phoneNumber;
		}
		value && postCheckIn(value);
	}, []);

	const handleCloseButton = () => {
		setRowData({});
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		form.resetFields();
	};

	//EDIT
	const editCheckinHandler = {
		onSuccess: (data) => handleEditCheckinSuccess(data),
		onError: (error) => handleEditCheckinError(error),
	};

	const { mutate: editCheckin, isLoading: isEditLoading } = useEditCheckin(rowData?.id, editCheckinHandler);

	const handleEditCheckinSuccess = (data) => {
		queryClient.invalidateQueries('get-check-in');
		setCheckinData([]);
		closeEditModal();
		toast.success(data?.message);
	};

	const handleEditCheckinError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : '',
			validTill: record?.validTill ? dayjs(record?.validTill) : '',
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : '',
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : '',
			terminalId: record?.terminal?.id,
		};
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		value.row && (value['row'] = value?.row.toString());
		editCheckin(value);
	};

	//DELETE
	const deleteCheckinHandler = {
		onSuccess: (data) => handleDeleteCheckinSuccess(data),
		onError: (error) => handleDeleteCheckinError(error),
	};

	const handleDeleteCheckinSuccess = (data) => {
		queryClient.invalidateQueries('get-check-in');
		closeDeleteModal();
		toast.success(data?.message);
	};

	const handleDeleteCheckinError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const { mutate: deleteCheckin } = useDeleteCheckin(deleteCheckinHandler);
	const handleDelete = () => {
		deleteCheckin(rowData.id);
	};

	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			console.log(file);
			// onUploadCSV(formData);
		} else {
			console.error('No file provided for upload.');
		}
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
			title: 'CNTR',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (counterName) => counterName ?? '-',
		},
		{
			title: 'GRP',
			dataIndex: 'group',
			key: 'group',
			align: 'center',
			render: (group) => group ?? '-',
		},
		{
			title: 'TERM',
			dataIndex: 'terminal',
			key: 'terminal',
			align: 'center',
			render: (terminal) => terminal?.name ?? '-',
		},
		{
			title: 'ROW',
			dataIndex: 'row',
			key: 'row',
			align: 'center',
			render: (row) => row ?? '-',
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
					validFrom &&
					(currentDate.isSame(validFrom, 'day') || currentDate.isAfter(validFrom, 'day')) &&
					validTill &&
					(currentDate.isSame(validTill, 'day') || currentDate.isBefore(validTill, 'day'))
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
					unavailableFrom &&
					(currentDate.isSame(unavailableFrom, 'day') || currentDate.isAfter(unavailableFrom, 'day')) &&
					unavailableTo &&
					(currentDate.isSame(unavailableTo, 'day') || currentDate.isBefore(unavailableTo, 'day'))
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
			label: 'Add Check-in Counter',
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
			setOpenCSVModal(true);
		} else {
		}
	};
	return (
		<>
			<SocketEventListener refetch={getCheckInRefetch} apiName={GET_CHECKIN_COUNTER} />
			{isFetchLoading || isEditLoading || isPostLoading ? (
				<PageLoader loading={true} />
			) : !Boolean(fetchCheckIn?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Check-in Counters'}
					formComponent={
						<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton} />
					}
					openModal={openModal}
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
							<TableComponent
								data={checkinData}
								columns={columns}
								loading={isFetching}
								fetchData={fetchNextPage}
								pagination={hasNextPage}
							/>
						</div>
					</div>
				</>
			)}

			<ModalComponent
				isModalOpen={isModalOpen}
				width="80%"
				closeModal={closeModal}
				title={'Add Check-in Counters'}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						initialValues={rowData}
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
					/>
				</div>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isEditModalOpen}
				width="80%"
				closeModal={closeEditModal}
				title={`${isReadOnly ? '' : 'Edit'} Check-in Counters`}
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
			<UploadCsvModal
				isModalOpen={openCSVModal}
				width="72rem"
				closeModal={() => setOpenCSVModal(false)}
				handleUpload={handleUpload}
			/>
		</>
	);
};

export default CheckIn;
