import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_DELAY_CODE } from '../../../../../../api';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import { useDeleteDelayCode, useEditDelayCode, useGetDelayCode, usePostDelayCode } from '../../../../../../services/planairportmaster/resources/delaycode/delaycode';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../../utils';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import './delaycode.scss';
import FormComponent from './formComponents/formComponents';

const DelayCode = () => {
	const queryClient = useQueryClient();
	const [delayCodeData, setDelayCodeData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [form] = Form.useForm();

	const getDelayCodeHandler = {
		onSuccess: (data) => handleGetDelayCodeSuccess(data),
		onError: (error) => handleGetDelayCodeError(error),
	};

	const handleGetDelayCodeSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setDelayCodeData([...newData]);
		}
	};

	const handleGetDelayCodeError = (error) => {
		toast.error(error?.message);
	}
	const {
		data: fetchDelayCode,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getDelayCodeRefetch
	} = useGetDelayCode(getDelayCodeHandler);

	//CREATE
	const handleAddDelayCodeSuccess = (data) => {
		setDelayCodeData([])
		handleDetailModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-delay-code');
	}

	const handleAddDelayCodeError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addDelayCodeHandler = {
		onSuccess: (data) => handleAddDelayCodeSuccess(data),
		onError: (error) => handleAddDelayCodeError(error),
	};

	const { mutate: postDelayCode, isLoading: isPostLoading } = usePostDelayCode(addDelayCodeHandler);

	const handleSaveButton = useCallback((value) => {
		value.delayCode = CapitaliseFirstLetter(value.delayCode);
		value.group = CapitaliseFirstLetter(value.group);
		value && postDelayCode(value);
	}, []);


	//EDIT 
	const editDelayCodeHandler = {
		onSuccess: (data) => handleEditDelayCodeSuccess(data),
		onError: (error) => handleEditDelayCodeError(error),
	};

	const { mutate: editDelayCode, isLoading: isEditLoading } = useEditDelayCode(detailModal?.record?.id, editDelayCodeHandler)

	const handleEditDelayCodeSuccess = (data) => {
		handleDetailModalClose();
		setDelayCodeData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-delay-code');
	}

	const handleEditDelayCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEditSave = (value) => {
		value.group = CapitaliseFirstLetter(value.group);
		editDelayCode(value);
	};

	//DELETE
	const deleteDelayCodeHandler = {
		onSuccess: (data) => handleDeleteDelayCodeSuccess(data),
		onError: (error) => handleDeleteDelayCodeError(error),
	};

	const handleDeleteDelayCodeSuccess = (data) => {
		handleDeleteModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-delay-code');
	}

	const handleDeleteDelayCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const { mutate: deleteDelayCode } = useDeleteDelayCode(deleteDelayCodeHandler);
	const handleDelete = () => {
		deleteDelayCode(openDeleteModal?.record?.id);
	}

	const handleDetailModalOpen = (record, isEdit = false) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : "",
				validTill: record?.validTill ? dayjs(record?.validTill) : "",
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
			};
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	}
	const columns = [
		{
			title: 'DEL',
			dataIndex: 'delayCode',
			key: 'delayCode',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer',color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		{
			title: 'GRP',
			dataIndex: 'group',
			key: 'group',
			align: 'center',
			render: (group) => group ?? '-',
		},
		{
			title: 'AL',
			dataIndex: 'airline',
			key: 'airline',
			align: 'center',
			render: (airline) => airline?.name ?? '-',
		}
	];

	const dropdownItems = [
		{
			label: 'Add Delay Code',
			value: 'create',
			key: '0',
		},
	];

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			handleDetailModalOpen();
		}
	};

	return (
		<>
			<SocketEventListener refetch={getDelayCodeRefetch} apiName={GET_DELAY_CODE} />
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchDelayCode?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'DelayCode'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleDetailModalClose}
					/>}
					openModal={()=>handleDetailModalOpen()}
				/>
			) : (
				<>
					<div className="delay-code">
						<div className="delay-code--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="delay-code--tableContainer">
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Delay Code
							</CustomTypography> */}
							<TableComponent data={delayCodeData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
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
				content={`You want to delete ${openDeleteModal?.record?.delayCode}?`}
			/>
		</>
	);
};

export default DelayCode;
