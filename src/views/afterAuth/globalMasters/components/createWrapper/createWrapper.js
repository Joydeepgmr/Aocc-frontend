import React, { useState } from 'react';
import ButtonComponent from '../../../../../components/button/button';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import './createWrapper.scss';

const CreateWrapper = ({ width, tableComponent, data = [], pagination = { isMore: true }, fetchData, createProps, setCreateProps, label = 'Create Wrapper changed update your code' }) => {
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
		``
		if (value === 'createNew') {
			openAddModal();
			// if (disabled) {
			// 	dispatch(formDisabled());
			// }
		}
		else if (value === 'uploadCSV') {
			openCsvModal();
		} else {
			createProps.onDownload();
		}
	};

	return (
		<>
			{data && data?.length ?
				<div className="table_container">
					<InfiniteScroll
						dataLength={data.length} // This is important to determine when to fetch more data
						next={fetchData} // Function to call when reaching the end of the list
						hasMore={pagination?.isMore} // Boolean to indicate if there is more data to load
					>
						<div className="create_button">
							<DropdownButton
								dropdownItems={dropdownItems}
								buttonText="Create"
								onChange={handleDropdownChange}
								onOpenChange={onOpenChange}
							/>
						</div>
						{tableComponent && tableComponent}
					</InfiniteScroll>
				</div>
				: <>
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
				</>
			}
			<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeCsvModal} handleUpload={handleCsvUpload} />
		</>
	);
};

export default CreateWrapper;