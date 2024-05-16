import React, { useState } from 'react';
import Button from '../../../../components/button/button';
import Modal from '../../../../components/modal/modal';
import Table from '../../../../components/table/table';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import getNearestTimeDifference from '../../../../utils/NearestTimeDifference';
import './rejected.scss';

const Rejected = ({ data, hasNextPage, fetchNextPage, loading }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rowData, setRowData] = useState(null);
	const openModal = (data) => {
		setRowData(data);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setRowData(null);
		setIsModalOpen(false);
	};
	const columns = [
		{
			title: 'Time',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (time) => {
				const { value, unit } = getNearestTimeDifference(time);
				return <div>{`${value} ${unit}`} ago</div>;
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
		{
			title: 'ID Match',
			key: 'idMatch',
			render: (record) => (
				<>
					<Button
						onClick={() => openModal(record)}
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
			render: () => <div className="rejected--rejectedText">Rejected</div>,
			align: 'center',
		},
	];

	return (
		<>
			{/*Preview Modal */}
			<Modal
				isModalOpen={isModalOpen}
				width="auto"
				height="auto"
				closeModal={closeModal}
				title={<div>Preview ({rowData?.customerDocuments[0]?.isMatched ? 'Matched' : 'Not Matched'})</div>}
				className="pending--custom_modal"
			>
				<div className="pending--img_container">
					<div className="pending--box_container">
						<img
							src={rowData?.customerDocuments[0]?.documentUrl}
							alt="passport"
							className="pending--passport"
						/>
						<CustomTypography color="#909296">
							{rowData?.customerDocuments[0]?.type}: {rowData?.name}
						</CustomTypography>
					</div>
					<div className="pending--box_container">
						<img src={rowData?.customerDocuments[0]?.userUrl} alt="biometric" className="pending--biometric" />
						<CustomTypography color="#909296">Biometric Image</CustomTypography>
					</div>
				</div>
				<div className="pending--footer">{rowData?.matchPercentage}%</div>
			</Modal>
			<div className="rejected">
				<Table data={data} columns={columns} loading={loading} fetchData={fetchNextPage} pagination={hasNextPage} />
			</div>
		</>
	);
};

export default Rejected;
