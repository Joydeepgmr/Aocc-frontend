import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../assets/logo/edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import {
	useGlobalAircraftRegistration
} from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';
import './aircraftRegistrationTable.scss';

const AircraftRegistrationTable = ({ createProps, setCreateProps }) => {
	const { postGlobalAircraftRegistration, patchGlobalAircraftRegistration, deleteGlobalAircraftRegistration, updatedData: data = [], successMessage, errorMessage } = useGlobalAircraftRegistration();
	const { mutate: postAircraftRegistration, isSuccess: isCreateNewSuccess, error: isCreateNewError } = postGlobalAircraftRegistration;
	const { mutate: patchAircraftRegistration, isSuccess: isEditSuccess, error: isEditError } = patchGlobalAircraftRegistration;
	const { mutate: deleteAircraftRegistration, isSuccess: isDeleteSuccess, error: isDeleteError } = deleteGlobalAircraftRegistration;
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup aircraft registration' }; // type could be 'new' | 'view' | 'edit'
	const [aircraftRegistrationModal, setAircraftRegistrationModal] = useState(defaultModalParams);
	const [initial] = Form.useForm();
	const handleDetails = (data) => {
		setAircraftRegistrationModal({ isOpen: true, type: 'view', data, title: 'Aircraft registration' });
	};

	const closeAddModal = () => {
		initial.resetFields();
		setAircraftRegistrationModal(defaultModalParams);
	};

	const getFormValues = (data) => {
		return {
			registration: data?.registration,
			internal: data?.internal,
			iataCode: data?.iataCode,
			iacoCode: data?.iacoCode,
			aircraftType: data?.aircraftType,
			usage: data?.usage,
			globalAirportId: data?.globalAirportId,
			nationality: data?.nationality,
			cockpitCrew: data?.cockpitCrew,
			cabinCrew: data?.cabinCrew,
			numberOfSeats: data?.numberOfSeats && parseInt(data?.numberOfSeats),
			height: data?.height && parseInt(data?.height),
			length: data?.length && parseInt(data?.length),
			wingspan: data?.wingspan && parseInt(data?.wingspan),
			mtow: data?.mtow,
			mow: data?.mow,
			annex: data?.annex,
			mainDeck: data?.mainDeck,
			// apuInop: data?.apuInop,
			ownerName: data?.ownerName,
			country: data?.country,
			address: data?.address,
			remarks: data?.remarks,
			validFrom: data?.validFrom ? dayjs(data?.validFrom) : '',
			validTill: data?.validTill ? dayjs(data?.validTill) : '',
		};
	}

	const onFinishHandler = (values) => {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		values.iataCode = values?.iataCode;
		values.icaoCode = values?.icaoCode;
		if (aircraftRegistrationModal.type === 'new') {
			postAircraftRegistration(values);
		} else {
			values.id = aircraftRegistrationModal.data.id;
			patchAircraftRegistration(values);
		}
	};

	const handleDelete = (record) => {
		deleteAircraftRegistration(record.id);
	};

	const handleEdit = (data) => {
		setAircraftRegistrationModal({ isOpen: true, type: 'edit', data, title: 'Update aircraft registration' });
	};

	const handleEditButton = () => {
		// if (disabled) {
		// 	dispatch(formDisabled());
		// }
		closeAddModal();
	};
	console.log('messages are ', successMessage, errorMessage)

	useEffect(() => {
		const { data } = aircraftRegistrationModal;
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftRegistrationModal.isOpen]);

	useEffect(() => {
		if (aircraftRegistrationModal.isOpen) {
			closeAddModal();
		}
		if (successMessage) {
			alert(successMessage)
		}
	}, [isCreateNewSuccess, isEditSuccess, isDeleteSuccess])

	useEffect(() => {
		if (errorMessage) {
			alert(errorMessage);
		}
	}, [isCreateNewError, isDeleteError, isEditError])

	useEffect(() => {
		if (createProps.new) {
			setAircraftRegistrationModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new])

	const columns = useMemo(
		() => [
			{
				title: 'Actions',
				key: 'actions',
				render: (text, record) => (
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
		],
		[data]
	);
	return (
		<div>
			{data?.length
				?
				<div className="create_wrapper_table">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Aircraft Registrations
						</CustomTypography>
						<TableComponent data={data} columns={columns} />
					</div>

				</div> : <></>
			}
			<ModalComponent
				isModalOpen={aircraftRegistrationModal.isOpen}
				closeModal={closeAddModal}
				title={aircraftRegistrationModal.title}
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" form={initial} onFinish={onFinishHandler} >
					<AircraftRegistrationForm isReadOnly={aircraftRegistrationModal.type === 'view'} type={aircraftRegistrationModal.type} />
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
						</>
					}
				</Form>
			</ModalComponent>
		</div>
	);
};

export default AircraftRegistrationTable;
