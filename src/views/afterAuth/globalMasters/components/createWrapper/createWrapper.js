import React, { useState } from 'react';
import './createWrapper.scss';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modalComponent/modalComponent';
import { Divider, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import { useForm } from 'rc-field-form';

const CreateWrapper = ({ formComponent, title, width, tableComponent, action }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { additionalAirportData } = useSelector((store) => store.globalMasters);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [form] = Form.useForm();
	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};
	const dropdownItems = [
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
			value: 'Download CSV Template',
			key: '2',
		},
	];

	const openAddModal = () => {
		setIsModalOpen(true);
	};

	const dispatch = useDispatch();

	const closeAddModal = () => {
		setIsCsvModalOpen(false);
		setIsModalOpen(false);
	};

	const onFinishHanlder = (values) => {
		console.log('values', values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.iataCode?.join('');
		values.atcCode = values?.atcCode?.join('');
		values.countryCode = values?.countryCode?.join('');
		form.resetFields();
		dispatch(action(values));
		closeAddModal();
	};

	const handleDropdownChange = (value) => {
		console.log('Dropdown value:', value); // Add this line
		if (value === 'addAirport') {
			openAddModal();
		}

		if (value === 'uploadCSV') {
			openCsvModal();
		}
	};

	return (
		<>
			{additionalAirportData.length > 0 ? (
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
				<Form layout="vertical" onFinish={onFinishHanlder}>
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
							isSubmit={true}
						/>
					</div>
				</Form>
			</ModalComponent>
			<UploadCsvModal isModalOpen={isCsvModalOpen} width="720px" closeModal={closeAddModal} />
		</>
	);
};

export default CreateWrapper;
