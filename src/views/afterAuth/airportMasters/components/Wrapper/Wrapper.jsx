import { Divider, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonComponent from '../../../../../components/button/button';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../components/modal/modal';
import PageLoader from '../../../../../components/pageLoader/pageLoader';
import { usePostLicenseAirport } from '../../../../../services/airportMasters/airportMasters';
import LicenseSetupForm from '../licenseSetupForm/licenseSetupForm';
import './Wrapper.scss';

const Wrapper = ({ title, width, tableComponent, action, data, isLoading }) => {
	const {
		mutate: postLicenseAirport,
		isLoading: isCreateNewLoading,
		isSuccess,
		isError,
		postData,
		message,
	} = usePostLicenseAirport();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
	const [form] = Form.useForm();

	const openCsvModal = () => {
		setIsCsvModalOpen(true);
	};

	useEffect(() => {
		if (isSuccess) {
			closeAddModal();
			toast.dismiss();
			toast.success(message);
		}
	}, [isSuccess]);
	useEffect(() => {
		if (isError) {
			toast.dismiss();
			toast.error(message);
		}
	}, [isError]);
	const dropdownItems = [
		{
			label: 'Add Airport License',
			value: 'addLicense',
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

	const closeAddModal = () => {
		setIsCsvModalOpen(false);
		setIsModalOpen(false);
		form.resetFields();
	};

	const onFinishHandler = (values) => {
		console.log('These are the Airport masters values', values);
		values.validFrom = values?.validFrom?.toISOString();
		values.validTo = values?.validTo?.toISOString();
		values.iataCode = values?.iataCode?.join('');
		values.icaoCode = values?.icaoCode?.join('');
		postLicenseAirport(values);
	};

	const handleDropdownChange = (value) => {
		if (value === 'addLicense') {
			openAddModal();
		}
	};

	return (
		<>
			{isLoading || isCreateNewLoading ? (
				<PageLoader loading={true} />
			) : data && data?.length > 0 ? (
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
						title="Add"
						type="filledText"
						className="custom_button_create"
						onClick={openAddModal}
					/>
				</div>
			)}
			<ModalComponent
				isModalOpen={isModalOpen}
				closeModal={closeAddModal}
				title={title}
				width={width ?? 'auto'}
				className="custom_modal"
			>
				<Form autoComplete='off' form={form} layout="vertical" onFinish={onFinishHandler}>
					<LicenseSetupForm form={form} />
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
		</>
	);
};

export default Wrapper;
