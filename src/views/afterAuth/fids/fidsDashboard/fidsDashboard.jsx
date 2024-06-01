import React, { useState } from 'react';

import CustomTabs from '../../../../components/customTabs/customTabs';
import BaggageBeltTab from './baggageBeltTab/baggageBeltTab';
import CheckInTab from './checkInTab/checkInTab';
import './fidsDashboard.scss';
import GateTab from './gateTab/gateTab';
import { useGetAirlineLogo } from '../../../../services/fids/fidsResources';
import PageLoader from '../../../../components/pageLoader/pageLoader';
import toast from 'react-hot-toast';

const FidsDashboard = () => {
	const [airlineLogo, setAirlineLogo] = useState('');
	const AirlineLogoApiProps = {
		onSuccess: (data) => {
			if (data?.value) {
				setAirlineLogo(data.value);
			}
		},
		onError: (error) => {
			toast.error(error?.response?.data?.message);
		},
	};
	const { isLoading: isAirlineLogoLoading } = useGetAirlineLogo(AirlineLogoApiProps);
	const items = [
		{
			key: '1',
			label: 'CheckIn',
			children: <CheckInTab airlineLogo={airlineLogo} />,
		},
		{
			key: '2',
			label: 'Gate',
			children: <GateTab airlineLogo={airlineLogo} />,
		},
		{
			key: '4',
			label: 'Baggage Belt',
			children: <BaggageBeltTab airlineLogo={airlineLogo} />,
		},
	];

	return (
		<>
			<PageLoader loading={isAirlineLogoLoading} />
			<div className="container-div">
				<div className="main-container">
					<CustomTabs defaultActiveKey={'1'} items={items} type="card" />
				</div>
			</div>
		</>
	);
};

export default FidsDashboard;
