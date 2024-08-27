import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TableComponent from '../../../../../components/table/table';
import { useGetAirlinesCorelation, useUpdateAirlineCorelation } from '../../../../../services/planairportmaster/mastercorelation/mastercorelation';
import toast from 'react-hot-toast';
import PageLoader from '../../../../../components/pageLoader/pageLoader';

const ResourceCorelation = () => {
	const [airlineData, setAirlineData] = useState([]);
	const writeAccess = !!localStorage.getItem('masterAccess');
	const getAirlineHandler = {
		onSuccess: (data) => handleGetAirlineSuccess(data),
		onError: (error) => handleGetAirlineError(error),
	};

	const editWeightHandler = {
		onSuccess: ({ message }) => {
			toast.success(message);
			refetch();
		},
		onError: (error) => handleGetAirlineError(error),
	}
	const handleGetAirlineSuccess = (data) => {
		if (data) {
			setAirlineData(data);
		}
	};

	const handleGetAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};


	const {
		isLoading: isPlannerAirlineLoading,
		isFetching: isPlannerAirlineFetching,
		refetch,
	} = useGetAirlinesCorelation(getAirlineHandler);

	const { mutate: editAirlineWeight, isLoading: isEditLoading } = useUpdateAirlineCorelation(editWeightHandler);

	const columns = [
		{
			title: 'LOGO',
			dataIndex: 'value',
			key: 'logo',
			align: 'center',
			render: (logo) => <img style={{ width: '8rem', height: '3rem' }} src={logo} alt='airline_logo' />
		},
		{
			title: 'AL',
			dataIndex: 'name',
			key: 'name',
			render: (text, record) => text ?? '-',
			align: 'center',
		},
		{
			title: '2L',
			dataIndex: 'two_letter_code',
			key: 'two_letter_code',
			render: (two_letter_code) => two_letter_code ?? '-',
			align: 'center',
		},
		{
			title: '3L',
			dataIndex: 'three_letter_code',
			key: 'three_letter_code',
			render: (three_letter_code) => three_letter_code ?? '-',
			align: 'center',
		},
		{
			title: 'TYPE',
			dataIndex: 'airline_type',
			key: 'airline_type',
			render: (airline_type) => {
				let airlineString = airline_type;
				airlineString = airlineString.replace('{', '');
				airlineString = airlineString.replace('}', '');
				return <div style={{ textTransform: 'capitalize' }}>{airlineString ?? '-'}</div>
			},
			align: 'center',
		},
		{
			title: 'CNTRY',
			dataIndex: 'country',
			key: 'country',
			render: (country) => country ?? '-',
			align: 'center',
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
		hasNonNullValue && editAirlineWeight({ id: items.id, data: items.values });
	};
	return (
		<>
			<PageLoader loading={isPlannerAirlineLoading} />
			<TableComponent
				data={airlineData}
				columns={columns}
				loading={isPlannerAirlineLoading || isPlannerAirlineFetching || isEditLoading}
				handleEdit={handleEditTable}
			/>
		</>
	);
};

export default ResourceCorelation;
