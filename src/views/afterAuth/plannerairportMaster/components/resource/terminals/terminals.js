import React, { useCallback ,useState } from 'react';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import Button from '../../../../../../components/button/button';
import editIcon from '../../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import ModalComponent from '../../../../../../components/modal/modal';
import FormComponent from './formComponents/formComponents';
import TableComponent from '../../../../../../components/table/table';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import { useEditTerminal, useGetTerminal, usePostTerminal, useDeleteTerminal } from '../../../../../../services/planairportmaster/resources/terminal/terminal';
import { useStandDropdown } from '../../../../../../services/planairportmaster/resources/parkingstand/parkingstand';
import { useTaxiwayDropdown } from '../../../../../../services/planairportmaster/resources/taxiway/taxiway';
import { useRunwayDropdown } from '../../../../../../services/planairportmaster/resources/runway/runway';
import { Form } from 'antd';
import './terminals.scss';


const Terminal = () => {
	const queryClient = useQueryClient();
	const [terminalData, setTerminalData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	const [form] = Form.useForm();

	const { data: standDropdownData = [], isSuccess: isGetStandDropdownSuccess } = useStandDropdown();
	const { data: taxiwayDropdownData = [] } = useTaxiwayDropdown();
	const { data: runwayDropdownData = [] } = useRunwayDropdown();

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
	const { data: fetchTerminal, isFetching, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetTerminal(getTerminalHandler);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
		form.resetFields();
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setIsReadOnly(false);
		form.resetFields();
	};

	const openDeleteModal = (record) => {
		setRowData(record);
		setIsDeleteConfirm(true);
	}

	const closeDeleteModal = () => {
		setRowData(null);
		setIsDeleteConfirm(false);

	}

	//CREATE
	const handleAddTerminalSuccess = (data) => {
		setTerminalData([])
		closeModal();
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
		value && postTerminal(value);
	}, []);

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		form.resetFields();
	};

	//EDIT 
	const editTerminalHandler = {
		onSuccess: (data) => handleEditTerminalSuccess(data),
		onError: (error) => handleEditTerminalError(error),
	};

	const { mutate: editTerminal, isLoading: isEditLoading } = useEditTerminal(rowData?.id, editTerminalHandler)

	const handleEditTerminalSuccess = (data) => {
		closeEditModal();
		setTerminalData([]);
		toast.success(data?.message);
		queryClient.invalidateQueries('get-terminal');
	}

	const handleEditTerminalError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : undefined,
			validTill: record?.validTill ? dayjs(record?.validTill) : undefined,
		}
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		editTerminal(value);
	};

	//DELETE
	const deleteTerminalHandler = {
		onSuccess: (data) => handleDeleteTerminalSuccess(data),
		onError: (error) => handleDeleteTerminalError(error),
	};

	const handleDeleteTerminalSuccess = (data) => {
		closeDeleteModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-terminal');
	}

	const handleDeleteTerminalError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const { mutate: deleteTerminal } = useDeleteTerminal(deleteTerminalHandler);
	const handleDelete = () => {
		deleteTerminal(rowData.id);
	}

	const columns = [
		{
			title: 'Actions',
			key: 'actions',
			render: (text, record) => (
				<div className="action_buttons">
					<Button
						onClick={() => handleEdit(record)}
						type="iconWithBorder"
						icon={editIcon}
						className="custom_icon_buttons"
					/>
					<Button
						onClick={() => openDeleteModal(record)}
						type="iconWithBorder"
						icon={deleteIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
		{
			title: 'Terminal Name',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (terminalName) => terminalName ?? '-',
		},
		{
			title: 'Connected to Taxiway',
			dataIndex: 'taxiway',
			key: 'taxiway',
			align: 'center',
			render: (taxiway) => taxiway?.name ?? '-',
		},
		{
			title: 'Connected to Stands',
			dataIndex: 'parkingStand',
			key: 'parkingStand',
			align: 'center',
			render: (stand) => stand?.name ?? '-',
		},
		{
			title: 'Connected to Runway',
			dataIndex: 'runway',
			key: 'runway',
			align: 'center',
			render: (runway) => runway?.name ?? '-',
		},
		{
			title: 'View Details',
			key: 'viewDetails',
			render: (record) => (
				<>
					<Button
						style={{ margin: 'auto' }}
						onClick={() => {
							setIsReadOnly(true);
							handleEdit(record)
						}}
						title="View Details"
						type="text" />
				</>
			),
		},
	];

	const dropdownItems = [
		{
			label: 'Add Terminal',
			value: 'create',
			key: '0',
		},
		// {
		// 	label: 'Upload CSV',
		// 	value: 'uploadCSV',
		// 	key: '1',
		// },
		// {
		// 	label: 'Download CSV Template',
		// 	value: 'downloadCSVTemplate',
		// 	key: '2',
		// },
	];

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};

	return (
		<>
			{isFetchLoading || isEditLoading || isPostLoading ? <PageLoader loading={true} /> : !Boolean(fetchTerminal?.pages[0]?.data?.length) ? (
				<Common_Card
					title1="Create"
					// title2={'Import Global Reference'}
					// title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Terminal'}
					formComponent={<FormComponent
						form={form}
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						standDropdownData={isGetStandDropdownSuccess && standDropdownData}
						taxiwayDropdownData={taxiwayDropdownData}
						runwayDropdownData={runwayDropdownData}

					/>}
					openModal={openModal}
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
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Terminals
							</CustomTypography>
							<TableComponent data={terminalData} columns={columns} loading={isFetching} fetchData={fetchNextPage} pagination={hasNextPage} />
						</div>
					</div>
				</>
			)}



			{/* modals */}
			<ModalComponent
				isModalOpen={isModalOpen}
				width="80%"
				closeModal={closeModal}
				title={'Add Terminal'}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						standDropdownData={isGetStandDropdownSuccess && standDropdownData}
						taxiwayDropdownData={taxiwayDropdownData}
						runwayDropdownData={runwayDropdownData}
					/>
				</div>
			</ModalComponent>

			<ModalComponent
				isModalOpen={isEditModalOpen}
				width="80%"
				closeModal={closeEditModal}
				title={`${isReadOnly ? '' : 'Edit'} Terminal`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={handleEditSave}
						handleButtonClose={handleCloseButton}
						isEdit={true}
						initialValues={rowData}
						isReadOnly={isReadOnly}
						standDropdownData={isGetStandDropdownSuccess && standDropdownData}
						taxiwayDropdownData={taxiwayDropdownData}
						runwayDropdownData={runwayDropdownData}
					/>
				</div>
			</ModalComponent>
			<ConfirmationModal
				isOpen={isDeleteConfirm}
				onClose={closeDeleteModal}
				onSave={handleDelete}
				content={`You want to delete ${rowData?.name}?`}
			/>

		</>
	);
};

export default Terminal;
