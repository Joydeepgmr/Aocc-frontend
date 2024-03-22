import React, { useState } from 'react';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import { useForm } from 'rc-field-form';
// import { formDisabled } from '../../redux/reducer';
import { 
	usePostGlobalAirport, 
	usePostGlobalAircraftType, 
	usePostGlobalAircraftRegistration,
	usePostGlobalAirline
 } from '../../../../../services/globalMasters/globalMaster';
import './createWrapper.scss';

const CreateWrapper = ({ formComponent, title, width, tableComponent, action, data, type }) => {
	const { mutate: postGlobalAirport, isLoading: airportLoading, isSuccess: airportSuccess, isError: airportError, postData: airportPostData, message: airportMessage } = usePostGlobalAirport();
	const { mutate: postGlobalAircraftType, isLoading: aircraftTypeLoading, isSuccess: aircraftTypeSuccess, isError: aircraftTypeError, postData: aircraftTypePostData, message: aircraftTypeMessage } = usePostGlobalAircraftType();
	const { mutate: postGlobalAircraftRegistration, isLoading: aircraftRegistrationLoading, isSuccess: aircraftRegistrationSuccess, isError: aircraftRegistrationError, postData: aircraftRegistrationPostData, message: aircraftRegistrationMessage } = usePostGlobalAircraftRegistration();
	const { mutate: postGlobalAirline, isLoading: airlineLoading, isSuccess: airlineSuccess, isError: airlineError, postData: airlinePostData, message: airlineMessage } = usePostGlobalAirline();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [form] = Form.useForm();
	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};
	let dropdownItems = [];
	if (type.toLowerCase() === "airport") {
		dropdownItems = [
			{
				label: 'Add Airport',
				value: 'addAirport',
				key: '0',
			},
			{
				label: 'Upload CSV',
				value: 'uploadCSV',
				key: '1',
			},
			{
				label: 'Download CSV Template',
				value: 'downloadCsvTemplate',
				key: '2',
			},
		];
	} else if (type.toLowerCase() === "aircraft-type") {
		dropdownItems = [
			{
				label: 'Add Aircraft Type',
				value: 'addAircraftType',
				key: '0',
			},
			{
				label: 'Upload CSV',
				value: 'uploadCSV',
				key: '1',
			},
			{
				label: 'Download CSV Template',
				value: 'downloadCsvTemplate',
				key: '2',
			},
		];
	} else if (type.toLowerCase() === "aircraft-registration") {
		dropdownItems = [
			{
				label: 'Add Aircraft Registration',
				value: 'addAircraftRegistration',
				key: '0',
			},
			{
				label: 'Upload CSV',
				value: 'uploadCSV',
				key: '1',
			},
			{
				label: 'Download CSV Template',
				value: 'downloadCsvTemplate',
				key: '2',
			},
		];
	} else if (type.toLowerCase() === "airline") {
		dropdownItems = [
			{
				label: 'Add Airline',
				value: 'addAirline',
				key: '0',
			},
			{
				label: 'Upload CSV',
				value: 'uploadCSV',
				key: '1',
			},
			{
				label: 'Download CSV Template',
				value: 'downloadCsvTemplate',
				key: '2',
			},
		];
	}

	const openAddModal = () => {
		setIsModalOpen(true);
	};

	const closeAddModal = () => {
		setIsCsvModalOpen(false);
		setIsModalOpen(false);
	};

	const onFinishHanlder = (values) => {
		if (type.toLowerCase() === "airport") {
			values.validFrom = values?.validFrom?.toISOString();
			values.validTo = values?.validTo?.toISOString();
			values.iataCode = values?.iataCode?.join('');
			values.icaoCode = values?.icaoCode?.join('');
			values.countryCode = values?.countryCode?.join('');
			postGlobalAirport(values);
			closeAddModal();
		}
		if (type.toLowerCase() === "aircraft-type") {
			values.validFrom = values?.validFrom?.toISOString();
			values.validTo = values?.validTo?.toISOString();
			values.iataCode = values?.iataCode?.join('');
			values.icaoCode = values?.icaoCode?.join('');
			values.icaoCodeModified = values?.icaoCodeModified?.join('');
			postGlobalAircraftType(values);
			closeAddModal();
		}
		if (type.toLowerCase() === "aircraft-registration") {
			values.validFrom = values?.validFrom?.toISOString();
			values.validTo = values?.validTo?.toISOString();
			values.iataCode = values?.iataCode?.join('');
			values.icaoCode = values?.icaoCode?.join('');
			postGlobalAircraftRegistration(values);
			closeAddModal();
		}
		if (type.toLowerCase() === "airline") {
			values.validFrom = values?.validFrom?.toISOString();
			values.validTo = values?.validTo?.toISOString();
			values.twoLetterCode = values?.twoLetterCode?.join('');
			values.threeLetterCode = values?.threeLetterCode?.join('');
			postGlobalAirline(values);
			closeAddModal();
		}
		form.resetFields();
		
	};

	const handleDropdownChange = (value) => {
		console.log('Dropdown value:', value); // Add this line
		if (value === 'addAirport' || value === 'addAircraftType' || value === 'addAircraftRegistration' || value === 'addAirline') {
			openAddModal();
			// if (disabled) {
			// 	dispatch(formDisabled());
			// }
		}

		if (value === 'uploadCSV') {
			openCsvModal();
		}
	};

	return (
		<>
			{data && data?.length > 0 ? (
				<div className="table_container">
					<div className="create_button">
						<DropdownButton
							dropdownItems={dropdownItems}
							buttonText="Create"
							onChange={handleDropdownChange}
						/>
					</div>
					<div>{tableComponent && tableComponent}</div>
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
			)}
			<ModalComponent
				isModalOpen={isModalOpen}
				closeModal={closeAddModal}
				title={title}
				width={width ?? 'auto'}
				className="custom_modal"
			>
				<Form form={form} layout="vertical" onFinish={onFinishHanlder}>
					{formComponent && formComponent}
					<Divider />
					<div className="custom_buttons">
						<ButtonComponent
							title="Cancel"
							type="filledText"
							className="custom_button_cancel"
							onClick={closeAddModal}
						/>
						<ButtonComponent
							title="Save"
							type="filledText"
							className="custom_button_save"
							isSubmit="submit"
						/>
					</div>
				</Form>
			</ModalComponent>
			<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeAddModal} />
		</>
	);
};

export default CreateWrapper;
