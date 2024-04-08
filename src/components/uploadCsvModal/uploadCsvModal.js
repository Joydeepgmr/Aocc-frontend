import React, { useState } from 'react';
import { Upload } from 'antd';
import Button from '../button/button';
import ModalComponent from '../modal/modal';
import CustomTypography from '../typographyComponent/typographyComponent';
import './uploadCsvModal.scss';

const UploadCsvModal = ({ isModalOpen, closeModal, width, handleUpload }) => {
	const [files, setFiles] = useState([]);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const acceptedFormats = ['.csv', '.xlsx'];

	// Function to handle file selection
	const handleFileSelect = (info) => {
		const file = info?.fileList[0]?.originFileObj;

		const invalidFile = ValidateFiles(file, acceptedFormats);
		invalidFile && setIsError(invalidFile);
		if (invalidFile) {
			setIsError(true);
			setFiles([]);
			setErrorMessage('Invalid file type. Please select a valid file.');
		} else {
			setIsError(false);
			setErrorMessage('');
			setFiles(info?.fileList);
		}
	};

	//Validate file types
	const ValidateFiles = (file, acceptedFormats) => {
		if(file){
			const fileExtension = file?.name?.split('.')?.pop()?.toLowerCase();
			const isValidFile = acceptedFormats.includes(`.${fileExtension}`) ? true : false;
			return !isValidFile;
		}
		return false;	
	};

	return (
		<>
			<ModalComponent
				title="Upload a CSV sheet"
				isModalOpen={isModalOpen}
				className="upload_csv--modal"
				width={width}
				height={"auto"}
				closeModal={() => {
					closeModal();
					setFiles([]);
					setIsError(false);
					setErrorMessage("")
				}}
			>
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
							accept=".csv, .xlsx"
							showUploadList={true}
							beforeUpload={(file) => {
								!isError && setFiles([file]);
								return false;
							}}
						>

							{!Boolean(files?.length) && (
								<Button title="Browse File" id="btn" type="filledText" className="custom_svgButton" />
							)}

						</Upload>
						{isError && <CustomTypography type="text" fontSize={14} fontWeight="400" color="#db0000">
							{errorMessage}
						</CustomTypography>}
						{Boolean(files?.length) && (
							<Button title="Upload" id="btn" type="filledText" onClick={() => {handleUpload(files); setFiles([])}} />
						)}
					</div>

					<div className="support_csv">Supports: CSV files</div>
				</div>
			</ModalComponent>
		</>
	);
};

export default UploadCsvModal;
