import React from 'react';
import CreateWrapper from './components/createWrapper/createWrapper';
import AirportSetupForm from './components/airportSetupForm/airportSetupForm';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineSetupForm from './components/airlineSetupForm/airlineSetupForm';
import AirportSetupTable from './components/airportSetupTable/airportSetupTable';
import { addAirport } from './redux/reducer';

export const items = [
	{
		key: '1',
		label: 'Airports',
		children: (
			<CreateWrapper
				formComponent={<AirportSetupForm />}
				title="Setup your Airport"
				width="120rem"
				tableComponent={<AirportSetupTable formComponent={<AirportSetupForm />} />}
				action={addAirport}
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
