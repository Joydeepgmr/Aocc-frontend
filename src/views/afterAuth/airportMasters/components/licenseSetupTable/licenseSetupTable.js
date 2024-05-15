import React, { useEffect, useMemo, useState } from 'react';
import './licenseSetupTable.scss';
import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../components/table/table';
import { usePatchLicenseAirport, usePostLicenseAirport } from '../../../../../services/airportMasters/airportMasters';
import ConvertUtcToIst from '../../../../../utils/ConvertUtcToIst';
import LicenseSetupForm from '../licenseSetupForm/licenseSetupForm';
import { useCountriesDropdown, useGlobalAirportDropdown } from '../../../../../services';
import { CapitaliseFirstLetter } from '../../../../../utils';

const LicenseSetupTable = ({ createProps, setCreateProps, pagination, data, fetchData, loading }) => {
	const defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'New Airport License' };
	const [airportModal, setAirportModal] = useState(defaultModalParams);
	const [airportData, setAirportData] = useState([]);
	// for image
	const [fileList, setFileList] = useState([]);
	const [resetCodes, setResetCodes] = useState(false);
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setAirportData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError,
	};
	const patchApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = airportData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			});
			setAirportData([...updatedData]);
			closeAddModal();
		},
		onError,
	};
	const { data: airportDropdownData } = useGlobalAirportDropdown();
	const { data: countryDropdownData } = useCountriesDropdown();
	const { mutate: postAirportLicense, isLoading: isCreateNewLoading } = usePostLicenseAirport(postApiProps);
	const { mutate: patchAirportLicense, isLoading: isEditLoading } = usePatchLicenseAirport(patchApiProps);
	const [initial] = Form.useForm();

	function closeAddModal() {
		initial.resetFields();
		setFileList([]);
		setResetCodes(true);
		setAirportModal(defaultModalParams);
	}

	function getFormValues(data = {}) {
		return {
			airportId: data?.airportId ?? data?.globalAirport?.id,
			iataCode: data?.threeCode,
			icaoCode: data?.fourCode,
			abbreviatedName: data?.abbreviatedName,
			email: data?.email,
			city: data?.city,
			country: data?.country,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		};
	}
	const onFinishHandler = (values) => {
		values = getFormValues(values);
		values.file = '';
		values.city = values?.city ? CapitaliseFirstLetter(values.city) : undefined;
		values.validFrom = values?.validFrom?.toISOString();
		values.validTill = values?.validTill?.toISOString();
		if (airportModal?.type === 'edit') {
			const id = airportModal.data?.id;
			delete values.airportId;
			delete values.validFrom;
			if (airportModal?.data?.email === values.email) {
				delete values.email;
			}
			patchAirportLicense({ id, values });
		} else {
			values.iataCode = values?.threeCode?.join('');
			values.icaoCode = values?.fourCode?.join('');
			postAirportLicense(values);
		}
	};

	useEffect(() => {
		const { data } = airportModal;
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
	}, [createProps.new]);
	useEffect(() => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
			setAirportData([...newData]);
		}
	}, [data]);

	const columns = useMemo(
		() => [
			{
				title: 'AIRPORT',
				dataIndex: ['globalAirport', 'name'],
				key: 'airportName',
				render: (text) => text || '-',
			},
			{
				title: '3L',
				dataIndex: ['globalAirport', 'iataCode'],
				key: 'iataCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: '4L',
				dataIndex: ['globalAirport', 'icaoCode'],
				key: 'icaoCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'CNTRY',
				dataIndex: 'country',
				key: 'country',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'CITY',
				dataIndex: 'city',
				key: 'city',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'VALID FROM',
				dataIndex: 'validFrom',
				key: 'validFrom',
				align: 'center',
				render: (text) => ConvertUtcToIst(text, 'DD/MM/YYYY') || '-',
			},
			{
				title: 'VALID TILL',
				dataIndex: 'validTill',
				key: 'validTill',
				align: 'center',
				render: (text) => ConvertUtcToIst(text, 'DD/MM/YYYY') || '-',
			},
			{
				title: 'ACTIONS',
				dataIndex: 'edit',
				key: 'edit',
				render: (text, record) => (
					<div className="custom-button">
						<ButtonComponent
							type={'iconWithBorderEdit'}
							onClick={() => {
								setAirportModal({ isOpen: true, type: 'edit', data: record, title: 'Edit Airport License' })
							}}
						></ButtonComponent>
					</div>
				),
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
				width={'90rem'}
				className="custom_modal"
			>
				<Form form={initial} layout="vertical" onFinish={onFinishHandler}>
					<LicenseSetupForm
						{...{
							airportModal,
							airportDropdownData,
							countryDropdownData,
							resetCodes,
							setResetCodes,
							fileList,
							setFileList,
							initial,
						}}
					/>
					<Divider />
					<div className="custom_buttons">
						<ButtonComponent
							title="Cancel"
							type="filledText"
							className="custom_button_cancel"
							onClick={() => {
								closeAddModal();
							}}
						/>
						<ButtonComponent
							title={airportModal?.type === 'edit' ? 'Update' : "Save"}
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
						<TableComponent {...{ data: airportData, columns, fetchData, pagination, loading }} />
					</div>
				</div>
			</div>
		</>
	);
};

export default LicenseSetupTable;
