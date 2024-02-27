import React, { useState } from 'react';
import Button from '../../../components/button/button';
import ModalComponent from '../../../components/modalComponent/modalComponent';
import './shortterm.scss';
const ShortTerm = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
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
				<ModalComponent isModalOpen={isModalOpen} width="400px" closeModal={closeModal} title="Modal Heading">
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
	);
};

export default ShortTerm;
