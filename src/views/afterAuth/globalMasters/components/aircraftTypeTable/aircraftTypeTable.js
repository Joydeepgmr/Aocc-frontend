import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../assets/logo/edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import { useDeleteGlobalAircraftType, usePatchGlobalAircraftType, usePostGlobalAircraftType } from "../../../../../services/globalMasters/globalMaster";
import AircraftTypeForm from '../aircraftTypeForm/aircraftTypeForm';
import './aircraftTypeTable.scss';

const AircraftTable = ({ createProps, setCreateProps, data, pagination, fetchData, airlineDropdownData }) => {
	const defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your aircraft type' };// type could be 'new' | 'view' | 'edit'
	const [aircraftTypeModal, setAircraftTypeModal] = useState(defaultModalParams);
	const [aircraftTypeData, setAircraftTypeData] = useState([]);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null })
	const onError = ({ response: { data: { message } } }) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setAircraftTypeData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError
	}
	const { mutate: postAircraftType, isLoading: isCreateNewLoading } = usePostGlobalAircraftType(postApiProps);
	const patchApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftTypeData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			})
			setAircraftTypeData([...updatedData]);
			closeAddModal();
		},
		onError
	}
	const { mutate: patchAircraftType, isLoading: isEditLoading } = usePatchGlobalAircraftType(patchApiProps);
	const deleteApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftTypeData.filter((elm) => {
				return elm.id !== deleteModal.id;
			})
			setAircraftTypeData([...updatedData]);
			closeDeleteModal();
		},
		onError
	}
	const { mutate: deleteAircraftType, isLoading: isDeleteLoading } = useDeleteGlobalAircraftType(deleteApiProps);
	const [initial] = Form.useForm();

	function handleDetails(data) {
		setAircraftTypeModal({ isOpen: true, type: 'view', data, title: 'Aircraft type' });
	};
	function handleEdit(data) {
		setAircraftTypeModal({ isOpen: true, type: 'edit', data, title: 'Update aircraft type' });
	};
	function handleDelete() {
		deleteAircraftType(deleteModal.id);
	};

	function closeAddModal() {
		initial.resetFields();
		setAircraftTypeModal(defaultModalParams)
	};
	function closeDeleteModal() {
		setDeleteModal({ isOpen: false, id: null });
	}
	function getFormValues(data) {
		return {
			identifier: data?.identifier,
			iataCode: data?.iataCode,
			model: data?.model,
			globalAirlineId: data?.globalAirlineId ?? data?.globalAirline?.id,
			icaoCode: data?.icaoCode,
			icaoCodeModified: data?.icaoCodeModified,
			family: data?.family,
			bodyType: data?.bodyType,
			isUsingDockingSystem: data?.isUsingDockingSystem,
			minGroundTime: data?.minGroundTime,
			wingspan: data?.wingspan && parseInt(data?.wingspan),
			length: data?.length && parseInt(data?.length),
			height: data?.height && parseInt(data?.height),
			engineType: data?.engineType,
			engineCount: data?.engineCount && parseInt(data?.engineCount),
			totalSeats: data?.totalSeats && parseInt(data?.totalSeats),
			firstClassSeats: data?.firstClassSeats && parseInt(data?.firstClassSeats),
			businessClassSeats: data?.businessClassSeats && parseInt(data?.businessClassSeats),
			economyClassSeats: data?.economyClassSeats,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		}
	}
	function onFinishHandler(values) {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		delete values.totalSeats
		if (aircraftTypeModal.type === 'edit') {
			const id = aircraftTypeModal.data.id;
			delete values.iataCode
			delete values.validFrom
			delete values.model
			patchAircraftType({ values, id });
		} else {
			postAircraftType(values);
		}
	};



	useEffect(() => {
		const { data } = aircraftTypeModal
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftTypeModal.isOpen]);
	useEffect(() => {
		if (createProps.new) {
			setAircraftTypeModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new])
	useEffect(() => {
		if (data?.pages) {
			const lastPage = data.pages.length >= 1 ? data.pages[data.pages.length - 1] : [];
			setAircraftTypeData([...aircraftTypeData, ...lastPage.data]);
		}
	}, [data]);
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
							onClick={() => setDeleteModal({ isOpen: true, id: record.id })}
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
				dataIndex: 'globalAirline',
				key: 'globalAirline',
				render: (text) => text?.name || '-',
			},
			{
				title: 'ICAO Code',
				dataIndex: 'icaoCode',
				key: 'icaoCode',
				render: (text) => text || '-',
			},
			{
				title: 'A/C Family',
				dataIndex: 'family',
				key: 'family',
				render: (text) => text || '-',
			},
			{
				title: 'A/C Body Type',
				dataIndex: 'bodyType',
				key: 'bodyType',
				render: (text) => text || '-',
			},
			{
				title: 'View Details',
				key: 'viewDetails',
				render: (
					text,
					record
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
	}, [aircraftTypeData])

	return (
		<>
			<PageLoader loading={isCreateNewLoading || isEditLoading || isDeleteLoading} />
			<ConfirmationModal isOpen={deleteModal.isOpen} onClose={closeDeleteModal} onSave={handleDelete} content='You want to delete this record' />
			<ModalComponent
				isModalOpen={aircraftTypeModal.isOpen}
				closeModal={closeAddModal}
				title={aircraftTypeModal.title}
				width="80%"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AircraftTypeForm isReadOnly={aircraftTypeModal.type === 'view'} type={aircraftTypeModal.type} airlineDropdownData={airlineDropdownData} />
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
			<div>
				<div className="create_wrapper_table aircraftType">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Aircraft Type
						</CustomTypography>
						<TableComponent {...{ data: aircraftTypeData, columns, fetchData, pagination }} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AircraftTable;