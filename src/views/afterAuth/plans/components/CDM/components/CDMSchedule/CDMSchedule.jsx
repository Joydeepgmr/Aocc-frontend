import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import Button from '../../../../../../../components/button/button';
import ModalComponent from '../../../../../../../components/modal/modal';
import FormComponent from '../../../formComponent/formComponent';
import UploadCsvModal from '../../../../../../../components/uploadCsvModal/uploadCsvModal';
import TopHeader from '../../../../../../../components/topHeader/topHeader';
import Filter from '../../../../../../../assets/Filter.svg';
import InputField from '../../../../../../../components/input/field/field';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import DropdownButton from '../../../../../../../components/dropdownButton/dropdownButton';
import PageLoader from '../../../../../../../components/pageLoader/pageLoader';
import Arrival from '../arrival/arrival';
import Departure from '../departure/departure';
import editIcon from '../../../../../../../assets/logo/edit.svg';
import { ConvertUtcToIst, ConvertIstToUtc } from '../../../../../../../utils';
import { useEditSeasonalPlanArrival, useGetSeasonalPlans, usePostSeasonalPlans, useEditSeasonalPlanDeparture, useUploadCSV } from '../../../../../../../services/SeasonalPlanServices/seasonalPlan';

import './CDMSchedule.scss';


const DailySchedule = ({tab}) => {
	const queryClient = useQueryClient();
	const [seasonalData, setSeasonalData] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [index, setIndex] = useState('1');
	const [flightType, setFlightType] = useState('arrival');

	const getSeasonalHandler = {
		onSuccess: (data) => handleGetSeasonalSuccess(data),
		onError: (error) => handleGetSeasonalError(error),
	};

	const handleGetSeasonalSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data?.flightSchedule || []);
			}, []);
		
			setSeasonalData([...newData]);
		}
	};

	const handleGetSeasonalError = (error) => {
		toast.error(error?.response?.data?.message);
	}
	const { data: fetchedSeasonalPlans, isLoading: isFetchLoading, hasNextPage, fetchNextPage } = useGetSeasonalPlans(flightType,tab,getSeasonalHandler);

	useEffect(() => {
		console.log(isFetchLoading,"loadingg");
	}, [isFetchLoading])
	console.log(fetchedSeasonalPlans,hasNextPage, fetchNextPage,"fetched");
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
	};

	const openEditModal = () => {
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
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
		setSeasonalData([])
		closeModal();
		toast.success(data?.message);
		queryClient.invalidateQueries('get-seasonal-plans');
	};

	const handleAddSeasonalError = (error) => {
		console.log(error);
		toast.error(error?.response?.data?.message);
	};
	const { mutate: postSeasonalPlans, isLoading: isPostLoading } = usePostSeasonalPlans(addseasonalHandler);
	const handleSaveButton = (value) => {
		const data = {
			FLIGHTNO: value.FLIGHTNO,
			START: ConvertIstToUtc(value.start ?? value.date),
			END: ConvertIstToUtc(value.end ?? value.date),
			callSign: value.callSign,
			natureCode: value.natureCode,
			origin: value.origin,
			STA: value.STA,
			STD: value.STD,
			pos: value.pos,
			registration: value.registration,
			FREQUENCY: value.weeklySelect ?? [value.date.day()],
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
			date: record?.PDATE ? dayjs(record?.PDATE) : '',
		}
		console.log(record,"record");
		setRowData(record);
		openEditModal();
	};

	const handleSeasonalEditSuccess = (data) => {
		closeEditModal();
		setSeasonalData([]);
		toast.success(data?.message);	
		queryClient.invalidateQueries('get-seasonal-plans');	
	}

	const handleSeasonalEditError = (error) => {
		toast.error(error?.response?.data?.message);
	}

	const editSeasonalPlansHandler = {
		onSuccess: (data) =>handleSeasonalEditSuccess(data),
		onError: (error) => handleSeasonalEditError(error),
	};
	
	const {mutate: editSeasonalPlanArrival, isLoading: isEditLoading} = useEditSeasonalPlanArrival(rowData?.id,editSeasonalPlansHandler)
	const {mutate: editSeasonalPlanDeparture} = useEditSeasonalPlanDeparture(rowData?.id, editSeasonalPlansHandler)
	const handleEditSave = (value) => {
		const data = {
			FLIGHTNO: value.FLIGHTNO,
			callSign: value.callSign,
			natureCode: value.natureCode,
			origin: value.origin,
			STA: value.STA,
			STD: value.STD,
			pos: value.pos,
			registration: value.registration,
		};
		index === '1' && editSeasonalPlanArrival(data);
		index=== '2' && editSeasonalPlanDeparture(data);
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
	
	const handleUploadCsvSuccess = () => {
		queryClient.invalidateQueries('get-seasonal-plans');
		closeCsvModal();
	}

	const handleUploadCsvError = () => {
		toast.error("Invalid File Type");
	}
	
	const uploadCsvHandler = {
		onSuccess: () => handleUploadCsvSuccess(),
		onError: () => handleUploadCsvError(),
	};

	const {mutate: onUploadCSV} = useUploadCSV(uploadCsvHandler);

	//UPLOAD
	const handleUpload = (file) => {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			
			console.log(file[0].originFileObj, file, formData, "data"); // Ensure that the data is present
			
			onUploadCSV(formData);
		} else {
			console.error('No file provided for upload.');
		}
	}
	

	const columns = [
		{
			title: 'Flight No.',
			dataIndex: 'FLIGHTNO',
			key: 'FLIGHTNO',
			render: (FLIGHTNO) => (FLIGHTNO ?? '-'),
		},
		{ title: 'Date', dataIndex: 'PDATE', key: 'PDATE', render: (PDATE) => (PDATE !== null ? ConvertUtcToIst(PDATE) : '-') },
		{
			title: 'Call Sign',
			dataIndex: 'callSign',
			key: 'callSign',
			render: (callSign) => (callSign ?? '-'),
		},
		{
			title: 'Nature Code',
			dataIndex: 'natureCode',
			key: 'natureCode',
			render: (natureCode) => (natureCode ?? '-'),
		},
		{ title: 'ORG', dataIndex: 'origin', key: 'origin', render: (origin) => (origin ?? '-') },
		index === '1'
			? { title: 'STA', dataIndex: 'STA', key: 'STA', render: (STA) => (STA !== null ? (STA)?.split('T')[1].slice(0,5) : '-') }
			: { title: 'STD', dataIndex: 'STD', key: 'STD', render: (STD) => (STD !== null ? (STD)?.split('T')[1].slice(0,5) : '-'), },
		{ title: 'POS', dataIndex: 'pos', key: 'pos', render: (pos) => (pos ?? '-'), },
		{ title: 'REG No.', dataIndex: 'registration', key: 'registration', render: (registration) => ( registration ?? '-'), },
		{
			title: 'Actions',
			key: 'actions',
			render: (text, record) => (
				<div className="action_buttons">
					<Button
						onClick={() => handleEdit(record)}
						type="iconWithBorder"
						icon={editIcon}
						className="custom_icon_buttons"
					/>
				</div>
			),
		},
	];

	const noDataHandler = () => {
		return (
			<>
				<div className="main_buttonContainer">
					<div className="seasonal_container">
						<Button
							title="Create"
							id="btn"
							type="filledText"
							isSubmit="submit"
							onClick={openModal}
						/>
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
				</div>
			</>
		);
	};

	const tabItems = [
		{
			key: '1',
			label: 'Arrival',
			children: Boolean(fetchedSeasonalPlans?.pages[0]?.data?.flightSchedule?.length) ? (
				<Arrival data={seasonalData} columns={columns}  fetchData={fetchNextPage} pagination={hasNextPage} />
			) : (
				noDataHandler()
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: Boolean(fetchedSeasonalPlans?.pages[0]?.data?.flightSchedule?.length) ? (
				<Departure data={seasonalData} columns={columns} fetchData={fetchNextPage} pagination={hasNextPage}/>
			) : (
				noDataHandler()
			),
		},
	];

	return (
		<>
		<PageLoader loading={isFetchLoading || isEditLoading || isPostLoading}/>
			<div className="main_TableContainer">
				<div className="top_container">
					<div>
					<TopHeader
                heading="Daily Flight Schedule"
            	/>
					</div>
					<div className="icon_container">
						<Button
							onClick={() => {
								alert('Filter Icon');
							}}
							type="iconWithBorder"
							className={'custom_filter'}
							icon={Filter}
							alt="arrow icon"
						/>
						<InputField
							label="search"
							name="search"
							placeholder="Search"
							className="custom_inputField"
							warning="Required field"
							type="search"
						/>
					</div>
				</div>
				<div className="table_container">
					<div>
						<CustomTabs
							defaultActiveKey="1"
							items={tabItems}
							onChange={handleChange}
							type="simple"
							extraContent={operations}
						/>
					</div>
				</div>
			</div>

			{/* modals */}
			<ModalComponent
				isModalOpen={isModalOpen}
				width="120rem"
				closeModal={closeModal}
				title={`Add New ${index === '1' ? 'Inbound' : 'Outbound'} Flight`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						handleSaveButton={handleSaveButton}
						handleButtonClose={handleCloseButton}
						type={index}
						key={Math.random() * 100}
					/>
				</div>
			</ModalComponent>
			<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeCsvModal} handleUpload={handleUpload} />
			<ModalComponent
				isModalOpen={isEditModalOpen}
				width="120rem"
				closeModal={closeEditModal}
				title={`Edit ${index === '1' ? 'Inbound' : 'Outbound'} Flight`}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent
						handleSaveButton={handleEditSave}
						handleButtonClose={handleCloseButton}
						type={index}
						initialValues={rowData}
						isEdit = {true}
					/>
				</div>
			</ModalComponent>
		</>
	);
};

export default DailySchedule;
