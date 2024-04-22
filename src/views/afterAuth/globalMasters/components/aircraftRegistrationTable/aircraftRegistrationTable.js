import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { memo, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../assets/logo/edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import {
	usePostGlobalAircraftRegistration, usePatchGlobalAircraftRegistration, useDeleteGlobalAircraftRegistration
} from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';
import './aircraftRegistrationTable.scss';

const AircraftRegistrationTable = ({ createProps, setCreateProps, data, fetchData, pagination, airportDropdownData, aircraftTypeDropdownData, countryDropdownData, loading }) => {
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup aircraft registration' }; // type could be 'new' | 'view' | 'edit'
	const [aircraftRegistrationModal, setAircraftRegistrationModal] = useState(defaultModalParams);
	const [aircraftRegistrationData, setAircraftRegistrationData] = useState([]);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null })
	const onError = ({ response: { data: { message } } }) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setAircraftRegistrationData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError
	}
	const { mutate: postAircraftRegistration, isLoading: isCreateNewLoading } = usePostGlobalAircraftRegistration(postApiProps);
	const patchApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftRegistrationData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			setAircraftRegistrationData([...updatedData]);
			closeAddModal();
		},
		onError
	}
	const { mutate: patchAircraftRegistration, isLoading: isEditLoading } = usePatchGlobalAircraftRegistration(patchApiProps);
	const deleteApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftRegistrationData.filter((elm) => {
				return elm.id !== deleteModal.id;
			})
			setAircraftRegistrationData([...updatedData]);
			closeDeleteModal();
		},
		onError
	}
	const { mutate: deleteAircraftRegistration, isLoading: isDeleteLoading } = useDeleteGlobalAircraftRegistration(deleteApiProps);
	const [initial] = Form.useForm();
	const aircraftIdWatch = Form.useWatch('aircraft_id', initial);

	function handleDetails(data) {
		setAircraftRegistrationModal({ isOpen: true, type: 'view', data, title: 'Aircraft registration' });
	};
	function handleEdit(data) {
		setAircraftRegistrationModal({ isOpen: true, type: 'edit', data, title: 'Update aircraft registration' });
	};
	function handleDelete() {
		deleteAircraftRegistration(deleteModal.id);
	};

	function closeAddModal() {
		initial.resetFields();
		setAircraftRegistrationModal(defaultModalParams);
	};
	function closeDeleteModal() {
		setDeleteModal({ isOpen: false, id: null });
	}

	function getFormValues(data) {
		console.log('data?.airportId ', data?.airportId)
		console.log('data?.globalAirportId ', data?.globalAirportId)
		return {
			registration: data?.registration,
			internal: data?.internal,
			iataCode: data?.iataCode,
			icaoCode: data?.icaoCode,
			aircraft_id: data?.aircraft_id ?? data?.globalAircraftType?.id,
			usage: data?.usage,
			airportId: data?.airportId ?? data?.globalAirportId?.id,
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
			remark: data?.remark,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		};
	}

	function onFinishHandler(values) {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		delete values.length;
		delete values.wingspan;
		delete values.totalSeats;
		delete values.height;
		if (aircraftRegistrationModal.type === 'new') {
			postAircraftRegistration(values);
		} else {
			delete values.aircraft_id;
			delete values.airportId;
			delete values.validFrom;
			delete values.icaoCode;
			values.id = aircraftRegistrationModal.data.id;
			patchAircraftRegistration(values);
		}
	};

	useEffect(() => {
		if (aircraftIdWatch) {
			if (aircraftRegistrationModal?.data?.globalAircraftType) {
				const { length, height, wingspan, totalSeats } = aircraftRegistrationModal?.data?.globalAircraftType;
				initial.setFieldsValue({ length, height, wingspan, totalSeats })
			} else if (aircraftTypeDropdownData?.length) {
				const selectedAircraft = aircraftTypeDropdownData.filter(({ id }) => id === aircraftIdWatch)?.[0];
				const { length, height, wingspan, totalSeats } = selectedAircraft;
				initial.setFieldsValue({ length, height, wingspan, totalSeats })
			}
		}
	}, [aircraftIdWatch])
	useEffect(() => {
		const { data } = aircraftRegistrationModal;
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftRegistrationModal.isOpen]);
	useEffect(() => {
		if (createProps.new) {
			setAircraftRegistrationModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new])
	useEffect(() => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
			setAircraftRegistrationData([...newData]);
		}
	}, [data]);

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
							onClick={() => setDeleteModal({ isOpen: true, id: record.id })}
							type="iconWithBorder"
							icon={deleteIcon}
							className="custom_icon_buttons"
						/>
					</div>
				),
			},
			{
				title: 'REG',
				dataIndex: 'registration',
				key: 'registration',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'INTERNAL',
				dataIndex: 'internal',
				key: 'internal',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: '2L',
				dataIndex: 'iataCode',
				key: 'iataCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'NATIONALITY',
				dataIndex: 'nationality',
				key: 'nationality',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'HOME AIRPORT',
				dataIndex: 'globalAirportId',
				key: 'globalAirportId',
				align: 'center',
				render: (text) => text?.name || '-',
			},
			{
				title: 'View Details',
				key: 'viewDetails',
				render: (
					text,
					record // Use the render function to customize the content of the cell
				) => (
					<ButtonComponent
						style={{ margin: 'auto' }}
						title="View Details"
						type="text"
						onClick={() => {
							handleDetails(record);
						}}
					/>
				),
			},
		],
		[aircraftRegistrationData]
	);
	return (
		<>
			<PageLoader loading={isCreateNewLoading || isEditLoading || isDeleteLoading} />
			<ConfirmationModal isOpen={deleteModal.isOpen} onClose={closeDeleteModal} onSave={handleDelete} content='You want to delete this record' />
			<ModalComponent
				isModalOpen={aircraftRegistrationModal.isOpen}
				closeModal={closeAddModal}
				title={aircraftRegistrationModal.title}
				width="80%"
				className="custom_modal"
			>
				<Form layout="vertical" form={initial} onFinish={onFinishHandler} >
					<AircraftRegistrationForm isReadOnly={aircraftRegistrationModal.type === 'view'} type={aircraftRegistrationModal.type} {...{ airportDropdownData, aircraftTypeDropdownData, countryDropdownData }} />
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
			<div>
				<div className="create_wrapper_table">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Aircraft Registrations
						</CustomTypography>
						<TableComponent {...{ data: aircraftRegistrationData, columns, fetchData, pagination, loading }} />
					</div>

				</div>
			</div>
		</>
	);
};

export default memo(AircraftRegistrationTable);
