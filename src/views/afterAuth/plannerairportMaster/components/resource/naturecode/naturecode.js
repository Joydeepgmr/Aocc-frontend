import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_NATURE_CODE } from '../../../../../../api';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import { useDeleteNatureCode, useEditNatureCode, useGetNatureCode, usePostNatureCode } from '../../../../../../services/planairportmaster/resources/naturecode/naturecode';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import { CapitaliseFirstLetter } from '../../../../../../utils';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import './naturecode.scss';

const NatureCode = () => {
	const queryClient = useQueryClient();
	const [natureCodeData, setNatureCodeData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [form] = Form.useForm();

	const getNatureCodeHandler = {
		onSuccess: (data) => handleGetNatureCodeSuccess(data),
		onError: (error) => handleGetNatureCodeError(error),
	};

	const handleGetNatureCodeSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setNatureCodeData([...newData]);
		}
	};

	const handleGetNatureCodeError = (error) => {
		toast.error(error?.message);
	}
	const {
		data: fetchNatureCode,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getNatureCodeRefetch
	} = useGetNatureCode(getNatureCodeHandler);



	//CREATE
	const handleAddNatureCodeSuccess = (data) => {
		setNatureCodeData([])
		handleDetailModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-nature-code');
	}

	const handleAddNatureCodeError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addNatureCodeHandler = {
		onSuccess: (data) => handleAddNatureCodeSuccess(data),
		onError: (error) => handleAddNatureCodeError(error),
	};

	const { mutate: postNatureCode, isLoading: isPostLoading } = usePostNatureCode(addNatureCodeHandler);

	const handleSaveButton = useCallback((value) => {
		value.name = CapitaliseFirstLetter(value.name);
		value.natureCode = CapitaliseFirstLetter(value.natureCode);
		value && postNatureCode(value);
	}, []);

	//EDIT 
	const editNatureCodeHandler = {
		onSuccess: (data) => handleEditNatureCodeSuccess(data),
		onError: (error) => handleEditNatureCodeError(error),
	};

	const { mutate: editNatureCode, isLoading: isEditLoading } = useEditNatureCode(detailModal?.record?.id, editNatureCodeHandler)

	const handleEditNatureCodeSuccess = (data) => {
		handleDetailModalClose();
		setNatureCodeData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-nature-code');
	}

	const handleEditNatureCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEditSave = (value) => {
		value.name = CapitaliseFirstLetter(value.name);
		editNatureCode(value);
	};

	//DELETE
	const deleteNatureCodeHandler = {
		onSuccess: (data) => handleDeleteNatureCodeSuccess(data),
		onError: (error) => handleDeleteNatureCodeError(error),
	};

	const handleDeleteNatureCodeSuccess = (data) => {
		handleDeleteModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-nature-code');
	}

	const handleDeleteNatureCodeError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const { mutate: deleteNatureCode } = useDeleteNatureCode(deleteNatureCodeHandler);
	const handleDelete = () => {
		deleteNatureCode(openDeleteModal?.record?.id);
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
			title: 'NAT',
			dataIndex: 'natureCode',
			key: 'natureCode',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer',color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		{
			title: 'NAME',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (name) => name ?? '-',
		},
	];

	const dropdownItems = [
		{
			label: 'Add Nature Code',
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
			<SocketEventListener refetch={getNatureCodeRefetch} apiName={GET_NATURE_CODE} />
			{isFetchLoading || isEditLoading || isPostLoading ? (
				<PageLoader loading={true} />
			) : !Boolean(fetchNatureCode?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'NatureCode'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleDetailModalClose}
					/>}
					openModal={handleDetailModalOpen}
				/>
			) : (
				<>
					<div className="nature-code">
						<div className="nature-code--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="nature-code--tableContainer">
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Nature Code
							</CustomTypography> */}
							<TableComponent data={natureCodeData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
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
				content={`You want to delete ${openDeleteModal?.record?.natureCode}?`}
			/>
		</>
	);
};

export default NatureCode;
