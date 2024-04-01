import React, { useEffect, useMemo, useState } from 'react';
import './licenseSetupTable.scss';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../components/table/table';
import { usePostLicenseAirport } from '../../../../../services/airportMasters/airportMasters';
import ConvertUtcToIst from '../../../../../utils/ConvertUtcToIst';
import LicenseSetupForm from '../licenseSetupForm/licenseSetupForm';

const LicenseSetupTable = ({ createProps, setCreateProps, pagination, data, fetchData, airportDropdownData, countryDropdownData }) => {
	const defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'New Airport License' };
	const [airportModal, setAirportModal] = useState(defaultModalParams);
	const [airportData, setAirportData] = useState([]);
	const onError = ({ response: { data: { message } } }) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setAirportData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError
	}
	const { mutate: postAirportLicense, isLoading: isCreateNewLoading } = usePostLicenseAirport(postApiProps);
	const [initial] = Form.useForm();

	function closeAddModal() {
		initial.resetFields();
		setAirportModal(defaultModalParams)
	};

	function getFormValues(data = {}) {
		return {
			airportId: data?.airportId,
			iataCode: data?.threeCode,
			icaoCode: data?.fourCode,
			abbreviatedName: data?.abbreviatedName,
			email: data?.email,
			city: data?.city,
			country: data?.country,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		}
	}
	const onFinishHandler = (values) => {
		values = getFormValues(values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTill = values?.validTill?.toISOString();
		values.iataCode = values?.threeCode?.join('');
		values.icaoCode = values?.fourCode?.join('');
		postAirportLicense(values);
	};

	useEffect(() => {
		const { data } = airportModal
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [airportModal.isOpen]);
	useEffect(() => {
		if (createProps.new) {
			setAirportModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new])
	useEffect(() => {
		if (data?.pages) {
			const lastPage = data.pages.length >= 1 ? data.pages[data.pages.length - 1] : [];
			setAirportData([...airportData, ...lastPage.data]);
		}
	}, [data]);

	const columns = useMemo(
		() => [
			{
				title: <div className='table_first_title'>Airport Name</div>,
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
		[airportData]
	);

	return (
		<>
			<PageLoader loading={isCreateNewLoading} />
			<ModalComponent
				isModalOpen={airportModal.isOpen}
				closeModal={closeAddModal}
				title={airportModal.title}
				width={'120rem'}
				className="custom_modal"
			>
				<Form form={initial} layout="vertical" onFinish={onFinishHandler}>
					<LicenseSetupForm {...{ airportDropdownData, countryDropdownData }} />
					<Divider />
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
							isSubmit="submit"
						/>
					</div>
				</Form>
			</ModalComponent>
			<div>
				<div className="create_wrapper_table">
					<div className="table_container">
						<TableComponent {...{ data: airportData, columns, fetchData, pagination }} />
					</div>
				</div>
			</div>
		</>
	);
};

export default LicenseSetupTable;
