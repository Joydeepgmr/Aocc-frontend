import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import editIcon from '../../../../../../../assets/logo/edit.svg';
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [filter, setFilter] = useState({ date: null, search: null });
	const [rowData, setRowData] = useState(null);
	const [index, setIndex] = useState('1');
	const [flightType, setFlightType] = useState('arrival');
	const [form] = Form.useForm();
	const [filterForm] = Form.useForm();
	const searchedValue = Form.useWatch('search', filterForm);
	const dateRangeValue = Form.useWatch('date', filterForm);

	const getSeasonalHandler = {
		onSuccess: (data) => handleGetSeasonalSuccess(data),
		onError: (error) => handleGetSeasonalError(error),
	};

	const handleGetSeasonalSuccess = (data) => {
		if (data?.pages) {
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

	const openModal = () => {
		setIsModalOpen(true);
	};

	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};

	const closeCsvModal = () => {
		setIsCsvModalOpen(false);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setRowData({});
		form.resetFields();
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setRowData({});
		form.resetFields();
	};

	const handleChange = (key) => {
		setIndex(key);
		key === '1' && setFlightType('arrival');
		key === '2' && setFlightType('departure');
	};

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			openModal();
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
		setSeasonalData([]);
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-seasonal-plans');
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
			sta: value.sta,
			std: value.std,
			duration: value.duration,
			aircraftId: value?.aircraftId,
			type: value?.type,
		};

		data && postSeasonalPlans(data);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	//EDIT
	const handleEdit = (record) => {
		record = {
			...record,
			date: record?.date ? dayjs(record?.date) : '',
			sta: record?.sta ? dayjs(record?.sta, 'HH:mm') : '',
			std: record?.std ? dayjs(record?.std, 'HH:mm') : '',
		};
		setRowData(record);
		openEditModal();
	};

	const handleSeasonalEditSuccess = (data) => {
		closeEditModal();
		setSeasonalData([]);
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
		rowData?.id,
		editSeasonalPlansHandler
	);
	const { mutate: editSeasonalPlanDeparture } = useEditSeasonalPlanDeparture(rowData?.id, editSeasonalPlansHandler);
	const handleEditSave = (value) => {
		const data = {
			flightNo: value.flightNo,
			start: ConvertIstToUtc(value.start ?? value.date)?.split('T')[0],
			end: ConvertIstToUtc(value.end ?? value.date)?.split('T')[0],
			airline: value?.airlineId,
			natureCode: value?.natureCodeId,
			sector: value.origin,
			// sta: value.sta,
			// std: value.std,
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
		// {
		// 	label: 'Upload CSV',
		// 	value: 'uploadCSV',
		// 	key: '1',
		// },
		// {
		// 	label: 'Download CSV Template',
		// 	value: 'downloadCSVTemplate',
		// 	key: '2',
		// },
	];

	console.log(index, flightType);

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

			<DropdownButton
				dropdownItems={dropdownItems}
				buttonText="Actions"
				className="custom_dropdownButton"
				onChange={handleDropdownItemClick}
			/>
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
			console.error('No file provided for upload.');
		}
	};
	const columns = [
		{
			title: '2L',
			dataIndex: 'airline',
			key: 'airline',
			align: 'center',
			render: (airline) => airline?.twoLetterCode ?? '-',
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
		{
			title: 'ACTIONS',
			key: 'actions',
			render: (text, record) => (
				<div className="action_buttons">
					<Button
						onClick={() => handleEdit(record)}
						type="iconWithBorderEdit"
						icon={editIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
	];

	const noDataHandler = () => {
		return (
			<div className="seasonal_container">
				<Button title="Create" id="btn" type="filledText" isSubmit="submit" onClick={openModal} />
				{/* <Button
							id="btn"
							title="Upload CSV"
							className="custom_svgButton"
							type="filledText"
							isSubmit="submit"
							onClick={openCsvModal}
						/>
						<Button
							id="btn"
							title="Download CSV Template"
							className="custom_svgButton"
							type="filledText"
							isSubmit="submit"
							onClick={openCsvModal}
						/> */}
			</div>
		);
	};
	const tabItems = [
		{
			key: '1',
			label: 'Arrival',
			children: Boolean(seasonalData?.length) ? (
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
			children: Boolean(seasonalData?.length) ? (
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
				console.log('date filter is ', startDate, endDate);
				setFilter({ ...filter, date: [startDate, endDate] });
			}
		} else {
			setFilter({ ...filter, date: dateRangeValue });
		}
	}, [dateRangeValue]);
	console.log('date filter is', filter);
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
				console.log('search filter is ', searchedValue);
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
				isModalOpen={isModalOpen}
				width="80%"
				closeModal={closeModal}
				title={`Add New ${index === '1' ? 'Inbound' : 'Outbound'} Flight`}
				className="custom_modal_cdm"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						type={index}
						isDaily={true}
					/>
				</div>
			</ModalComponent>
			<UploadCsvModal
				isModalOpen={isCsvModalOpen}
				width="720px"
				closeModal={closeCsvModal}
				handleUpload={handleUpload}
			/>
			<ModalComponent
				isModalOpen={isEditModalOpen}
				width="80%"
				closeModal={closeEditModal}
				title={`Edit ${index === '1' ? 'Inbound' : 'Outbound'} Flight`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						form={form}
						handleSaveButton={handleEditSave}
						handleButtonClose={handleCloseButton}
						type={index}
						initialValues={rowData}
						isEdit={true}
						isDaily={true}
					/>
				</div>
			</ModalComponent>
		</>
	);
};

export default DailySchedule;
