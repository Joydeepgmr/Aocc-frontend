import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { memo, useEffect, useMemo, useState } from 'react';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../assets/logo/edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import {
	useGlobalAircraftRegistration, useGlobalAircraftType
} from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';
import './aircraftRegistrationTable.scss';
import toast from 'react-hot-toast';
import PageLoader from '../../../../../components/pageLoader/pageLoader';

const AircraftRegistrationTable = ({ createProps, setCreateProps, fetchData, pagination }) => {
	const { postGlobalAircraftRegistration, patchGlobalAircraftRegistration, deleteGlobalAircraftRegistration, updatedData: data = [], successMessage, errorMessage } = useGlobalAircraftRegistration();
	const { mutate: postAircraftRegistration, isSuccess: isCreateNewSuccess, error: isCreateNewError, isLoading: isCreateNewLoading } = postGlobalAircraftRegistration;
	const { mutate: patchAircraftRegistration, isSuccess: isEditSuccess, error: isEditError, isLoading: isEditLoading } = patchGlobalAircraftRegistration;
	const { mutate: deleteAircraftRegistration, isSuccess: isDeleteSuccess, error: isDeleteError, isLoading: isDeleteLoading } = deleteGlobalAircraftRegistration;
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup aircraft registration' }; // type could be 'new' | 'view' | 'edit'
	const [aircraftRegistrationModal, setAircraftRegistrationModal] = useState(defaultModalParams);
	const [isLoading, setIsLoading] = useState(false);
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
			aircraft_id: typeof data?.aircraft_id === 'string' ? data?.aircraft_id : data?.globalAircraftType?.id ?? null,
			usage: data?.usage,
			globalAirportId: typeof data?.globalAirportId === 'string' ? data?.globalAirportId : data?.globalAirportId?.id,
			nationality: data?.nationality,
			cockpitCrew: data?.cockpitCrew,
			cabinCrew: data?.cabinCrew,
			// numberOfSeats: data?.numberOfSeats && parseInt(data?.numberOfSeats),
			// height: data?.height && parseInt(data?.height),
			// length: data?.length && parseInt(data?.length),
			// wingspan: data?.wingspan && parseInt(data?.wingspan),
			mtow: data?.mtow,
			mow: data?.mow,
			annex: data?.annex,
			mainDeck: data?.mainDeck,
			// apuInop: data?.apuInop,
			ownerName: data?.ownerName,
			country: data?.country,
			address: data?.address,
			remarks: data?.remarks,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
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
			delete values.aircraft_id;
			delete values.validFrom;
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
			toast.dismiss()
			toast.success(successMessage);
		}
	}, [isCreateNewSuccess, isEditSuccess, isDeleteSuccess])
	useEffect(() => {
		if (isCreateNewLoading || isEditLoading || isDeleteLoading) {
			setIsLoading(true);
		} else {
			setIsLoading(false)
		}
	}, [isCreateNewLoading, isEditLoading, isDeleteLoading])
	useEffect(() => {
		if (errorMessage) {
			toast.dismiss()
			toast.error(errorMessage);
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
			<PageLoader loading={isLoading} />
			{data?.length
				?
				<div className="create_wrapper_table">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Aircraft Registrations
						</CustomTypography>
						{fetchData
							?
							<InfiniteScroll
								dataLength={data.length} // This is important to determine when to fetch more data
								next={fetchData} // Function to call when reaching the end of the list
								hasMore={pagination?.isMore} // Boolean to indicate if there is more data to load
							>
								<TableComponent data={data} columns={columns} />
							</InfiniteScroll>
							: <TableComponent data={data} columns={columns} />}
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

export default memo(AircraftRegistrationTable);
