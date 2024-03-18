import React, { useState, useEffect } from 'react';
import Button from '../../../../../components/button/button';
// import ModalComponent from '../../../../../components/modalComponent/modalComponent';
import ButtonComponent from '../../../../../components/button/button';
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
import { ArrivalData, DepartureData } from './components/dummyData/dummy-data';
import editIcon from '../../../../../assets/logo/edit.svg';

import './seasonal.scss';

const Seasonal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [rows, setRows] = useState([]);
	const [rowData, setRowData] = useState(null);
	const [index, setIndex] = useState('1');

	const handleEdit = (record) => {
		setRowData(record);
		openEditModal();
	};

	const handleEditSave = (value) => {
		const prevRows = [...rows];
		const updatedRows = prevRows.map((row) => (row.key === value.key ? value : row));
		setRows(updatedRows);
		closeEditModal();
	};

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
		key === '1' && setRows(ArrivalData);
		key === '2' && setRows(DepartureData);
	};

	const handleDropdownItemClick = (value) => {
		if (value === 'create') {
			openModal();
		} else if (value === 'uploadCsv') {
			openCsvModal();
		}
	};

	const handleSaveButton = (value) => {
		const data = {
			key: rows.length,
			flightNumber: value.flightNumber,
			date: value.date,
			callSign: value.callSign,
			natureCode: value.natureCode,
			origin: value.origin,
			sta: value.sta,
			std: value.std,
			pos: value.pos,
			registration: value.registration,
			action: {},
		};
		setRows([data, ...rows]);
		closeModal();
	};

	const handleCloseButton = () => {
		setIsModalOpen(false);
		setIsEditModalOpen(false);
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
		{ title: 'Flight No.', dataIndex: 'flightNumber', key: 'flightNumber' },
		{ title: 'Date', dataIndex: 'date', key: 'date' },
		{ title: 'Call Sign', dataIndex: 'callSign', key: 'callSign' },
		{ title: 'Nature Code', dataIndex: 'natureCode', key: 'natureCode' },
		{ title: 'ORG', dataIndex: 'origin', key: 'origin' },
		index === '1' ? { title: 'STA', dataIndex: 'sta', key: 'sta' } : { title: 'STD', dataIndex: 'std', key: 'std' },
		{ title: 'POS', dataIndex: 'pos', key: 'pos' },
		{ title: 'REG No.', dataIndex: 'registration', key: 'registration' },
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
				</div>
			</>
		);
	};

	const tabItems = [
		{
			key: '1',
			label: 'Arrival',
			children: Boolean(rows?.length) ? <Arrival data={rows} columns={columns} /> : noDataHandler(),
		},
		{
			key: '2',
			label: 'Departure',
			children: Boolean(rows?.length) ? <Departure data={rows} columns={columns} /> : noDataHandler(),
		},
	];

	useEffect(() => {
		setRows(ArrivalData);
	}, []);

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
