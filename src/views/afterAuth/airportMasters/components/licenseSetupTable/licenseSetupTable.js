import React, { useEffect, useState } from 'react';
import './licenseSetupTable.scss';
// import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import modalComponent from '../../../../../components/modal/modal';
import { useGetLicenseData } from '../../../../../services/airportMasters/airportMasters';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import ConvertUtcToIst from '../../../../../utils/ConvertUtcToIst';
// import { updateLicenseData, formDisabled } from '../../redux/reducer';

const LicenseSetupTable = ({ formComponent, data }) => {
	// const { additionalAirportLicenseData, disabled } = useSelector((store) => store.airportMasters);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();
	// const dispatch = useDispatch();

	// const handleDetails = (data) => {
	// 	setRowData(data);
	// 	setIsModalOpen(true);
	// 	dispatch(formDisabled());
	// };

	const closeAddModal = () => {
		setIsModalOpen(false);
		setEditData(false);
	};

	const onFinishHanlder = (values) => {
		console.log("What are values here", values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.threeCode?.join('');
		values.icaoCode = values?.fourCode?.join('');
		form.resetFields();
		// dispatch(action(values));
		closeAddModal();
	};

	// const handleDelete = (record) => {
	// 	const updatedData = additionalAirportLicenseData.filter((data) => data.airportName !== record.airportName);
	// 	dispatch(updateLicenseData(updatedData));
	// };

	// const handleEdit = (data) => {
	// 	setRowData(data);
	// 	setIsModalOpen(true);
	// 	setEditData(true);
	// 	if (!disabled) {
	// 		dispatch(formDisabled());
	// 	}
	// };

	// const handleEditButton = () => {
	// 	if (disabled) {
	// 		dispatch(formDisabled());
	// 	}
	// };

	useEffect(() => {
		if (rowData) {
			const initialValuesObj = {
				airportName: rowData.airportName ?? 'NA',
				iataCode: rowData.threeCode ?? '',
				icaoCode: rowData.fourCode ?? '',
				abbreviatedName: rowData.abbreviatedName ?? 'NA',
				email: rowData.email ?? 'NA',
				city: rowData.city ?? '',
				country: rowData.country ?? '',
				validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
				validTo: rowData.validTo ? dayjs(rowData.validTo) : '',
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [rowData]);

	// const rows = additionalAirportLicenseData?.map((data, index) => {
	// 	return {
	// 		airportName: rowData.airportName ?? 'NA',
	// 		iataCode: rowData.threeCode ?? '',
	// 		icaoCode: rowData.fourCode ?? '',
	// 		abbreviatedName: rowData.abbreviatedName ?? 'NA',
	// 		email: rowData.email ?? 'NA',
	// 		city: rowData.city ?? '',
	// 		country: rowData.country ?? '',
	// 		validFrom: data.validFrom ?? '',
	// 		validTo: data.validTo ?? '',
	// 	};
	// });

	const columns = [
		// {
		// 	title: 'Actions',
		// 	key: 'actions',
		// 	render: (
		// 		text,
		// 		record // Use the render function to customize the content of the cell
		// 	) => (
		// 		<div className="action_buttons">
		// 			<ButtonComponent
		// 				onClick={() => handleEdit(record)}
		// 				type="iconWithBorder"
		// 				icon={editIcon}
		// 				className="custom_icon_buttons"
		// 			/>
		// 			<ButtonComponent
		// 				onClick={() => handleDelete(record)}
		// 				type="iconWithBorder"
		// 				icon={deleteIcon}
		// 				className="custom_icon_buttons"
		// 			/>
		// 		</div>
		// 	),
		// },
		{
			title: 'Airport Name',
			dataIndex: 'airportName',
			key: 'airportName',
			render: (text) => text || '-',
		},
		{
			title: 'IATA Code',
			dataIndex: 'iataCode',
			key: 'iataCode',
			render: (text) => text || '-',
		},
		{
			title: 'ICAO Code',
			dataIndex: 'icaoCode',
			key: 'icaoCode',
			render: (text) => text || '-',
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
			render: (text) => text || '-',
		},
		{
			title: 'City',
			dataIndex: 'city',
			key: 'city',
			render: (text) => text || '-',
		},
		{
			title: 'Valid From',
			dataIndex: 'validFrom',
			key: 'validFrom',
			render: (text) => ConvertUtcToIst(text, "DD/MM/YYYY") || '-',
		},
		{
			title: 'Valid To',
			dataIndex: 'validTo',
			key: 'validTo',
			render: (text) => ConvertUtcToIst(text, "DD/MM/YYYY") || '-',
		},
	];

	return (
		<div>
			<div className="create_wrapper_table">
				<div className="table_container">
					<TableComponent data={data} columns={columns} />
				</div>
			</div>
			{/* <ModalComponent
				isModalOpen={isModalOpen}
				closeModal={closeAddModal}
				title="Setup your airport"
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHanlder} form={initial}>
					{formComponent && formComponent}
					<Divider />
					{!disabled && !editData && (
						<>
							<div className="custom_buttons">
								<>
									<ButtonComponent
										title="Cancel"
										type="filledText"
										className="custom_button_cancel"
										onClick={closeAddModal}
									/>
									<ButtonComponent
										title="Save"
										type="filledText"
										className="custom_button_save"
										isSubmit={true}
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
			</ModalComponent> */}
		</div>
	)
}

export default LicenseSetupTable;