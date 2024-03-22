import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import Button from '../../../../../../../components/button/button';
import ModalComponent from '../../../../../../../components/modal/modal';
import FormComponent from '../../../formComponent/formComponent';
import UploadCsvModal from '../../../../../../../components/uploadCsvModal/uploadCsvModal';
import CustomTypography from '../../../../../../../components/typographyComponent/typographyComponent';
import Filter from '../../../../../../../assets/Filter.svg';
import InputField from '../../../../../../../components/input/field/field';
import CustomTabs from '../../../../../../../components/customTabs/customTabs';
import DropdownButton from '../../../../../../../components/dropdownButton/dropdownButton';
import Arrival from '../arrival/arrival';
import Departure from '../departure/departure';
import editIcon from '../../../../../../../assets/logo/edit.svg';
import { ConvertUtcToIst, ConvertIstToUtc } from '../../../../../../../utils';
import { useEditSeasonalPlanArrival, useGetSeasonalPlans, usePostSeasonalPlans, useEditSeasonalPlanDeparture, useUploadCSV } from '../../../../../../../services/SeasonalPlanServices/seasonalPlan';

import './CDMSchedule.scss';


const DailySchedule = ({tab}) => {
	console.log(tab, "tabb");
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [index, setIndex] = useState('1');
	const [flightType, setFlightType] = useState('arrival');
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { data: fetchedSeasonalPlans, isLoading: isSeasonalPlansLoading } = useGetSeasonalPlans(flightType,tab);

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
	const { mutate: postSeasonalPlans } = usePostSeasonalPlans();
	const handleSaveButton = (value) => {
		const data = {
			FLIGHTNO: value.FLIGHTNO,
			START: ConvertIstToUtc(value.start ?? value.date).split('T')[0],
			END: ConvertIstToUtc(value.end ?? value.date).split('T')[0],
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
		closeModal();
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
	};

	//EDIT 
	const handleEdit = (record) => {
		setRowData(record);
		openEditModal();
	};

	const editSeasonalPlansHandler = {
		onSuccess: (data) =>handleSeasonalEditSuccess(data),
		onError: (error) => handleSeasonalEditError(error),
	};
	
	const {mutate: editSeasonalPlanArrival} = useEditSeasonalPlanArrival(rowData?.id,editSeasonalPlansHandler)
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
	
	const handleSeasonalEditSuccess = () => {
		queryClient.invalidateQueries('get-seasonal-plans');
		closeEditModal();
	}

	const handleSeasonalEditError = (error) => {
		setIsError(true);
		setErrorMessage(error?.response?.data?.message);
	}
	// console.log(arrivalEditSuccess,"SUCCESSS???");
	// console.log(statusMessage,"status");

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
		onSuccess: (data) =>handleUploadCsvSuccess(data),
		onError: (error) => handleUploadCsvError(error),
	};

	const {mutate: onUploadCSV} = useUploadCSV(uploadCsvHandler);

	//UPLOAD
	const handleUpload = (file) => {
		const data = file[0].originFileObj;
		console.log(data,"filessssssss");
		// const formData = new FormData();
        // file && formData.append('file', data);
		//type = application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
		//onUploadCSV(formData);
	}

	const handleUploadCsvSuccess = () => {
		queryClient.invalidateQueries('get-seasonal-plans');
		closeCsvModal();
	}

	const handleUploadCsvError = (error) => {
		setErrorMessage("Incorrect File Type")
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
			? { title: 'STA', dataIndex: 'STA', key: 'STA', render: (STA) => (STA !== null ? (STA).split('T')[1].slice(0,5) : '-') }
			: { title: 'STD', dataIndex: 'STD', key: 'STD', render: (STD) => (STD !== null ? (STD).split('T')[1].slice(0,5) : '-'), },
		{ title: 'POS', dataIndex: 'pos', key: 'pos', render: (pos) => (pos ?? '-'), },
		{ title: 'REG No.', dataIndex: 'registration', key: 'registration', render: (registration) => ( registration ?? '-'), },
        { title: 'Flight Split (No.)', dataIndex: 'flightSplit', key: 'flightSplit', render: (flightSplit) => ( flightSplit ?? '-'), },
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
							disabled={isSeasonalPlansLoading}
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
			children: Boolean(fetchedSeasonalPlans?.length) ? (
				<Arrival data={fetchedSeasonalPlans} columns={columns} />
			) : (
				noDataHandler()
			),
		},
		{
			key: '2',
			label: 'Departure',
			children: Boolean(fetchedSeasonalPlans?.length) ? (
				<Departure data={fetchedSeasonalPlans} columns={columns} />
			) : (
				noDataHandler()
			),
		},
	];

	return (
		<>
			<div className="main_TableContainer">
				<div className="top_container">
					<div>
						<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
							Flight Schedule Planning
						</CustomTypography>
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
							disabled={isSeasonalPlansLoading}
						/>
						<InputField
							label="search"
							name="search"
							placeholder="Search"
							className="custom_inputField"
							warning="Required field"
							type="search"
							disabled={isSeasonalPlansLoading}
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
						isError = {isError}
						errorMessage = {errorMessage}
					/>
				</div>
			</ModalComponent>
		</>
	);
};

export default DailySchedule;
