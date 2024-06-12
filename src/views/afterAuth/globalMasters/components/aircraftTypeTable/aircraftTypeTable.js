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
import {
	useDeleteGlobalAircraftType,
	usePatchGlobalAircraftType,
	usePostGlobalAircraftType,
} from '../../../../../services/globalMasters/globalMaster';
import AircraftTypeForm from '../aircraftTypeForm/aircraftTypeForm';
import './aircraftTypeTable.scss';
import { CapitaliseFirstLetter } from '../../../../../utils';

const AircraftTable = ({ createProps, setCreateProps, data, pagination, fetchData, loading }) => {
	const defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your aircraft type' }; // type could be 'new' | 'view' | 'edit'
	const [dockingSystemCheck, setDockignSystemCheck] = useState(false);
	const [aircraftTypeModal, setAircraftTypeModal] = useState(defaultModalParams);
	const [aircraftTypeData, setAircraftTypeData] = useState([]);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setAircraftTypeData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError,
	};
	const { mutate: postAircraftType, isLoading: isCreateNewLoading } = usePostGlobalAircraftType(postApiProps);
	const patchApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftTypeData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			});
			setAircraftTypeData([...updatedData]);
			closeAddModal();
		},
		onError,
	};
	const { mutate: patchAircraftType, isLoading: isEditLoading } = usePatchGlobalAircraftType(patchApiProps);
	const deleteApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = aircraftTypeData.filter((elm) => {
				return elm.id !== deleteModal.id;
			});
			setAircraftTypeData([...updatedData]);
			closeDeleteModal();
		},
		onError,
	};
	const { mutate: deleteAircraftType, isLoading: isDeleteLoading } = useDeleteGlobalAircraftType(deleteApiProps);
	const [initial] = Form.useForm();

	const handleDetails = (data, isEdit) => {
		const type = data ? isEdit ? 'edit' : 'view' : 'new'
		const titlePrefix = data ? isEdit ? 'Edit' : 'View' : 'Set up your'
		setAircraftTypeModal({ isOpen: true, type, data, title: `${titlePrefix} Aircraft type` });
	}
	function handleDelete() {
		deleteAircraftType(deleteModal.id);
	}
	function closeAddModal() {
		initial.resetFields();
		setAircraftTypeModal(defaultModalParams);
	}
	function openDeleteModal(data) {
		setDeleteModal({ isOpen: true, id: data.id });
	}
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
			wingspan: data?.wingspan,
			length: data?.length,
			height: data?.height,
			engineType: data?.engineType,
			engineCount: data?.engineCount && parseInt(data?.engineCount),
			totalSeats: data?.totalSeats && parseInt(data?.totalSeats),
			firstClassSeats: data?.firstClassSeats && parseInt(data?.firstClassSeats),
			businessClassSeats: data?.businessClassSeats && parseInt(data?.businessClassSeats),
			economyClassSeats: data?.economyClassSeats,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		};
	}

	function onFinishHandler(values) {
		values = getFormValues(values);
		values.iataCode = values?.iataCode ? CapitaliseFirstLetter(values.iataCode) : undefined;
		values.icaoCode = values?.icaoCode ? CapitaliseFirstLetter(values.icaoCode) : undefined;
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		delete values.totalSeats;
		if (aircraftTypeModal.type === 'edit') {
			const id = aircraftTypeModal.data.id;
			delete values.iataCode;
			delete values.validFrom;
			delete values.model;
			patchAircraftType({ values, id });
		} else {
			postAircraftType(values);
		}
	}

	useEffect(() => {
		const { data } = aircraftTypeModal;
		setDockignSystemCheck(data?.isUsingDockingSystem);
		if (data) {
			console.log("data data is ", getFormValues(data));
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftTypeModal.isOpen]);
	useEffect(() => {
		if (createProps.new) {
			setAircraftTypeModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new]);
	useEffect(() => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
			setAircraftTypeData([...newData]);
		}
	}, [data]);
	const columns = useMemo(() => {
		return [
			{
				title: 'IDENTIFIER',
				dataIndex: 'identifier',
				key: 'identifier',
				render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetails(record)}>{text ?? '-'}</div>,
				align: 'center',
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
				title: 'MODEL',
				dataIndex: 'model',
				key: 'model',
				render: (text) => text || '-',
				align: 'center',
			},
			// {
			// 	title: 'AL',
			// 	dataIndex: 'globalAirline',
			// 	key: 'globalAirline',
			// 	align: 'center',
			// 	render: (text) => text?.name || '-',
			// },
			{
				title: 'A/C FAMILY',
				dataIndex: 'family',
				key: 'family',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'A/C BODY TYPE',
				dataIndex: 'bodyType',
				key: 'bodyType',
				align: 'center',
				render: (text) => <div style={{ textTransform: 'capitalize' }}>{text || '-'}</div>,
			},
			{
				title: 'ENGINE',
				dataIndex: 'engineCount',
				key: 'engineCount',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'WING SPAN',
				dataIndex: 'engineCount',
				key: 'engineCount',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'LENGTH',
				dataIndex: 'length',
				key: 'length',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'HEIGHT',
				dataIndex: 'height',
				key: 'height',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'SEATS',
				dataIndex: 'totalSeats',
				key: 'totalSeats',
				align: 'center',
				render: (text) => text || '-',
			},
		];
	}, [aircraftTypeData]);

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
				isModalOpen={aircraftTypeModal.isOpen}
				closeModal={closeAddModal}
				record={aircraftTypeModal.data}
				onEdit={aircraftTypeModal.type !== 'edit' && handleDetails}
				onDelete={openDeleteModal}
				title={aircraftTypeModal.title}
				width="80%"
				className="custom_modal"
			>
				<Form autoComplete='off' layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AircraftTypeForm
						isReadOnly={aircraftTypeModal.type === 'view'}
						type={aircraftTypeModal.type}
						isCheck={dockingSystemCheck}
						setIsCheck={setDockignSystemCheck}
						form={initial}
					/>
					{aircraftTypeModal.type !== 'view' && (
						<>
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
						</>
					)}
				</Form>
			</ModalComponent>
			<div>
				<div className="create_wrapper_table aircraftType">
					<div className="table_container">
						<TableComponent {...{ data: aircraftTypeData, columns, fetchData, pagination, loading }} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AircraftTable;
