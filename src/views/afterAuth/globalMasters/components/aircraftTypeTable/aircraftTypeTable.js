import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../assets/logo/edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import { useGlobalAircraftType } from "../../../../../services/globalMasters/globalMaster";
import AircraftTypeForm from '../aircraftTypeForm/aircraftTypeForm';
import './aircraftTypeTable.scss';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';

const AircraftTable = ({ createProps, setCreateProps, pagination, fetchData }) => {
	const {
		postGlobalAirCraftType,
		patchGlobalAircraftType,
		deleteGlobalAircraftType,
		updatedData: data = [],
		successMessage,
		errorMessage,
		isLoading
	} = useGlobalAircraftType();
	const { mutate: postAircraftType, isSuccess: isCreateNewSuccess, error: isCreateNewError, isLoading: isCreateNewLoading } = postGlobalAirCraftType;
	const { mutate: patchAircraftType, isSuccess: isEditSuccess, error: isEditError, isLoading: isEditLoading, isIdle: isEditIdle } = patchGlobalAircraftType;
	const { mutate: deleteAircraftType, isSuccess: isDeleteSuccess, error: isDeleteError, isLoading: isDeleteLoading } = deleteGlobalAircraftType;
	const [initial] = Form.useForm();
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your aircraft type' };// type could be 'new' | 'view' | 'edit'
	const [aircraftTypeModal, setAircraftTypeModal] = useState(defaultModalParams);

	const closeAddModal = () => {
		initial.resetFields();
		setAircraftTypeModal(defaultModalParams)
	};
	const getFormValues = (data) => {
		return {
			identifier: data?.identifier,
			iataCode: data?.iataCode,
			model: data?.model,
			globalAirline: data?.globalAirline,
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
			// totalSeats: data?.totalSeats && parseInt(data?.totalSeats),
			firstClassSeats: data?.firstClassSeats && parseInt(data?.firstClassSeats),
			businessClassSeats: data?.businessClassSeats && parseInt(data?.businessClassSeats),
			economyClassSeats: data?.economyClassSeats,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		}
	}
	console.log("isEdit Success", isEditSuccess);
	const onFinishHandler = (values) => {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
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

	const handleDelete = (record) => {
		deleteAircraftType(record.id);
	};

	const handleEdit = (data) => {
		setAircraftTypeModal({ isOpen: true, type: 'edit', data, title: 'Update aircraft type' });
	};

	const handleDetails = (data) => {
		setAircraftTypeModal({ isOpen: true, type: 'view', data, title: 'Aircraft type' });
	};

	useEffect(() => {
		const { data } = aircraftTypeModal
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftTypeModal.isOpen]);
	console.log("messages", successMessage, errorMessage)
	useEffect(() => {
		if (isEditSuccess || isCreateNewSuccess || isDeleteSuccess) {
			toast.success(successMessage)
		}
		if (aircraftTypeModal.isOpen) {
			closeAddModal();
		}
	}, [isEditSuccess, isCreateNewSuccess, isDeleteSuccess]);
	useEffect(() => {
		if (isEditError || isCreateNewError || isDeleteError) {
			toast.error(errorMessage)
		}
	}, [isEditError, isCreateNewError, isDeleteError])
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
				dataIndex: 'globalAirline',
				key: 'globalAirline',
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
	}, [data])

	return (
		<div>
			{data?.length ?
				<div className="create_wrapper_table">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Aircraft Type
						</CustomTypography>
						{fetchData ?
							<InfiniteScroll
								dataLength={data.length} // This is important to determine when to fetch more data
								next={fetchData} // Function to call when reaching the end of the list
								hasMore={pagination?.isMore} // Boolean to indicate if there is more data to load
								loader={<h2>loading.....</h2>}
							>
								<TableComponent data={data} columns={columns} />
							</InfiniteScroll>
							: <TableComponent data={data} columns={columns} />
						}
					</div>
				</div> : <></>
			}
			<ModalComponent
				isModalOpen={aircraftTypeModal.isOpen}
				closeModal={closeAddModal}
				title={aircraftTypeModal.title}
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AircraftTypeForm isReadOnly={aircraftTypeModal.type === 'view'} type={aircraftTypeModal.type} />
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