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
import SocketEventListener from '../../../../socket/listner/socketListner';
import { GET_TELEX_MESSAGE } from '../../../../api';

const ParsedMessageComponent = ({ data = {}, maxLength = 30 }) => {
	return (
		<div className="telex_parsed_message">
			{Object.entries(data).map(([key, value]) => (
				<div key={key} className="telex_parsed_message_container">
					<span className="message_key">{key}: </span>
					<span className="message_value">{value}</span>
				</div>
			))}
		</div>
	);
};

function TelexMessage() {
	const [deleteModal, setDeleteModal] = useState({ isOpen: false, data: null });
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
	const { data, isFetching, fetchNextPage, hasNextPage, refetch } = useGetTelexMessage({
		filter,
		onSuccess,
		onError,
	});
	const [form] = Form.useForm();
	const watchFlightNo = Form.useWatch('flightNo', form);
	const openDeleteModal = (id) => {
		setDeleteModal({ isOpen: true, data: id });
	};
	const closeDeleteModal = () => {
		setDeleteModal({ isOpen: false, data: null });
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
				title: 'FLNR',
				dataIndex: 'flightNumber',
				key: 'flightNumber',
			},
			{
				title: 'TYPE',
				dataIndex: 'flightType',
				key: 'flightType',
				align: 'center',
			},
			{
				title: 'UPD',
				children: [
					{
						title: 'ORG',
						dataIndex: 'messageOrigin',
						key: 'messageOrigin',
						align: 'center',
					},
					{
						title: 'RAW',
						dataIndex: 'originalMessage',
						key: 'originalMessage',
						align: 'left',
						render: (text) => {
							if (text) {
								const textArray = text.split(/\n|\\n/);
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
						title: 'PD',
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
						style={{ margin: 'auto' }}
						title="Acknowledge"
						type="text"
						onClick={() => {
							openDeleteModal(record);
						}}
					/>
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
				content={`You want to Acknowledge flight ${deleteModal?.data?.flightNumber}`}
				buttonTitle2="Acknowledge"
			/>
			<SocketEventListener refetch={refetch} apiName={`${GET_TELEX_MESSAGE}`} />
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
