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
	usePostGlobalAircraftRegistration,
	usePatchGlobalAircraftRegistration,
	useDeleteGlobalAircraftRegistration,
} from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';
import './aircraftRegistrationTable.scss';
import { CapitaliseFirstLetter } from '../../../../../utils';

const AircraftRegistrationTable = ({
	createProps,
	setCreateProps,
	data,
	fetchData,
	pagination,
	aircraftTypeDropdownData,
	loading,
}) => {
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup aircraft registration' }; // type could be 'new' | 'view' | 'edit'
	const [aircraftRegistrationModal, setAircraftRegistrationModal] = useState(defaultModalParams);
	const [aircraftRegistrationData, setAircraftRegistrationData] = useState([]);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setAircraftRegistrationData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError,
	};
	const { mutate: postAircraftRegistration, isLoading: isCreateNewLoading } =
		usePostGlobalAircraftRegistration(postApiProps);
	const patchApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftRegistrationData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			});
			setAircraftRegistrationData([...updatedData]);
			closeAddModal();
		},
		onError,
	};
	const { mutate: patchAircraftRegistration, isLoading: isEditLoading } =
		usePatchGlobalAircraftRegistration(patchApiProps);
	const deleteApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftRegistrationData.filter((elm) => {
				return elm.id !== deleteModal.id;
			});
			setAircraftRegistrationData([...updatedData]);
			closeDeleteModal();
		},
		onError,
	};
	const { mutate: deleteAircraftRegistration, isLoading: isDeleteLoading } =
		useDeleteGlobalAircraftRegistration(deleteApiProps);
	const [initial] = Form.useForm();
	const aircraftIdWatch = Form.useWatch('aircraft_id', initial);

	function handleDetails(data, isEdit) {
		const type = data ? isEdit ? 'edit' : 'view' : 'new'
		setAircraftRegistrationModal({ isOpen: true, type, data, title: 'Aircraft registration' });
	}
	function handleDelete() {
		deleteAircraftRegistration(deleteModal.id);
	}
	function openDeleteModal(data) {
		setDeleteModal({ isOpen: true, id: data.id });
	}
	function closeAddModal() {
		initial.resetFields();
		setAircraftRegistrationModal(defaultModalParams);
	}
	function closeDeleteModal() {
		setDeleteModal({ isOpen: false, id: null });
	}

	function getFormValues(data) {
		console.log('data?.airportId ', data?.airportId);
		console.log('data?.globalAirportId ', data?.globalAirportId);
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
		values.mainDeck = values?.mainDeck ? CapitaliseFirstLetter(values.mainDeck) : undefined;
		values.iataCode = values?.iataCode ? CapitaliseFirstLetter(values.iataCode) : undefined;
		values.icaoCode = values?.icaoCode ? CapitaliseFirstLetter(values.icaoCode) : undefined;
		values.remark = values?.remark ? CapitaliseFirstLetter(values.remark) : undefined;
		values.annex = values?.annex ? CapitaliseFirstLetter(values.annex) : undefined;
		values.ownerName = values?.ownerName ? CapitaliseFirstLetter(values.ownerName) : undefined;
		values.address = values?.address ? CapitaliseFirstLetter(values.address) : undefined;
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
	}

	useEffect(() => {
		if (aircraftIdWatch) {
			if (aircraftRegistrationModal?.data?.globalAircraftType) {
				const { length, height, wingspan, totalSeats } = aircraftRegistrationModal?.data?.globalAircraftType;
				initial.setFieldsValue({ length, height, wingspan, totalSeats });
			} else if (aircraftTypeDropdownData?.length) {
				const selectedAircraft = aircraftTypeDropdownData.filter(({ id }) => id === aircraftIdWatch)?.[0];
				const { length, height, wingspan, totalSeats } = selectedAircraft;
				initial.setFieldsValue({ length, height, wingspan, totalSeats });
			}
		}
	}, [aircraftIdWatch]);
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
	}, [createProps.new]);
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
				title: 'REG',
				dataIndex: 'registration',
				key: 'registration',
				align: 'center',
				render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetails(record)}>{text ?? '-'}</div>,
			},
			{
				title: 'INTERNAL',
				dataIndex: 'internal',
				key: 'internal',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: '3L',
				dataIndex: 'iataCode',
				key: 'iataCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: '4L',
				dataIndex: 'icaoCode',
				key: 'icaoCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'NAT',
				dataIndex: 'nationality',
				key: 'nationality',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'AIRPORT',
				dataIndex: 'globalAirportId',
				key: 'globalAirportId',
				align: 'center',
				render: (text) => text?.name || '-',
			}
		],
		[aircraftRegistrationData]
	);
	return (
		<>
			<PageLoader loading={isCreateNewLoading || isEditLoading || isDeleteLoading} />
			<ConfirmationModal
				isOpen={deleteModal.isOpen}
				onClose={closeDeleteModal}
				onSave={handleDelete}
				content="You want to delete this record"
			/>
			<ModalComponent
				isModalOpen={aircraftRegistrationModal.isOpen}
				onEdit={aircraftRegistrationModal.type !== 'edit' && handleDetails}
				onDelete={openDeleteModal}
				record={aircraftRegistrationModal.data}
				closeModal={closeAddModal}
				title={aircraftRegistrationModal.title}
				width="80%"
				className="custom_modal"
			>
				<Form autoComplete='off' layout="vertical" form={initial} onFinish={onFinishHandler}>
					<AircraftRegistrationForm
						isReadOnly={aircraftRegistrationModal.type === 'view'}
						type={aircraftRegistrationModal.type}
						{...{ aircraftTypeDropdownData }}
					/>
					{aircraftRegistrationModal.type !== 'view' && (
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
					)}
				</Form>
			</ModalComponent>
			<div>
				<div className="create_wrapper_table">
					<div className="table_container">
						<TableComponent
							{...{ data: aircraftRegistrationData, columns, fetchData, pagination, loading }}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(AircraftRegistrationTable);
