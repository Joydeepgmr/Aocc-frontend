import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {usePostGlobalAirport} from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import './airportSetupTable.scss';


const AirportSetupTable = ({ formComponent, data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
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
		usePostGlobalAirport(values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.iataCode?.join('');
		values.icaoCode = values?.icaoCode?.join('');
		values.countryCode = values?.countryCode?.join('');
		form.resetFields();
		closeAddModal();
	};

	const handleDelete = (record) => {
		// const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
		// dispatch(updateAirportData(updatedData));
	};

	// const handleEdit = (data) => {
	// 	setRowData(data);
	// 	setIsModalOpen(true);
	// 	setEditData(true);
	// };

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
				iataCode: rowData.iataCode ?? '',
				icaoCode: rowData.icaoCode ?? '',
				abbreviatedName1: rowData.abbreviatedName1 ?? 'NA',
				abbreviatedName2: rowData.abbreviatedName2 ?? 'NA',
				abbreviatedName3: rowData.abbreviatedName3 ?? 'NA',
				abbreviatedName4: rowData.abbreviatedName4 ?? 'NA',
				countryCode: rowData.countryCode ?? 'NA',
				standardFlightTime: rowData.standardFlightTime ?? 'NA',
				timeChange: rowData.timeChange ?? 'NA',
				timeDifferenceAfter: rowData.timeDifferenceAfter ?? 'NA',
				timeDifferenceBefore: rowData.timeDifferenceBefore ?? 'NA',
				timeDifferenceSummer: rowData.timeDifferenceSummer ?? 'NA',
				timeDifferenceWinter: rowData.timeDifferenceWinter ?? 'NA',
				validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
				validTill: rowData.validTill ? dayjs(rowData.validTill) : null,
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [rowData]);

	const columns = [
		{
			title: 'Actions',
			key: 'actions',
			render: (
				text,
				record
			) => (
				<div className="action_buttons">
					{/* <ButtonComponent
						onClick={() => handleEdit(record)}
						type="iconWithBorder"
						icon={editIcon}
						className="custom_icon_buttons"
					/> */}
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
	
	return (
		<div>
			<div className="create_wrapper_table">
				<div className="table_container">
					<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
						Airports
					</CustomTypography>
					<TableComponent data={data} columns={columns} />
				</div>
			</div>
			<ModalComponent
				isModalOpen={isModalOpen}
				closeModal={closeAddModal}
				title="Setup your airport"
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
									title="Save"
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

export default AirportSetupTable;
