import { Divider, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import ButtonComponent from '../../../../components/button/button';
import Date from '../../../../components/datapicker/datepicker';
import DropdownButton from '../../../../components/dropdownButton/dropdownButton';
import InputField from '../../../../components/input/field/field';
import ModalComponent from '../../../../components/modal/modal';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import CustomSelect from '../../../../components/select/select';
import TableComponent from '../../../../components/table/table';
import TopHeader from '../../../../components/topHeader/topHeader';
import { useAirlineDropdown } from '../../../../services/PlannerAirportMaster/PlannerAirlineAirportMaster';
import { useAddFidsAccessData, useGetFidsAccessData } from '../../../../services/fids/fidsResources';
import { ConvertUtcToIst } from '../../../../utils';
import './manageAccess.scss';

const ManageFidsAccess = () => {
	const queryClient = useQueryClient();
	const [fidsModal, setFidsModal] = useState({ isOpen: false, data: null, title: 'New Fids License', type: 'add' });
	const [isValidFrom, setIsValidFrom] = useState(false);
	const [currentValidFrom, setCurrentValidFrom] = useState('');
	const [currentValidTill, setCurrentValidTill] = useState('');
	const [fidsData, setFidsData] = useState([]);
	const [form] = Form.useForm();
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const getAccessApiProps = {
		onSuccess: (data) => {
			if (data?.length) {
				setFidsData(data);
			}
		},
		onError,
	};
	const createAccessApiProps = {
		onSuccess: ({ message, data }) => {
			queryClient.invalidateQueries('get-fids-access-data');
			toast.success(message);
			closeAddModal();
		},
		onError,
	};
	const { mutate: createAccess, isLoading: isCreateLoading } = useAddFidsAccessData(createAccessApiProps);
	const { isLoading: isGetAllLoading } = useGetFidsAccessData(getAccessApiProps);
	const { data: airlineDropdownData } = useAirlineDropdown({ onError });
	const SelectAirlineData = useMemo(() => {
		return airlineDropdownData?.map((data) => {
			return { label: data.name, value: data.id };
		});
	}, [airlineDropdownData]);
	const columns = useMemo(
		() => [
			{
				title: 'AIRLINE',
				dataIndex: ['airline', 'name'],
				key: 'airportName',
				render: (text) => text || '-',
			},
			{
				title: '2L',
				dataIndex: ['airline', 'twoLetterCode'],
				key: 'twoLetterCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: '3L',
				dataIndex: ['airline', 'threeLetterCode'],
				key: 'threeLetterCode',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'Email',
				dataIndex: ['userId', 'email'],
				key: 'email',
				align: 'center',
				render: (text) => text || '-',
			},
			{
				title: 'VALID FROM',
				dataIndex: 'validFrom',
				key: 'validFrom',
				align: 'center',
				render: (text) => text && ConvertUtcToIst(text, 'DD/MM/YYYY'),
			},
			{
				title: 'VALID TILL',
				dataIndex: 'validTill',
				key: 'validTill',
				align: 'center',
				render: (text) => text && ConvertUtcToIst(text, 'DD/MM/YYYY'),
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
								const airline = record?.airline?.id;
								const email = record?.userId?.email;
								const validFrom = record?.validFrom && dayjs(record?.validFrom);
								const validTill = record?.validTill && dayjs(record?.validTill);
								setFidsModal({
									isOpen: true,
									type: 'edit',
									data: record,
									title: 'Edit Fids License',
								});
								form.setFieldsValue({ airline, email, validFrom, validTill });
							}}
						/>
					</div>
				),
			},
		],
		[]
	);
	const handleFinish = (values) => {
		values.validFrom = values?.validFrom?.toISOString();
		values.validTill = values?.validTill?.toISOString();
		createAccess(values);
	};
	const handleValidFrom = (dateString) => {
		form.setFieldsValue({
			validTill: null,
		});
		if (dateString === null) {
			setIsValidFrom(false);
			setCurrentValidFrom(null);
		} else {
			setIsValidFrom(true);
			setCurrentValidFrom(dateString?.format('YYYY-MM-DD'));
		}
	};
	const handleValidTill = (dateString) => {
		if (dateString) {
			setCurrentValidTill(dateString?.format('YYYY-MM-DD'));
		} else {
			setCurrentValidTill(null);
		}
	};
	const dropdownItems = [
		{
			label: 'Create',
			value: 'createNew',
			key: '0',
		},
	];
	const handleDropdownChange = (key) => {
		setFidsModal({ isOpen: true, data: null, title: 'New Fids License', type: 'add' });
	};
	const closeAddModal = () => {
		form.resetFields();
		setFidsModal({ isOpen: false, data: null, title: 'New Fids License', type: 'add' });
	};
	return (
		<>
			<PageLoader loading={isGetAllLoading || isCreateLoading} />
			<ModalComponent
				isModalOpen={fidsModal.isOpen}
				closeModal={closeAddModal}
				title={fidsModal.title}
				width={'90rem'}
				className="custom_modal"
			>
				<Form
					form={form}
					onFinish={handleFinish}
					style={{ marginTop: '1rem' }}
					autoComplete="off"
					layout="vertical"
				>
					<div className="fids_setup_form_container">
						<div className="fids_setup_form_inputfields">
							<CustomSelect
								name="airline"
								required
								label="Airline Name"
								placeholder="Enter the airline name"
								SelectData={SelectAirlineData}
								className="custom_input"
								// onChange={handleAirportChange}
								disabled={fidsModal?.type === 'edit'}
							/>
							<InputField
								label="Email Address"
								name="email"
								isArticle={false}
								pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
								placeholder="Enter the Email Address"
								className="custom_input"
								required
							/>
						</div>
						<div className="fids_setup_form_inputfields">
							<Date
								label="Valid From"
								placeholder="Select valid from date"
								name="validFrom"
								className="custom_date"
								format="MM-DD-YYYY"
								required
								disabled={fidsModal?.type === 'edit'}
								onChange={handleValidFrom}
							/>
							<Date
								label="Valid To"
								placeholder="Select valid to date"
								className="custom_date"
								name="validTill"
								format="YYYY-MM-DD"
								isDisabledDate={true}
								disabledDate={(current) => {
									let prevDate = dayjs(currentValidFrom).format('YYYY-MM-DD');
									return current && current < dayjs(prevDate, 'YYYY-MM-DD');
								}}
								onChange={handleValidTill}
							/>
						</div>
					</div>
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
							title={fidsModal?.type === 'edit' ? 'Update' : 'Save'}
							type="filledText"
							className="custom_button_save"
							isSubmit="submit"
						/>
					</div>
				</Form>
			</ModalComponent>
			<div className="fids_masters_container">
				<div className="fids_master_header">
					<TopHeader heading="Fids Masters" subHeading="Overview of airline licenses for the Fids System" />
				</div>
				<div className="table_container">
					<div className="create_button">
						<DropdownButton
							dropdownItems={dropdownItems}
							buttonText="Create"
							onChange={handleDropdownChange}
						/>
					</div>
					<div>
						<div className="create_wrapper_table">
							<div className="table_container">
								<TableComponent
									columns={columns}
									data={fidsData}
									loading={false}
									fetchData={() => {}}
									pagination={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageFidsAccess;
