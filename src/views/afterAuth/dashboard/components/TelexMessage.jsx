import React, { useState } from 'react';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import CustomTabs from '../../../../components/customTabs/customTabs';
import TableComponent from '../../../../components/table/table';
import InputField from '../../../../components/input/field/field';
import Button from '../../../../components/button/button';
import Filter from '../../../../assets/Filter.svg';
import './style.scss';
import ButtonComponent from '../../../../components/button/button';
import ConfirmationModal from '../../../../components/confirmationModal/confirmationModal';

const ParsedMessageComponent = ({ message = '', maxLength = 30 }) => {
	const [showFull, setShowFull] = useState(false);
	const handleToggle = () => {
		setShowFull(!showFull);
	};
	return (
		<div>
			{message.length <= maxLength ? (
				<p>{message}</p>
			) : (
				<p>
					{showFull ? message : `${message.slice(0, maxLength)}...`}
					{!showFull ? (
						<a onClick={handleToggle} className="read_more_button">
							Read more
						</a>
					) : (
						<a onClick={handleToggle} className="read_less_button">
							Read less
						</a>
					)}
				</p>
			)}
		</div>
	);
};

function TelexMessageTabData({ type }) {
	const columns = [
		{
			title: 'Flight',
			dataIndex: 'flight',
			key: 'flight',
		},
		{
			title: 'Flight Type',
			dataIndex: 'flightType',
			key: 'flightType',
		},
		{
			title: 'Call sign',
			dataIndex: 'callSign',
			key: 'callSign',
		},
		{
			title: 'Updates',
			children: [
				{
					title: 'Message origin',
					dataIndex: 'messageOrigin',
					key: 'messageOrigin',
				},
				{
					title: 'Telex Message',
					dataIndex: 'telexMessage',
					key: 'telexMessage',
				},
				{
					title: 'Milestones achieved',
					dataIndex: 'milestonesAchieved',
					key: 'milestonesAchieved',
					render: (text, record) => <a href={`/details/${record.key}`}>View Details</a>,
				},
			],
		},
	];
}

function TelexMessage() {
	const [loading, setLoading] = useState(false);
	const handleTableChange = (pagination, filters, sorter) => {
		console.log('Table changed:', pagination, filters, sorter);
	};
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
	const openDeleteModal = (id) => {
		setDeleteModal({ isOpen: true, id: id });
	};
	const closeDeleteModal = () => {
		setDeleteModal({ isOpen: false, id: null });
	};
	const handleDelete = () => {
		closeDeleteModal();
	};
	const columns = [
		{
			title: 'Flight',
			dataIndex: 'flight',
			key: 'flight',
		},
		{
			title: 'Flight Type',
			dataIndex: 'flightType',
			key: 'flightType',
		},
		{
			title: 'Call sign',
			dataIndex: 'callSign',
			key: 'callSign',
		},
		{
			title: 'Updates',
			children: [
				{
					title: 'Message origin',
					dataIndex: 'messageOrigin',
					key: 'messageOrigin',
				},
				{
					title: 'Raw Message',
					dataIndex: 'telexMessage',
					key: 'telexMessage',
				},
				{
					title: 'Parsed Message',
					dataIndex: 'parsedTelexMessage',
					key: 'parsedTelexMessage',
					render: (text) => <ParsedMessageComponent message={text} maxLength={45} />,
				},
				{
					title: 'Milestones achieved',
					dataIndex: 'milestonesAchieved',
					key: 'milestonesAchieved',
					render: (text, record) => <a href={`/details/${record.key}`}>View Details</a>,
				},
			],
		},
		{
			title: 'Action',
			key: 'action',
			render: (
				text,
				record // Use the render function to customize the content of the cell
			) => (
				<ButtonComponent
					title="Acknowledge"
					type="text"
					onClick={() => {
						openDeleteModal(record);
					}}
				></ButtonComponent>
			),
		},
	];

	const data = [
		{
			key: '1',
			flight: 'AI 812',
			flightType: 'Type A',
			callSign: 'Sign A',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			parsedTelexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			milestonesAchieved: 'Milestone 1',
		},
		{
			key: '2',
			flight: '6E 6172',
			flightType: 'Type B',
			callSign: 'Sign B',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			parsedTelexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			milestonesAchieved: 'Milestone 2',
		},
		{
			key: '3',
			flight: 'AI 812',
			flightType: 'Type A',
			callSign: 'Sign A',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			parsedTelexMessage:
				'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323 MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323 MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323 MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323 MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			milestonesAchieved: 'Milestone 1',
		},
		{
			key: '4',
			flight: 'AI 916',
			flightType: 'Type B',
			callSign: 'Sign B',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			milestonesAchieved: 'Milestone 2',
		},
		{
			key: '5',
			flight: 'UK 642',
			flightType: 'Type B',
			callSign: 'Sign B',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			milestonesAchieved: 'Milestone 2',
		},
	];

	const data2 = [
		{
			key: '1',
			flight: 'AI 812',
			flightType: 'Type A',
			callSign: 'Sign A',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1900EX SD2000',
			milestonesAchieved: 'Milestone 1',
		},
		{
			key: '2',
			flight: 'AI 812',
			flightType: 'Type A',
			callSign: 'Sign A',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 18991S SD890',
			milestonesAchieved: 'Milestone 1',
		},
		{
			key: '3',
			flight: 'AI 916',
			flightType: 'Type B',
			callSign: 'Sign B',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559SAD SX245',
			milestonesAchieved: 'Milestone 2',
		},
		{
			key: '4',
			flight: 'UK 642',
			flightType: 'Type B',
			callSign: 'Sign B',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			milestonesAchieved: 'Milestone 2',
		},
		{
			key: '5',
			flight: '6E 6172',
			flightType: 'Type B',
			callSign: 'Sign B',
			messageOrigin: 'IST ATC',
			telexMessage: 'MVT RAT0123/09.ECENZ.IST AD1245/1253 EA 1559DUS PX323',
			milestonesAchieved: 'Milestone 2',
		},
	];

	const items = [
		{
			key: '1',
			label: 'MVT',
			children: (
				<>
					<ConfirmationModal
						isOpen={deleteModal.isOpen}
						onClose={closeDeleteModal}
						onSave={handleDelete}
						content={`You want to Acknowledge flight ${deleteModal?.id?.flight}`}
						buttonTitle2="Acknowledge"
					/>
					<TableComponent columns={columns} data={data} loading={loading} onChange={handleTableChange} />
				</>
			),
		},
		{
			key: '2',
			label: 'LDM',
			children: (
				<>
					<TableComponent columns={columns} data={data2} loading={loading} onChange={handleTableChange} />
				</>
			),
		},
		{
			key: '2',
			label: 'PTM',
			children: (
				<>
					<TableComponent columns={columns} data={data2} loading={loading} onChange={handleTableChange} />
				</>
			),
		},
	];

	const handleChange = () => {
		console.log('Tab switch');
	};

	return (
		<div className="body-container">
			<div className="top-bar">
				<CustomTypography
					type="title"
					fontSize={24}
					fontWeight="600"
					color="black"
					children={'Flight Schedule'}
				/>
				<div className="filter-section">
					<Button
						onClick={() => {
							alert('Icon Button');
						}}
						icon={Filter}
						alt="bell icon"
						className={'filter-btn'}
					/>
					<InputField
						label="Airport Name"
						name="search"
						placeholder="Search"
						warning="Required field"
						type="search"
					/>
				</div>
			</div>
			<div className="flights-table">
				<CustomTabs defaultActiveKey="1" items={items} onChange={handleChange} />
			</div>
		</div>
	);
}

export default TelexMessage;
