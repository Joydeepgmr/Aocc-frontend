import React, { useEffect } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from './components/createWrapper/createWrapper';
import AirportSetupForm from './components/airportSetupForm/airportSetupForm';
import AirportSetupTable from './components/airportSetupTable/airportSetupTable';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineSetupForm from './components/airlineSetupForm/airlineSetupForm';
import AirlineSetupTable from './components/airlineSetupTable/airlineSetupTable';
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
					formComponent={<AirportSetupForm />}
					title="Setup your Airport"
					width="120rem"
					tableComponent={<AirportSetupTable data={fetchedGlobalAirport} formComponent={<AirportSetupForm />} />}
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
					formComponent={<AirlineSetupForm />}
					title="Setup your airline"
					width="120rem"
					tableComponent={<AirlineSetupTable data={fetchedGlobalAirline} formComponent={<AirlineSetupForm />} />}
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
