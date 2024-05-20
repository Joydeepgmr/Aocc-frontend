import React, { useState } from 'react';
import TopHeader from '../../../../components/topHeader/topHeader';
import CustomSelect from '../../../../components/select/select';
import TableComponent from '../../../../components/table/table';

import './fidsDashboard.scss';
import { useGetAllFidsScreens } from '../../../../services/fids/fidsResources';
import PageLoader from '../../../../components/pageLoader/pageLoader';

const FidsDashboard = () => {
	const [allScreenArr, setAllScreenArr] = useState([]);
	const data = [
		{
			logo: 'Airport Logo',
		},
		{
			flight_number: 'Flight Number',
		},
		{
			eta: 'ETA',
		},
		{
			sta: 'STA',
		},
		{
			checkin_in: 'Check In Counter',
		},
		{
			terminal: 'Terminal',
		},
		{
			status: 'Status',
		},
		{
			Action: 'Action',
		},
	];
	const allScreenApiProps = {
		onSuccess: ({ data }) => {
			const arr = data.map((data) => ({ label: data?.screenName, value: data.screenName }));
			setAllScreenArr(arr);
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message);
		},
	};
	const { isLoading: isAllFIdsScreenLoading } = useGetAllFidsScreens(allScreenApiProps);
	const columns = data?.map((item) => ({
		title: Object.values(item)[0],
		dataIndex: Object.keys(item)[0],
		key: `${Object.keys(item)[0]}`,
		align: 'center',
		render: (text) => text ?? '-',
	}));

	const info = [{ eobt3: 'erty' }];
	return (
		<>
			<PageLoader loading={isAllFIdsScreenLoading} />
			<div className="fidsDashboard--Container">
				<TopHeader heading="Flight Information">
					<CustomSelect SelectData={allScreenArr} placeholder={'Select Screens'} />
				</TopHeader>
				<TableComponent
					columns={columns}
					data={info}
					// loading={loading}
					// fetchData={fetchData}
					// pagination={pagination}
				/>
			</div>
		</>
	);
};

export default FidsDashboard;
