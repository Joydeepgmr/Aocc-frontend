import React from 'react';

import CustomTabs from '../../../../components/customTabs/customTabs';
import BaggageBeltTab from './baggageBeltTab/baggageBeltTab';
import CheckInTab from './checkInTab/checkInTab';
import './fidsDashboard.scss';
import GateTab from './gateTab/gateTab';

const FidsDashboard = () => {
	const items = [
		{
			key: '1',
			label: 'CheckIn',
			children: <CheckInTab />,
		},
		{
			key: '2',
			label: 'Gate',
			children: <GateTab />,
		},
		{
			key: '4',
			label: 'Baggage Belt',
			children: <BaggageBeltTab />,
		},
	];

	return (
		<>
			
			<div className="container-div">
				<div className="main-container">
					<CustomTabs defaultActiveKey={'1'} items={items} type="card" />
				</div>
			</div>
			{/* <div className="fidsDashboard--Container">
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
			</div> */}
		</>
	);
};

export default FidsDashboard;
