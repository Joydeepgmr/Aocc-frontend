import React, { useState } from 'react';
import DropdownButton from '../../../../../../components/dropdownButton/dropdownButton';
import ModalComponent from '../../../../../../components/modalComponent/modalComponent';
import CustomTypography from '../../../../../../components/typographyComponent/typographyComponent';
import Delete from '../../../../../../assets/Delete.svg';
import Edit from '../../../../../../assets/Edit.svg';
import TableComponent from '../../../../../../components/table/table';
import Button from '../../../../../../components/button/button';
import ButtonComponent from '../../../../../../components/button/button';
import './aircraftDetails.scss';

const AircraftDetails = ({ ModalComponent }) => {
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dummyData = [
		{
			key: '1',
			edit: (
				<div className="custom-button">
					<ButtonComponent type={'iconWithBorder'} icon={Delete} id="delete_button"></ButtonComponent>
					<ButtonComponent type={'iconWithBorder'} icon={Edit} id="edit_button"></ButtonComponent>
				</div>
			),
			registration: 'Boeing 737 700',
			internal: 'B737',
			iatacode: '737',
			icaocode: '1234',
			homeairport: 'Airport 1',
			nationality: 'Indian',
			typeofuse: 'Usecase 1',
			viewdetails: <Button title="View Details" type="text" />,
			age: 25,
			address: 'Los Angeles',
		},
		{
			key: '2',
			edit: (
				<div className="custom-button">
					<ButtonComponent type={'iconWithBorder'} icon={Delete} id="delete_button"></ButtonComponent>
					<ButtonComponent type={'iconWithBorder'} icon={Edit} id="edit_button"></ButtonComponent>
				</div>
			),
			registration: 'Boeing 737 700',
			internal: 'B737',
			iatacode: '737',
			icaocode: '1234',
			homeairport: 'Airport 1',
			nationality: 'Indian',
			typeofuse: 'Usecase 1',
			viewdetails: <Button title="View Details" type="text" />,
			age: 25,
			address: 'Los Angeles',
		},
	];

	const columns = [
		{ title: '', dataIndex: 'edit', key: 'edit' },
		{ title: 'Registration', dataIndex: 'registration', key: 'registration' },
		{ title: 'Internal', dataIndex: 'internal', key: 'internal' },
		{ title: 'IATA Code', dataIndex: 'iatacode', key: 'iatacode' },
		{ title: 'ICAO Code', dataIndex: 'icaocode', key: 'homeairport' },
		{ title: 'Home Airport', dataIndex: 'homeairport', key: 'internal' },
		{ title: 'Nationality', dataIndex: 'nationality', key: 'nationality' },
		{ title: 'Type of Use', dataIndex: 'typeofuse', key: 'typeofuse' },
		{ title: '', dataIndex: 'viewdetails', key: 'viewdetails' },
	];
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};
	const handleButtonChange = (label) => {
		console.log('hdbhbdhbd', label);
	};
	const items = [
		{
			key: '1',
			label: 'Create',
		},
		{
			key: '2',
			label: 'Import Global Reference',
			// children:"",
		},
	];
	return (
		<div className="airport_master_details">
			<div className="custom_dropdown_style">
				<DropdownButton
					buttonText={'Create'}
					className="custom_dropdown"
					dropdownItems={items}
                    onChange={(e) => {
                        console.info
						handleButtonChange();
					}}
				/>
			</div>
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

export default AircraftDetails;
