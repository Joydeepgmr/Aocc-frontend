import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_BAGGAGE_BELT } from '../../../../../../api';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../../assets/logo/edit.svg';
import Button from '../../../../../../components/button/button';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDeleteBaggageBelt, useEditBaggageBelt, useGetBaggageBelt, usePostBaggageBelt } from '../../../../../../services/planairportmaster/resources/baggagebelt/baggagebelt';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import './baggagebelt.scss';
import FormComponent from './formComponents/formComponents';


const BaggageBelt = () => {
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [baggageBeltData, setBaggageBeltData] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [form] = Form.useForm();

	const getBaggageBeltHandler = {
		onSuccess: (data) => handleGetBaggageBeltSuccess(data),
		onError: (error) => handleGetBaggageBeltError(error),
	};

	const handleGetBaggageBeltSuccess = (data) => {
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
	const {
		data: fetchBaggageBelt,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getBaggageBeltRefetch
	} = useGetBaggageBelt(getBaggageBeltHandler);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		form.resetFields();
		setRowData({});
		setIsModalOpen(false);
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setRowData({});
		setIsEditModalOpen(false);
		form.resetFields();
		setIsReadOnly(false);
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

	const handleSaveButton = useCallback((value) => {
		value["name"] = value?.name.toString();
		value['phoneNumber'] = value?.phoneNumber?.toString();
		if (!value.phoneNumber) {
			delete value.phoneNumber;
		}
		value && postBaggageBelt(value);
	}, []);


	const handleCloseButton = () => {
		setRowData({});
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		setIsReadOnly(false);
		form.resetFields();
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

	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			console.log(file, 'files data');
			setOpenCSVModal(false);
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
			title: 'BELT',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (name) => name ?? '-',
		},
		{
			title: 'TERM',
			dataIndex: 'terminal',
			key: 'terminal',
			align: 'center',
			render: (terminal) => terminal?.name ?? '-',
		},
		{
			title: 'REASON',
			dataIndex: 'reason',
			key: 'reason',
			align: 'center',
			render: (reason) => reason ?? '-',
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
						type="text"
					/>
				</>
			),
		},
	];

	const dropdownItems = [
		{
			label: 'Add Baggage Belt',
			value: 'addNewBaggageBelt',
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
		if (value === 'addNewBaggageBelt') {
			openModal();
		} else if (value === 'uploadCSV') {
			setOpenCSVModal(true);
		}
	};
	return (
		<>
			<SocketEventListener refetch={getBaggageBeltRefetch} apiName={GET_BAGGAGE_BELT} />
			{isFetchLoading || isEditLoading || isPostLoading ? (
			<PageLoader loading={true} />
			): !Boolean(fetchBaggageBelt?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Belts'}
					formComponent={
						<FormComponent
							form={form}
							handleSaveButton={handleSaveButton}
							handleButtonClose={handleCloseButton}
						/>
					}
					openModal={openModal}
					openCSVModal={()=> setOpenCSVModal(true)}
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
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Baggage Belt
							</CustomTypography> */}
							<TableComponent data={baggageBeltData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}

			<ModalComponent
				isModalOpen={isModalOpen}
				width="80%"
				closeModal={closeModal}
				title={'Add Baggage Belt'}
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
				title={`${isReadOnly ? '' : 'Edit'} Baggage Belt`}
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

export default BaggageBelt;
