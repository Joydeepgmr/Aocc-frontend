import React, { useEffect, useMemo, useState } from 'react';
import { usePostGlobalAircraftType, useDeleteGlobalAirport, useDeleteGlobalAircraftType, usePatchGlobalAircraftType } from "../../../../../services/globalMasters/globalMaster"
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
	const { mutate: patchGlobalAircraftType } = usePatchGlobalAircraftType();
	const { mutate: deleteGlobalAircraftType } = useDeleteGlobalAircraftType();
	const [initial] = Form.useForm();
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your aircraft type' };// type could be 'new' | 'view' | 'edit'
	const [aircraftTypeModal, setAircraftTypeModal] = useState(defaultModalParams);

	const closeAddModal = () => {
		initial.resetFields();
		setAircraftTypeModal(defaultModalParams)
	};

	const onFinishHandler = (values) => {
		// console.log(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTo = values?.validTo && dayjs(values?.validTo).format('YYYY-MM-DD');
		values.iataCode = values?.iataCode;
		values.icaoCode = values?.icaoCode;
		values.icaoCodeModified = values?.icaoCodeModified;
		values.countryCode = values?.countryCode;
		if (aircraftTypeModal.type === 'edit') {
			console.log('dispatch the update air craft type api');
			values.id = aircraftTypeModal.data.id
			patchGlobalAircraftType(values);
		} else {
			postGlobalAircraftType(values);
			console.log('dispatch the create new air craft type api');
		}
		closeAddModal();
	};

	const handleDelete = (record) => {
		// Call the delete function and pass the record ID
		// deleteGlobalAirport(record.id);
		deleteGlobalAircraftType(record.id);
	};

	// const handleDelete = (record) => {
	// 	const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
	// 	dispatch(updateAirportData(updatedData));
	// };

	const handleEdit = (data) => {
		setAircraftTypeModal({ isOpen: true, type: 'edit', data, title: 'Update aircraft type' });
	};

	const handleEditButton = () => {
		// if (disabled) {
		// 	dispatch(formDisabled());
		// }
		closeAddModal();
	};

	const handleDetails = (data) => {
		setAircraftTypeModal({ isOpen: true, type: 'view', data, title: 'Aircraft type' });
	};

	useEffect(() => {
		const { data } = aircraftTypeModal
		if (data) {
			const initialValuesObj = {
				identifier: data.identifier ?? '',
				iataCode: data.iataCode ?? '',
				model: data.model ?? '',
				airline: data.airline ?? 'NA',
				icaoCode: data.icaoCode ?? 'NA',
				icaoCodeModified: data.icaoCodeModified ?? 'NA',
				acFamily: data.acFamily ?? 'NA',
				acBodyType: data.acBodyType ?? 'NA',
				minimumGroundTime: data.minimumGroundTime ?? 'NA',
				wingspan: data.wingspan ?? 'NA',
				length: data.length ?? 'NA',
				height: data.height ?? 'NA',
				engineType: data.engineType ?? 'NA',
				numberOfEngines: data.numberOfEngines ?? 'NA',
				totalSeats: data.totalSeats ?? 'NA',
				firstClass: data.firstClass ?? 'NA',
				businessClass: data.businessClass ?? 'NA',
				economyClass: data.economyClass ?? 'NA',
				validFrom: data.validFrom ? dayjs(data.validFrom) : '',
				validTo: data.validTo ? dayjs(data.validTo) : null,
			};
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftTypeModal.isOpen]);

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
				isModalOpen={aircraftTypeModal.isOpen}
				closeModal={closeAddModal}
				title={aircraftTypeModal.title}
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
