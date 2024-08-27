import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import deleteIcon from '../../../../../assets/logo/delete.svg';
import editIcon from '../../../../../assets/logo/edit.svg';
import ButtonComponent from '../../../../../components/button/button';
import ConfirmationModal from '../../../../../components/confirmationModal/confirmationModal';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import TableComponent from '../../../../../components/table/table';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import {
	patchAirlineImage,
	useDeleteGlobalAirline,
	usePatchGlobalAirline,
	usePostGlobalAirline,
} from '../../../../../services/globalMasters/globalMaster';
import AirlineForm from '../airlineForm/airlineForm';
import { CapitaliseFirstLetter } from '../../../../../utils';
import './airlineTable.scss';
import { useGetAirlineSyncData } from '../../../../../services/PlannerAirportMaster/PlannerAirlineAirportMaster';

const AirlineTable = ({
	createProps,
	setCreateProps,
	data,
	fetchData,
	pagination,
	loading,
}) => {
	const defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup airline registration' };
	const [airlineRegistrationModal, setAirlineRegistrationModal] = useState(defaultModalParams);
	const [airlineData, setAirlineData] = useState([]);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
	const [fileList, setFileList] = useState([]);
	const [previousImage, setPreviousImage] = useState('');
	const [icaoCode, setIcaoCode] = useState('');
	const [airlineImageLoader, setAirlineImageLoader] = useState(false);
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setFileList([]);
			setAirlineData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError,
	};
	const { mutate: postGlobalAirLineRegistration, isLoading: isCreateNewLoading } = usePostGlobalAirline(postApiProps);
	const patchApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = airlineData.map((elm) => {
				if (elm.id === data.id) {
					return data;
				}
				return elm;
			});
			setAirlineData([...updatedData]);
			closeAddModal();
		},
		onError,
	};
	const { mutate: patchAirline, isLoading: isEditLoading } = usePatchGlobalAirline(patchApiProps);
	const deleteApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = airlineData.filter((elm) => {
				return elm.id !== deleteModal.id;
			});
			setAirlineData([...updatedData]);
			closeDeleteModal();
		},
		onError,
	};
	const { mutate: deleteAirline, isLoading: isDeleteLoading } = useDeleteGlobalAirline(deleteApiProps);
	const getAirlineImageHandler = {
		onSuccess: ({ airlineData = {}, airlineImage = '' }) => {
			if (airlineData) {
				airlineData.validTill = airlineData?.validTill ? dayjs(airlineData?.validTill) : undefined;
				airlineData.validFrom = airlineData?.validFrom ? dayjs(airlineData?.validFrom) : undefined;
			}
			if (airlineImage) {
				setFileList([{ url: airlineImage }]);
				setPreviousImage(airlineImage);
			} else {
				setFileList([]);
				setPreviousImage('');
			}
			setAirlineRegistrationModal({ isOpen: true, type: 'view', data: airlineData, title: `Airline registration` });
		},
		onError: (error) => {
			setFileList([]);
			setPreviousImage('');
		},
	};
	const { isLoading: isGetAirline } = useGetAirlineSyncData(
		icaoCode,
		getAirlineImageHandler
	);
	const [initial] = Form.useForm();

	function handleDetails(data, isEdit) {
		const type = data ? isEdit ? 'edit' : 'view' : 'new'
		const titlePrefix = data ? isEdit ? 'Edit' : 'View' : 'Set up your'
		if (type !== 'view') {
			setAirlineRegistrationModal({ isOpen: true, type, data, title: `${titlePrefix} Airline registration` });
		} else {
			setIcaoCode(data?.threeLetterCode);
		}
	}
	function handleDelete() {
		deleteAirline(deleteModal.id);
	}

	function closeAddModal() {
		setAirlineRegistrationModal(defaultModalParams);
		setFileList([]);
		setPreviousImage('');
		setIcaoCode('');
		initial.resetFields();
	}
	function openDeleteModal(data) {
		setDeleteModal({ isOpen: true, id: data.id });
	}
	function closeDeleteModal() {
		setDeleteModal({ isOpen: false, id: null });
	}

	function getFormValues(data) {
		return {
			name: data?.name,
			twoLetterCode: data?.twoLetterCode,
			threeLetterCode: data?.threeLetterCode,
			country: data?.country,
			globalAirport: data?.globalAirport ?? data?.homeAirport?.id,
			terminal: data?.terminal,
			airlineType: data?.airlineType,
			remark: data?.remark,
			paymentMode: data?.paymentMode,
			address: data?.address,
			phoneNumber: data?.phoneNumber,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		};
	}
	const onFinishHandler = async (values) => {
		values = getFormValues(values);
		values.name = values?.name ? CapitaliseFirstLetter(values.name) : undefined;
		values.remark = values?.remark ? CapitaliseFirstLetter(values.remark) : undefined
		values.address = values?.address ? CapitaliseFirstLetter(values.address) : undefined
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		if (!values.phoneNumber) {
			delete values.phoneNumber;
		}

		if (airlineRegistrationModal.type === 'edit') {
			const url = fileList?.[0]?.url;
			const id = airlineRegistrationModal.data.id;
			delete values.twoLetterCode;
			delete values.threeLetterCode;
			delete values.validFrom;
			values.id = airlineRegistrationModal.data.id;
			try {
				setAirlineImageLoader(true);
				if (previousImage !== url) {
					await patchAirlineImage({ id, url });
				}
			} catch (error) {

			} finally {
				setAirlineImageLoader(false);
				patchAirline(values);
			}
		} else {
			values.url = fileList[0]?.url ?? '';
			values.twoLetterCode = values.twoLetterCode.join('');
			values.threeLetterCode = values.threeLetterCode.join('');
			postGlobalAirLineRegistration(values);
		}
	}
	useEffect(() => {
		const { data } = airlineRegistrationModal;
		if (data) {
			const initialValuesObj = getFormValues(data);
			initial.setFieldsValue(initialValuesObj);
		}
	}, [airlineRegistrationModal.isOpen]);
	useEffect(() => {
		if (createProps.new) {
			setAirlineRegistrationModal({ ...defaultModalParams, isOpen: true });
			setCreateProps({ ...createProps, new: false });
		}
	}, [createProps.new]);
	useEffect(() => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
			setAirlineData([...newData]);
		}
	}, [data]);

	const columns = useMemo(
		() => [
			{
				title: 'AL',
				dataIndex: 'name',
				key: 'name',
				render: (text, record) => <div style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleDetails(record)}>{text ?? '-'}</div>,
				align: 'center',
			},
			{
				title: '2L',
				dataIndex: 'twoLetterCode',
				key: 'twoLetterCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: '3L',
				dataIndex: 'threeLetterCode',
				key: 'threeLetterCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'TYPE',
				dataIndex: 'airlineType',
				key: 'airlineType',
				align: 'center',
				render: (text) => text ? text.join(', ') : '-',
			},
			{
				title: 'MODE OF PAYMENT',
				dataIndex: 'paymentMode',
				key: 'paymentMode',
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
			// {
			// 	title: 'HOPO',
			// 	dataIndex: 'homeAirport',
			// 	key: 'homeAirport',
			// 	align: 'center',
			// 	render: (text) => text?.name || '-',
			// },
		],
		[airlineData]
	);
	return (
		<>
			<PageLoader loading={isCreateNewLoading || isEditLoading || isDeleteLoading || isGetAirline || airlineImageLoader} />
			<ConfirmationModal
				isOpen={deleteModal.isOpen}
				onClose={closeDeleteModal}
				onSave={handleDelete}
				content="You want to delete this record"
			/>
			<ModalComponent
				isModalOpen={airlineRegistrationModal.isOpen}
				closeModal={closeAddModal}
				title={airlineRegistrationModal.title}
				record={airlineRegistrationModal.data}
				onEdit={airlineRegistrationModal.type !== 'edit' && handleDetails}
				onDelete={openDeleteModal}
				width="80%"
				className="custom_modal"
			>
				<Form autoComplete='off' layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AirlineForm
						isReadOnly={airlineRegistrationModal.type === 'view'}
						type={airlineRegistrationModal.type}
						form={initial}
						fileList={fileList}
						setFileList={setFileList}
					/>
					{airlineRegistrationModal.type !== 'view' && (
						<>
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
									className="custom_button_save"
									isSubmit={true}
								/>
							</div>
						</>
					)}
				</Form>
			</ModalComponent>
			<div>
				<div className="create_wrapper_table">
					<div className="table_container">
						<TableComponent {...{ data: airlineData, columns, fetchData, pagination, loading }} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AirlineTable;
