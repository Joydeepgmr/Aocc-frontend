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
	useDeleteGlobalAirline,
	usePatchGlobalAirline,
	usePostGlobalAirline,
} from '../../../../../services/globalMasters/globalMaster';
import AirlineForm from '../airlineForm/airlineForm';
import './airlineTable.scss';

const AirlineTable = ({
	createProps,
	setCreateProps,
	data,
	fetchData,
	pagination,
	airportDropdownData,
	countryDropdownData,
	loading,
}) => {
	const defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup airline registration' };
	const [airlineRegistrationModal, setAirlineRegistrationModal] = useState(defaultModalParams);
	const [airlineData, setAirlineData] = useState([]);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
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
	const [initial] = Form.useForm();

	function handleDetails(data) {
		setAirlineRegistrationModal({ isOpen: true, type: 'view', data, title: 'Airline registration' });
	}
	function handleEdit(data) {
		setAirlineRegistrationModal({ isOpen: true, type: 'edit', data, title: 'Update airline registration' });
	}
	function handleDelete() {
		deleteAirline(deleteModal.id);
	}

	function closeAddModal() {
		setAirlineRegistrationModal(defaultModalParams);
		initial.resetFields();
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
	function onFinishHandler(values) {
		values = getFormValues(values);
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');
		if (!values.phoneNumber) {
			delete values.phoneNumber;
		}

		if (airlineRegistrationModal.type === 'edit') {
			const id = airlineRegistrationModal.data.id;
			delete values.twoLetterCode;
			delete values.threeLetterCode;
			delete values.validFrom;
			values.id = airlineRegistrationModal.data.id;
			patchAirline(values);
		} else {
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
							onClick={() => setDeleteModal({ isOpen: true, id: record.id })}
							type="iconWithBorder"
							icon={deleteIcon}
							className="custom_icon_buttons"
						/>
					</div>
				),
			},
			{
				title: 'AL',
				dataIndex: 'name',
				key: 'name',
				render: (text) => text || '-',
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
				title: 'CNTRY',
				dataIndex: 'country',
				key: 'country',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'HOPO',
				dataIndex: 'homeAirport',
				key: 'homeAirport',
				align: 'center',
				render: (text) => text?.name || '-',
			},
			// {
			// 	title: 'Terminal',
			// 	dataIndex: 'terminal',
			// 	key: 'timeChange',
			// 	align: 'center',
			// 	render: (text) => text || '-',
			// },
			{
				title: 'View Details',
				key: 'viewDetails',
				render: (
					text,
					record // Use the render function to customize the content of the cell
				) => (
					<ButtonComponent
						style={{ margin: 'auto' }}
						title="View Details"
						type="text"
						onClick={() => {
							handleDetails(record);
						}}
					/>
				),
			},
		],
		[airlineData]
	);
	return (
		<>
			<PageLoader loading={isCreateNewLoading || isEditLoading || isDeleteLoading} />
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
				width="80%"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AirlineForm
						isReadOnly={airlineRegistrationModal.type === 'view'}
						type={airlineRegistrationModal.type}
						form={initial}
					/>
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
						<CustomTypography type="title" fontSize="2.4rem" fontWeight="600">
							Airlines
						</CustomTypography>
						<TableComponent {...{ data: airlineData, columns, fetchData, pagination, loading }} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AirlineTable;
