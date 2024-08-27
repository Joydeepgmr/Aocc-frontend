import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_BAGGAGE_BELT } from '../../../../../../api';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDownloadCSV } from '../../../../../../services/SeasonalPlanServices/seasonalPlan';
import { useDeleteBaggageBelt, useEditBaggageBelt, useGetBaggageBelt, usePostBaggageBelt, useUploadCSVBelt } from '../../../../../../services/planairportmaster/resources/baggagebelt/baggagebelt';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../../utils';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import './baggagebelt.scss';
import FormComponent from './formComponents/formComponents';


const BaggageBelt = () => {
	const queryClient = useQueryClient();
	const [baggageBeltData, setBaggageBeltData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [openCSVModal, setOpenCSVModal] = useState(false);
	const [form] = Form.useForm();
	const writeAccess = !!localStorage.getItem('masterAccess');

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



	//CREATE
	const handleAddBaggageBeltSuccess = (data) => {
		setBaggageBeltData([]);
		queryClient.invalidateQueries('get-baggage-belt');
		handleDetailModalClose();
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
		value.name = CapitaliseFirstLetter(value.name);
		value.reason = CapitaliseFirstLetter(value.reason);
		value && postBaggageBelt(value);
	}, []);

	//EDIT 
	const editBaggageBeltHandler = {
		onSuccess: (data) => handleEditBaggageBeltSuccess(data),
		onError: (error) => handleEditBaggageBeltError(error),
	};
	const uploadCsvHandler = {
		onSuccess: (data) => {
			toast.success('CSV Uploaded Successfully');
			queryClient.invalidateQueries('get-baggage-belt');
			setOpenCSVModal(false);
		},
		onError: (error) => toast.error(error?.response?.data?.message),
	};

	const { mutate: editBaggageBelt, isLoading: isEditLoading } = useEditBaggageBelt(editBaggageBeltHandler)
	const { mutate: onUploadCSV } = useUploadCSVBelt(uploadCsvHandler);
	const { refetch, isLoading: isDownloading } = useDownloadCSV('baggage-belt', { onError: (error) => toast.error(error?.response?.data?.message) });
	const handleEditBaggageBeltSuccess = (data) => {
		queryClient.invalidateQueries('get-baggage-belt');
		setBaggageBeltData([]);
		handleDetailModalClose();
		toast.success(data?.message);
	}

	const handleEditBaggageBeltError = (error) => {
		toast.error(error?.response?.data?.message)
	}


	const handleEditSave = (value) => {
		value.reason = CapitaliseFirstLetter(value.reason);
		value["id"] = detailModal?.record?.id;
		editBaggageBelt(value);
	};

	//DELETE
	const deleteBaggageBeltHandler = {
		onSuccess: (data) => handleDeleteBaggageBeltSuccess(data),
		onError: (error) => handleDeleteBaggageBeltError(error),
	};

	const handleDeleteBaggageBeltSuccess = (data) => {
		queryClient.invalidateQueries('get-baggage-belt');
		handleDeleteModalClose();
		toast.success(data?.message);
	}

	const handleDeleteBaggageBeltError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const { mutate: deleteBaggageBelt } = useDeleteBaggageBelt(deleteBaggageBeltHandler);
	const handleDelete = () => {
		deleteBaggageBelt(openDeleteModal?.record?.id);
	}

	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
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
			title: 'BELT',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
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
			handleDetailModalOpen();
		} else if (value === 'uploadCSV') {
			setOpenCSVModal(true);
		} else {
			handleDownloadCSV();
		}
	};
	return (
		<>
			<SocketEventListener refetch={getBaggageBeltRefetch} apiName={GET_BAGGAGE_BELT} />
			{isFetchLoading || isEditLoading || isPostLoading ? (
				<PageLoader loading={true} />
			) : !Boolean(fetchBaggageBelt?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Belts'}
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
					<div className="baggage_belt">
						{writeAccess &&
							<div className="baggage_belt--dropdown">
								<DropdownButton
									dropdownItems={dropdownItems}
									buttonText="Create"
									className="custom_dropdownButton"
									onChange={handleDropdownItemClick}
								/>
							</div>
						}
						<div className="baggage_belt--tableContainer">
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Baggage Belt
							</CustomTypography> */}
							<TableComponent data={baggageBeltData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
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
				title={`${detailModal?.isEdit ? "Edit" : !!detailModal?.record ? 'View' : 'Add'} Baggage Belt`}
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

export default BaggageBelt;
