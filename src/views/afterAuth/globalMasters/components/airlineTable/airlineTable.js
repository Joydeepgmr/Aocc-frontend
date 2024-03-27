import React, { useEffect, useState, useMemo } from 'react';
import './airlineTable.scss';
import { useGetGlobalAirline, usePostGlobalAirline } from '../../../../../services/globalMasters/globalMaster';
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import AirlineForm from '../airlineForm/airlineForm';
// import { formDisabled, updateAirportData } from '../../redux/reducer';
// import { useDispatch, useSelector } from 'react-redux';

const AirlineTable = ({ createProps, setCreateProps, data }) => {
	const getGlobalAirlineResponse = useGetGlobalAirline();
	const [airlinedata, setAirlinedata] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
	const [formDisabled, setFormDisabled] = useState(true); // State variable to track form field disabled state
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();

	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup airline registration' }; // type could be 'new' | 'view' | 'edit'
	const [airlineRegistrationModal, setAirlineRegistrationModal] = useState(defaultModalParams);
	const {
		mutate: postGlobalAirLineRegistration,
		isLoading: airlineRegistrationLoading,
		isSuccess: airlineRegistrationSuccess,
		isError: airlineRegistrationError,
		postData: airlineRegistrationPostData,
		message: airlineRegistrationMessage,
	} = usePostGlobalAirline();

	const handleDetails = (data) => {
		setAirlineRegistrationModal({ isOpen: true, type: 'view', data, title: 'Airline registration' });
	};

	const closeAddModal = () => {
		setAirlineRegistrationModal(defaultModalParams);
		initial.resetFields();
	};

	const onFinishHanlder = (values) => {
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTo = values?.validTo && dayjs(values?.validTo).format('YYYY-MM-DD');

		values.twoLetterCode = values?.twoLetterCode;
		values.threeLetterCode = values?.threeLetterCode;
		console.log(values, 'valll');

		if (airlineRegistrationModal.type === 'new') {
			postGlobalAirLineRegistration(values);
		} else {
			console.log('update');
		}

		// After posting data, fetch the updated data again
		if (getGlobalAirlineResponse.isSuccess) {
			setAirlinedata(getGlobalAirlineResponse.data); // Assuming setData is a state setter for the table data
		}
		closeAddModal();
	};

	const handleDelete = (record) => {
		// const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
		// dispatch(updateAirportData(updatedData));
	};

	const handleEdit = (data) => {
		setAirlineRegistrationModal({ isOpen: true, type: 'edit', data, title: 'Update airline registration' });
	};

	const handleEditButton = () => {
		// if (disabled) {
		// 	dispatch(formDisabled());
		// }
		closeAddModal();
	};

	useEffect(() => {
		const { data } = airlineRegistrationModal;
		if (data) {
			const initialValuesObj = {
				name: data.name ?? '',
				twoLetterCode: data.twoLetterCode ?? '',
				threeLetterCode: data.threeLetterCode ?? '',
				country: data.country ?? '',
				homeAirport: data.homeAirport ?? '',
				terminal: data.terminal ?? '',
				remark: data.remark ?? '',
				modeOfPayment: data.modeOfPayment ?? '',
				address1: data.address1 ?? '',
				phone: data.phone ?? '',
				telex: data.telex ?? '',
				validFrom: data.validFrom ? dayjs(data.validFrom) : '',
				validTo: data.validTo ? dayjs(data.validTo) : '',
			};
			// setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [airlineRegistrationModal.isOpen, airlineRegistrationModal.data]);

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
				render: (text) => text || '-',
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
			<div className="create_wrapper_table">
				<div className="table_container">
					<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
						Airlines
					</CustomTypography>
					<TableComponent data={data} columns={columns} />
				</div>
			</div>
			<ModalComponent
				isModalOpen={airlineRegistrationModal.isOpen}
				closeModal={closeAddModal}
				title={airlineRegistrationModal.title}
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHanlder} form={initial}>
					<AirlineForm isReadOnly={airlineRegistrationModal.type === 'view'} />
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
