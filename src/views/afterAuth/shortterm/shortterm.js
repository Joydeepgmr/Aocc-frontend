import React, { useState } from 'react';
import Button from '../../../components/button/button';
import ModalComponent from '../../../components/modalComponent/modalComponent';
import FormComponent from '../formComponent/formComponent';

import './shortterm.scss';
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
		<div className="mainHead">
			<div className="container">
				<Button title="Create" id="btn" type="filledText" isSubmit="submit" onClick={openModal} />
				<ModalComponent
					isModalOpen={isModalOpen}
					width="120rem"
					closeModal={closeModal}
					title="Short Term Planning"
					className="modals_class"
				>
					<div className="modal-content">
						<FormComponent />
					</div>
				</ModalComponent>
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
	);
};

export default ShortTerm;
