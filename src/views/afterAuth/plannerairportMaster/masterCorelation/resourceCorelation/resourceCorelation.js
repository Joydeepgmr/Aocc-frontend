import dayjs from 'dayjs';
import React, { useState } from 'react';
import TableComponent from '../../../../../components/table/table';
import { useGetResourceCorelation, useUpdateResourceCorelation } from '../../../../../services/planairportmaster/mastercorelation/mastercorelation';
import toast from 'react-hot-toast';
const ResourceCorelation = ({ type }) => {
	const writeAccess = !!localStorage.getItem('masterAccess');
	const [resourceData, setResourceData] = useState([]);

	const getResourceHandler = {
		type,
		onSuccess: (data) => handleResourceSuccess(data),
		onError: (error) => handleGetResourceError(error),
	};

	const editResourceHandler = {
		onSuccess: ({ message }) => {
			toast.success(message);
			refetch();
		},
		onError: (error) => handleGetResourceError(error),
	}

	const handleResourceSuccess = (data) => {
		if (data) {
			setResourceData(data);
		}
	};

	const handleGetResourceError = (error) => {
		toast.error(error?.message);
	};

	const {
		isFetching,
		isLoading: isFetchLoading,
		refetch,
	} = useGetResourceCorelation(getResourceHandler);
	const { mutate: editResourceWeight, isLoading: isEditLoading } = useUpdateResourceCorelation(editResourceHandler);

	const checkInColumns = [
		{
			title: 'CNTR',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div  onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		{
			title: 'GRP',
			dataIndex: 'group',
			key: 'group',
			align: 'center',
			render: (group) => group ?? '-',
		},
		{
			title: 'TERM',
			dataIndex: 'terminal',
			key: 'terminal',
			align: 'center',
			render: (terminal) => terminal?.name ?? '-',
		},
		{
			title: 'ROW',
			dataIndex: 'row',
			key: 'row',
			align: 'center',
			render: (row) => row ?? '-',
		},
		{
			title: 'STS',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (text, record) => {
				const { validFrom, validTill } = record;
				const currentDate = dayjs();

				if (!validFrom || !validTill) {
					return 'O';
				}
				if (
					validFrom &&
					(currentDate.isSame(validFrom, 'day') || currentDate.isAfter(validFrom, 'day')) &&
					validTill &&
					(currentDate.isSame(validTill, 'day') || currentDate.isBefore(validTill, 'day'))
				) {
					return 'O';
				} else {
					return 'I';
				}
			},
		},
		{
			title: 'Priority',
			dataIndex: 'weight',
			key: 'ata',
			align: 'center',
			editable: writeAccess && {
				type: 'number',
			},
			render: (text) => text ?? '-',
		},
	];

	const gateColumns = [
		{
			title: 'GAT',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div  onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		// {
		// 	title: 'AIRPORT',
		// 	dataIndex: 'airport',
		// 	key: 'airport',
		// 	align: 'center',
		// 	render: (airport) => airport?.name ?? '-',
		// },
		{
			title: 'BUS GAT',
			dataIndex: 'busGate',
			key: 'busGate',
			align: 'center',
			render: (busGate) => (busGate ? 'Yes' : 'No'),
		},
		{
			title: 'TERM',
			dataIndex: 'terminal',
			key: 'terminal',
			align: 'center',
			render: (terminal) => terminal?.name ?? '-',
		},
		{
			title: 'GAT ID',
			dataIndex: 'gateId',
			key: 'gateId',
			align: 'center',
			render: (gateId) => gateId ?? '-',
		},
		{
			title: 'STS',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (text, record) => {
				const { validFrom, validTill } = record;
				const currentDate = dayjs();

				if (!validFrom || !validTill) {
					return 'O';
				}
				if (
					(validFrom && (currentDate.isSame(validFrom, 'day') || currentDate.isAfter(validFrom, 'day'))) &&
					(validTill && (currentDate.isSame(validTill, 'day') || currentDate.isBefore(validTill, 'day')))
				) {
					return 'O';
				} else {
					return 'I';
				}
			},
		},
		{
			title: 'Priority',
			dataIndex: 'weight',
			key: 'ata',
			align: 'center',
			editable: writeAccess && {
				type: 'number',
			},
			render: (text) => text ?? '-',
		},
	];

	const beltColumns = [
		{
			title: 'BELT',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: (text, record) => <div  onClick={() => handleDetailModalOpen(record)}>{text ?? '-'}</div>,
		},
		{
			title: 'TERM',
			dataIndex: 'terminal',
			key: 'terminal',
			align: 'center',
			render: (terminal) => terminal?.name ?? '-',
		},
		{
			title: 'REASON',
			dataIndex: 'reason',
			key: 'reason',
			align: 'center',
			render: (reason) => reason ?? '-',
		},
		{
			title: 'STS',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (text, record) => {
				const { validFrom, validTill } = record;
				const currentDate = dayjs();

				if (!validFrom || !validTill) {
					return 'O';
				}
				if (
					(validFrom && (currentDate.isSame(validFrom, 'day') || currentDate.isAfter(validFrom, 'day'))) &&
					(validTill && (currentDate.isSame(validTill, 'day') || currentDate.isBefore(validTill, 'day')))
				) {
					return 'O';
				} else {
					return 'I';
				}
			},
		},
		{
			title: 'Priority',
			dataIndex: 'weight',
			key: 'ata',
			align: 'center',
			editable: writeAccess && {
				type: 'number',
			},
			render: (text) => text ?? '-',
		},
	];
	const handleEditTable = (items) => {
		const hasNonNullValue = Object.values(items?.values).some(
			(value) => value !== null && value !== undefined && value !== ''
		);
		hasNonNullValue && editResourceWeight({ id: items.id, data: { ...items.values, type } });
	};
	const columns = type === 'checkin' ? checkInColumns : type === 'gate' ? gateColumns : beltColumns

	return (
		<>
			<TableComponent
				data={resourceData}
				columns={columns}
				loading={isFetching || isFetchLoading}
				handleEdit={handleEditTable}
			/>
		</>
	);
};

export default ResourceCorelation;
