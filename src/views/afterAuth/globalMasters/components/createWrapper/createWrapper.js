import React, { useState } from 'react';
import ButtonComponent from '../../../../../components/button/button';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import './createWrapper.scss';

const CreateWrapper = ({ width, tableComponent, data = [], createProps, setCreateProps, label, isLoading }) => {
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const onOpenChange = () => {
		if (createProps.new) {
			setCreateProps({ ...createProps, new: false });
		}
	}
	let dropdownItems = [{
		label,
		value: 'createNew',
		key: '0',
	},
	{
		label: 'Upload CSV',
		value: 'uploadCSV',
		key: '1',
	},
	{
		label: 'Download CSV Template',
		value: 'downloadCsv',
		key: '2',
	},];
	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};
	const openAddModal = () => {
		setCreateProps((props) => { return { ...props, new: true } });
	};
	const closeCsvModal = () => {
		setIsCsvModalOpen(false);
	};
	const handleCsvUpload = (files) => {
		createProps.onUpload(files);
		closeCsvModal();
	}


	const handleDropdownChange = (value) => {
		if (value === 'createNew') {
			openAddModal();
		}
		else if (value === 'uploadCSV') {
			openCsvModal();
		} else {
			createProps.onDownload();
		}
	};
	return (
		<>
			<>
				{data && data?.length ?
					<div className="table_container">
						<div className="create_button">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								onChange={handleDropdownChange}
								onOpenChange={onOpenChange}
							/>
						</div>
						{tableComponent && tableComponent}
					</div>
					: !isLoading ? <>
						{tableComponent && tableComponent}
						<div className="create_wrapper_container">
							<ButtonComponent
								title="Create"
								type="filledText"
								className="custom_button_create"
								onClick={openAddModal}
							/>
							<ButtonComponent
								title="Upload CSV"
								type="filledText"
								className="custom_button"
								onClick={openCsvModal}
							/>
							<ButtonComponent title="Download CSV Template" type="filledText" className="custom_button" />
						</div>
					</> : <PageLoader loading={isLoading} />
				}
			</>
			<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeCsvModal} handleUpload={handleCsvUpload} />
		</>
	);
};

export default CreateWrapper;