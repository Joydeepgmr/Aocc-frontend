import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import Button from '../../../../../../../components/button/button';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import DropdownButton from '../../../../../../../components/dropdownButton/dropdownButton';
import InputField from '../../../../../../../components/input/field/field';
import ModalComponent from '../../../../../../../components/modal/modal';
import PageLoader from '../../../../../../../components/pageLoader/pageLoader';
import UploadCsvModal from '../../../../../../../components/uploadCsvModal/uploadCsvModal';
import {
	useEditSeasonalPlanArrival,
	useEditSeasonalPlanDeparture,
	useGetFlightSchedulePlans,
	usePostSeasonalPlans,
	useUploadCSV,
} from '../../../../../../../services/SeasonalPlanServices/seasonalPlan';
import { ConvertIstToUtc, ConvertToDateTime } from '../../../../../../../utils';
import FormComponent from '../../../formComponent/formComponent';
import Arrival from '../arrival/arrival';
import Departure from '../departure/departure';

import { GET_FLIGHT_SCHEDULE_PLANS } from '../../../../../../../api';
import DateRange from '../../../../../../../components/rangePicker/rangePicker';
import SocketEventListener from '../../../../../../../socket/listner/socketListner';
import './CDMSchedule.scss';

const DailySchedule = () => {
	const queryClient = useQueryClient();
	const [seasonalData, setSeasonalData] = useState([]);
	const [detailModal, setDetailModal] = useState({ isOpen: false, record: null, isEdit: false });
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [filter, setFilter] = useState({ date: null, search: null });
	const [index, setIndex] = useState('1');
	const [flightType, setFlightType] = useState('arrival');
	const [form] = Form.useForm();
	const [filterForm] = Form.useForm();
	const writeAccess = !!localStorage.getItem('plannerAccess');
	const searchedValue = Form.useWatch('search', filterForm);
	const dateRangeValue = Form.useWatch('date', filterForm);

	const getSeasonalHandler = {
		onSuccess: (data) => handleGetSeasonalSuccess(data),
		onError: (error) => handleGetSeasonalError(error),
	};

	const handleGetSeasonalSuccess = (data) => {
		if (data?.pages?.length) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);
			setSeasonalData([...newData]);
		}
	};
	const handleGetSeasonalError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const {
		data: fetchedSeasonalPlans,
		isFetching: isFetchLoading,
		isLoading,
		hasNextPage,
		fetchNextPage,
		refetch,
	} = useGetFlightSchedulePlans(flightType, filter, getSeasonalHandler);

	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};

	const closeCsvModal = () => {
		setIsCsvModalOpen(false);
	};

	const handleChange = (key) => {
		setIndex(key);
		key === '1' && setFlightType('arrival');
		key === '2' && setFlightType('departure');
	};

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			handleDetailModalOpen();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		}
	};

	//CREATE
	const addseasonalHandler = {
		onSuccess: (data) => handleAddSeasonalSuccess(data),
		onError: (error) => handleAddSeasonalError(error),
	};

	const handleAddSeasonalSuccess = (data) => {
		handleDetailModalClose();
		queryClient.invalidateQueries('get-seasonal-plans');
		toast.success(data?.message);
	};

	const handleAddSeasonalError = (error) => {
		toast.error(error?.response?.data?.message);
	};
	const { mutate: postSeasonalPlans, isLoading: isPostLoading } = usePostSeasonalPlans(addseasonalHandler);
	const handleSaveButton = (value) => {
		const data = {
			flightNo: value.flightNo,
			start: ConvertIstToUtc(value.start ?? value.date)?.split('T')[0],
			end: ConvertIstToUtc(value.end ?? value.date)?.split('T')[0],
			airline: value?.airlineId,
			natureCode: value?.natureCodeId,
			sector: value.origin,
			sta: ConvertToDateTime(value.sta, 'HH:mm'),
			std: ConvertToDateTime(value.std, 'HH:mm'),
			duration: value.duration,
			aircraftId: value?.aircraftId,
			type: value?.type,
		};

		data && postSeasonalPlans(data);
	};

	const handleSeasonalEditSuccess = (data) => {
		handleDetailModalClose();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-seasonal-plans');
	};

	const handleSeasonalEditError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const editSeasonalPlansHandler = {
		onSuccess: (data) => handleSeasonalEditSuccess(data),
		onError: (error) => handleSeasonalEditError(error),
	};

	const { mutate: editSeasonalPlanArrival, isLoading: isEditLoading } = useEditSeasonalPlanArrival(
		detailModal?.record?.id,
		editSeasonalPlansHandler
	);
	const { mutate: editSeasonalPlanDeparture } = useEditSeasonalPlanDeparture(
		detailModal?.record?.id,
		editSeasonalPlansHandler
	);
	const handleEditSave = (value) => {
		const data = {
			flightNo: value.flightNo,
			start: ConvertIstToUtc(value.start ?? value.date)?.split('T')[0],
			end: ConvertIstToUtc(value.end ?? value.date)?.split('T')[0],
			airline: value?.airlineId,
			natureCode: value?.natureCodeId,
			sector: value.origin,
			duration: value.duration,
			aircraftId: value?.aircraftId,
			type: value?.type,
		};
		index === '1' && editSeasonalPlanArrival(data);
		index === '2' && editSeasonalPlanDeparture(data);
	};

	const dropdownItems = [
		{
			label: 'Create',
			value: 'create',
			key: '0',
		},
	];

	const operations = (
		<Form form={filterForm} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
			<DateRange
				name="date"
				placeholder={['Flight From', 'Flight Till']}
				className="custom_dateRange"
				warning="Required field"
			/>
			<InputField
				label="search"
				name="search"
				placeholder="Search"
				className="custom_inputField"
				warning="Required field"
				type="search"
			/>
			{writeAccess && (
				<DropdownButton
					dropdownItems={dropdownItems}
					buttonText="Actions"
					className="custom_dropdownButton"
					onChange={handleDropdownItemClick}
				/>
			)}
		</Form>
	);

	const handleUploadCsvSuccess = () => {
		queryClient.invalidateQueries('get-seasonal-plans');
		closeCsvModal();
	};

	const handleUploadCsvError = () => {
		toast.error('Invalid File Type');
	};

	const uploadCsvHandler = {
		onSuccess: () => handleUploadCsvSuccess(),
		onError: () => handleUploadCsvError(),
	};

	const { mutate: onUploadCSV } = useUploadCSV(uploadCsvHandler);

	//UPLOAD
	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			onUploadCSV(formData);
		} else {
		}
	};
	const handleDetailModalOpen = (record, isEdit = false) => {
		if (record) {
			record = {
				...record,
				date: record?.date ? dayjs(record?.date) : '',
				sta: record?.sta ? dayjs(record?.sta, 'HH:mm') : '',
				std: record?.std ? dayjs(record?.std, 'HH:mm') : '',
			};
		}
		setDetailModal({ isOpen: true, record, isEdit });
	};
	const handleDetailModalClose = () => {
		setDetailModal({ isOpen: false, record: null });
		form.resetFields();
	};
	const columns = useMemo(
		() => [
			{
				title: '2L',
				dataIndex: ['airline', 'twoLetterCode'],
				key: 'airline',
				align: 'center',
				render: (text, record) => (
					<div
						style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
						onClick={() => handleDetailModalOpen(record)}
					>
						{text ?? '-'}
					</div>
				),
			},
			{
				title: '3L',
				dataIndex: 'airline',
				key: 'airline',
				align: 'center',
				render: (airline) => airline?.threeLetterCode ?? '-',
			},
			{
				title: 'FLNR',
				dataIndex: 'flightNo',
				key: 'flightNo',
				align: 'center',
				render: (flightNo) => flightNo ?? '-',
			},
			{
				title: 'FLDT',
				dataIndex: 'date',
				key: 'date',
				align: 'center',
				render: (date) => ConvertToDateTime(date, 'YYYY-MM-DD') ?? '-',
			},
			{
				title: 'CSGN',
				dataIndex: 'callSign',
				key: 'callSign',
				align: 'center',
				render: (callSign) => callSign ?? '-',
			},
			{
				title: 'NAT',
				dataIndex: 'natureCode',
				key: 'natureCode',
				align: 'center',
				render: (natureCode) => natureCode?.natureCode ?? '-',
			},
			{
				title: 'REG',
				dataIndex: 'aircraft',
				key: 'aircraft',
				align: 'center',
				render: (aircraft) => aircraft?.registration ?? '-',
			},
			{
				title: flightType == 'arrival' ? 'ORG' : 'DES',
				dataIndex: 'origin',
				key: 'origin',
				align: 'center',
				render: (origin) => origin ?? '-',
			},
			index === '1'
				? {
						title: 'STA',
						dataIndex: 'sta',
						key: 'sta',
						align: 'center',
						render: (sta) => sta ?? '-',
					}
				: {
						title: 'STD',
						dataIndex: 'std',
						key: 'std',
						align: 'center',
						render: (std) => std ?? '-',
					},
		],
		[seasonalData]
	);

	const noDataHandler = () => {
		return (
			<div className="seasonal_container">
				{writeAccess && (
					<Button
						title="Create"
						id="btn"
						type="filledText"
						isSubmit="submit"
						onClick={() => handleDetailModalOpen()}
					/>
				)}
			</div>
		);
	};
	const tabItems = [
		{
			key: '1',
			label: 'Arrival',
			children:
				Boolean(seasonalData?.length) || searchedValue || dateRangeValue?.length ? (
					<Arrival
						data={seasonalData}
						columns={columns}
						loading={isFetchLoading}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
					/>
				) : (
					noDataHandler()
				),
		},
		{
			key: '2',
			label: 'Departure',
			children:
				Boolean(seasonalData?.length) || searchedValue || dateRangeValue?.length ? (
					<Departure
						data={seasonalData}
						columns={columns}
						loading={isFetchLoading}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
					/>
				) : (
					noDataHandler()
				),
		},
	];
	useEffect(() => {
		if (dateRangeValue) {
			if (dateRangeValue?.length) {
				let [startDate, endDate] = dateRangeValue;
				startDate = ConvertToDateTime(startDate);
				endDate = ConvertToDateTime(endDate);
				setFilter({ ...filter, date: [startDate, endDate] });
			}
		} else {
			setFilter({ ...filter, date: dateRangeValue });
		}
	}, [dateRangeValue]);
	useEffect(() => {
		let debounceTimer;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			if (searchedValue != undefined) {
				if (searchedValue) {
					setFilter({ ...filter, search: searchedValue });
				} else {
					setFilter({ ...filter, search: undefined });
				}
			}
		}, 300);
		return () => clearTimeout(debounceTimer);
	}, [searchedValue]);
	return (
		<>
			<SocketEventListener refetch={refetch} apiName={`${GET_FLIGHT_SCHEDULE_PLANS}&flightType=${flightType}`} />
			{isLoading || isEditLoading || isPostLoading ? (
				<PageLoader loading={!searchedValue && !dateRangeValue?.length && true} />
			) : null}
			<div className="daily_schedule_container--tableContainer">
				<CustomTabs
					defaultActiveKey={index}
					items={tabItems}
					onChange={handleChange}
					type="simple"
					extraContent={operations}
				/>
			</div>

			{/* modals */}
			<ModalComponent
				isModalOpen={detailModal?.isOpen}
				width="80%"
				closeModal={handleDetailModalClose}
				onEdit={writeAccess && !detailModal?.isEdit && handleDetailModalOpen}
				record={detailModal?.record}
				title={`${!detailModal?.isEdit ? (detailModal?.record ? 'View' : 'Add') : 'Edit'} Flight`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={detailModal?.isEdit ? handleEditSave : handleSaveButton}
						handleButtonClose={handleDetailModalClose}
						isDaily={true}
						type={index}
						isEdit={detailModal?.isEdit}
						initialValues={detailModal?.record}
						isReadOnly={detailModal?.record && !detailModal?.isEdit}
					/>
				</div>
			</ModalComponent>
			<UploadCsvModal
				isModalOpen={isCsvModalOpen}
				width="720px"
				closeModal={closeCsvModal}
				handleUpload={handleUpload}
			/>
		</>
	);
};

export default DailySchedule;
