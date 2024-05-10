import { Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { GET_SEASONAL_PLANS } from '../../../../../api';
import editIcon from '../../../../../assets/logo/edit.svg';
import Button from '../../../../../components/button/button';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import {
	useDownloadCSV,
	useEditSeasonalPlanArrival,
	useEditSeasonalPlanDeparture,
	useGetSeasonalPlans,
	usePostSeasonalPlans,
	useUploadCSV,
} from '../../../../../services/SeasonalPlanServices/seasonalPlan';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { ConvertIstToUtc, ConvertToDateTime } from '../../../../../utils';
import FormComponent from '../formComponent/formComponent';
import Arrival from './components/arrival/arrival';
import Departure from './components/departure/departure';
import './seasonal.scss';

const Seasonal = ({ tab }) => {
	const queryClient = useQueryClient();
	const [seasonalData, setSeasonalData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [index, setIndex] = useState('1');
	const [flightType, setFlightType] = useState('arrival');
	const [form] = Form.useForm();
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
	const handleChange = (key) => {
		setIndex(key);
		key === '1' && setFlightType('arrival');
		key === '2' && setFlightType('departure');
	};

	const {
		data: fetchedSeasonalPlans,
		isLoading: isFetchLoading,
		hasNextPage,
		fetchNextPage,
		refetch: getSeasonalPlanRefetch,
	} = useGetSeasonalPlans(flightType, tab, getSeasonalHandler);

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

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			openModal();
		} else if (value === 'uploadCSV') {
			openCsvModal();
		} else if (value === 'downloadCSVTemplate') {
			handleDownloadCSV();
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
		form.resetFields();
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
			sector: value?.origin,
			sta: value.sta,
			std: value.std,
			duration: value.duration,
			aircraftId: value?.aircraftId,
			frequency: Boolean(value?.weeklySelect?.length) ? value?.weeklySelect : [value?.date?.day()],
			type: value?.type,
		};
		data && postSeasonalPlans(data);
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
		form.resetFields();
		setRowData({});
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
			// frequency: Boolean(value?.weeklySelect?.length) ? value?.weeklySelect : [value?.date?.day()],
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
		{
			label: 'Upload CSV',
			value: 'uploadCSV',
			key: '1',
		},
		{
			label: 'Download CSV Template',
			value: 'downloadCSVTemplate',
			key: '2',
		},
	];

	const operations = (
		<div>
			<DropdownButton
				dropdownItems={dropdownItems}
				buttonText="Actions"
				className="custom_dropdownButton"
				onChange={handleDropdownItemClick}
			/>
		</div>
	);
	const uploadCsvHandler = {
		onSuccess: (data) => handleUploadCsvSuccess(data),
		onError: (error) => handleUploadCsvError(error),
	};

	const handleUploadCsvSuccess = () => {
		toast.success('CSV Uploaded Successfully');
		queryClient.invalidateQueries('get-seasonal-plans');
		closeCsvModal();
	};

	const handleUploadCsvError = (error) => {
		toast.error(error?.response?.data?.message);
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

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);

	const { refetch, isLoading: isDownloading } = useDownloadCSV('planner-sample-file', { onError });

	//DOWNLOAD
	const handleDownloadCSV = () => {
		refetch();
	};

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
			title: 'FREQ',
			dataIndex: 'seasonalPlan',
			key: 'seasonalPlan',
			render: (seasonalPlan) =>
				seasonalPlan?.frequency
					? seasonalPlan?.frequency?.map((dayIndex) => daysOfWeek[dayIndex]).join(', ')
					: '-',
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
				<Button
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
				/>
			</div>
		);
	};

	const tabItems = [
		{
			key: '1',
			label: 'Arrival',
			children: Boolean(seasonalData?.length) ? (
				<Arrival data={seasonalData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage} />
			) : (
				noDataHandler()
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: Boolean(seasonalData?.length) ? (
				<Departure data={seasonalData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage} />
			) : (
				noDataHandler()
			),
		},
	];

	return (
		<>
			<SocketEventListener
				refetch={getSeasonalPlanRefetch}
				apiName={`${GET_SEASONAL_PLANS}?flightType=${flightType}&tab=${tab}`}
			/>
			{isFetchLoading || isEditLoading || isPostLoading || isDownloading ? (
				<PageLoader loading={true} />
			) : (
				<div className="seasonal_container--tableContainer">
					<CustomTabs
						defaultActiveKey={index}
						items={tabItems}
						onChange={handleChange}
						type="simple"
						extraContent={operations}
					/>
				</div>
			)}

			{/* modals */}
			{isModalOpen && (
				<ModalComponent
					isModalOpen={isModalOpen}
					width="80%"
					closeModal={closeModal}
					title={`Add New ${index === '1' ? 'Inbound' : 'Outbound'} Flight`}
					className="custom_modal"
				>
					<div className="modal_content">
						<FormComponent
							form={form}
							handleSaveButton={handleSaveButton}
							handleButtonClose={handleCloseButton}
							type={index}
							initialValues={false}
						/>
					</div>
				</ModalComponent>
			)}
			<UploadCsvModal
				isModalOpen={isCsvModalOpen}
				width="72rem"
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
					/>
				</div>
			</ModalComponent>
		</>
	);
};

export default Seasonal;
