import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_PLANNER_AIRLINE } from '../../../../../api';
import Delete from '../../../../../assets/Delete.svg';
import Edit from '../../../../../assets/Edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import {
	useDeletePlannerAirline,
	useGetAllPlannerAirline,
	usePostPlannerAirline,
	useUpdatePlannerAirline,
	useUploadCSVPlannerAirline,
} from '../../../../../services';
import { useDownloadCSV } from '../../../../../services/SeasonalPlanServices/seasonalPlan';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../utils';
import ConvertIstToUtc from '../../../../../utils/ConvertIstToUtc';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import Common_table from '../../common_wrapper/common_table/common_table';
import FormComponent from './formComponent/formComponent';

const Airlines = () => {
	const queryClient = useQueryClient();
	const [airlineData, setAirlineData] = useState([]);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [form] = Form.useForm();

	const getAirlineHandler = {
		onSuccess: (data) => handleGetAirlineSuccess(data),
		onError: (error) => handleGetAirlineError(error),
	};

	const deleteAirlineHandler = {
		onSuccess: (data) => handleDeleteAirlineSuccess(data),
		onError: (error) => handleDeleteAirlineError(error),
	};

	const addAirlineHandler = {
		onSuccess: (data) => handleAddAirlineSuccess(data),
		onError: (error) => handleAddAirlineError(error),
	};
	const editAirlineHandler = {
		onSuccess: (data) => handleEditAirlineSuccess(data),
		onError: (error) => handleEditAirlineError(error),
	};

	const uploadCsvHandler = {
		onSuccess: (data) => handleUploadCsvSuccess(data),
		onError: (error) => handleUploadCsvError(error),
	};

	const handleGetAirlineSuccess = (data) => {
		if (data?.pages) {
			const newData = data?.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setAirlineData([...newData]);
		}
	};

	const handleGetAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleDeleteAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		handleDeleteModalClose();
	};

	const handleDeleteAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleAddAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		handleDetailModalClose();
		setFileList([]);
	};

	const handleAddAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleEditAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		handleDetailModalClose();
	};

	const handleEditAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleUploadCsvSuccess = () => {
		toast.success('CSV Uploaded Successfully');
		queryClient.invalidateQueries('get-all-planner-airline');
		setIsCsvModalOpen(false);
	};

	const handleUploadCsvError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const {
		data: fetchedPlannerAirline,
		isLoading: isPlannerAirlineLoading,
		isFetching: isPlannerAirlineFetching,
		hasNextPage,
		fetchNextPage,
		refetch: getPlannerAirlineRefetch
	} = useGetAllPlannerAirline(getAirlineHandler);

	const { mutate: onDeleteAirline, isLoading: isDeleteAirlineLoading } =
		useDeletePlannerAirline(deleteAirlineHandler);

	const { mutate: onAddAirline, isLoading: isAddAirlineLoading } = usePostPlannerAirline(addAirlineHandler);
	const { mutate: onUpdateAirline, isLoading: isUpdateAirlineLoading } = useUpdatePlannerAirline(
		detailModal?.record?.id,
		editAirlineHandler
	);

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);

	const { mutate: onUploadCSV } = useUploadCSVPlannerAirline(uploadCsvHandler);

	const { refetch, isLoading: isDownloading } = useDownloadCSV('global-airline', { onError });

	//DOWNLOAD
	const handleDownloadCSV = () => {
		refetch();
	};

	const handleDeleteAirline = () => {
		onDeleteAirline(openDeleteModal?.record?.id);
	};

	const handleAddAirline = (value) => {
		const data = {
			...value,
			terminal: value?.terminal ? CapitaliseFirstLetter(value.terminal) : undefined,
			remark: value?.remark ? CapitaliseFirstLetter(value.remark) : undefined,
			address: value?.address ? CapitaliseFirstLetter(value.address) : undefined,
			twoLetterCode: value.twoLetterCode.join(''),
			threeLetterCode: value.threeLetterCode.join(''),
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
			validFrom: value?.validFrom ? ConvertIstToUtc(value?.validFrom) : undefined,
		};
		onAddAirline(data);
	};

	const handleUpdateAirline = (value) => {
		const data = {
			name: value?.name,
			country: value?.country,
			terminal: value?.terminal ? CapitaliseFirstLetter(value.terminal) : undefined,
			remark: value?.remark ? CapitaliseFirstLetter(value.remark) : undefined,
			address: value?.address ? CapitaliseFirstLetter(value.address) : undefined,
			airlineType: value?.airlineType,
			paymentMode: value?.paymentMode,
			phoneNumber: value?.phoneNumber,
			validTill: value?.validTill ? ConvertIstToUtc(value?.validTill) : undefined,
		};
		onUpdateAirline(data);
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
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
			}
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
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
			}
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	};

	const columns = [
		{
			title: 'AL',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
			align: 'center',
		},
		{
			title: '2L',
			dataIndex: 'twoLetterCode',
			key: 'twoLetterCode',
			render: (twoLetterCode) => twoLetterCode ?? '-',
			align: 'center',
		},
		{
			title: '3L',
			dataIndex: 'threeLetterCode',
			key: 'threeLetterCode',
			render: (threeLetterCode) => threeLetterCode ?? '-',
			align: 'center',
		},
		{
			title: 'TYPE',
			dataIndex: 'airlineType',
			key: 'airlineType',
			render: (airlineType) => <div style={{ textTransform: 'capitalize' }}>{airlineType?.length ? airlineType.join(', ') : '-'}</div>,
			align: 'center',
		},
		{
			title: 'CNTRY',
			dataIndex: 'country',
			key: 'country',
			render: (country) => country ?? '-',
			align: 'center',
		},
		{
			title: 'MODE OF PAYMENT',
			dataIndex: 'paymentMode',
			key: 'paymentMode',
			render: (text) => text ?? '-',
			align: 'center',
		},
		{
			title: 'HOPO',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.name ?? '-',
			align: 'center',
		},
	];

	return (
		<>
			<SocketEventListener refetch={getPlannerAirlineRefetch} apiName={`${GET_PLANNER_AIRLINE}`} />
			{isPlannerAirlineLoading || isAddAirlineLoading || isDeleteAirlineLoading || isUpdateAirlineLoading || isPlannerAirlineFetching ? <PageLoader loading={true} /> : Boolean(airlineData?.length) ? (
				<Common_table
					data={airlineData}
					columns={columns}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isPlannerAirlineLoading || isPlannerAirlineFetching}
					title={'Airlines'}
					openModal={() => handleDetailModalOpen()}
					openCSVModal={() => setIsCsvModalOpen(true)}
					type="airline"
					downloadCSV={handleDownloadCSV}
					title1="New Airline"
				/>
			) : (
				<Common_Card
					title1="New Airline"
					title2={'Upload CSV'}
					title3="Download CSV Template"
					btnCondition={false}
					openModal={() => handleDetailModalOpen()}
					openCSVModal={() => setIsCsvModalOpen(true)}
					downloadCSV={handleDownloadCSV}
					loading={isPlannerAirlineLoading || isPlannerAirlineFetching}
				/>
			)}

			<ConfirmationModal
				isOpen={openDeleteModal?.isOpen}
				onClose={handleDeleteModalClose}
				onSave={handleDeleteAirline}
				isLoading={isDeleteAirlineLoading}
				content={`You want to delete this ${openDeleteModal?.record?.name} record`}
			/>
			<ModalComponent
				isModalOpen={detailModal?.isOpen}
				closeModal={handleDetailModalClose}
				title={detailModal?.isEdit ? "Edit your airline" : 'Add Your airline'}
				record={detailModal?.record}
				onEdit={!detailModal?.isEdit && handleDetailModalOpen}
				onDelete={handleDeleteModalOpen}
				width="80vw"
				className="custom_modal"
			>
				<FormComponent
					form={form}
					type={detailModal?.isEdit && 'edit'}
					closeModal={handleDetailModalClose}
					initialValue={detailModal?.record}
					isReadOnly={detailModal?.record && !detailModal?.isEdit}
					isLoading={detailModal?.isEdit ? isUpdateAirlineLoading : isAddAirlineLoading}
					handleSubmit={detailModal?.isEdit ? handleUpdateAirline : handleAddAirline}
					fileList={fileList}
					setFileList={setFileList}
				/>
			</ModalComponent>
			<UploadCsvModal
				isModalOpen={isCsvModalOpen}
				width="72rem"
				closeModal={() => setIsCsvModalOpen(false)}
				handleUpload={handleUpload}
			/>
		</>
	);
};

export default React.memo(Airlines);
