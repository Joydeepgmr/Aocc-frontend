import React, { useState, useEffect, useMemo } from 'react';
import { usePostGlobalAircraftRegistration } from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';
import './aircraftRegistrationTable.scss';


const AircraftRegistrationTable = ({ formComponent, data }) => {
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup aircraft registration' };// type could be 'new' | 'view' | 'edit'
	const [aircraftRegistrationModal, setAircraftRegistrationModal] = useState(defaultModalParams);
	const { mutate: postGlobalAircraftRegistration, isLoading: aircraftRegistrationLoading, isSuccess: aircraftRegistrationSuccess, isError: aircraftRegistrationError, postData: aircraftRegistrationPostData, message: aircraftRegistrationMessage } = usePostGlobalAircraftRegistration();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();


	const handleDetails = (data) => {
		setAircraftRegistrationModal({ isOpen: true, type: 'view', data, title: 'Aircraft registration' });
	};

	const closeAddModal = () => {
		setAircraftRegistrationModal(defaultModalParams)
	};

	const onFinishHandler = (values) => {
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
		setAircraftRegistrationModal({ isOpen: true, type: 'edit', data, title: 'Update aircraft registration' });
	};

	const handleEditButton = () => {
		// if (disabled) {
		// 	dispatch(formDisabled());
		// }
		closeAddModal();
	};

	useEffect(() => {
		const { data } = aircraftRegistrationModal
		if (data) {
			const initialValuesObj = {
				registration: data.registration ?? '',
				internal: data.internal ?? 'NA',
				iataCode: data.iataCode ?? '',
				iacoCode: data.iacoCode ?? 'NA',
				aircraftType: data.aircraftType ?? '',
				typeOfUse: data.typeOfUse ?? 'NA',
				homeAirport: data.homeAirport ?? 'NA',
				nationality: data.nationality ?? 'NA',
				cockpitCrew: data.cockpitCrew ?? 'NA',
				cabinCrew: data.cabinCrew ?? 'NA',
				numberOfSeats: data.numberOfSeats ?? 'NA',
				height: data.height ?? 'NA',
				length: data.length ?? 'NA',
				wingspan: data.wingspan ?? 'NA',
				mtow: data.mtow ?? 'NA',
				mow: data.mow ?? 'NA',
				annex: data.annex ?? '',
				mainDeck: data.mainDeck ?? 'NA',
				apuInop: data.apuInop ?? 'NA',
				ownerName: data.ownerName ?? 'NA',
				country: data.country ?? 'NA',
				address: data.address ?? 'NA',
				remarks: data.remarks ?? 'NA',
				validFrom: data.validFrom ? dayjs(data.validFrom) : '',
				validTo: data.validTo ? dayjs(data.validTo) : '',
			};
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftRegistrationModal.isOpen]);

	const columns = useMemo(() => [
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
	], [data]);
	useEffect(() => {
		if (createProps.new) {
			setAircraftRegistrationModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new])
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
				isModalOpen={aircraftRegistrationModal.isOpen}
				closeModal={closeAddModal}
				title={aircraftRegistrationModal.title}
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" form={initial} onFinish={onFinishHandler} >
					<AircraftRegistrationForm isReadOnly={aircraftRegistrationModal.type === 'view'} />
					{aircraftRegistrationModal.type !== 'view' &&
						<>
							<Divider />
							<div className="custom_buttons">
								<ButtonComponent
									title="Cancel"
									type="filledText"
									className="custom_button_cancel"
									onClick={closeAddModal}
								/>
								<ButtonComponent
									title={aircraftRegistrationModal.type === 'edit' ? 'Update' : 'Save'}
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

export default AircraftRegistrationTable;
