import React, { useState } from 'react';
import TopHeader from '../../../../components/topHeader/topHeader';
import CustomSelect from '../../../../components/select/select';
import TableComponent from '../../../../components/table/table';

import './fidsDashboard.scss';
import { useGetAllFidsScreens, useGetFidsDashboard } from '../../../../services/fids/fidsResources';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import toast from 'react-hot-toast';

const FidsDashboard = () => {
	const [allScreenArr, setAllScreenArr] = useState([]);
	const [dashboardScreen, setDashboardScreen] = useState([]);
	const allScreenApiProps = {
		onSuccess: ({ data }) => {
			const arr = data.map((data) => ({ label: data?.screenName, value: data.id }));
			getDashboardScreen(arr?.[3]?.value);
			setAllScreenArr(arr);
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message);
		},
	};
	const DashboardScreenApiProps = {
		onSuccess: (data) => {
			setDashboardScreen([data]);
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message);
		},
	};
	const { isLoading: isAllFIdsScreenLoading } = useGetAllFidsScreens(allScreenApiProps);
	const { mutate: getDashboardScreen, isLoading: isDashboardScreenLoading } =
		useGetFidsDashboard(DashboardScreenApiProps);
	const onSelectScreen = (value) => {
		console.log('value is ', value);
		if (value) {
			getDashboardScreen(value);
		}
	};
	console.log('dashboard screen is', dashboardScreen);
	const columns = [
		{
			title: 'Screen Name',
			dataIndex: 'screen_name',
			key: 'screen_name',
			align: 'center',
		},
		{
			title: 'Resource Type',
			dataIndex: 'resource_type',
			key: 'resource_type',
			align: 'center',
		},
		{
			title: 'Call Sign',
			dataIndex: 'call_sign',
			key: 'call_sign',
			align: 'center',
		},
		{
			title: 'Sector',
			dataIndex: 'sector',
			key: 'sector',
			align: 'center',
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
			align: 'center',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
		},
		{
			title: 'Start Time',
			dataIndex: 'start_time',
			key: 'start_time',
			align: 'center',
		},
		{
			title: 'End Time',
			dataIndex: 'end_time',
			key: 'end_time',
			align: 'center',
		},
		{
			title: 'Terminal',
		},
		{
			title: 'Status',
		},
		{
			title: 'Action',
		},
	];
	// const columns = data?.map((item) => ({
	// 	title: Object.values(item)[0],
	// 	dataIndex: Object.keys(item)[0],
	// 	key: `${Object.keys(item)[0]}`,
	// 	align: 'center',
	// 	render: (text) => text ?? '-',
	// }));
	return (
		<>
			<PageLoader loading={isAllFIdsScreenLoading} />
			<div className="fidsDashboard--Container">
				<TopHeader heading="Flight Information">
					<CustomSelect
						defaultValue={allScreenArr?.[3]?.value}
						onChange={onSelectScreen}
						SelectData={allScreenArr}
						placeholder={'Select Screens'}
					/>
				</TopHeader>
				<TableComponent
					columns={columns}
					data={dashboardScreen}
					// loading={loading}
					// fetchData={fetchData}
					// pagination={pagination}
				/>
			</div>
		</>
	);
};

export default FidsDashboard;
