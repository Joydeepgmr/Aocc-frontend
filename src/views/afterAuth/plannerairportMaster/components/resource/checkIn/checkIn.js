import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_CHECKIN_COUNTER } from '../../../../../../api';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDownloadCSV } from '../../../../../../services/SeasonalPlanServices/seasonalPlan';
import {
	useDeleteCheckin,
	useEditCheckin,
	useGetCheckIn,
	usePostCheckIn,
	useUploadCSVCheckIn,
} from '../../../../../../services/planairportmaster/resources/checkin/checkin';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../../utils';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import './checkIn.scss';
import FormComponent from './formComponents/formComponents';

const CheckIn = () => {
	const queryClient = useQueryClient();
	const [checkinData, setCheckinData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [form] = Form.useForm();
	const writeAccess = !!localStorage.getItem('masterAccess');

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

	//CREATE
	const handleAddCheckinSuccess = (data) => {
		setCheckinData([]);
		handleDetailModalClose();
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
		value.name = CapitaliseFirstLetter(value.name);
		value.reason = CapitaliseFirstLetter(value.reason);
		value.group = CapitaliseFirstLetter(value.group);
		value && postCheckIn(value);
	}, []);

	//EDIT
	const editCheckinHandler = {
		onSuccess: (data) => handleEditCheckinSuccess(data),
		onError: (error) => handleEditCheckinError(error),
	};

	const { mutate: editCheckin, isLoading: isEditLoading } = useEditCheckin(detailModal?.record?.id, editCheckinHandler);
	const { refetch, isLoading: isDownloading } = useDownloadCSV('check-in', { onError: (error) => toast.error(error?.response?.data?.message) });
	const handleEditCheckinSuccess = (data) => {
		queryClient.invalidateQueries('get-check-in');
		setCheckinData([]);
		handleDetailModalClose();
		toast.success(data?.message);
	};

	const handleEditCheckinError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleEditSave = (value) => {
		value.reason = CapitaliseFirstLetter(value?.reason);
		value.group = CapitaliseFirstLetter(value?.group);
		value.row && (value['row'] = value?.row.toString());
		editCheckin(value);
	};

	//DELETE
	const deleteCheckinHandler = {
		onSuccess: (data) => handleDeleteCheckinSuccess(data),
		onError: (error) => handleDeleteCheckinError(error),
	};
	const uploadCsvHandler = {
		onSuccess: (data) => {
			toast.success('CSV Uploaded Successfully');
			queryClient.invalidateQueries('get-check-in');
			setOpenCSVModal(false);
		},
		onError: (error) => toast.error(error?.response?.data?.message),
	};

	const handleDeleteCheckinSuccess = (data) => {
		queryClient.invalidateQueries('get-check-in');
		handleDeleteModalClose();
		toast.success(data?.message);
	};

	const handleDeleteCheckinError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const { mutate: onUploadCSV } = useUploadCSVCheckIn(uploadCsvHandler);
	const { mutate: deleteCheckin } = useDeleteCheckin(deleteCheckinHandler);
	const handleDelete = () => {
		deleteCheckin(openDeleteModal?.record?.id);
	};

	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			onUploadCSV(formData);
		} else {
			console.error('No file provided for upload.');
		}
	};
	const handleDetailModalOpen = (record, isEdit = false) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : '',
				validTill: record?.validTill ? dayjs(record?.validTill) : '',
				unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : '',
				unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : '',
				terminalId: record?.terminal?.id,
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
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : '',
				validTill: record?.validTill ? dayjs(record?.validTill) : '',
				unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : '',
				unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : '',
				terminalId: record?.terminal?.id,
			};
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	}
	const columns = [
		{
			title: 'CNTR',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
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

	//DOWNLOAD
	const handleDownloadCSV = () => {
		refetch();
	};

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
						<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleDetailModalClose} />
					}
					openModal={() => handleDetailModalOpen()}
					openCSVModal={() => setOpenCSVModal(true)}
					writeAccess={writeAccess}
				/>
			) : (
				<>
					<div className="check-in">
						{writeAccess &&
							<div className="check-in--dropdown">
								<DropdownButton
									dropdownItems={dropdownItems}
									buttonText="Create"
									className="custom_dropdownButton"
									onChange={handleDropdownItemClick}
								/>
							</div>
						}
						<div className="check-in--tableContainer">
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Check-in Counters
							</CustomTypography> */}
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
				isModalOpen={detailModal?.isOpen}
				width="80%"
				closeModal={handleDetailModalClose}
				onEdit={(!detailModal?.isEdit && writeAccess) && handleDetailModalOpen}
				onDelete={writeAccess && handleDeleteModalOpen}
				record={detailModal?.record}
				title={`${detailModal?.isEdit ? "Edit" : !!detailModal?.record ? 'View' : 'Add'}  Check-in Counters`}
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

export default CheckIn;
