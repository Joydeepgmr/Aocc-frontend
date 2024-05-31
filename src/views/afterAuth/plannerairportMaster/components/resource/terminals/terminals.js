import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_TERMINAL } from '../../../../../../api';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../../assets/logo/edit.svg';
import Button from '../../../../../../components/button/button';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import UploadCsvModal from '../../../../../../components/uploadCsvModal/uploadCsvModal';
import { useDeleteTerminal, useEditTerminal, useGetTerminal, usePostTerminal } from '../../../../../../services/planairportmaster/resources/terminal/terminal';
import SocketEventListener from '../../../../../../socket/listner/socketListner';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import './terminals.scss';
import CapitaliseFirstLetter from '../../../../../../utils/CapitaliseFirstLetter';


const Terminal = () => {
	const queryClient = useQueryClient();
	const [terminalData, setTerminalData] = useState([]);
	const [openDeleteModal, setOpenDeleteModal] = useState({ isOpen: false, record: null });
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [form] = Form.useForm();
	const getTerminalHandler = {
		onSuccess: (data) => handleGetTerminalSuccess(data),
		onError: (error) => handleGetTerminalError(error),
	};

	const handleGetTerminalSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setTerminalData([...newData]);
		}
	};

	const handleGetTerminalError = (error) => {
		toast.error(error?.message);
	}
	const {
		data: fetchTerminal,
		isFetching,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getTerminalRefetch
	} = useGetTerminal(getTerminalHandler);

	//CREATE
	const handleAddTerminalSuccess = (data) => {
		setTerminalData([])
		handleDetailModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-terminal');
	}

	const handleAddTerminalError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addTerminalHandler = {
		onSuccess: (data) => handleAddTerminalSuccess(data),
		onError: (error) => handleAddTerminalError(error),
	};

	const { mutate: postTerminal, isLoading: isPostLoading } = usePostTerminal(addTerminalHandler);

	const handleSaveButton = useCallback((value) => {
		value.name = CapitaliseFirstLetter(value.name);
		value && postTerminal(value);
	}, [postTerminal]);

	//EDIT 
	const editTerminalHandler = {
		onSuccess: (data) => handleEditTerminalSuccess(data),
		onError: (error) => handleEditTerminalError(error),
	};

	const { mutate: editTerminal, isLoading: isEditLoading } = useEditTerminal(detailModal?.record?.id, editTerminalHandler)

	const handleEditTerminalSuccess = (data) => {
		handleDetailModalClose();
		setTerminalData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-terminal');
	}

	const handleEditTerminalError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEditSave = (value) => {
		editTerminal(value);
	};

	//DELETE
	const deleteTerminalHandler = {
		onSuccess: (data) => handleDeleteTerminalSuccess(data),
		onError: (error) => handleDeleteTerminalError(error),
	};

	const handleDeleteTerminalSuccess = (data) => {
		handleDeleteModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-terminal');
	}

	const handleDeleteTerminalError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const { mutate: deleteTerminal } = useDeleteTerminal(deleteTerminalHandler);
	const handleDelete = () => {
		deleteTerminal(openDeleteModal?.record?.id);
	}

	const handleDetailModalOpen = (record, isEdit = false) => {
		if (record) {
			record = {
				...record,
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
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
				validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
				validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
			};
		}
		setOpenDeleteModal({ isOpen: true, record });
	}
	const handleDeleteModalClose = () => {
		setOpenDeleteModal({ isOpen: false, record: null });
	}

	const columns = [
		{
			title: 'TERM',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		{
			title: 'POS',
			dataIndex: 'parkingStand',
			key: 'parkingStand',
			align: 'center',
			render: (stand) => stand?.name ?? '-',
		},
		{
			title: 'RWY',
			dataIndex: 'runway',
			key: 'runway',
			align: 'center',
			render: (runway) => runway?.name ?? '-',
		},
	];

	const dropdownItems = [
		{
			label: 'Add Terminal',
			value: 'create',
			key: '0',
		}
	];

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			handleDetailModalOpen();
		}
	};

	return (
		<>
			<SocketEventListener refetch={getTerminalRefetch} apiName={GET_TERMINAL} />
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchTerminal?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Upload CSV'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Terminal'}
					formComponent={<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleDetailModalClose}
					/>}
					openModal={() => handleDetailModalOpen()}
				/>
			) : (
				<>
					<div className="terminal">
						<div className="terminal--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="terminal--tableContainer">
							{/* <CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Terminals
							</CustomTypography> */}
							<TableComponent data={terminalData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
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
		</>
	);
};

export default Terminal;
