import React, { useState } from 'react';
import DropdownButton from '../../../../../components/dropdownButton/dropdownButton';
import CustomTypography from '../../../../../components/typographyComponent/typographyComponent';

import ModalComponent from '../../../../../components/modal/modal';
import FormComponent from '../../components/aircraft/formComponent/formComponent';
import TableComponent from '../../../../../components/table/table';
import ButtonComponent from '../../../../../components/button/button';
import { columns, dummyData } from './data';
import { useDispatch } from 'react-redux';

import './common_table.scss';
import { deleteAircraftRegistration, updateAircraftRegistration } from '../../redux/actionCreator';

const Common_table = ({ Heading }) => {
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const openModal = () => {
		setIsModalOpen(true);
		dispatch(updateAircraftRegistration(''));
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
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
				width="120rem"
				closeModal={closeModal}
				title={
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						{Heading}
					</CustomTypography>
				}
				className="custom_modal"
			>
				<div className="modal_content">
					<FormComponent closeModal={closeModal} />
				</div>
			</ModalComponent>
			<div className="custom_table">
				<div className="details_table">
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Aircraft Registrations
					</CustomTypography>
					<TableComponent columns={columns} data={dummyData} loading={loading} onChange={handleTableChange} />
				</div>
			</div>
		</div>
	);
};

export default Common_table;
