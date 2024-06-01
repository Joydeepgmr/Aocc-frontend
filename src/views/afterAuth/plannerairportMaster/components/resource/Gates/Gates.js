import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_GATE } from '../../../../../../api';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDownloadCSV } from '../../../../../../services/SeasonalPlanServices/seasonalPlan';
import {
	useDeleteGate,
	useEditGate,
	useGetGate,
	usePostGate,
	useUploadCSVGates,
} from '../../../../../../services/planairportmaster/resources/gates/gates';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../../utils';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import './Gates.scss';
import FormComponent from './formComponents/formComponents';

const Gates = () => {
	const queryClient = useQueryClient();
	const [gateData, setGateData] = useState([]);
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [form] = Form.useForm();

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
	const {
		data: fetchGates,
		isFetching,
		isLoading: isFetchLoading,
		fetchNextPage,
		hasNextPage,
		refetch: getGateRefetch
	} = useGetGate(getGateHandler);

	const { refetch, isLoading: isDownloading } = useDownloadCSV('airport-gate', { onError: (error) => handleGetGateError(error), });

	//DOWNLOAD
	const handleDownloadCSV = () => {
		refetch();
	};

	//CREATE
	const handleAddGateSuccess = (data) => {
		setGateData([]);
		handleDetailModalClose();
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
		value.name = CapitaliseFirstLetter(value.name);
		value.reasonIfUnavailable = CapitaliseFirstLetter(value.reasonIfUnavailable);
		value && postGate(value);
	}, []);

	//EDIT
	const editGateHandler = {
		onSuccess: (data) => handleEditGateSuccess(data),
		onError: (error) => handleEditGateError(error),
	};

	const handleEditGateSuccess = (data) => {
		setGateData([]);
		handleDetailModalClose();
		queryClient.invalidateQueries('get-gate');
		toast.success(data?.message);
	};

	const handleEditGateError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const { mutate: editGate, isLoading: isEditLoading } = useEditGate(detailModal?.record?.id, editGateHandler);
	const handleEditSave = (value) => {
		value.reasonIfUnavailable = CapitaliseFirstLetter(value.reasonIfUnavailable);
		editGate(value);
	};

	const deleteGateHandler = {
		onSuccess: (data) => handleDeleteGateSuccess(data),
		onError: (error) => handleDeleteGateError(error),
	};
	const uploadCsvHandler = {
		onSuccess: (data) => handleUploadCsvSuccess(data),
		onError: (error) => handleUploadCsvError(error),
	};

	const handleDeleteGateSuccess = (data) => {
		queryClient.invalidateQueries('get-gate');
		handleDeleteModalClose();
		toast.success(data?.message);
	};

	const handleDeleteGateError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleUploadCsvSuccess = () => {
		toast.success('CSV Uploaded Successfully');
		queryClient.invalidateQueries('get-gate');
		setOpenCSVModal(false);
	};

	const handleUploadCsvError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const { mutate: onUploadCSV } = useUploadCSVGates(uploadCsvHandler);
	const { mutate: deleteGate, isLoading: isDeleteLoading } = useDeleteGate(deleteGateHandler);
	const handleDelete = () => {
		deleteGate(openDeleteModal?.record?.id);
	};

	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			console.log(file, 'files data');
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
			};
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	}
	const columns = [
		{
			title: 'GAT',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer',color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		{
			title: 'AIRPORT',
			dataIndex: 'airport',
			key: 'airport',
			align: 'center',
			render: (airport) => airport?.name ?? '-',
		},
		{
			title: 'BUS GAT',
			dataIndex: 'busGate',
			key: 'busGate',
			align: 'center',
			render: (busGate) => (busGate ? 'Yes' : 'No'),
		},
		{
			title: 'TERM',
			dataIndex: 'terminal',
			key: 'terminal',
			align: 'center',
			render: (terminal) => terminal?.name ?? '-',
		},
		{
			title: 'GAT ID',
			dataIndex: 'gateId',
			key: 'gateId',
			align: 'center',
			render: (gateId) => gateId ?? '-',
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
			label: 'Add Gate',
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
			<SocketEventListener refetch={getGateRefetch} apiName={GET_GATE} />
			{isFetchLoading || isEditLoading || isPostLoading ? (
				<PageLoader loading={true} />
			) : !Boolean(fetchGates?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Gate'}
					formComponent={
						<FormComponent
							form={form}
							handleSaveButton={handleSaveButton}
							handleButtonClose={handleDetailModalClose}
						/>
					}
					openModal={()=>handleDetailModalOpen()}
					openCSVModal={() => setOpenCSVModal(true)}
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
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Gates
							</CustomTypography> */}
							<TableComponent data={gateData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}
			<ModalComponent
				isModalOpen={detailModal?.isOpen}
				width="80%"
				record={detailModal?.record}
				onEdit={!detailModal?.isEdit && handleDetailModalOpen}
				onDelete={handleDeleteModalOpen}
				closeModal={handleDetailModalClose}
				title={`${!detailModal?.isEdit ? 'Add' : 'Edit'} Gate`}
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

export default Gates;
