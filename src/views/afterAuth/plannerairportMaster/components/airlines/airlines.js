import React, { useEffect, useState } from 'react';
import Common_table from '../../common_wrapper/common_table/common_table';
import Common_Card from '../../common_wrapper/common_card.js/common_card';
import { Form } from 'antd';
import {
	useDeletePlannerAirline,
	useGetAllPlannerAirline,
	usePostPlannerAirline,
	useUpdatePlannerAirline,
	useUploadCSVPlannerAirline,
} from '../../../../../services';
import ButtonComponent from '../../../../../components/button/button';
import Delete from '../../../../../assets/Delete.svg';
import Edit from '../../../../../assets/Edit.svg';
import FormComponent from './formComponent/formComponent';
import { useQueryClient } from 'react-query';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import ConvertIstToUtc from '../../../../../utils/ConvertIstToUtc';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDownloadCSV } from '../../../../../services/SeasonalPlanServices/seasonalPlan';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { GET_PLANNER_AIRLINE } from '../../../../../api';

const Airlines = () => {
	const queryClient = useQueryClient();
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [airlineData, setAirlineData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [rowData, setRowData] = useState({});
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [isUploadDisable, setIsUploadDisable] = useState(true);
	const [fileList, setFileList] = useState([]);
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
		setRowData({});
		setOpenDeleteModal(false);
	};

	const handleDeleteAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const handleAddAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		form.resetFields();
		setRowData({});
		setIsAddModalOpen(false);
		setFileList([]);
		setIsUploadDisable(true);
	};

	const handleAddAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const handleEditAirlineSuccess = (data) => {
		queryClient.invalidateQueries('get-all-planner-airline');
		toast.success(data?.message);
		setRowData({});
		setOpenEditModal(false);
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
		rowData?.id,
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
		onDeleteAirline(rowData?.id);
	};

	const handleAddAirline = (value) => {
		const data = {
			...value,
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
			remark: value?.remark,
			terminal: value?.terminal,
			airlineType: value?.airlineType,
			paymentMode: value?.paymentMode,
			address: value?.address,
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

	const columns = [
		{
			title: 'Actions',
			dataIndex: 'edit',
			key: 'edit',
			render: (text, record) => (
				<div className="custom-button">
					<ButtonComponent
						type={'iconWithBorder'}
						icon={Edit}
						onClick={() => {
							setOpenEditModal(true);
							setRowData({
								...record,
								validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
								validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
							});
						}}
						id="edit_button"
					></ButtonComponent>
					<ButtonComponent
						type={'iconWithBorder'}
						icon={Delete}
						onClick={() => {
							setOpenDeleteModal(true);
							setRowData({
								...record,
								validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
								validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
							});
						}}
						id="delete_button"
					></ButtonComponent>
				</div>
			),
		},
		{
			title: 'AL',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
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
		// {
		// 	title: '3L',
		// 	dataIndex: 'homeAirport',
		// 	key: 'homeAirport',
		// 	render: (homeAirport) => homeAirport?.iataCode ?? '-',
		// 	align: 'center',
		// },
		// {
		// 	title: '4L',
		// 	dataIndex: 'homeAirport',
		// 	key: 'homeAirport',
		// 	render: (homeAirport) => homeAirport?.icaoCode ?? '-',
		// 	align: 'center',
		// },
		{
			title: 'CNTRY',
			dataIndex: 'country',
			key: 'country',
			render: (country) => country ?? '-',
			align: 'center',
		},
		{
			title: 'HOPO',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.name ?? '-',
			align: 'center',
		},
		{
			title: 'View Details',
			dataIndex: 'viewdetails',
			key: 'viewdetails',
			render: (text, record) => (
				<ButtonComponent
					onClick={() => {
						setDetailModal(true);
						setRowData({
							...record,
							validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
							validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
						});
					}}
					title="View Details"
					type="text"
					style={{ margin: 'auto' }}
				/>
			),
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
					openModal={() => setIsAddModalOpen(true)}
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
					openModal={() => setIsAddModalOpen(true)}
					openCSVModal={() => setIsCsvModalOpen(true)}
					downloadCSV={handleDownloadCSV}
					loading={isPlannerAirlineLoading || isPlannerAirlineFetching}
				/>
			)}

			<ConfirmationModal
				isOpen={openDeleteModal}
				onClose={() => {
					setOpenDeleteModal(false);
					form.resetFields();
					setRowData({});
				}}
				onSave={handleDeleteAirline}
				isLoading={isDeleteAirlineLoading}
				content={`You want to delete this ${rowData?.name} record`}
			/>
			<ModalComponent
				isModalOpen={openEditModal}
				closeModal={() => {
					setOpenEditModal(false);
					form.resetFields();
					setRowData({});
				}}
				title="Edit your airline"
				width="80vw"
				className="custom_modal"
			>
				<FormComponent
					form={form}
					type={'edit'}
					closeModal={() => {
						setOpenEditModal(false);
						form.resetFields();
						setRowData({});
					}}
					initialValue={rowData}
					isLoading={isUpdateAirlineLoading}
					handleSubmit={handleUpdateAirline}
				/>
			</ModalComponent>
			<ModalComponent
				isModalOpen={detailModal}
				closeModal={() => {
					setDetailModal(false);
					form.resetFields();
					setRowData({});
				}}
				title="Airline"
				width="80vw"
				className="custom_modal"
			>
				<FormComponent
					form={form}
					isReadOnly={true}
					closeModal={() => {
						setOpenEditModal(false);
						form.resetFields();
						setRowData({});
					}}
					initialValue={rowData}
				/>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isAddModalOpen}
				closeModal={() => {
					setFileList([])
					setIsUploadDisable(true)
					setIsAddModalOpen(false);
					setRowData({});
					form.resetFields();
				}}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Setup your airline
					</CustomTypography>
				}
				className="custom_modal"
			>
				<div className={`modal_content`}>
					<FormComponent
						form={form}
						isLoading={isAddAirlineLoading}
						closeModal={() => {
							setIsAddModalOpen(false);
							setRowData({});
							form.resetFields();
						}}
						handleSubmit={handleAddAirline}
						fileList={fileList}
						setFileList={setFileList}
						isUploadDisable={isUploadDisable}
						setIsUploadDisable={setIsUploadDisable}
					/>
				</div>
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
