import React, { useEffect } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from './components/createWrapper/createWrapper';
import AirportForm from './components/AirportForm/AirportForm';
import AirportTable from './components/AirportTable/AirportTable';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineForm from './components/AirlineForm/AirlineForm';
import AirlineTable from './components/AirlineTable/AirlineTable';
import { useGetGlobalAirport, useGetGlobalAirline } from '../../../services/globalMasters/globalMaster';
import './globalMasters.scss';

const GlobalMasters = () => {
	const { data: fetchedGlobalAirport } = useGetGlobalAirport();
	const { data: fetchedGlobalAirline } = useGetGlobalAirline();

	const items = [
		{
			key: '1',
			label: 'Airports',
			children: (
				<CreateWrapper
					formComponent={<AirportForm />}
					title="Setup your Airport"
					width="120rem"
					tableComponent={<AirportTable data={fetchedGlobalAirport} formComponent={<AirportForm />} />}
					data={fetchedGlobalAirport}
					type="airport"
				/>
			),
		},
		{
			key: '2',
			label: 'Aircrafts',
			children: <AircraftTabs />,
		},
		{
			key: '3',
			label: 'Airlines',
			children: (
				<CreateWrapper
					formComponent={<AirlineForm />}
					title="Setup your airline"
					width="120rem"
					tableComponent={<AirlineTable data={fetchedGlobalAirline} formComponent={<AirlineForm />} />}
					data={fetchedGlobalAirline}
					type='airline'
				/>
			),
		},
	];


	return (
		<div className="global_masters_container">
			<div className="global_master_header">
				<TopHeader heading="Global Reference Data" subHeading="overview of global reference data" />
			</div>
			<div>
				<CustomTabs defaultActiveKey="1" items={items} type="card" />
			</div>
		</div>
	);
};

export default GlobalMasters;
