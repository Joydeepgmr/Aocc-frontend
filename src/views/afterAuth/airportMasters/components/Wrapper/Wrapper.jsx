import React, { useState } from 'react';
import ButtonComponent from '../../../../../components/button/button';
import ModalComponent from '../../../../../components/modal/modal';
import { Divider, Form} from 'antd'
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import UploadCsvModal from '../../../../../components/uploadCsvModal/uploadCsvModal';
import { useForm } from 'rc-field-form';
import { usePostLicenseAirport } from '../../../../../services/airportMasters/airportMasters';
import './Wrapper.scss';

const Wrapper = ({formComponent, title, width, tableComponent, action, data}) => {
    const {mutate: postLicenseAirport, isLoading, isSuccess, isError, postData, message} = usePostLicenseAirport();

    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const closeAddModal = () => {
		setIsCsvModalOpen(false);
		setIsModalOpen(false);
	};

    const onFinishHandler = (values) => {

        postLicenseAirport(values);

        form.resetFieldS();

        closeAddModal();
    }

    const handleDropdownChange= (value) => {
        if(value === 'addAirport') {
            openAddModal();
        }

        if(value === "uploadCSV") {
            openCsvModal();
        }
    }

    return (
        <>
        {
            data && data?.length>0 ? (
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
            )
        }
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
        </>
    )

}

export default Wrapper;