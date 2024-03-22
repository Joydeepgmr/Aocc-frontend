import React, { useState } from 'react';
import {usePostGlobalAircraftRegistration} from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import './aircraftRegistrationSetupTable.scss';


const AircraftRegistrationSetupTable = ({ formComponent, data }) => {
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
		usePostGlobalAircraftRegistration(values);
		// console.log(values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.iataCode?.join('');
		values.icaoCode = values?.icaoCode?.join('');
		values.icaoCodeModified = values?.icaoCodeModified?.join('');
		values.countryCode = values?.countryCode?.join('');
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
	// 	if (rowData) {
	// 		const initialValuesObj = {
	// 			identifier: rowData.identifier ?? 'NA',
	// 			iataCode: rowData.iataCode ?? '',
	// 			model: rowData.model ?? 'NA',
	// 			airline: rowData.airline ?? 'NA',
	// 			icaoCode: rowData.icaoCode ?? '',
	// 			icaoCodeModified: rowData.icaoCodeModified ?? 'NA',
	// 			acFamily: rowData.acFamily ?? 'NA',
	// 			acBodyType: rowData.acBodyType ?? 'NA',
	// 			minimumGroundTime: rowData.minimumGroundTime ?? 'NA',
	// 			wingspan: rowData.wingspan ?? '',
	// 			length: rowData.length ?? 'NA',
	// 			height: rowData.height ?? 'NA',
	// 			engineType: rowData.engineType ?? 'NA',
	// 			numberOfEngines: rowData.numberOfEngines ?? 'NA',
	// 			totalSeats: rowData.totalSeats ?? 'NA',
	// 			firstClass: rowData.firstClass ?? 'NA',
	// 			businessClass: rowData.businessClass ?? 'NA',
	// 			economyClass: rowData.economyClass ?? 'NA',
	// 			validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
	// 			validTo: rowData.validTo ? dayjs(rowData.validTo) : '',
	// 		};
	// 		setInitialValues(initialValuesObj);
	// 		initial.setFieldsValue(initialValuesObj);
	// 	}
	// }, [rowData]);

	// const rows = additionalAircraftTypeData?.map((data, index) => {
	// 	return {
	// 		identifier: data.identifier ?? 'NA',
	// 		iataCode: data.iataCode ?? '',
	// 		model: data.model ?? '',
	// 		airline: data.airline ?? 'NA',
	// 		icaoCode: data.icaoCode ?? 'NA',
	// 		icaoCodeModified: data.icaoCodeModified ?? 'NA',
	// 		acFamily: data.acFamily ?? 'NA',
	// 		acBodyType: data.acBodyType ?? '',
	// 		airportType: data.airportType ?? '',
	// 		minimumGroundTime: data.minimumGroundTime ?? 'NA',
	// 		wingspan: data.wingspan ?? 'NA',
	// 		length: data.length ?? 'NA',
	// 		height: data.height ?? 'NA',
	// 		engineType: data.engineType ?? 'NA',
	// 		numberOfEngines: data.numberOfEngines ?? 'NA',
	// 		totalSeats: data.totalSeats ?? 'NA',
	// 		firstClass: data.firstClass ?? 'NA',
	// 		businessClass: data.businessClass ?? 'NA',
	// 		economyClass: data.economyClass ?? 'NA',
	// 		validFrom: data.validFrom ?? '',
	// 		validTo: data.validTo ?? '',
	// 	};
	// });

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
						Aircrafts Type
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

export default AircraftRegistrationSetupTable;
