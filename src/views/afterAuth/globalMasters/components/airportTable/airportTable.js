import React, { useEffect, useState } from 'react';
import {usePostGlobalAirport, useEditGlobalAirport} from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import AirportForm from '../airportForm/airportForm';
import dayjs from 'dayjs';
import './airportTable.scss';


const AirportTable = ({ data }) => {
    let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your airport' };
    const [airportModal, setAirportModal] = useState(defaultModalParams);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState({});
	const [initialValues, setInitialValues] = useState({});
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();
	const {mutate: editGlobalAirport} = useEditGlobalAirport();

	const closeAddModal = () => {
		setIsModalOpen(false);
		setEditData(false);
        setAirportModal(defaultModalParams)
    };


	const handleDetails = (data) => {
		setRowData(data);
		setIsModalOpen(true);
        setAirportModal({ isOpen: true, type: 'view', data, title: 'Your Airport' });
    };


	const onFinishHanlder = (values) => {
		usePostGlobalAirport(values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.iataCode?.join('');
		values.icaoCode = values?.icaoCode?.join('');
		values.countryCode = values?.countryCode?.join('');
		form.resetFields();

		editGlobalAirport(rowData.id, values)
        .then((response) => {
            // Handle success response
            console.log('Airport updated successfully:', response);
            closeAddModal();
        })
        .catch((error) => {
            // Handle error response
            console.error('Error updating airport:', error);
        });
		closeAddModal();
	};


	const handleDelete = (record) => {
		// const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
		// dispatch(updateAirportData(updatedData));
	};


	const handleEdit = (data) => {
		setRowData(data);
		setIsModalOpen(true);
        setAirportModal({ isOpen: true, type: 'edit', data, title: 'Update your airport' });
		setEditData(true);
    };

	const handleEditButton = () => {
		closeAddModal();
	};

	useEffect(() => {
		const { data } = airportModal
		if (data) {
			const initialValuesObj = {
				name: rowData.name ?? '',
				iataCode: rowData.iataCode ?? '',
				icaoCode: rowData.icaoCode ?? '',
				abbreviatedName1: rowData.abbreviatedName1 ?? 'NA',
				abbreviatedName2: rowData.abbreviatedName2 ?? 'NA',
				abbreviatedName3: rowData.abbreviatedName3 ?? 'NA',
				abbreviatedName4: rowData.abbreviatedName4 ?? 'NA',
				airportType: rowData.airportType ?? 'NA',
				countryCode: rowData.countryCode ?? 'NA',
				standardFlightTime: rowData.standardFlightTime ?? 'NA',
				timeChange: rowData.timeChange ?? 'NA',
				timeDifferenceAfter: rowData.timeDifferenceAfter ?? 'NA',
				timeDifferenceBefore: rowData.timeDifferenceBefore ?? 'NA',
				timeDifferenceSummer: rowData.timeDifferenceSummer ?? 'NA',
				timeDifferenceWinter: rowData.timeDifferenceWinter ?? 'NA',
				validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
				validTill: rowData.validTill ? dayjs(rowData.validTill) : null,
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [airportModal.data]);

	const columns = [
		{
			title: 'Actions',
			key: 'actions',
			render: (
				text,
				record
			) => (
				<div className="action_buttons">
					<ButtonComponent
						onClick={() => handleEdit(record)}
						type="iconWithBorder"
						icon={editIcon}
						className="custom_icon_buttons"
					/>
					<ButtonComponent
						onClick={() => handleDelete(record)}
						type="iconWithBorder"
						icon={deleteIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text) => text || '-',
		},
		{
			title: 'Airport Code',
			dataIndex: 'iataCode',
			key: 'iataCode',
			render: (text) => text || '-',
		},
		{
			title: 'Airport Type',
			dataIndex: 'airportType',
			key: 'airportType',
			render: (text) => text || '-',
		},
		{
			title: 'Country Code',
			dataIndex: 'countryCode',
			key: 'countryCode',
			render: (text) => text || '-',
		},
		{
			title: 'Standard Flight Time',
			dataIndex: 'standardFlightTime',
			key: 'standardFlightTime',
			render: (text) => text || '-',
		},
		{
			title: 'Time Change',
			dataIndex: 'timeChange',
			key: 'timeChange',
			render: (text) => text || '-',
		},
		{
			title: 'View Details',
			key: 'viewDetails',
			render: (
				text,
				record // Use the render function to customize the content of the cell
			) => (
				<ButtonComponent
					title="View Details"
					type="text"
					onClick={() => {
						handleDetails(record);
					}}
				></ButtonComponent>
			),
		},
	];
	
	return (
		<div>
			<div className="create_wrapper_table">
				<div className="table_container">
					<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
						Airports
					</CustomTypography>
					<TableComponent data={data} columns={columns} />
				</div>
			</div>
			<ModalComponent
				isModalOpen={airportModal.isOpen}
				closeModal={closeAddModal}
				title={airportModal.title}
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHanlder} form={initial}>
                    <AirportForm isReadOnly={airportModal.type === 'view'} />
                    {airportModal.type !== 'view' && <Divider />}
                    {airportModal.type === 'new' && (
                        <>
                            <div className="custom_buttons">
                                <>
                                    <ButtonComponent
                                        title="Cancel"
                                        type="filledText"
                                        className="custom_button_cancel"
                                        onClick={closeAddModal}
                                    />
                                    <ButtonComponent
                                        title="Save"
                                        type="filledText"
                                        className="custom_button_save"
                                        isSubmit={true}
                                        onClick={closeAddModal}
                                    />
                                </>
                            </div>
                        </>
                    )}
                    {airportModal.type === 'edit' && (
                        <>
                            <div className="custom_buttons">
                                <ButtonComponent
                                    title="Cancel"
                                    type="filledText"
                                    className="custom_button_cancel"
                                    onClick={closeAddModal}
                                />
                                <ButtonComponent
                                    title="Save"
                                    type="filledText"
                                    className="custom_button_save"
                                    onClick={handleEditButton}
                                    isSubmit={true}
                                />
                            </div>
                        </>
                    )}
                </Form>
			</ModalComponent>
		</div>
	);
};

export default AirportTable;
