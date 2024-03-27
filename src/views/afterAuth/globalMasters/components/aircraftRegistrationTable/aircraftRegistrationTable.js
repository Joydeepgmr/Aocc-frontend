import React, { useState, useEffect, useMemo } from 'react';
import {
	useDeleteGlobalAircraftRegistration,
	useGetGlobalAircraftRegistration,
	usePatchGlobalAircraftRegistration,
	usePostGlobalAircraftRegistration,
} from '../../../../../services/globalMasters/globalMaster';
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

const AircraftRegistrationTable = ({ createProps, setCreateProps, data = [] }) => {
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup aircraft registration' }; // type could be 'new' | 'view' | 'edit'
	const [aircraftRegistrationModal, setAircraftRegistrationModal] = useState(defaultModalParams);
	const { mutate: postGlobalAircraftRegistration, isLoading: aircraftRegistrationLoading, isSuccess: isCreateNewSuccess, isError: aircraftRegistrationError, postData: aircraftRegistrationPostData, message: aircraftRegistrationMessage } = usePostGlobalAircraftRegistration();
	const { mutate: patchGlobalAircraftRegistration, isSuccess: isEditSuccess } = usePatchGlobalAircraftRegistration();
	const { mutate: deleteGlobalAircraftRegistration } = useDeleteGlobalAircraftRegistration();
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
			typeOfUse: data?.typeOfUse,
			homeAirport: data?.homeAirport,
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
			apuInop: data?.apuInop,
			ownerName: data?.ownerName,
			country: data?.country,
			address: data?.address,
			remarks: data?.remarks,
			validFrom: data?.validFrom ? dayjs(data?.validFrom) : '',
			validTo: data?.validTo ? dayjs(data?.validTo) : '',
		};
	}

	const onFinishHandler = (values) => {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTo = values?.validTo && dayjs(values?.validTo).format('YYYY-MM-DD');
		values.iataCode = values?.iataCode;
		values.icaoCode = values?.icaoCode;
		if (aircraftRegistrationModal.type === 'new') {
			postGlobalAircraftRegistration(values);
		} else {
			values.id = aircraftRegistrationModal.data.id;
			patchGlobalAircraftRegistration(values);
		}
	};

	const handleDelete = (record) => {
		deleteGlobalAircraftRegistration(record.id);
		// const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
		// dispatch(updateAirportData(updatedData));
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

	useEffect(() => {
		const { data } = aircraftRegistrationModal;
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftRegistrationModal.isOpen]);
	useEffect(() => {
		if (isCreateNewSuccess || isEditSuccess) {
			closeAddModal();
		}
		else if (createProps.new) {
			setAircraftRegistrationModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new, isCreateNewSuccess, isEditSuccess])

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
