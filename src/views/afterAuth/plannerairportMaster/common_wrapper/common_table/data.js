import React from 'react';
import ButtonComponent from '../../../../../components/button/button';
import Delete from '../../../../../assets/Delete.svg';
import Edit from '../../../../../assets/Edit.svg';
export const dummyData = [
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
		viewdetails: <ButtonComponent title="View Details" type="text" />,
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
		viewdetails: <ButtonComponent title="View Details" type="text" />,
		age: 25,
		address: 'Los Angeles',
	},
];

export const columns = [
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
