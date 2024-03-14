import React from 'react';
import CreateWrapper from '../createWrapper/createWrapper';
import AircraftTypeForm from '../aircraftTypeForm/aircraftTypeForm';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';

export const items = [
	{
		key: '1',
		label: 'Aircaft Type',
		children: (
			<CreateWrapper title="Setup your aircraft type" width="120rem" formComponent={<AircraftTypeForm />} />
		),
	},
	{
		key: '2',
		label: 'Aircraft Registration',
		children: (
			<CreateWrapper
				title="Setup your aircraft registration"
				width="120rem"
				formComponent={<AircraftRegistrationForm />}
			/>
		),
	},
];
