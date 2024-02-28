import React, { useState } from 'react';
import Button from '../../../components/button/button';
import ModalComponent from '../../../components/modalComponent/modalComponent';

import './shortterm.scss';
const columns = [
	{ title: 'Flight No', dataIndex: 'FlightNo', key: 'FlightNo' },
	{ title: 'Date', dataIndex: 'Date', key: 'Date' },
	{ title: 'Flight ID', dataIndex: 'FlightID', key: 'FlightID' },
	{ title: 'Nature Code', dataIndex: 'NatureCode', key: 'NatureCode' },
	{ title: 'ORG', dataIndex: 'ORG', key: 'ORG' },
	{ title: 'VIA', dataIndex: 'VIA', key: 'VIA' },
	{ title: 'ATD', dataIndex: 'ATD', key: 'ATD' },
	{ title: 'STA', dataIndex: 'STA', key: 'STA' },
	{ title: 'ETA', dataIndex: 'address', key: 'address' },
	{ title: 'TMO', dataIndex: 'TMO', key: 'TMO' },
	{ title: 'ATA', dataIndex: 'ATA', key: 'ATA' },
	{ title: 'POS', dataIndex: 'POS', key: 'POS' },
	{ title: 'AC Type', dataIndex: 'ACType', key: 'ACType' },
	{ title: 'REG No.', dataIndex: 'REG No.', key: 'REG No.' },
];

const dummyData = [
	{ key: '1', name: 'AI 812', age: 30, address: 'New York' },
	{ key: '2', name: 'Jane Smith', age: 25, address: 'Los Angeles' },
	{ key: '3', name: 'Bob Johnson', age: 40, address: 'Chicago' },
];
const ShortTerm = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};
	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setIsCsvModalOpen(false);
	};
	const openModal = () => {
		setIsModalOpen(true);
	};
	return (
		<>
			<div className="mainHead">
				<div className="container">
					<Button title="Create" id="btn" type="filledText" isSubmit="submit" onClick={openModal} />
					<ModalComponent
						isModalOpen={isModalOpen}
						width="400px"
						closeModal={closeModal}
						title="Modal Heading"
					>
						<div>
							<p>This is the content of the modal.</p>
						</div>
					</ModalComponent>
					<Button
						id="btn"
						title="Upload CSV"
						className="custom_filledButton"
						type="filledText"
						isSubmit="submit"
						onClick={openCsvModal}
					/>
					<Button
						id="btn"
						title="Download CSV Template"
						className="custom_filledButton"
						type="filledText"
						isSubmit="submit"
						onClick={openCsvModal}
					/>
				</div>
			</div>
		</>
	);
};

export default ShortTerm;
