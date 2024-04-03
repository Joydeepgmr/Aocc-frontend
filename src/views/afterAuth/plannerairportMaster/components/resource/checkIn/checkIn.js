import React, { useState } from 'react';
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
import { useEditCheckin, useGetCheckIn, usePostCheckIn, useDeleteCheckin } from '../../../../../../services/planairportmaster/resources/checkin/checkin';
import './checkIn.scss';
 
const CheckIn = () => {
    const queryClient = useQueryClient();
    const [checkinData, setCheckinData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
 
    const getCheckinHandler = {
        onSuccess: (data) => handleGetCheckinSuccess(data),
        onError: (error) => handleGetCheckinError(error),
    };
 
    const handleGetCheckinSuccess = (data) => {
        if (data?.pages) {
            const newData = data.pages.reduce((acc, page) => {
                return acc.concat(page.data || []);
            }, []);
       
            setCheckinData([...newData]);
        }
    };
 
    const handleGetCheckinError = (error) => {
        toast.error(error?.response?.data?.message);
    }
    const { data: fetchCheckIn, isLoading: isFetchLoading,  hasNextPage, fetchNextPage } = useGetCheckIn(getCheckinHandler);
    console.log(fetchCheckIn,"checkinData");
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
    const handleAddCheckinSuccess = (data) => {
        setCheckinData([])
        closeModal();
        toast.success(data?.message);
        queryClient.invalidateQueries('get-check-in');
    }
 
    const handleAddCheckinError = (error) => {
        toast.error(error?.response?.data?.message);
    }
 
    const addCheckinHandler = {
        onSuccess: (data) => handleAddCheckinSuccess(data),
        onError: (error) => handleAddCheckinError(error),
    };
 
    const { mutate: postCheckIn, isLoading: isPostLoading } = usePostCheckIn(addCheckinHandler);
   
    const handleSaveButton = (value) => {
        value["isAllocatedToLounge"] = false;
        value && postCheckIn(value);
    };
 
    const handleCloseButton = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
    };
 
    //EDIT
    const editCheckinHandler = {
        onSuccess: (data) => handleEditCheckinSuccess(data),
        onError: (error) => handleEditCheckinError(error),
    };
 
    const {mutate: editCheckin, isLoading: isEditLoading} = useEditCheckin(rowData?.id,editCheckinHandler)
   
    const handleEditCheckinSuccess = (data) => {
        closeEditModal();
        setCheckinData([]);
        toast.success(data?.message);
        queryClient.invalidateQueries('get-check-in');
    }
 
    const handleEditCheckinError = (error) => {
        toast.error(error?.response?.data?.message)
    }
 
    const handleEdit = (record) => {
        record = {...record,
            validFrom : record?.validFrom ? dayjs(record?.validFrom): "",
            validTill: record?.validTo ? dayjs(record?.validTo) : "",
            unavailableFrom: record?.unavailableFrom ?  dayjs(record?.unavailableFrom) : "",
            unavailableTo:record?.unavailableTo ? dayjs(record?.unavailableTo)  : "",
            terminalId: record.terminal.id,
        }
        setRowData(record);
        openEditModal();
    };
 
    const handleEditSave = (value) => {
        editCheckin(value);
    };
 
    //DELETE
    const deleteCheckinHandler = {
        onSuccess: (data) => handleDeleteCheckinSuccess(data),
        onError: (error) => handleDeleteCheckinError(error),
    };
 
    const handleDeleteCheckinSuccess = (data) => {
        queryClient.invalidateQueries('get-check-in');
        closeDeleteModal();
        toast.success(data?.message);
    }
 
    const handleDeleteCheckinError = (error) => {
        toast.error(error?.response?.data?.message)
    }
 
    const {mutate: deleteCheckin} = useDeleteCheckin(deleteCheckinHandler);
    const handleDelete = () => {
        deleteCheckin(rowData.id);  
    }
 
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
                        onClick={() => openDeleteModal(record)}
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
            render: (terminal) => terminal.name ?? '-',
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
                    <Button onClick={() => {
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
            <PageLoader loading={isFetchLoading || isEditLoading || isPostLoading} />
            {!Boolean(fetchCheckIn?.pages[0]?.data?.length) ? (
                <Common_Card
                    title1="Create"
                    title2={'Import Global Reference'}
                    title3={'Download CSV Template'}
                    btnCondition={true}
                    Heading={'Add Check-in Counters'}
                    formComponent={<FormComponent handleSaveButton={handleSaveButton} handleButtonClose={handleCloseButton} key={Math.random() * 100} />}
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
                            <TableComponent data={checkinData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage}/>
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
                                key={Math.random() * 100}
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
                        initialValues={rowData}
                        isReadOnly = {isReadOnly}
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
 
export default CheckIn;