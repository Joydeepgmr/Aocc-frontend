import React, { useState } from 'react';
import Button from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import FormComponent from '../formComponent/formComponent';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import CDMSchedule from './components/CDMSchedule/CDMSchedule';
import './CDM.scss';
import ResourceAllocation from './components/resourceAllocation/resourceAllocation';

const CDM = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const items = [
		{
			key: '1',
			label: 'CDM Schedule',
			children: <CDMSchedule />,
		},
		{
			key: '2',
			label: 'Resource Allocation',
			children: <ResourceAllocation />,
		},
	];
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

	const handleChange = () => {
		console.log('Tab switch');
	};

	return (
		<div className="mainHead">
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
			{/* <div className="container">
				<Button title="Create" id="btn" type="filledText" isSubmit="submit" onClick={openModal} />
				<ModalComponent isModalOpen={isModalOpen} width="120rem" closeModal={closeModal} title="Collaborative Decision Making Schedule" className="custom_modal">
					<div className="modal_content"><FormComponent handleButtonClose={()=>setIsModalOpen(false)} handleSaveButton={()=>setIsModalOpen(false)} /></div>
				</ModalComponent>

				<Button
					id="btn"
					title="Upload CSV"
					className="custom_svgButton"
					type="filledText"
					isSubmit="submit"
					onClick={openCsvModal}
				/>
				<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeModal} />
				<Button
					id="btn"
					title="Download CSV Template"
					className="custom_svgButton"
					type="filledText"
					isSubmit="submit"
					onClick={openCsvModal}
				/>
			</div> */}
		</div>
	);
};

export default CDM;
