import React, { useEffect, useMemo, useState } from 'react';
import { usePostGlobalAircraftType, useDeleteGlobalAirport } from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import AircraftTypeForm from '../aircraftTypeForm/aircraftTypeForm';
import './aircraftTypeTable.scss';


const AircraftTable = ({ data, createProps, setCreateProps }) => {
	const { mutate: postGlobalAircraftType, isLoading: aircraftTypeLoading, isSuccess: aircraftTypeSuccess, isError: aircraftTypeError, postData: aircraftTypePostData, message: aircraftTypeMessage } = usePostGlobalAircraftType();
	const { mutate: deleteGlobalAirport } = useDeleteGlobalAirport();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();

	const closeAddModal = () => {
		setIsModalOpen(false);
		setEditData(false);
	};

	const onFinishHandler = (values) => {
		// console.log(values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.iataCode;
		values.icaoCode = values?.icaoCode;
		values.icaoCodeModified = values?.icaoCodeModified;
		values.countryCode = values?.countryCode;
		if (aircraftTypeModal.type === 'edit') {
			console.log('dispatch the update air craft type api');
		} else {
			postGlobalAircraftType(values);
			console.log('dispatch the create new air craft type api');
		}
		closeAddModal();
	};

	const handleDelete = (record) => {
		// Call the delete function and pass the record ID
		deleteGlobalAirport(record.id);
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

	const handleDetails = (data) => {
		setRowData(data);
		setIsModalOpen(true);
	};

	useEffect(() => {
		if (rowData) {
			const initialValuesObj = {
				identifier: rowData.identifier ?? '',
				iataCode: rowData.iataCode ?? '',
				model: rowData.model ?? '',
				airline: rowData.airline ?? 'NA',
				icaoCode: rowData.icaoCode ?? 'NA',
				icaoCodeModified: rowData.icaoCodeModified ?? 'NA',
				acFamily: rowData.acFamily ?? 'NA',
				acBodyType: rowData.acBodyType ?? 'NA',
				minimumGroundTime: rowData.minimumGroundTime ?? 'NA',
				wingspan: rowData.wingspan ?? 'NA',
				length: rowData.length ?? 'NA',
				height: rowData.height ?? 'NA',
				engineType: rowData.engineType ?? 'NA',
				numberOfEngines: rowData.numberOfEngines ?? 'NA',
				totalSeats: rowData.totalSeats ?? 'NA',
				firstClass: rowData.firstClass ?? 'NA',
				businessClass: rowData.businessClass ?? 'NA',
				economyClass: rowData.economyClass ?? 'NA',
				validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
				validTo: rowData.validTo ? dayjs(rowData.validTo) : null,
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [rowData]);

	useEffect(() => {
		if (createProps.new) {
			setAircraftTypeModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new])
	const columns = useMemo(() => {
		return [
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
				title: 'Identifier',
				dataIndex: 'identifier',
				key: 'identifier',
				render: (text) => text || '-',
			},
			{
				title: 'IATA Code',
				dataIndex: 'iataCode',
				key: 'iataCode',
				render: (text) => text || '-',
			},
			{
				title: 'Model',
				dataIndex: 'model',
				key: 'model',
				render: (text) => text || '-',
			},
			{
				title: 'Airline',
				dataIndex: 'airline',
				key: 'airline',
				render: (text) => text || '-',
			},
			{
				title: 'ICAO Code',
				dataIndex: 'icaoCode',
				key: 'icaoCode',
				render: (text) => text || '-',
			},
			{
				title: 'A/C Family',
				dataIndex: 'acFamily',
				key: 'acFamily',
				render: (text) => text || '-',
			},
			{
				title: 'A/C Body Type',
				dataIndex: 'acBodyType',
				key: 'acBodyType',
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
					/>
				),
			},
		];
	}, [data])

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
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					{/* {formComponent && formComponent} */}
					<AircraftTypeForm isReadOnly={aircraftTypeModal.type === 'view'} />
					{aircraftTypeModal.type !== 'view' && <>
						<Divider />
						<div className="custom_buttons">
							<ButtonComponent
								title="Cancel"
								type="filledText"
								className="custom_button_cancel"
								onClick={closeAddModal}
							/>
							<ButtonComponent
								title={aircraftTypeModal.type === 'edit' ? 'Update' : 'Save'}
								type="filledText"
								className="custom_button_save"
								isSubmit={true}
							/>
						</div>
					</>}
				</Form>
			</ModalComponent>
		</div>
	);
};

export default AircraftTable;
