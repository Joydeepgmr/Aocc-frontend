import React, {useState} from 'react';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import Button from '../../../../../../components/button/button';
import editIcon from '../../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../../components/modal/modal';
import TableComponent from '../../../../../../components/table/table';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import {useEditTaxiway, useGetTaxiway, usePostTaxiway, useDeleteTaxiway} from '../../../../../../services/planairportmaster/resources/taxiway/taxiway';
import './taxiway.scss';

const Taxiway = () => {

	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const { data: fetchTaxiway } = useGetTaxiway();

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
	const handleAddTaxiwaySuccess = (data) => {
		queryClient.invalidateQueries('get-taxiway');
		closeModal();
		toast.success(data?.message);
	}

	const handleAddTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addTaxiwayHandler = {
		onSuccess: (data) => handleAddTaxiwaySuccess(data),
		onError: (error) => handleAddTaxiwayError(error),
	};

	const { mutate: postTaxiway } = usePostTaxiway(addTaxiwayHandler);
	
	const handleSaveButton = (value) => {
		value && postTaxiway(value);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	//EDIT 
	const editTaxiwayHandler = {
		onSuccess: (data) => handleEditTaxiwaySuccess(data),
		onError: (error) => handleEditTaxiwayError(error),
	};

	const {mutate: editTaxiway} = useEditTaxiway(editTaxiwayHandler)
	
	const handleEditTaxiwaySuccess = (data) => {
		queryClient.invalidateQueries('get-taxiway');
		closeEditModal();
		toast.success(data?.message);
	}

	const handleEditTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}

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

	const handleEditSave = (value) => {
		value["id"] =  rowData.id;
		editTaxiway(value);
	};

	//DELETE
	const {mutate: deleteTaxiway} = useDeleteTaxiway();
	const handleDelete = (record) => {
		deleteTaxiway(record.id);	
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
						onClick={() => handleDelete(record)}
						type="iconWithBorder"
						icon={deleteIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
		{
			title: 'Taxiway Name',
			dataIndex: 'name',
			key: 'name',
			render: (counterName) => counterName ?? '-',
		},
		{
			title: 'Airport',
			dataIndex: 'airport',
			key: 'airport',
			render: (group) => group ?? '-',
		},
		{
			title: 'Connected to Runway',
			dataIndex: 'runwayId',
			key: 'runwayId',
			render: (terminal) => terminal ?? '-',
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
			{!Boolean(fetchTaxiway?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Taxiway '}
					formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton}/>}
				/>
			) : (
				<>
					<div className="taxiway">
						<div className="taxiway--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Actions"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="taxiway--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Taxiway Counters
							</CustomTypography>
							<TableComponent data={fetchTaxiway.map(item => ({ ...item, terminal: item.terminal?.name }))} columns={columns} />
						</div>
					</div>

					<ModalComponent
						isModalOpen={isModalOpen}
						width="120rem"
						closeModal={closeModal}
						title={'Add taxiway Counters'}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
								handleSaveButton={handleSaveButton}
								handleButtonClose={handleCloseButton}
							/>
						</div>
					</ModalComponent>

					<ModalComponent
						isModalOpen={isEditModalOpen}
						width="120rem"
						closeModal={closeEditModal}
						title={`Edit taxiway Counters`}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent
								handleSaveButton={handleEditSave}
								handleButtonClose={handleCloseButton}
								isEdit={true}
								initialValues={rowData}
								isReadOnly={isReadOnly}
							/>
						</div>
					</ModalComponent>
				</>
			)}
		</>
	);
};

export default Taxiway;
