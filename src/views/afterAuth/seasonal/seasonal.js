import React, { useState } from 'react';
import Button from '../../../components/button/button';
import ModalComponent from '../../../components/modalComponent/modalComponent';
import './seasonal.scss';


const Seasonal = () => {
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
                <ModalComponent isModalOpen={isModalOpen} width="400px" closeModal={closeModal} title="Collaborative Decision Making Schedule">
                    <div>
                        <p>This is the form</p>
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

export default Seasonal;


// Resolved merge conflicts due to changes in reusable components by other team members
// Build 1st page of the seasonal component of the UI Part
// build two separate pages of planning and shortterm section
