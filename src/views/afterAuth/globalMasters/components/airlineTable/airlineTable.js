import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../assets/logo/edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import {
	useGlobalAirline,
} from '../../../../../services/globalMasters/globalMaster';
import AirlineForm from '../airlineForm/airlineForm';
import './airlineTable.scss';

const AirlineTable = ({ createProps, setCreateProps, fetchData, pagination }) => {
	const { postGlobalAirline, patchGlobalAirline, deleteGlobalAirline, updatedData: data = [], successMessage, errorMessage } = useGlobalAirline();
	const { mutate: postGlobalAirLineRegistration, isSuccess: isCreateNewSuccess, isError: isCreateNewError } = postGlobalAirline;
	const { mutate: patchAirline, isSuccess: isEditSuccess, isError: isEditError } = patchGlobalAirline;
	const { mutate: deleteAirline, isSuccess: isDeleteSuccess, isError: isDeleteError } = deleteGlobalAirline;
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup airline registration' }; // type could be 'new' | 'view' | 'edit'
	const [airlineRegistrationModal, setAirlineRegistrationModal] = useState(defaultModalParams);
	const [initial] = Form.useForm();
	const getFormValues = (data) => {
		return {
			name: data.name,
			twoLetterCode: data.twoLetterCode,
			threeLetterCode: data.threeLetterCode,
			country: data.country,
			globalAirport: data.globalAirport ?? data?.homeAirport?.id,
			terminal: data.terminal,
			airlineType: data.airlineType,
			remark: data.remark,
			paymentMode: data.paymentMode,
			address: data.address,
			phoneNumber: data.phoneNumber,
			validFrom: data.validFrom && dayjs(data.validFrom),
			validTill: data.validTill && dayjs(data.validTill),
		};
	}
	const handleDetails = (data) => {
		setAirlineRegistrationModal({ isOpen: true, type: 'view', data, title: 'Airline registration' });
	};

	const closeAddModal = () => {
		setAirlineRegistrationModal(defaultModalParams);
		initial.resetFields();
	};

	const onFinishHandler = (values) => {
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		if (airlineRegistrationModal.type === 'edit') {
			delete values.twoLetterCode;
			delete values.threeLetterCode;
			delete values.validFrom
			values.id = airlineRegistrationModal.data.id;
			patchAirline(values);
		} else {
			values.twoLetterCode = values.twoLetterCode.join('');
			values.threeLetterCode = values.threeLetterCode.join('');
			postGlobalAirLineRegistration(values);
		}
	};

	const handleDelete = (record) => {
		deleteAirline(record.id);
	};

	const handleEdit = (data) => {
		setAirlineRegistrationModal({ isOpen: true, type: 'edit', data, title: 'Update airline registration' });
	};

	useEffect(() => {
		const { data } = airlineRegistrationModal;
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [airlineRegistrationModal.isOpen]);

	useEffect(() => {
		if (isCreateNewSuccess || isEditSuccess || isDeleteSuccess) {
			if (airlineRegistrationModal.isOpen) {
				closeAddModal();
			}
			toast.dismiss();
			toast.success(successMessage);
		}
	}, [isCreateNewSuccess, isEditSuccess, isDeleteSuccess])
	useEffect(() => {
		if (isCreateNewError || isEditError || isDeleteError) {
			toast.dismiss()
			toast.error(errorMessage);
		}
	}, [isCreateNewError, isEditError, isDeleteError])
	useEffect(() => {
		if (createProps.new) {
			setAirlineRegistrationModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new]);

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
				title: 'Airline Name',
				dataIndex: 'name',
				key: 'name',
				render: (text) => text || '-',
			},
			{
				title: 'IATA Code',
				dataIndex: 'iataCode',
				key: 'iataCode',
				render: (text) => text || '-',
			},
			{
				title: 'ICAO Type',
				dataIndex: 'airportType',
				key: 'airportType',
				render: (text) => text || '-',
			},
			{
				title: 'Country',
				dataIndex: 'country',
				key: 'country',
				render: (text) => text || '-',
			},
			{
				title: 'Home Airport',
				dataIndex: 'homeAirport',
				key: 'homeAirport',
				render: (text) => text?.name || '-',
			},
			{
				title: 'Terminal',
				dataIndex: 'terminal',
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
		],
		[data]
	);
	return (
		<div>
			{data && data?.length ? (
				<div className="create_wrapper_table">
					<div className="table_container">
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Airlines
						</CustomTypography>
						<TableComponent {...{ data, columns, fetchData, pagination }} />
					</div>
				</div>
			) : <></>}

			<ModalComponent
				isModalOpen={airlineRegistrationModal.isOpen}
				closeModal={closeAddModal}
				title={airlineRegistrationModal.title}
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AirlineForm
						isReadOnly={airlineRegistrationModal.type === 'view'}
						type={airlineRegistrationModal.type}
					/>
					{airlineRegistrationModal.type !== 'view' && (
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
									title={airlineRegistrationModal.type === 'edit' ? 'Update' : 'Save'}
									type="filledText"
									className="custom_button_cancel"
									isSubmit={true}
								/>
							</div>
						</>
					)}
				</Form>
			</ModalComponent>
		</div>
	);
};

export default AirlineTable;
