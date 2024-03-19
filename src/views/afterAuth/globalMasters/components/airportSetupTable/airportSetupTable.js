import React, { useEffect, useState } from 'react';
import './airportSetupTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import {usePostGlobalAirport} from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import { formDisabled, updateAirportData } from '../../redux/reducer';


const AirportSetupTable = ({ formComponent, data }) => {
	
	
	const { additionalAirportData, disabled } = useSelector((store) => store.globalMasters);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [initialValues, setInitialValues] = useState({});
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();
	const dispatch = useDispatch();
	const handleDetails = (data) => {
		setRowData(data);
		setIsModalOpen(true);
		dispatch(formDisabled());
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
		values.atcCode = values?.atcCode?.join('');
		values.countryCode = values?.countryCode?.join('');
		form.resetFields();
		dispatch(action(values));
		closeAddModal();
	};

	const handleDelete = (record) => {
		const updatedData = additionalAirportData.filter((data) => data.airportName !== record.airportName);
		dispatch(updateAirportData(updatedData));
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
				airportName: rowData.airportName ?? 'NA',
				iataCode: rowData.iataCode ?? '',
				atcCode: rowData.atcCode ?? '',
				abbreviatedName1: rowData.abbreviatedName1 ?? 'NA',
				abbreviatedName2: rowData.abbreviatedName2 ?? 'NA',
				abbreviatedName3: rowData.abbreviatedName3 ?? 'NA',
				abbreviatedName4: rowData.abbreviatedName4 ?? 'NA',
				countryCode: rowData.countryCode ?? '',
				standardFlightTime: rowData.standardFlightTime ?? 'NA',
				timeChange: rowData.timeChange ?? 'NA',
				timeDifferenceAfter: rowData.timeDifferenceAfter ?? 'NA',
				timeDifferenceBefore: rowData.timeDifferenceBefore ?? 'NA',
				timeDifferenceSummer: rowData.timeDifferenceSummer ?? 'NA',
				timeDifferenceWinter: rowData.timeDifferenceWinter ?? 'NA',
				validFrom: rowData.validFrom ? dayjs(rowData.validFrom) : '',
				validTo: rowData.validTo ? dayjs(rowData.validTo) : '',
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [rowData]);

	const rows = additionalAirportData?.map((data, index) => {
		return {
			airportName: data.airportName ?? 'NA',
			iataCode: data.iataCode ?? '',
			atcCode: data.atcCode ?? '',
			abbreviatedName1: data.abbreviatedName1 ?? 'NA',
			abbreviatedName2: data.abbreviatedName2 ?? 'NA',
			abbreviatedName3: data.abbreviatedName3 ?? 'NA',
			abbreviatedName4: data.abbreviatedName4 ?? 'NA',
			countryCode: data.countryCode ?? '',
			airportType: data.airportType ?? '',
			standardFlightTime: data.standardFlightTime ?? 'NA',
			timeChange: data.timeChange ?? 'NA',
			timeDifferenceAfter: data.timeDifferenceAfter ?? 'NA',
			timeDifferenceBefore: data.timeDifferenceBefore ?? 'NA',
			timeDifferenceSummer: data.timeDifferenceSummer ?? 'NA',
			timeDifferenceWinter: data.timeDifferenceWinter ?? 'NA',
			validFrom: data.validFrom ?? '',
			validTo: data.validTo ?? '',
		};
	});

	const columns = [
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
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Airport Code',
			dataIndex: 'iataCode',
			key: 'iataCode',
		},
		{
			title: 'Airport Type',
			dataIndex: 'airportType',
			key: 'airportType',
		},
		{
			title: 'Country Code',
			dataIndex: 'countryCode',
			key: 'countryCode',
		},
		{
			title: 'Standard Flight Time',
			dataIndex: 'standardFlightTime',
			key: 'standardFlightTime',
		},
		{
			title: 'Time Change',
			dataIndex: 'timeChange',
			key: 'timeChange',
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
			</ModalComponent>
		</div>
	);
};

export default AirportSetupTable;
