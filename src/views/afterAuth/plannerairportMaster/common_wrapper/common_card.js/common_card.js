import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';
import ModalComponent from '../../../../../components/modal/modal';
import './common_card.scss';
const Common_Card = ({ title1, title2, title3, Heading, btnCondition, formComponent, formClassName }) => {
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
		<div className="aircraft-container">
			<div className="container">
				{title1 && <Button title={title1} id="btn" type="filledText" isSubmit="submit" onClick={openModal} />}

				<ModalComponent
					isModalOpen={isModalOpen}
					width="80vw"
					closeModal={closeModal}
					title={
						<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
							{Heading}
						</CustomTypography>
					}
					className="custom_modal"
				>
					<div className={`modal_content${formClassName}`}>{formComponent}</div>
				</ModalComponent>
				<Button
					id="btn"
					title={title2}
					className="custom_svgButton"
					type="filledText"
					isSubmit="submit"
					onClick={openCsvModal}
				/>
				{btnCondition ? (
					<Button
						id="btn"
						title={title3}
						className="custom_svgButton"
						type="filledText"
						isSubmit="submit"
						onClick={openCsvModal}
					/>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default Common_Card;
