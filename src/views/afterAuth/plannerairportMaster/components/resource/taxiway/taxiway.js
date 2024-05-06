import React, { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { Form } from 'antd';
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
import { useEditTaxiway, useGetTaxiway, usePostTaxiway, useDeleteTaxiway } from '../../../../../../services/planairportmaster/resources/taxiway/taxiway';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { GET_TAXIWAY } from '../../../../../../api';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import './taxiway.scss';

const Taxiway = () => {

	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [taxiwayData, setTaxiwayData] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [form] = Form.useForm();

	const getTaxiwayHandler = {
		onSuccess: (data) => handleGetTaxiwaySuccess(data),
		onError: (error) => handleGetTaxiwayError(error),
	};

	const handleGetTaxiwaySuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setTaxiwayData([...newData]);
		}
	};

	const handleGetTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message);
	}
	const {
		data: fetchTaxiway,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getTaxiwayRefetch
	} = useGetTaxiway(getTaxiwayHandler);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setRowData({});
		form.resetFields();
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
		form.resetFields();
	};

	const closeEditModal = () => {
		setRowData({});
		setIsEditModalOpen(false);
		setIsReadOnly(false);
		form.resetFields();
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
	const handleAddTaxiwaySuccess = (data) => {
		setTaxiwayData([]);
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-taxiway');
	}

	const handleAddTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addTaxiwayHandler = {
		onSuccess: (data) => handleAddTaxiwaySuccess(data),
		onError: (error) => handleAddTaxiwayError(error),
	};

	const { mutate: postTaxiway, isLoading: isPostLoading } = usePostTaxiway(addTaxiwayHandler);

	const handleSaveButton = useCallback((value) => {
		value && postTaxiway(value);
	}, []);

	const handleCloseButton = () => {
		setRowData({});
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		setIsReadOnly(false)
		form.resetFields();
	};

	//EDIT 
	const editTaxiwayHandler = {
		onSuccess: (data) => handleEditTaxiwaySuccess(data),
		onError: (error) => handleEditTaxiwayError(error),
	};

	const { mutate: editTaxiway, isLoading: isEditLoading } = useEditTaxiway(editTaxiwayHandler)

	const handleEditTaxiwaySuccess = (data) => {
		setTaxiwayData([]);
		closeEditModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-taxiway');
	}

	const handleEditTaxiwayError = (error) => {
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
		editTaxiway(value);
	};

	//DELETE
	const deleteTaxiwayHandler = {
		onSuccess: (data) => handleDeleteTaxiwaySuccess(data),
		onError: (error) => handleDeleteTaxiwayError(error),
	};

	const handleDeleteTaxiwaySuccess = (data) => {
		queryClient.invalidateQueries('get-taxiway');
		closeDeleteModal();
		toast.success(data?.message);
	}

	const handleDeleteTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const { mutate: deleteTaxiway } = useDeleteTaxiway(deleteTaxiwayHandler);
	const handleDelete = () => {
		deleteTaxiway(rowData.id);
	}

	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			console.log(file);
			setOpenCSVModal(false);
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
						type="iconWithBorderEdit"
						icon={editIcon}
						className="custom_icon_buttons"
					/>
					<Button
						onClick={() => openDeleteModal(record)}
						type="iconWithBorderDelete"
						icon={deleteIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
		{
			title: 'TWY',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (name) => name ?? '-',
		},
		{
			title: 'RWY',
			dataIndex: 'runway',
			key: 'runway',
			align: 'center',
			render: (runway) => runway?.name ?? '-',
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
						type="text" />
				</>
			),
		},
	];

	const dropdownItems = [
		{
			label: 'Add Taxiway',
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
		}
	};


	return (
		<>
			<SocketEventListener refetch={getTaxiwayRefetch} apiName={GET_TAXIWAY} />
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchTaxiway?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Taxiway '}
					formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton} />}
					openModal={openModal}
					openCSVModal={()=> setOpenCSVModal(true)}
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
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Taxiway
							</CustomTypography> */}
							<TableComponent data={taxiwayData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}



			<ModalComponent
				isModalOpen={isModalOpen}
				width="80%"
				closeModal={closeModal}
				title={'Add Taxiway'}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
					/>
				</div>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isEditModalOpen}
				width="80%"
				closeModal={closeEditModal}
				title={`${isReadOnly ? '' : 'Edit'} Taxiway`}
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

export default Taxiway;
