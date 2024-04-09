import { Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import ButtonComponent from '../../../../components/button/button';
import ConfirmationModal from '../../../../components/confirmationModal/confirmationModal';
import CustomTabs from '../../../../components/customTabs/customTabs';
import InputField from '../../../../components/input/field/field';
import TableComponent from '../../../../components/table/table';
import CustomTypography from '../../../../components/typographyComponent/typographyComponent';
import { useGetTelexMessage } from '../../../../services/dashboard/telexMessage/telexMessage';
import './style.scss';

const ParsedMessageComponent = ({ data = {}, maxLength = 30 }) => {
	const [showFull, setShowFull] = useState(false);
	const handleToggle = () => {
		setShowFull(!showFull);
	};
	return (
		// <>
		// 	{typeof message === 'string' && (
		// 		<div>
		// 			{message.length <= maxLength ? (
		// 				<p>{message}</p>
		// 			) : (
		// 				<p>
		// 					{showFull ? message : `${message.slice(0, maxLength)}...`}
		// 					{!showFull ? (
		// 						<a onClick={handleToggle} className="read_more_button">
		// 							Read more
		// 						</a>
		// 					) : (
		// 						<a onClick={handleToggle} className="read_less_button">
		// 							Read less
		// 						</a>
		// 					)}
		// 				</p>
		// 			)}
		// 		</div>
		// 	)}
		// </>
		<div>
			{Object.entries(data).map(([key, value]) => (
				<div
					key={key}
					style={{ margin: 'auto', width: '90%', display: 'flex', justifyContent: 'space-between' }}
				>
					<span>{key}: </span>
					<span>{value}</span>
				</div>
			))}
		</div>
	);
};

function TelexMessage() {
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
	const [filter, setFilter] = useState({ type: ['mvt'] });
	const [telexMessageData, setTelexMessageData] = useState([]);
	const onSuccess = (data) => {
		if (data?.pages) {
			const newData = data.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setTelexMessageData([...newData]);
		}
	};
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data, isFetching, fetchNextPage, hasNextPage } = useGetTelexMessage({ filter, onSuccess, onError });
	const [form] = Form.useForm();
	const watchFlightNo = Form.useWatch('flightNo', form);
	const openDeleteModal = (id) => {
		setDeleteModal({ isOpen: true, id: id });
	};
	const closeDeleteModal = () => {
		setDeleteModal({ isOpen: false, id: null });
	};
	const handleDelete = () => {
		closeDeleteModal();
	};
	const handleTabChange = (key) => {
		let messageType;
		if (key == '1') {
			messageType = 'mvt';
		} else if (key == '2') {
			messageType = 'ldm';
		} else {
			messageType = 'ptm';
		}
		setFilter({ type: [messageType] });
		setTelexMessageData([]);
	};
	const columns = useMemo(() => {
		return [
			{
				title: 'Flight',
				dataIndex: 'flightNumber',
				key: 'flightNumber',
			},
			{
				title: 'Flight Type',
				dataIndex: 'flightType',
				key: 'flightType',
				align:'center'
			},
			{
				title: 'Call sign',
				dataIndex: 'callSign',
				key: 'callSign',
				align:'center'
			},
			{
				title: 'Updates',
				children: [
					{
						title: 'Message origin',
						dataIndex: 'messageOrigin',
						key: 'messageOrigin',
						align:'center'
					},
					{
						title: 'Raw Message',
						dataIndex: 'originalMessage',
						key: 'originalMessage',
						align: 'center',
						render: (text) => {
							if (text) {
								const textArray = text.split('\\n');
								return (
									<div>
										{textArray.map((part) => (
											<div>{part}</div>
										))}
									</div>
								);
							}
							return '-';
						},
					},
					{
						title: 'Parsed Message',
						dataIndex: 'parsedMessage',
						key: 'parsedMessage',
						render: (text) => text && <ParsedMessageComponent data={text} maxLength={45} />,
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
						style={{margin:'auto'}}
						title="Acknowledge"
						type="text"
						onClick={() => {
							openDeleteModal(record);
						}}
					></ButtonComponent>
				),
			},
		];
	}, [telexMessageData]);
	useEffect(() => {
		let debounceTimer;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			if (watchFlightNo != undefined) {
				if (watchFlightNo) {
					setFilter({ ...filter, flightNumber: watchFlightNo });
				} else {
					setFilter({ ...filter, flightNumber: undefined });
				}
				setTelexMessageData([]);
			}
		}, 500);
		return () => clearTimeout(debounceTimer);
	}, [watchFlightNo]);
	const items = [
		{
			key: '1',
			label: 'MVT',
			children: (
				<TableComponent
					columns={columns}
					data={telexMessageData}
					loading={isFetching}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
				/>
			),
		},
		{
			key: '2',
			label: 'LDM',
			children: (
				<>
					<TableComponent
						columns={columns}
						data={telexMessageData}
						loading={isFetching}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
					/>
				</>
			),
		},
		{
			key: '3',
			label: 'PTM',
			children: (
				<>
					<TableComponent
						columns={columns}
						data={telexMessageData}
						loading={isFetching}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
					/>
				</>
			),
		},
	];

	return (
		<>
			<ConfirmationModal
				isOpen={deleteModal.isOpen}
				onClose={closeDeleteModal}
				onSave={handleDelete}
				content={`You want to Acknowledge flight ${deleteModal?.id?.flight}`}
				buttonTitle2="Acknowledge"
			/>
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
						{/* <Button
						onClick={() => {
							alert('Icon Button');
						}}
						icon={Filter}
						alt="bell icon"
						className={'filter-btn'}
					/> */}
						<Form form={form}>
							<InputField
								label="Flight number"
								name="flightNo"
								placeholder="Flight number"
								warning="Required field"
								type="search"
							/>
						</Form>
					</div>
				</div>
				<div className="flights-table">
					<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
				</div>
			</div>
		</>
	);
}

export default TelexMessage;
