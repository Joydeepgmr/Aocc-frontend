import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGlobalAirport } from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import AirportForm from '../airportForm/airportForm';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import './airportTable.scss';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';


const AirportTable = ({ createProps, setCreateProps, pagination, fetchData }) => {
	const {
		postGlobalAirport,
		patchGlobalAirport,
		deleteGlobalAirport,
		updatedData: data = [],
		successMessage,
		errorMessage
	} = useGlobalAirport();
	console.log(postGlobalAirport, 'postGlobal');

	const [initial] = Form.useForm();
	const { mutate: postAirport, isSuccess: isCreateNewSuccess, error: isCreateNewError, isLoading: isCreateNewLoading } = postGlobalAirport;
	const { mutate: patchAirport, isSuccess: isEditSuccess, error: isEditError, isLoading: isEditLoading } = patchGlobalAirport;
	const { mutate: deleteAirport, isSuccess: isDeleteSuccess, error: isDeleteError, isLoading: isDeleteLoading } = deleteGlobalAirport;
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your airport' };
	const [airportModal, setAirportModal] = useState(defaultModalParams);
	const [isLoading, setIsLoading] = useState(false);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null })

	const closeAddModal = () => {
		initial.resetFields();
		setAirportModal(defaultModalParams)
	};
	const closeDeleteModal = () => {
		setDeleteModal({ isOpen: false, id: null });
	}

	const getFormValues = (data) => {
		return {
			name: data?.name,
			iataCode: data?.iataCode,
			icaoCode: data?.icaoCode,
			abbreviatedName1: data?.abbreviatedName1,
			abbreviatedName2: data?.abbreviatedName2,
			abbreviatedName3: data?.abbreviatedName3,
			abbreviatedName4: data?.abbreviatedName4,
			airportType: data?.airportType,
			countryCode: data?.countryCode,
			standardFlightTime: data?.standardFlightTime,
			timeChange: data?.timeChange,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		}
	}

	const onFinishHandler = (values) => {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTo = values?.validTo && dayjs(values?.validTo).format('YYYY-MM-DD');

		if (airportModal.type === 'edit') {
			const id = airportModal.data.id;
			// values.iataCode = values?.iataCode;
			// values.icaoCode = values?.icaoCode;
			values.countryCode = values?.countryCode;
			values.standardFlightTime = values?.standardFlightTime;
			delete values.iataCode
			delete values.validFrom
			patchAirport({ values, id });
		} else {
			values.iataCode = values?.iataCode?.join('');
			values.icaoCode = values?.icaoCode?.join('');
			values.countryCode = values?.countryCode?.join('');
			postAirport(values);
		}
		// closeAddModal();
	};

	const handleDelete = () => {
		deleteAirport(deleteModal.id);
		closeDeleteModal();
	};


	const handleEdit = (data) => {
		setAirportModal({ isOpen: true, type: 'edit', data, title: 'Update your airport' });
	};


	const handleDetails = (data) => {
		setAirportModal({ isOpen: true, type: 'view', data, title: 'Your Airport' });
	};


	// useEffect(() => {
	// 	const { data } = airportModal
	// 	if (data) {
	// 		const initialValuesObj = {
	// 			name: data.name ?? '',
	// 			iataCode: data.iataCode ?? '',
	// 			icaoCode: data.icaoCode ?? '',
	// 			abbreviatedName1: data.abbreviatedName1 ?? '',
	// 			abbreviatedName2: data.abbreviatedName2 ?? '',
	// 			abbreviatedName3: data.abbreviatedName3 ?? '',
	// 			abbreviatedName4: data.abbreviatedName4 ?? '',
	// 			airportType: data.airportType ?? '',
	// 			countryCode: data.countryCode ?? '',
	// 			standardFlightTime: data.standardFlightTime ?? '',
	// 			timeChange: data.timeChange ?? '',
	// 			validFrom: data.validFrom ? dayjs(data.validFrom) : '',
	// 			validTill: data.validTill ? dayjs(data.validTill) : null,
	// 		};
	// 		initial.setFieldsValue(initialValuesObj);
	// 	}
	// }, [airportModal.isOpen]);


	useEffect(() => {
		const { data } = airportModal
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [airportModal.isOpen]);

	useEffect(() => {
		if (isEditSuccess || isCreateNewSuccess || isDeleteSuccess) {
			toast.dismiss();
			toast.success(successMessage)
			if (airportModal.isOpen) {
				closeAddModal();
			}
		}

	}, [isCreateNewSuccess, isEditSuccess, isDeleteSuccess]);

	useEffect(() => {
		if (isEditError || isCreateNewError || isDeleteError) {
			toast.dismiss();
			toast.error(errorMessage)
		}
	}, [isEditError, isCreateNewError, isDeleteError])

	useEffect(() => {
		if (isCreateNewLoading || isEditLoading || isDeleteLoading) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [isCreateNewLoading, isEditLoading, isDeleteLoading])

	useEffect(() => {
		if (createProps.new) {
			setAirportModal({ ...defaultModalParams, isOpen: true });
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
							onClick={() => setDeleteModal({ isOpen: true, id: record.id })}
							type="iconWithBorder"
							icon={deleteIcon}
							className="custom_icon_buttons"
						/>
					</div>
				),
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
				render: (text) => text || '-',
			},
			{
				title: 'Airport Code',
				dataIndex: 'iataCode',
				key: 'iataCode',
				render: (text) => text || '-',
			},
			{
				title: 'Airport Type',
				dataIndex: 'airportType',
				key: 'airportType',
				render: (text) => text || '-',
			},
			{
				title: 'Country Code',
				dataIndex: 'countryCode',
				key: 'countryCode',
				render: (text) => text || '-',
			},
			{
				title: 'Standard Flight Time',
				dataIndex: 'standardFlightTime',
				key: 'standardFlightTime',
				render: (text) => text || '-',
			},
			{
				title: 'Time Change',
				dataIndex: 'timeChange',
				key: 'timeChange',
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
		];
	}, [data])

	return (
		<div>
			<PageLoader loading={isLoading} />
			<ConfirmationModal isOpen={deleteModal.isOpen} onClose={closeDeleteModal} onSave={handleDelete} content='You want to delete this record' />
			<ModalComponent
				isModalOpen={airportModal.isOpen}
				closeModal={closeAddModal}
				title={airportModal.title}
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AirportForm isReadOnly={airportModal.type === 'view'} type={airportModal.type} />
					{airportModal.type !== 'view' && <>
						<Divider />
						<div className="custom_buttons">
							<ButtonComponent
								title="Cancel"
								type="filledText"
								className="custom_button_cancel"
								onClick={closeAddModal}
							/>
							<ButtonComponent
								title={airportModal.type === 'edit' ? 'Update' : 'Save'}
								type="filledText"
								className="custom_button_save"
								isSubmit={true}
							/>
						</div>
					</>}
				</Form>
			</ModalComponent>
			{data && data?.length ?
				<div className="create_wrapper_table">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Airports
						</CustomTypography>
						<TableComponent {...{ data, columns, fetchData, pagination }} />
					</div>
				</div> :
				<>
				</>
			}
		</div>
	);
};

export default AirportTable;
