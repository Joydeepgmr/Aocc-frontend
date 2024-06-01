import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_RUNWAY } from '../../../../../../api';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDownloadCSV } from '../../../../../../services/SeasonalPlanServices/seasonalPlan';
import { useDeleteRunway, useEditRunway, useGetRunway, usePostRunway, useUploadCSVRunway } from '../../../../../../services/planairportmaster/resources/runway/runway';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../../utils';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import './runway.scss';

const Runway = () => {

	const queryClient = useQueryClient();
	const [runwayData, setRunwayData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
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

	//CREATE
	const handleAddRunwaySuccess = (data) => {
		setRunwayData([]);
		handleDetailModalClose();
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
		value.name = CapitaliseFirstLetter(value.name);
		value.reason = CapitaliseFirstLetter(value.reason);
		value && postRunway(value);
	}, []);

	//EDIT 
	const editRunwayHandler = {
		onSuccess: (data) => handleEditRunwaySuccess(data),
		onError: (error) => handleEditRunwayError(error),
	};

	const { mutate: editRunway, isLoading: isEditLoading } = useEditRunway(detailModal?.record?.id, editRunwayHandler)
	const { refetch, isLoading: isDownloading } = useDownloadCSV('runway', { onError: (error) => toast.error(error?.response?.data?.message) });
	const handleEditRunwaySuccess = (data) => {
		handleDetailModalClose();
		setRunwayData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-runway');
	}

	const handleEditRunwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEditSave = (value) => {
		value.reason = CapitaliseFirstLetter(value.reason);
		value && editRunway(value);
	};

	//DELETE
	const deleteRunwayHandler = {
		onSuccess: (data) => handleDeleteRunwaySuccess(data),
		onError: (error) => handleDeleteRunwayError(error),
	};
	const uploadCsvHandler = {
		onSuccess: (data) => {
			toast.success('CSV Uploaded Successfully');
			queryClient.invalidateQueries('get-runway');
			setOpenCSVModal(false);
		},
		onError: (error) => toast.error(error?.response?.data?.message),
	};

	const handleDeleteRunwaySuccess = (data) => {
		queryClient.invalidateQueries('get-runway');
		handleDeleteModalClose();
		toast.success(data?.message);
	}

	const handleDeleteRunwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const { mutate: deleteRunway } = useDeleteRunway(deleteRunwayHandler);
	const { mutate: onUploadCSV } = useUploadCSVRunway(uploadCsvHandler);
	const handleDelete = () => {
		deleteRunway(openDeleteModal?.record?.id);
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

	//DOWNLOAD
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
				runway: record?.runway?.id,
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
				runway: record?.runway?.id,
			};
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	}
	const columns = [
		{
			title: 'RWY',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer',color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		{
			title: 'TYP',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (status) => <div style={{ textTransform: 'capitalize' }}>{status ?? '-'}</div>,
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
			handleDetailModalOpen();
		} else if (value === 'uploadCSV') {
			setOpenCSVModal(true);
		} else {
			handleDownloadCSV();
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
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleDetailModalClose}
					/>}
					openModal={()=>handleDetailModalOpen()}
					openCSVModal={() => setOpenCSVModal(true)}
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


			{/* modals */}
			<ModalComponent
				isModalOpen={detailModal?.isOpen}
				width="80%"
				record={detailModal?.record}
				onEdit={!detailModal?.isEdit && handleDetailModalOpen}
				onDelete={handleDeleteModalOpen}
				closeModal={handleDetailModalClose}
				title={`${!detailModal?.isEdit ? 'Add' : 'Edit'} Parking Stand`}
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

export default Runway;
