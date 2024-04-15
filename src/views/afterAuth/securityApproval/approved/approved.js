import React from 'react';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import Input from '../../../../components/input/field/field';
import Table from '../../../../components/table/table';
import getNearestTimeDifference from '../../../../utils/NearestTimeDifference';
import './approved.scss';

const Approved = ({ data, hasNextPage, fetchNextPage }) => {
	const columns = [
		{
			title: 'Time',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (time) => {
				const {value, unit} = getNearestTimeDifference(time);
				return <div>{`${value} ${unit}`} ago</div>
			},
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
			dataIndex: 'customerDocuments',
			key: 'customerDocuments',
			render: (documents) => {
				if (!documents || documents.length === 0) {
					return '-';
				} else {
					const document = documents[0];
					return document.type ?? '-';
				}
			},
			align: 'center',
		},
		{
			title: '% Match',
			dataIndex: 'matchPercentage',
			key: 'matchPercentage',
			render(match) {
				return {
					props: {
						style: { background: match >= 90 ? '#B2F2BB' : match < 30 ? '#FF8787' : '' },
					},
					children: <div>{`${match}%`}</div>,
				};
			},
			align: 'center',
		},
		// {
		// 	title: 'ID Match',
		// 	key: 'idMatch',
		// 	render: (record) => (
		// 		<>
		// 			<Button
		// 				onClick={() => openModal(record)}
		// 				title="Preview"
		// 				type="filledText"
		// 				className="pending--preview"
		// 				style={{ margin: 'auto' }}
		// 			/>
		// 		</>
		// 	),
		// },
		{
			title: '',
			key: 'actions',
			render: () => <div className="approved--approvedText">Approved</div>,
			align: 'center',
		},
	];

	return (
		<div className="approved">
			<div className="approved--top_container">
				<CustomTypography type="title" fontSize={24} fontWeight="600" color="black">
					Approved
				</CustomTypography>
				<Input label="search" name="search" placeholder="Search" warning="Required field" type="search" />
			</div>
			<Table data={data} columns={columns} />
		</div>
	);
};

export default Approved;
