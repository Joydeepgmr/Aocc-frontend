import React, { useState } from 'react';
import ModalComponent from '../modalComponent/modalComponent';
import './uploadCsvModal.scss';
import { Button, Upload } from 'antd';

const UploadCsvModal = ({ isModalOpen, closeModal, width }) => {
	const [files, setFiles] = useState([]);

	// Function to handle file selection
	const handleFileSelect = (info) => {
		setFiles(info.fileList);
	};

	// Function to handle file drop
	const handleFileDrop = (info) => {
		setFiles(info.fileList);
	};

	files.forEach((file, index) => {
		console.log(`File ${index + 1}:`, file.originFileObj);
	});

	return (
		<>
			<ModalComponent title="Upload a CSV sheet" isModalOpen={isModalOpen} width={width} closeModal={closeModal}>
				<div className="upload-csv-border" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
					<div className="csv-container">
						<p>Drag and Drop files here</p>
						<div className="csv-line-box">
							<div className="csv-line"></div>
							<div>OR</div>
							<div className="csv-line"></div>
						</div>
						<Upload
							onChange={handleFileSelect}
							fileList={files}
							accept=".csv"
							multiple
							showUploadList={true}
							beforeUpload={(file) => {
								setFiles([...files, file]);
								return false;
							}}
						>
							<Button className="browse-files-button">Browse Files</Button>
						</Upload>
					</div>
					<div className="support-csv">Supports: CSV files</div>
				</div>
			</ModalComponent>
		</>
	);
};

export default UploadCsvModal;
