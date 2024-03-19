import React, { useEffect } from 'react';
import './globalMasters.scss';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import { useGetGlobalAirport } from '../../../services/globalMasters/globalMaster';
import CreateWrapper from './components/createWrapper/createWrapper';
import AirportSetupForm from './components/airportSetupForm/airportSetupForm';
import AirportSetupTable from './components/airportSetupTable/airportSetupTable';
import { addAirport } from './redux/reducer';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineSetupForm from './components/airlineSetupForm/airlineSetupForm';
// import { usePostGlobalAirport } from '../../../services';

const GlobalMasters = () => {
	const { data: fetchedGlobalAirport } = useGetGlobalAirport();
	// const { postData: postGlobalAirport } = usePostGlobalAirport();

	const items = [
		{
			key: '1',
			label: 'Airports',
			children: (
				<CreateWrapper
					formComponent={<AirportSetupForm  />}
					title="Setup your Airport"
					width="120rem"
					tableComponent={<AirportSetupTable data={fetchedGlobalAirport} formComponent={<AirportSetupForm />} />}
					action={addAirport}
					data={fetchedGlobalAirport}
					
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
			children: <CreateWrapper title="Setup your airline" width="120rem" formComponent={<AirlineSetupForm />} />,
		},
	];


	console.log(fetchedGlobalAirport);
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
