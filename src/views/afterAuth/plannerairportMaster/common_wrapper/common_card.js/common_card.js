import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import './common_card.scss';
const Common_Card = ({ title1, title2, title3, btnCondition, openModal, openCsvModal }) => {
	return (
		<div className="aircraft-container">
			<div className="container">
				{title1 && <Button title={title1} id="btn" type="filledText" isSubmit="submit" onClick={openModal} />}

				{title2 && (
					<Button
						id="btn"
						title={title2}
						className="custom_svgButton"
						type="filledText"
						isSubmit="submit"
						onClick={openCsvModal}
					/>
				)}
				{btnCondition && title3 ? (
					<Button
						id="btn"
						title={title3}
						className="custom_svgButton"
						type="filledText"
						isSubmit="submit"
						onClick={openCsvModal}
					/>
				) : null}
			</div>
		</div>
	);
};

export default Common_Card;
