import React, { useState } from 'react';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';

import ModalComponent from '../../../../../components/modal/modal';
import FormComponent from '../../components/aircraft/formComponent/formComponent';
import TableComponent from '../../../../../components/table/table';
import ButtonComponent from '../../../../../components/button/button';
import { useDispatch } from 'react-redux';

import './common_table.scss';
import { deleteAircraftRegistration, updateAircraftRegistration } from '../../redux/actionCreator';

const Common_table = ({ Heading, data, columns, loading, fetchData, pagination, title, formComponent }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const openModal = () => {
		setIsModalOpen(true);
		dispatch(updateAircraftRegistration(''));
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleButtonChange = (label) => {
		console.log('hdbhbdhbd', label);
	};
	const handleDropdownChange = (value) => {
		// Add this line
		if (value === 'Create') {
			openModal();
		}

		if (value === 'ImportGlobalReference') {
		}
	};
	const items = [
		{
			key: '1',
			label: 'Create',
			value: 'Create',
			children: '',
		},
		{
			key: '2',
			label: 'Import Global Reference',
			value: 'ImportGlobalReference',
			children: '',
		},
	];
	return (
		<div className="airport_master_details">
			<div className="custom_dropdown_style">
				<DropdownButton
					buttonText={'Create'}
					className="custom_dropdown"
					dropdownItems={items}
					onChange={handleDropdownChange}
				/>
			</div>
			<ModalComponent
				isModalOpen={isModalOpen}
				width="80vw"
				closeModal={closeModal}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						{Heading}
					</CustomTypography>
				}
				className="custom_modal"
			>
				<div className="modal_content">{formComponent && formComponent}</div>
			</ModalComponent>
			<div className="custom_table">
				<div className="details_table">
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						{title}
					</CustomTypography>
					<TableComponent
						columns={columns}
						data={data}
						loading={loading}
						fetchData={fetchData}
						pagination={pagination}
					/>
				</div>
			</div>
		</div>
	);
};

export default Common_table;
