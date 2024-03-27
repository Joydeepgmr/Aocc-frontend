import React, { useState } from 'react';
import ButtonComponent from '../../../../../components/button/button';
// import { useDispatch, useSelector } from 'react-redux';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
// import { formDisabled } from '../../redux/reducer';
import { usePostGlobalAircraftRegistration, usePostGlobalAircraftType, usePostGlobalAirport } from '../../../../../services/globalMasters/globalMaster';
import './createWrapper.scss';
import InfiniteScroll from 'react-infinite-scroll-component';

const CreateWrapper = ({ width, tableComponent, data = [], pagination = { isMore: true }, fetchData, createProps, setCreateProps, label = 'Create Wrapper changed update your code' }) => {
	// const { mutate: postGlobalAirport, isLoading: airportLoading, isSuccess: airportSuccess, isError: airportError, postData: airportPostData, message: airportMessage } = usePostGlobalAirport();
	// const { mutate: postGlobalAircraftType, isLoading: aircraftTypeLoading, isSuccess: aircraftTypeSuccess, isError: aircraftTypeError, postData: aircraftTypePostData, message: aircraftTypeMessage } = usePostGlobalAircraftType();
	// const { mutate: postGlobalAircraftRegistration, isLoading: aircraftRegistrationLoading, isSuccess: aircraftRegistrationSuccess, isError: aircraftRegistrationError, postData: aircraftRegistrationPostData, message: aircraftRegistrationMessage } = usePostGlobalAircraftRegistration();
	// const { additionalAirportData, disabled } = useSelector((store) => store.globalMasters);
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
			<div className="table_container">
				<div className="create_button">
					<DropdownButton
						dropdownItems={dropdownItems}
						buttonText="Create"
						onChange={handleDropdownChange}
						onOpenChange={onOpenChange}
					/>
				</div>
				<div>{tableComponent && tableComponent}</div>
			</div>
			{/* {data && data?.length > 0 ? (
				<div className="table_container">
					<div className="create_button">
						<DropdownButton
							dropdownItems={dropdownItems}
							buttonText="Create"
							onChange={handleDropdownChange}
							onOpenChange={onOpenChange}
						/>
					</div>
					<div>
						<InfiniteScroll
							dataLength={data.length} // This is important to determine when to fetch more data
							next={fetchData} // Function to call when reaching the end of the list
							hasMore={pagination?.isMore} // Boolean to indicate if there is more data to load
						>
							{tableComponent && tableComponent}
						</InfiniteScroll>
					</div>
					{/* <div>{tableComponent && tableComponent}</div> */}
				</div>
			) : (
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
			)} */}
			<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeCsvModal} handleUpload={handleCsvUpload} />
		</>
	);
};

export default CreateWrapper;