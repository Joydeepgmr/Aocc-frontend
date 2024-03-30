import React, { useEffect, useState, useMemo } from 'react';
import './licenseSetupTable.scss';
// import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../../../../components/button/button';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import ModalComponent from '../../../../../components/modal/modal';
import { useGetLicenseData } from '../../../../../services/airportMasters/airportMasters';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import ConvertUtcToIst from '../../../../../utils/ConvertUtcToIst';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
// import { updateLicenseData, formDisabled } from '../../redux/reducer';

const LicenseSetupTable = ({ formComponent, data, isLoading }) => {
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

	const onFinishHandler = (values) => {
		console.log('What are values here', values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTill = values?.validTill?.toISOString();
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
		if (data) {
			console.log(data, 'dataa');
			const initialValuesObj = {
				airportName: data.airportName ?? 'NA',
				iataCode: data.threeCode ?? '',
				icaoCode: data.fourCode ?? '',
				abbreviatedName: data.abbreviatedName ?? 'NA',
				email: data.email ?? 'NA',
				city: data.city ?? '',
				country: data.country ?? '',
				validFrom: data.validFrom ? dayjs(data.validFrom) : '',
				validTill: data.validTill ? dayjs(data.validTill) : '',
			};
			setInitialValues(initialValuesObj);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [data]);

	const columns = useMemo(
		() => [
			{
				title: 'Airport Name',
				dataIndex: ['globalAirport', 'name'],
				key: 'airportName',
				render: (text) => text || '-',
			},
			{
				title: 'IATA Code',
				dataIndex: ['globalAirport', 'iataCode'],
				key: 'iataCode',
				render: (text) => text || '-',
			},
			{
				title: 'ICAO Code',
				dataIndex: ['globalAirport', 'icaoCode'],
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
				render: (text) => ConvertUtcToIst(text, 'DD/MM/YYYY') || '-',
			},
			{
				title: 'Valid To',
				dataIndex: 'validTill',
				key: 'validTill',
				render: (text) => ConvertUtcToIst(text, 'DD/MM/YYYY') || '-',
			},
		],
		[data]
	);

	return (
		<div>
			<PageLoader loading={isLoading} />
			{data && data?.length ? (
				<div className="create_wrapper_table">
					<div className="table_container">
						<TableComponent data={data} columns={columns} />
					</div>
				</div>
			) : (
				<></>
			)}
			{/* <ModalComponent
				isModalOpen={isModalOpen}
				closeModal={closeAddModal}
				title="Setup your airport"
				width="120rem"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					{formComponent && formComponent}
					<Divider />

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
				</Form>
			</ModalComponent> */}
		</div>
	);
};

export default LicenseSetupTable;
