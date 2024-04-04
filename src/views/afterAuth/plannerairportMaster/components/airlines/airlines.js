import React, { useState } from 'react';
import Common_table from '../../common_wrapper/common_table/common_table';
import Common_Card from '../../common_wrapper/common_card.js/common_card';

import { useGetAllPlannerAirline } from '../../../../../services';
import ButtonComponent from '../../../../../components/button/button';
import Delete from '../../../../../assets/Delete.svg';
import Edit from '../../../../../assets/Edit.svg';
import FormComponent from './formComponent/formComponent';

const Airlines = () => {
	const [airlineData, setAirlineData] = useState([]);
	const getAirlineHandler = {
		onSuccess: (data) => handleGetAirlineSuccess(data),
		onError: (error) => handleGetAirlineError(error),
	};

	const handleGetAirlineSuccess = (data) => {
		if (data?.pages) {
			const newData = data?.pages.reduce((acc, page) => {
				return acc.concat(page.data || []);
			}, []);

			setAirlineData([...newData]);
		}
	};

	const handleGetAirlineError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const {
		data: fetchedPlannerAirline,
		isLoading: isPlannerAirlineLoading,
		hasNextPage,
		fetchNextPage,
	} = useGetAllPlannerAirline(getAirlineHandler);

	const columns = [
		{
			title: '',
			dataIndex: 'edit',
			key: 'edit',
			render: () => (
				<div className="custom-button">
					<ButtonComponent type={'iconWithBorder'} icon={Delete} id="delete_button"></ButtonComponent>
					<ButtonComponent type={'iconWithBorder'} icon={Edit} id="edit_button"></ButtonComponent>
				</div>
			),
		},
		{
			title: 'Airline Name',
			dataIndex: 'name',
			key: 'name',
			render: (name) => name ?? '-',
		},
		{
			title: 'Airline Code',
			dataIndex: 'twoLetterCode',
			key: 'twoLetterCode',
			render: (twoLetterCode) => twoLetterCode ?? '-',
		},
		{
			title: 'ATC Code',
			dataIndex: 'threeLetterCode',
			key: 'threeLetterCode',
			render: (threeLetterCode) => threeLetterCode ?? '-',
		},
		{
			title: 'IATA Code',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.iataCode ?? '-',
		},
		{
			title: 'ICAO Code',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.icaoCode ?? '-',
		},
		{ title: 'Country', dataIndex: 'country', key: 'country', render: (country) => country ?? '-' },
		{
			title: 'Home Airport',
			dataIndex: 'homeAirport',
			key: 'homeAirport',
			render: (homeAirport) => homeAirport?.name ?? '-',
		},
		{
			title: '',
			dataIndex: 'viewdetails',
			key: 'viewdetails',
			render: () => <ButtonComponent title="View Details" type="text" />,
		},
	];

	return (
		<>
			{Boolean(airlineData?.length) ? (
				<Common_table
					Heading={'Setup your airline'}
					data={airlineData}
					columns={columns}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isPlannerAirlineLoading}
					title={'Airlines'}
					formComponent={<FormComponent />}
				/>
			) : (
				<Common_Card
					title1="Create"
					title2={'Import Global Reference'}
					btnCondition={false}
					Heading={'Setup your airline'}
					formComponent={<FormComponent />}
				/>
			)}
		</>
	);
};

export default React.memo(Airlines);
