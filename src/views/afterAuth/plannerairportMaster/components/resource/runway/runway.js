import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_RUNWAY } from '../../../../../../api';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../../assets/logo/edit.svg';
import Button from '../../../../../../components/button/button';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDeleteRunway, useEditRunway, useGetRunway, usePostRunway } from '../../../../../../services/planairportmaster/resources/runway/runway';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import './runway.scss';

const Runway = () => {

	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [runwayData, setRunwayData] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [form] = Form.useForm();

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
	const {
		data: fetchRunway,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getRunwayRefetch
	} = useGetRunway(getRunwayHandler);


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

	const handleSaveButton = useCallback((value) => {
		value && postRunway(value);
	}, []);

	const handleCloseButton = () => {
		setRowData({});
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		setIsReadOnly(false)
		form.resetFields();
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
			title: 'RWY',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (name) => name ?? '-',
		},
		{
			title: 'TYP',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (status) => status ?? '-',
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
			label: 'Add New Runway',
			value: 'addNewRunway',
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
		if (value === 'addNewRunway') {
			openModal();
		} else if (value === 'uploadCSV') {
			setOpenCSVModal(true);
		}
	};


	return (
		<>
			<SocketEventListener refetch={getRunwayRefetch} apiName={GET_RUNWAY} />
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchRunway?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Runway'}
					formComponent={
						<FormComponent
							handleSaveButton={handleSaveButton}
							handleButtonClose={handleCloseButton}
						/>
					}
					openModal={openModal}
					openCSVModal={()=> setOpenCSVModal(true)}
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
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Runway
							</CustomTypography> */}
							<TableComponent data={runwayData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}


			<ModalComponent
				isModalOpen={isModalOpen}
				width="80%"
				closeModal={closeModal}
				title={'Add Runway'}
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
				title={`${isReadOnly ? '' : 'Edit'} Runway`}
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

export default Runway;
