import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_PARKING_STAND } from '../../../../../../api';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDownloadCSV } from '../../../../../../services/SeasonalPlanServices/seasonalPlan';
import { useDeleteParkingStand, useEditParkingStand, useGetParkingStand, usePostParkingStand, useUploadCSVParkingStand } from '../../../../../../services/planairportmaster/resources/parkingstand/parkingstand';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../../utils';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import './parkingstand.scss';

const ParkingStand = () => {
	const queryClient = useQueryClient();
	const [parkingData, setparkingData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [form] = Form.useForm();
	const writeAccess = !!localStorage.getItem('masterAccess');
	const getParkingStandHandler = {
		onSuccess: (data) => handleGetParkingStandSuccess(data),
		onError: (error) => handleGetParkingStandError(error),
	};

	const handleGetParkingStandSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setparkingData([...newData]);
		}
	};

	const handleGetParkingStandError = (error) => {
		toast.error(error?.message);
	}
	const {
		data: fetchParking,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getParkingStandRefetch
	} = useGetParkingStand(getParkingStandHandler);

	//CREATE
	const handleAddParkingStandSuccess = (data) => {
		setparkingData([])
		handleDetailModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-parking-stand');
	}

	const handleAddParkingStandError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addParkingStandHandler = {
		onSuccess: (data) => handleAddParkingStandSuccess(data),
		onError: (error) => handleAddParkingStandError(error),
	};

	const { mutate: postParkingStand, isLoading: isPostLoading } = usePostParkingStand(addParkingStandHandler);
	const { refetch, isLoading: isDownloading } = useDownloadCSV('parking-stand', { onError: (error) => toast.error(error?.response?.data?.message) });

	const handleSaveButton = useCallback((value) => {
		value.name = CapitaliseFirstLetter(value.name);
		value.reason = CapitaliseFirstLetter(value.reason);
		value && postParkingStand(value);
	}, []);

	//EDIT 
	const editParkingStandHandler = {
		onSuccess: (data) => handleEditParkingStandSuccess(data),
		onError: (error) => handleEditParkingStandError(error),
	};

	const { mutate: editParkingStand, isLoading: isEditLoading } = useEditParkingStand(detailModal?.record?.id, editParkingStandHandler)

	const handleEditParkingStandSuccess = (data) => {
		handleDetailModalClose();
		setparkingData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-parking-stand');
	}

	const handleEditParkingStandError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEditSave = (value) => {
		value.reason = CapitaliseFirstLetter(value.reason);
		editParkingStand(value);
	};

	//DELETE
	const deleteParkingStandHandler = {
		onSuccess: (data) => handleDeleteParkingStandSuccess(data),
		onError: (error) => handleDeleteParkingStandError(error),
	};
	const uploadCsvHandler = {
		onSuccess: (data) => {
			toast.success('CSV Uploaded Successfully');
			queryClient.invalidateQueries('get-parking-stand');
			setOpenCSVModal(false);
		},
		onError: (error) => toast.error(error?.response?.data?.message),
	};

	const handleDeleteParkingStandSuccess = (data) => {
		queryClient.invalidateQueries('get-parking-stand');
		handleDeleteModalClose();
		toast.success(data?.message);
	}

	const handleDeleteParkingStandError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const { mutate: deleteParkingStand } = useDeleteParkingStand(deleteParkingStandHandler);
	const { mutate: onUploadCSV } = useUploadCSVParkingStand(uploadCsvHandler);
	const handleDelete = () => {
		deleteParkingStand(openDeleteModal?.record?.id);
	}

	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			console.log(file);
			onUploadCSV(formData);
		} else {
			console.error('No file provided for upload.');
		}
	};
	const handleDownloadCSV = () => {
		refetch();
	};

	const handleDetailModalOpen = (record, isEdit = false) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : "",
				validTill: record?.validTill ? dayjs(record?.validTill) : "",
				unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : "",
				unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : "",
			};
		}
		setDetailModal({ isOpen: true, record, isEdit });
	}
	const handleDetailModalClose = () => {
		setDetailModal({ isOpen: false, record: null });
		form.resetFields();
	}
	const handleDeleteModalOpen = (record) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : "",
				validTill: record?.validTill ? dayjs(record?.validTill) : "",
				unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : "",
				unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : "",
			};
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	}

	const columns = [
		{
			title: 'POS',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		// {
		// 	title: 'AIRPORT',
		// 	dataIndex: 'airport',
		// 	key: 'airport',
		// 	align: 'center',
		// 	render: (airport) => airport?.name ?? '-',
		// },
		{
			title: 'GAT',
			dataIndex: 'gate',
			key: 'gate',
			align: 'center',
			render: (gate) => gate?.name ?? '-',
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
	];

	const dropdownItems = [
		{
			label: 'Add Parking Stand',
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
			handleDetailModalOpen();
		} else if (value === 'uploadCSV') {
			setOpenCSVModal(true);
		} else {
			handleDownloadCSV();
		}
	};

	return (
		<>
			<SocketEventListener refetch={getParkingStandRefetch} apiName={GET_PARKING_STAND} />
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchParking?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Parking Stands'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleDetailModalClose}
					/>}
					openModal={() => handleDetailModalOpen()}
					openCSVModal={() => setOpenCSVModal(true)}
					writeAccess={writeAccess}
				/>
			) : (
				<>
					<div className="parking-stand">
						{writeAccess &&
							<div className="parking-stand--dropdown">
								<DropdownButton
									dropdownItems={dropdownItems}
									buttonText="Create"
									className="custom_dropdownButton"
									onChange={handleDropdownItemClick}
								/>
							</div>
						}
						<div className="parking-stand--tableContainer">
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Parking Stands
							</CustomTypography> */}
							<TableComponent data={parkingData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}

			{/* modals */}
			<ModalComponent
				isModalOpen={detailModal?.isOpen}
				width="80%"
				record={detailModal?.record}
				onEdit={(writeAccess && !detailModal?.isEdit) && handleDetailModalOpen}
				onDelete={writeAccess && handleDeleteModalOpen}
				closeModal={handleDetailModalClose}
				title={`${detailModal?.isEdit ? "Edit" : !!detailModal?.record ? 'View' : 'Add'}  Parking Stand`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={detailModal?.isEdit ? handleEditSave : handleSaveButton}
						handleButtonClose={handleDetailModalClose}
						isEdit={detailModal?.isEdit}
						initialValues={detailModal?.record}
						isReadOnly={detailModal?.record && !detailModal?.isEdit}
					/>
				</div>
			</ModalComponent>
			<ConfirmationModal
				isOpen={openDeleteModal?.isOpen}
				onClose={handleDeleteModalClose}
				onSave={handleDelete}
				content={`You want to delete ${openDeleteModal?.record?.name}?`}
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

export default ParkingStand;
