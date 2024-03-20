import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import FormComponent from '../formComponent/formComponent';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import Filter from '../../../../../assets/Filter.svg';
import InputField from '../../../../../components/input/field/field';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import Arrival from './components/arrival/arrival';
import Departure from './components/departure/departure';
import editIcon from '../../../../../assets/logo/edit.svg';
import ConvertIstToUtc from '../../../../../utils/ConvertIstToUtc';
import { useEditSeasonalPlanArrival, useGetSeasonalPlans, usePostSeasonalPlans, useEditSeasonalPlanDeparture } from '../../../../../services/SeasonalPlanServices/seasonalPlan';

import './seasonal.scss';

const Seasonal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const [index, setIndex] = useState('1');
	const [flightType, setFlightType] = useState('arrival');

	const { data: fetchedSeasonalPlans, isLoading: isSeasonalPlansLoading } = useGetSeasonalPlans(flightType);

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
		} else if (value === 'uploadCsv') {
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
			//registration: value.registration,
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

	const {mutate: editSeasonalPlanArrival} = useEditSeasonalPlanArrival(rowData?.id)
	const {mutate: editSeasonalPlanDeparture} = useEditSeasonalPlanDeparture(rowData?.id)

	const handleEditSave = (value) => {
		const data = {
			FLIGHTNO: value.FLIGHTNO,
			callSign: value.callSign,
			natureCode: value.natureCode,
			origin: value.origin,
			STA: value.STA,
			STD: value.STD,
			pos: value.pos,
			//registration: value.registration,
		};
		index === '1' ? editSeasonalPlanArrival(data) : editSeasonalPlanDeparture(data);
		closeEditModal()
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

	const columns = [
		{
			title: 'Flight No.',
			dataIndex: 'FLIGHTNO',
			key: 'FLIGHTNO',
			render: (FLIGHTNO) => (FLIGHTNO !== null ? FLIGHTNO : '-'),
		},
		{ title: 'Date', dataIndex: 'PDATE', key: 'PDATE', render: (PDATE) => (PDATE !== null ? PDATE : '-') },
		{
			title: 'Call Sign',
			dataIndex: 'callSign',
			key: 'callSign',
			render: (callSign) => (callSign !== null ? callSign : '-'),
		},
		{
			title: 'Nature Code',
			dataIndex: 'natureCode',
			key: 'natureCode',
			render: (natureCode) => (natureCode !== null ? natureCode : '-'),
		},
		{ title: 'ORG', dataIndex: 'origin', key: 'origin', render: (origin) => (origin !== null ? origin : '-') },
		index === '1'
			? { title: 'STA', dataIndex: 'STA', key: 'STA', render: (STA) => (STA !== null ? STA : '-') }
			: { title: 'STD', dataIndex: 'STD', key: 'STD', render: (STD) => (STD !== null ? STD : '-'), },
		{ title: 'POS', dataIndex: 'pos', key: 'pos', render: (pos) => (pos !== null ? pos : '-'), },
		{ title: 'REG No.', dataIndex: 'registration', key: 'registration', render: (registration) => (registration !== null ? registration : '-'), },
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
			<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeCsvModal} />
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
					/>
				</div>
			</ModalComponent>
		</>
	);
};

export default Seasonal;
