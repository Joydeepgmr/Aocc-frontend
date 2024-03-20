import React, { useState } from 'react';
import { Upload } from 'antd';
import Button from '../button/button'
import ModalComponent from '../modal/modal';
import './uploadCsvModal.scss';


const UploadCsvModal = ({ isModalOpen, closeModal, width, handleUpload }) => {
	const [files, setFiles] = useState([]);

	// Function to handle file selection
	const handleFileSelect = (info) => {
		setFiles(info.fileList);
	};

	return (
		<>
			<ModalComponent title="Upload a CSV sheet" isModalOpen={isModalOpen} width={width} closeModal={closeModal}>
				<div className="upload_csv_border" onDrop={handleFileSelect} onDragOver={(e) => e.preventDefault()}>
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
							showUploadList={true}
							beforeUpload={(file) => {
								setFiles([file]);
								return false;
							}}
						>
							<Button
							title="Browse File"
							id="btn"
							type="filledText"
							className="custom_svgButton"
						/>
						</Upload>
						<Button
							title="Upload"
							id="btn"
							type="filledText"
							onClick={()=>handleUpload(files)}
						/>
					</div>
					
					<div className="support_csv">Supports: CSV files</div>
				</div>
			</ModalComponent>
		</>
	);
};

export default UploadCsvModal;
