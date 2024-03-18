import React, { useState } from 'react';
import ModalComponent from '../modal/modal';
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
				<div className="upload_csv_border" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
					<div className="csv_container">
						<p>Drag and Drop files here</p>
						<div className="csv_line_box">
							<div className="csv_line"></div>
							<div>OR</div>
							<div className="csv_line"></div>
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
							<Button className="browse_files_button">Browse Files</Button>
						</Upload>
					</div>
					<div className="support_csv">Supports: CSV files</div>
				</div>
			</ModalComponent>
		</>
	);
};

export default UploadCsvModal;
