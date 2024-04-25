import React from 'react';
import TopHeader from '../../../../components/topHeader/topHeader';
import CustomSelect from '../../../../components/select/select';
import TableComponent from '../../../../components/table/table';

import './fidsDashboard.scss';

const FidsDashboard = () => {
	const data = [
		{
			eobt3: 'EOBT - 3hours',
		},
		{
			eobt2: 'EOBT - 2hours',
		},
		{
			atot: 'ATOT',
		},
		{
			lru: 'Local Radar Update',
		},
		{
			finalApproach: 'Final Approach',
		},
		{
			aldt: 'Landing - ALDT',
		},
	];
	const columns = data?.map((item) => ({
		title: Object.values(item)[0],
		dataIndex: Object.keys(item)[0],
		key: `${Object.keys(item)[0]}`,
		align: 'center',
		render: (text) => text ?? '-',
	}));

	const info = [{ eobt3: 'erty' }];
	return (
		<div className="fidsDashboard--Container">
			<TopHeader heading="Flight Information">
				<CustomSelect placeholder={'Select Screens'} />
			</TopHeader>
			<TableComponent
				columns={columns}
				data={info}
				// loading={loading}
				// fetchData={fetchData}
				// pagination={pagination}
			/>
		</div>
	);
};

export default FidsDashboard;
