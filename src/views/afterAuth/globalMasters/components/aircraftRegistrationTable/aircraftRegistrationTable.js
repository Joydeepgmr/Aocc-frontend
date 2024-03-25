import React, { useState, useEffect } from 'react';
import {usePostGlobalAircraftRegistration} from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import './aircraftRegistrationTable.scss';


const AircraftRegistrationTable = ({ formComponent, data }) => {
	const { mutate: postGlobalAircraftRegistration, isLoading: aircraftRegistrationLoading, isSuccess: aircraftRegistrationSuccess, isError: aircraftRegistrationError, postData: aircraftRegistrationPostData, message: aircraftRegistrationMessage } = usePostGlobalAircraftRegistration();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();

	
	const handleDetails = (data) => {
		setRowData(data);
		setIsModalOpen(true);
	};

	const closeAddModal = () => {
		setIsModalOpen(false);
		setEditData(false);
	};

	const onFinishHanlder = (values) => {
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.iataCode?.join('');
		values.icaoCode = values?.icaoCode?.join('');
		postGlobalAircraftRegistration(values);
		form.resetFields();
		closeAddModal();
	};

	// const handleDelete = (record) => {
	// 	const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
	// 	dispatch(updateAirportData(updatedData));
	// };

	const handleEdit = (data) => {
		setRowData(data);
		setIsModalOpen(true);
		setEditData(true);
	};

	const handleEditButton = () => {
		// if (disabled) {
		// 	dispatch(formDisabled());
		// }
		closeAddModal();
	};

	useEffect(() => {
		if (rowData) {
			const initialValuesObj = {
				registration: rowData.registration ?? '',
				internal: rowData.internal ?? 'NA',
				iataCode: rowData.iataCode ?? '',
				iacoCode: rowData.iacoCode ?? 'NA',
				aircraftType: rowData.aircraftType ?? '',
				typeOfUse: rowData.typeOfUse ?? 'NA',
				homeAirport: rowData.homeAirport ?? 'NA',
				nationality: rowData.nationality ?? 'NA',
				cockpitCrew: rowData.cockpitCrew ?? 'NA',
				cabinCrew: rowData.cabinCrew ?? 'NA',
				numberOfSeats: rowData.numberOfSeats ?? 'NA',
				height: rowData.height ?? 'NA',
				length: rowData.length ?? 'NA',
				wingspan: rowData.wingspan ?? 'NA',
				mtow: rowData.mtow ?? 'NA',
				mow: rowData.mow ?? 'NA',
				annex: rowData.annex ?? '',
				mainDeck: rowData.mainDeck ?? 'NA',
				apuInop: rowData.apuInop ?? 'NA',
				ownerName: rowData.ownerName ?? 'NA',
				country: rowData.country ?? 'NA',
				address: rowData.address ?? 'NA',
				remarks: rowData.remarks ?? 'NA',
				validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
				validTo: rowData.validTo ? dayjs(rowData.validTo) : '',
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [rowData]);

	const columns = [
		{
			title: 'Actions',
			key: 'actions',
			render: (
				text,
				record
			) => (
				<div className="action_buttons">
					{/* <ButtonComponent
						onClick={() => handleEdit(record)}
						type="iconWithBorder"
						icon={editIcon}
						className="custom_icon_buttons"
					/> */}
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
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			render: (text) => text || '-',
		},
		{
			title: 'Internal',
			dataIndex: 'Internal',
			key: 'Internal',
			render: (text) => text || '-',
		},
		{
			title: 'IATA Code',
			dataIndex: 'iataCode',
			key: 'iataCode',
			render: (text) => text || '-',
		},
		{
			title: 'Nationality',
			dataIndex: 'nationality',
			key: 'nationality',
			render: (text) => text || '-',
		},
		{
			title: 'Home Airport',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
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
						Aircraft Registrations
					</CustomTypography>
					<TableComponent data={data} columns={columns} />
				</div>
			</div>
			<ModalComponent
				isModalOpen={isModalOpen}
				closeModal={closeAddModal}
				title="Setup your aircraft type"
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHanlder}>
					{formComponent && formComponent}
					<Divider />
					{!editData && (
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
									/>
								</>
							</div>
						</>
					)}
					{editData && (
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

export default AircraftRegistrationTable;
