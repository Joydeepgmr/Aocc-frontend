import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modalComponent/modalComponent';
import FormComponent from '../formComponent/formComponent';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import './CDM.scss';


const CDM = () => {
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
				<ModalComponent isModalOpen={isModalOpen} width="120rem" closeModal={closeModal} title="Collaborative Decision Making Schedule" className="custom_modal">
					<div className="modal_content"><FormComponent /></div>
				</ModalComponent>

				<Button id="btn" title="Upload CSV" className="custom_svgButton" type="filledText" isSubmit="submit" onClick={openCsvModal} />
				<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeModal} />
				<Button id="btn" title="Download CSV Template" className="custom_svgButton" type="filledText" isSubmit="submit" onClick={openCsvModal} />
			</div>
		</div>
	);
};

export default CDM;