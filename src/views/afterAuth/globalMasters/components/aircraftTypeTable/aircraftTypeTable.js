import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePostGlobalAircraftType, useDeleteGlobalAirport, useDeleteGlobalAircraftType, usePatchGlobalAircraftType, useGetGlobalAircraftType } from "../../../../../services/globalMasters/globalMaster"
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

const AircraftTable = ({ createProps, setCreateProps, data }) => {
	const { mutate: postGlobalAircraftType, isLoading: aircraftTypeLoading, isSuccess: isCreateNewSuccess, isError: aircraftTypeError, postData: aircraftTypePostData, message: aircraftTypeMessage } = usePostGlobalAircraftType();
	const { mutate: deleteGlobalAirport } = useDeleteGlobalAirport();
	const { mutate: patchGlobalAircraftType, isSuccess: isEditSuccess } = usePatchGlobalAircraftType();
	const { mutate: deleteGlobalAircraftType } = useDeleteGlobalAircraftType();
	const { data: aircraftTypeData, mutate: getGlobalAircraftType, updatedData: updatedAircraftTypeData } = useGetGlobalAircraftType();
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
			totalSeats: data?.totalSeats && parseInt(data?.totalSeats),
			firstClass: data?.firstClass && parseInt(data?.firstClass),
			businessClass: data?.businessClass && parseInt(data?.businessClass),
			economyClass: data?.economyClass,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		}
	}
	const onFinishHandler = (values) => {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		// values.iataCode = values?.iataCode;
		// values.icaoCode = values?.icaoCode;
		// values.icaoCodeModified = values?.icaoCodeModified;
		// values.countryCode = values?.countryCode;
		if (aircraftTypeModal.type === 'edit') {
			const id = aircraftTypeModal.data.id;
			delete values.iataCode
			delete values.validFrom
			delete values.model
			patchGlobalAircraftType({ values, id });
		} else {
			postGlobalAircraftType(values);
			console.log('dispatch the create new air craft type api');
		}
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
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [aircraftTypeModal.isOpen]);

	useEffect(() => {
		if (isEditSuccess || isCreateNewSuccess) {
			closeAddModal();
		}
	}, [isEditSuccess, isCreateNewSuccess]);
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
			{data?.length ?
				<div className="create_wrapper_table">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Aircraft Type
						</CustomTypography>
						<TableComponent data={data} columns={columns} />
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