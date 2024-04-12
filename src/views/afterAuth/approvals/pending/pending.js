import React, { useState } from 'react';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import Input from '../../../../components/input/field/field';
import Button from '../../../../components/button/button';
import checkIcon from '../../../../assets/WhiteCheck.svg';
import crossIcon from '../../../../assets/X.svg';
import Table from '../../../../components/table/table';
import Modal from '../../../../components/modal/modal';
import passport from './passport.png';
import biometric from './biometric.jpg';
import './pending.scss';

const Pending = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const columns = [
		{
			title: 'Time',
			dataIndex: 'time',
			key: 'time',
			render: (time) => time ?? '-',
			align: 'center',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
			align: 'center',
		},
		{
			title: 'DOB',
			dataIndex: 'dob',
			key: 'dob',
			render: (dob) => dob ?? '-',
			align: 'center',
		},
		{
			title: 'ID Type',
			dataIndex: 'idType',
			key: 'idType',
			render: (idType) => idType ?? '-',
			align: 'center',
		},
		{
			title: '% Match',
			dataIndex: 'match',
			key: 'match',
			render(match) {
				return {
					props: {
						style: { background: match > 90 ? '#B2F2BB' : match < 30 ? '#FF8787' : '' },
					},
					children: <div>{`${match}%`}</div>,
				};
			},
			align: 'center',
		},
		{
			title: 'ID Match',
			key: 'idMatch',
			render: (record) => (
				<>
					<Button
						onClick={() => setIsModalOpen(true)}
						title="Preview"
						type="filledText"
						className="pending--preview"
						style={{ margin: 'auto' }}
					/>
				</>
			),
		},
		{
			title: '',
			key: 'actions',
			render: (record) => (
				<div className="pending--action_buttons">
					<Button
						onClick={console.log(record)}
						type="iconWithBorder"
						icon={checkIcon}
						className="pending--approve_button"
					/>
					<Button
						onClick={console.log(record)}
						type="iconWithBorder"
						icon={crossIcon}
						className="pending--cross_button"
					/>
				</div>
			),
		},
	];

	const rows = [
		{
			time: '20 sec ago',
			name: 'John Doe',
			dob: '23.12.2001',
			idType: 'Passport- India',
			match: 98,
		},
		{
			time: '15 sec ago',
			name: 'John Doe',
			dob: '13.12.2001',
			idType: 'Passport- India',
			match: 45,
		},
		{
			time: '40 sec ago',
			name: 'John Doe',
			dob: '02.12.2001',
			idType: 'Passport- India',
			match: 25,
		},
	];

	return (
		<>
			<div className="pending">
				<div className="pending--top_container">
					<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
						Pending Request
					</CustomTypography>
					<Input label="search" name="search" placeholder="Search" warning="Required field" type="search" />
				</div>
				<Table data={rows} columns={columns} />
			</div>
			{/*Preview Modal */}
			<Modal
				isModalOpen={isModalOpen}
				width="auto"
				height="auto"
				closeModal={() => setIsModalOpen(false)}
				title="Preview"
				className="custom_modal"
			>
				<div className="pending--img_container">
					<div className="pending--box_container">
						<img src={passport} alt="passport" className="pending--passport" />
						<CustomTypography color="#909296">Passport: Kenya</CustomTypography>
					</div>
					<div className="pending--box_container">
						<img src={biometric} alt="biometric" className="pending--biometric" />
						<CustomTypography color="#909296">Biometric Image</CustomTypography>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Pending;
