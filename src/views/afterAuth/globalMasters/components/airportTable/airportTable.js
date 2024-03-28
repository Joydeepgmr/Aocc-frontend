import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePostGlobalAirport, usePatchGlobalAirport, useDeleteGlobalAirport } from "../../../../../services/globalMasters/globalMaster"
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import editIcon from '../../../../../assets/logo/edit.svg';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
import AirportForm from '../airportForm/airportForm';
import dayjs from 'dayjs';
import './airportTable.scss';


const AirportTable = ({ data, createProps, setCreateProps }) => {
	const { mutate: postGlobalAirport, isLoading: airportLoading, isSuccess: airportSuccess, isError: airportError, postData: airportPostData, message: airportMessage } = usePostGlobalAirport();
	const { mutate: patchGlobalAirport } = usePatchGlobalAirport();
	const { mutate: deleteGlobalAirport } = useDeleteGlobalAirport();
	let defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your airport' };
	const [airportModal, setAirportModal] = useState(defaultModalParams);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState({});
	const [initialValues, setInitialValues] = useState({});
	const [editData, setEditData] = useState(false);
	const [initial] = Form.useForm();

	const closeAddModal = () => {
		initial.resetFields();
		setAirportModal(defaultModalParams)
	};

	const onFinishHandler = (values) => {
		console.log(values, airportModal);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTo = values?.validTo && dayjs(values?.validTo).format('YYYY-MM-DD');

		if (airportModal.type === 'edit') {
			console.log("what edit values:", values);
			if (values) {
				const isNotEmpty = value => value !== "" && value !== null && value !== undefined && value !== "noneditable";
				const filteredAirportData = Object.fromEntries(
					Object.entries(values)
						.filter(([key, value]) => isNotEmpty(value))
				);
				delete filteredAirportData.validFrom;
				// delete filteredAirportData.id;

				console.log("filtered values", filteredAirportData);
				filteredAirportData.iataCode = filteredAirportData?.iataCode;
				filteredAirportData.icaoCode = filteredAirportData?.icaoCode;
				filteredAirportData.countryCode = filteredAirportData?.countryCode;
				filteredAirportData.standardFlightTime = filteredAirportData?.standardFlightTime;
				console.log('add a data');
				console.log('dispatch the update airport api');
				filteredAirportData.id = airportModal.data.id
				patchGlobalAirport(filteredAirportData);
			}
			// values.iataCode = values?.iataCode;
			// values.icaoCode = values?.icaoCode;
			// values.countryCode = values?.countryCode;
			// values.standardFlightTime = values?.standardFlightTime;

			console.log('added a data');
		} else {
			values.iataCode = values?.iataCode?.join('');
			values.icaoCode = values?.icaoCode?.join('');
			values.countryCode = values?.countryCode?.join('');
			postGlobalAirport(values);
			console.log('dispatch the create new airport api');
		}
		closeAddModal();
	};

	const handleDelete = (record) => {
		deleteGlobalAirport(record.id);
	};


	const handleEdit = (data) => {
		setAirportModal({ isOpen: true, type: 'edit', data, title: 'Update your airport' });
	};

	const handleEditButton = () => {
		closeAddModal();
	};


	const handleDetails = (data) => {
		setRowData(data);
		setIsModalOpen(true);
		setAirportModal({ isOpen: true, type: 'view', data, title: 'Your Airport' });
	};


	useEffect(() => {
		const { data } = airportModal
		if (data) {
			const initialValuesObj = {
				name: data.name ?? '',
				iataCode: data.iataCode ?? '',
				icaoCode: data.icaoCode ?? '',
				abbreviatedName1: data.abbreviatedName1 ?? '',
				abbreviatedName2: data.abbreviatedName2 ?? '',
				abbreviatedName3: data.abbreviatedName3 ?? '',
				abbreviatedName4: data.abbreviatedName4 ?? '',
				airportType: data.airportType ?? '',
				countryCode: data.countryCode ?? '',
				standardFlightTime: data.standardFlightTime ?? '',
				timeChange: data.timeChange ?? '',
				timeDifferenceAfter: data.timeDifferenceAfter ?? '',
				timeDifferenceBefore: data.timeDifferenceBefore ?? '',
				timeDifferenceSummer: data.timeDifferenceSummer ?? '',
				timeDifferenceWinter: data.timeDifferenceWinter ?? '',
				validFrom: data.validFrom ? dayjs(data.validFrom) : '',
				validTill: data.validTill ? dayjs(data.validTill) : null,
			};
			initial.setFieldsValue(initialValuesObj);
		}
	}, [airportModal.isOpen]);


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
	}, [data])

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
		</div>
	);
};

export default AirportTable;
