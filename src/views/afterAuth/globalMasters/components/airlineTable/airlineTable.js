import React, { useEffect, useState } from 'react';
import './airlineTable.scss';
import { usePostGlobalAirline } from '../../../../../services/globalMasters/globalMaster';
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import AirlineForm from '../AirlineForm/AirlineForm';
// import { formDisabled, updateAirportData } from '../../redux/reducer';
// import { useDispatch, useSelector } from 'react-redux';

const AirlineTable = ({ formComponent, data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
	const [formDisabled, setFormDisabled] = useState(true); // State variable to track form field disabled state
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();

	const handleDetails = (data) => {
		setRowData(data);
		setIsModalOpen(true);
	};

	const closeAddModal = () => {
		setIsModalOpen(false);
		setEditData(false);
	};

	const onFinishHanlder = (values) => {
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.twoLetterCode = values?.twoLetterCode?.join('');
		values.threeLetterCode = values?.threeLetterCode?.join('');
		form.resetFields();
		usePostGlobalAirline(values);
		// dispatch(action(values));
		closeAddModal();
	};

	const handleDelete = (record) => {
		// const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
		// dispatch(updateAirportData(updatedData));
	};

	const handleEdit = (data) => {
		setRowData(data);
		setIsModalOpen(true);
		setEditData(true);
	};

	const handleEditButton = () => {
		// if (disabled) {
		// 	dispatch(formDisabled());
		// }
		closeAddModal();
	};

	useEffect(() => {
		if (rowData) {
			const initialValuesObj = {
				name: rowData.name ?? '',
				twoLetterCode: rowData.twoLetterCode ?? '',
				threeLetterCode: rowData.threeLetterCode ?? '',
				country: rowData.country ?? '',
				homeAirport: rowData.homeAirport ?? '',
				terminal: rowData.terminal ?? '',
				remark: rowData.remark ?? '',
				modeOfPayment: rowData.modeOfPayment ?? '',
				address1: rowData.address1 ?? '',
				phone: rowData.phone ?? '',
				telex: rowData.telex ?? '',
				validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
				validTo: rowData.validTo ? dayjs(rowData.validTo) : '',
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [rowData]);

	const columns = [
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
	];
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
				isModalOpen={isModalOpen}
				closeModal={closeAddModal}
				title="Edit airline"
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHanlder} form={initial}>
					{formComponent && formComponent}
					<Divider />
					{!editData && (
						<>
							<div className="custom_buttons">
								<>
									<ButtonComponent
										title="Cancel"
										type="filledText"
										className="custom_button_cancel"
										onClick={closeAddModal}
									/>
								</>
							</div>
						</>
					)}
					{editData && (
						<>
							<div className="custom_buttons">
								<ButtonComponent
									title="Cancel"
									type="filledText"
									className="custom_button_cancel"
									onClick={closeAddModal}
								/>
								<ButtonComponent
									title="Edit"
									type="filledText"
									className="custom_button_save"
									onClick={handleEditButton}
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
