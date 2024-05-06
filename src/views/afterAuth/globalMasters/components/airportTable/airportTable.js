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
	useDeleteGlobalAirport,
	usePatchGlobalAirport,
	usePostGlobalAirport,
} from '../../../../../services/globalMasters/globalMaster';
import AirportForm from '../airportForm/airportForm';
import './airportTable.scss';
import { CapitaliseFirstLetter } from '../../../../../utils';

const AirportTable = ({ createProps, setCreateProps, pagination, data, fetchData, loading }) => {
	const defaultModalParams = { isOpen: false, type: 'new', data: null, title: 'Setup your airport' };
	const [airportModal, setAirportModal] = useState(defaultModalParams);
	const [airportData, setAirportData] = useState([]);
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const [form] = Form.useForm();

	const postApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			setAirportData((oldData) => [data, ...oldData]);
			closeAddModal();
		},
		onError,
	};
	const { mutate: postAirport, isLoading: isCreateNewLoading } = usePostGlobalAirport(postApiProps);
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
	const { mutate: patchAirport, isLoading: isEditLoading } = usePatchGlobalAirport(patchApiProps);
	const deleteApiProps = {
		onSuccess: ({ message, data }) => {
			toast.success(message);
			const updatedData = airportData.filter((elm) => {
				return elm.id !== deleteModal.id;
			});
			setAirportData([...updatedData]);
			setAirportModal(defaultModalParams);
			closeDeleteModal();
		},
		onError,
	};
	const { mutate: deleteAirport, isLoading: isDeleteLoading } = useDeleteGlobalAirport(deleteApiProps);
	const [initial] = Form.useForm();

	function handleDetails(data) {
		setAirportModal({ isOpen: true, type: 'view', data, title: 'Your Airport' });
	}
	function handleEdit(data) {
		setAirportModal({ isOpen: true, type: 'edit', data, title: 'Update your airport' });
	}
	function handleDelete() {
		deleteAirport(deleteModal.id);
	}

	function closeAddModal() {
		initial.resetFields();
		setAirportModal(defaultModalParams);
	}
	function closeDeleteModal() {
		setDeleteModal({ isOpen: false, id: null });
	}

	function getFormValues(data) {
		return {
			name: data?.name,
			iataCode: data?.iataCode,
			icaoCode: data?.icaoCode,
			abbreviatedName1: data?.abbreviatedName1,
			abbreviatedName2: data?.abbreviatedName2,
			abbreviatedName3: data?.abbreviatedName3,
			abbreviatedName4: data?.abbreviatedName4,
			airportType: data?.airportType,
			country: data?.country,
			standardFlightTime: data?.standardFlightTime,
			timeChange: data?.timeChange,
			latitude: data?.latitude,
			longitude: data?.longitude,
			validFrom: data?.validFrom && dayjs(data?.validFrom),
			validTill: data?.validTill && dayjs(data?.validTill),
		};
	}

	function onFinishHandler(values) {
		values = getFormValues(values);
		values.name = values?.name ? CapitaliseFirstLetter(values.name) : undefined
		values.abbreviatedName1 = values?.abbreviatedName1 ? CapitaliseFirstLetter(values.abbreviatedName1) : undefined
		values.abbreviatedName2 = values?.abbreviatedName2 ? CapitaliseFirstLetter(values.abbreviatedName2) : undefined
		values.abbreviatedName3 = values?.abbreviatedName3 ? CapitaliseFirstLetter(values.abbreviatedName3) : undefined
		values.abbreviatedName4 = values?.abbreviatedName4 ? CapitaliseFirstLetter(values.abbreviatedName4) : undefined
		values.validFrom = values?.validFrom && dayjs(values?.validFrom).format('YYYY-MM-DD');
		values.validTill = values?.validTill && dayjs(values?.validTill).format('YYYY-MM-DD');

		if (airportModal.type === 'edit') {
			const id = airportModal.data.id;
			values.standardFlightTime = values?.standardFlightTime;
			delete values.iataCode;
			delete values.icaoCode;
			delete values.validFrom;
			patchAirport({ values, id });
		} else {
			values.iataCode = values?.iataCode?.join('');
			values.icaoCode = values?.icaoCode?.join('');
			postAirport(values);
		}
	}

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

	const columns = useMemo(() => {
		return [
			{
				title: 'ACTIONS',
				key: 'actions',
				render: (text, record) => (
					<div className="action_buttons">
						<ButtonComponent
							onClick={() => handleEdit(record)}
							type="iconWithBorderEdit"
							icon={editIcon}
							className="custom_icon_buttons"
						/>
						<ButtonComponent
							onClick={() => setDeleteModal({ isOpen: true, id: record.id })}
							type="iconWithBorderDelete"
							icon={deleteIcon}
							className="custom_icon_buttons"
						/>
					</div>
				),
			},
			{
				title: 'NAME',
				dataIndex: 'name',
				key: 'name',
				render: (text) => text || '-',
				align: 'center',
			},
			{
				title: '3L',
				dataIndex: 'iataCode',
				key: 'iataCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'TYPE',
				dataIndex: 'airportType',
				key: 'airportType',
				render: (text) => text || '-',
				align: 'center',
			},
			{
				title: 'CNTRY',
				dataIndex: 'country',
				key: 'country',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'SFT',
				dataIndex: 'standardFlightTime',
				key: 'standardFlightTime',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'TIME ZONE',
				dataIndex: 'timeChange',
				key: 'timeChange',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'DETAIL',
				key: 'viewDetails',
				render: (
					text,
					record // Use the render function to customize the content of the cell
				) => (
					<ButtonComponent
						style={{ margin: 'auto' }}
						title="View"
						type="text"
						onClick={() => {
							handleDetails(record);
						}}
					/>
				),
			},
		];
	}, [airportData]);

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
				isModalOpen={airportModal?.isOpen}
				closeModal={closeAddModal}
				title={airportModal?.title}
				width="80%"
				className="custom_modal"
			>
				<Form layout="vertical" onFinish={onFinishHandler} form={initial}>
					<AirportForm form={form} isReadOnly={airportModal.type === 'view'} type={airportModal.type} />
					{airportModal.type !== 'view' && (
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
									title={airportModal.type === 'edit' ? 'Update' : 'Save'}
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
						<TableComponent {...{ data: airportData, columns, fetchData, pagination, loading }} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AirportTable;
