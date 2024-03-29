import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import Button from '../../../../../../components/button/button';
import editIcon from '../../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import ModalComponent from '../../../../../../components/modal/modal';
import FormComponent from './formComponents/formComponents';
import TableComponent from '../../../../../../components/table/table';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import { useEditCheckin, useGetCheckIn, usePostCheckIn, useDeleteCheckin } from '../../../../../../services/planairportmaster/resources/checkin/checkin';
import './checkIn.scss';

const CheckIn = () => {
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isReadOnly, setIsReadOnly] = useState(false);
	const { data: fetchCheckIn } = useGetCheckIn();

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setIsReadOnly(false);
	};


	//CREATE
	const handleAddCheckinSuccess = () => {
		queryClient.invalidateQueries('get-check-in');
		closeModal();
	}

	const handleAddCheckinError = (error) => {
		console.log(error?.response?.data?.message,"errorr");
		setIsError(true);
		setErrorMessage(error?.response?.data?.message);
	}

	const addCheckinHandler = {
		onSuccess: () => handleAddCheckinSuccess(),
		onError: (error) => handleAddCheckinError(error),
	};

	const { mutate: postCheckIn } = usePostCheckIn(addCheckinHandler);
	const handleSaveButton = (value) => {
		console.log(value, 'valueee');
		value["isAllocatedToLounge"] = false;
		value && postCheckIn(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	//EDIT 
	const handleEdit = (record) => {
		record = {...record,
			validFrom : dayjs(record?.validFrom),
			validTill: dayjs(record?.validTo),
			unavailableFrom: dayjs(record?.unavailableFrom),
			unavailableTo: dayjs(record?.unavailableTo)
		}
		setRowData(record);
		openEditModal();
	};


	const {mutate: editCheckin} = useEditCheckin()
	const handleEditSave = (value) => {
		value["id"] =  rowData.id;
		editCheckin(value);
		setIsEditModalOpen(false);
	};

	//DELETE
	const {mutate: deleteCheckin} = useDeleteCheckin();
	const handleDelete = (record) => {
		deleteCheckin(record.id);	
	}


	//table actions handlers
	const handleViewDetail = (record) => {
		record = {...record,
			validFrom : dayjs(record?.validFrom),
			validTill: dayjs(record?.validTo),
			unavailableFrom: dayjs(record?.unavailableFrom),
			unavailableTo: dayjs(record?.unavailableTo)
		}
		setRowData(record)
		setIsReadOnly(true);
		openEditModal(true);
	};

	const columns = [
		{
			title: '',
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
						onClick={() => handleDelete(record)}
						type="iconWithBorder"
						icon={deleteIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
		{
			title: 'Counter Name',
			dataIndex: 'name',
			key: 'name',
			render: (counterName) => counterName ?? '-',
		},
		{
			title: 'Group',
			dataIndex: 'group',
			key: 'group',
			render: (group) => group ?? '-',
		},
		{
			title: 'Terminal',
			dataIndex: 'terminal',
			key: 'terminal',
			render: (terminal) => terminal ?? '-',
		},
		{
			title: 'Row',
			dataIndex: 'row',
			key: 'row',
			render: (row) => row ?? '-',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => status ?? '-',
		},
		{
			title: 'Availability',
			dataIndex: 'availability',
			key: 'availability',
			render: (availability) => availability ?? '-',
		},
		{
			title: '',
			key: 'viewDetails',
			render: (record) => (
				<>
					<Button onClick={() => handleViewDetail(record)} title="View Details" type="text" />
				</>
			),
		},
	];

	const dropdownItems = [
		{
			label: 'Create',
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
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};

	return (
		<>
			{!Boolean(fetchCheckIn?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Check-in Counters'}
					formComponent={<FormComponent />}
				/>
			) : (
				<>
					<div className="check-in">
						<div className="check-in--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Actions"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="check-in--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Check-in Counters
							</CustomTypography>
							<TableComponent data={fetchCheckIn.map(item => ({ ...item, terminal: item.terminal?.name }))} columns={columns} />
						</div>
					</div>

					{/* modals */}
					<ModalComponent
						isModalOpen={isModalOpen}
						width="120rem"
						closeModal={closeModal}
						title={'Add Checkin Counters'}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
								handleSaveButton={handleSaveButton}
								handleButtonClose={handleCloseButton}
								//type={index}
								key={Math.random() * 100}
								isError = {isError}
								errorMessage = {errorMessage}	
							/>
						</div>
					</ModalComponent>
					
				<ModalComponent
				isModalOpen={isEditModalOpen}
				width="120rem"
				closeModal={closeEditModal}
				title={`Edit Check-in Counters`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						handleSaveButton={handleEditSave}
						handleButtonClose={handleCloseButton}
						isEdit = {true}
						// type={index}
						initialValues={rowData}
						isReadOnly = {isReadOnly}
					/>
				</div>
			</ModalComponent>
				</>
			)}
		</>
	);
};

export default CheckIn;
