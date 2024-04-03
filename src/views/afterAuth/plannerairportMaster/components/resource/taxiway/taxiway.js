import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import Common_Card from '../../../common_wrapper/common_card.js/common_card';
import FormComponent from './formComponents/formComponents';
import Button from '../../../../../../components/button/button';
import editIcon from '../../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../../components/modal/modal';
import PageLoader from '../../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../../components/table/table';
import ConfirmationModal from '../../../../../../components/confirmationModal/confirmationModal';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import { useEditTaxiway, useGetTaxiway, usePostTaxiway, useDeleteTaxiway } from '../../../../../../services/planairportmaster/resources/taxiway/taxiway';
import './taxiway.scss';

const Taxiway = () => {

	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [taxiwayData, setTaxiwayData] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
	
	const getTaxiwayHandler = {
        onSuccess: (data) => handleGetTaxiwaySuccess(data),
        onError: (error) => handleGetTaxiwayError(error),
    };
 
    const handleGetTaxiwaySuccess = (data) => {
		console.log(data,"data here");
        if (data?.pages) {
            const newData = data.pages.reduce((acc, page) => {
                return acc.concat(page.data || []);
            }, []);
       
            setTaxiwayData([...newData]);
        }
    };
	console.log(taxiwayData,'taxiwaydata' );

	const handleGetTaxiwayError = (error) => {
        toast.error(error?.response?.data?.message);
    }
	const { data: fetchTaxiway, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetTaxiway(getTaxiwayHandler);
	console.log(fetchTaxiway,"fetchTaxiway");


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
	

	const openDeleteModal = (record) => {
		setRowData(record);
		setIsDeleteConfirm(true);
	}

	const closeDeleteModal = () => {
		setRowData(null);
		setIsDeleteConfirm(false);

	}

	//CREATE
	const handleAddTaxiwaySuccess = (data) => {
		setTaxiwayData([]);
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-taxiway');
	}

	const handleAddTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const addTaxiwayHandler = {
		onSuccess: (data) => handleAddTaxiwaySuccess(data),
		onError: (error) => handleAddTaxiwayError(error),
	};

	const { mutate: postTaxiway, isLoading: isPostLoading  } = usePostTaxiway(addTaxiwayHandler);

	const handleSaveButton = (value) => {
		value && postTaxiway(value);
	};
	
	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		setIsReadOnly(false)
	};

	//EDIT 
	const editTaxiwayHandler = {
		onSuccess: (data) => handleEditTaxiwaySuccess(data),
		onError: (error) => handleEditTaxiwayError(error),
	};

	const { mutate: editTaxiway, isLoading: isEditLoading } = useEditTaxiway(editTaxiwayHandler)

	const handleEditTaxiwaySuccess = (data) => {
		queryClient.invalidateQueries('get-taxiway');
		setTaxiwayData([]);
		closeEditModal();
		toast.success(data?.message);
	}

	const handleEditTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}

	const handleEdit = (record) => {
		record = {
			...record,
			validFrom: record?.validFrom ? dayjs(record?.validFrom) : "",
			validTill: record?.validTo ? dayjs(record?.validTo) : "",
			unavailableFrom: record?.unavailableFrom ? dayjs(record?.unavailableFrom) : "",
			unavailableTo: record?.unavailableTo ? dayjs(record?.unavailableTo) : "",
			runway: record?.runway?.id,
		}
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		value["id"] = rowData.id;
		editTaxiway(value);
	};

	//DELETE
	const deleteTaxiwayHandler = {
		onSuccess: (data) => handleDeleteTaxiwaySuccess(data),
		onError: (error) => handleDeleteTaxiwayError(error),
	};

	const handleDeleteTaxiwaySuccess = (data) => {
		queryClient.invalidateQueries('get-taxiway');
		closeDeleteModal();
		toast.success(data?.message);
	}

	const handleDeleteTaxiwayError = (error) => {
		toast.error(error?.response?.data?.message)
	}
	const { mutate: deleteTaxiway } = useDeleteTaxiway(deleteTaxiwayHandler);
	const handleDelete = () => {
		deleteTaxiway(rowData.id);
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
			render: (runway) => runway ?? '-',
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
					<Button
						onClick={() => {
						setIsReadOnly(true);
						handleEdit(record)}}
						title="View Details"
						type="text" />
				</>
			),
		},
	];

	const dropdownItems = [
		{
			label: 'Add New Taxi',
			value: 'addNewTaxi',
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
		if (value === 'addNewTaxi') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};


	return (
		<>
			<PageLoader loading={isFetchLoading || isEditLoading || isPostLoading} />
			{!Boolean(taxiwayData?.length) ? (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					title3={'Download CSV Template'}
					btnCondition={true}
					Heading={'Add Taxiway '}
					formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton} />}
				/>
			) : (
				<>
					<div className="taxiway">
						<div className="taxiway--dropdown">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								className="custom_dropdownButton"
								onChange={handleDropdownItemClick}
							/>
						</div>
						<div className="taxiway--tableContainer">
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Taxiway Counters
							</CustomTypography>
							<TableComponent data={taxiwayData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage}/>
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
						width="80%"
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
					<ConfirmationModal
						isOpen={isDeleteConfirm}
						onClose={closeDeleteModal}
						onSave={handleDelete}
						content={`You want to delete ${rowData?.name}?`}
					/>
				</>
			)}
		</>
	);
};

export default Taxiway;
