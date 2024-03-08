import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import ModalComponent from '../../../../../components/modalComponent/modalComponent';
import FormComponent from './formComponent/formComponent';
import './aircraft.scss';
import AircraftDetails from './aircraftDetails/aircraftDetails';
const Aircrafts = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsCsvModalOpen(false);
	};

	return (
		<>
			{/* <div className="aircraft-container">
				<div className="container">
					<Button title="Create" id="btn" type="filledText" isSubmit="submit" onClick={openModal} />
					<ModalComponent
						isModalOpen={isModalOpen}
						width="120rem"
						closeModal={closeModal}
						title={
							<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
								Setup aircraft registration
							</CustomTypography>
						}
						className="custom_modal"
					>
						<div className="modal_content">
							<FormComponent closeModal={closeModal} />
						</div>
					</ModalComponent>
					<Button
						id="btn"
						title="Import Global Reference"
						className="custom_svgButton"
						type="filledText"
						isSubmit="submit"
						onClick={openCsvModal}
					/>
				</div>
			</div> */}
			<AircraftDetails />
		</>
	);
};

export default React.memo(Aircrafts);
