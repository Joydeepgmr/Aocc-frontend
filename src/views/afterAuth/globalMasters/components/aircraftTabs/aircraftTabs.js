import React from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import CreateWrapper from '../createWrapper/createWrapper';
import AircraftTypeSetupForm from '../aircraftTypeSetupForm/aircraftTypeSetupForm';
import AircraftTypeSetupTable from '../aircraftTypeSetupTable/aircraftTypeSetupTable';
import { useGetGlobalAircraftRegistration, useGetGlobalAircraftType } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';
import AircraftRegistrationSetupTable from '../aircraftRegistrationSetupTable/aircraftRegistrationSetupTable';


const AircraftTabs = () => {
	const { data: fetchedGlobalAircraftType } = useGetGlobalAircraftType();
	const { data: fetchedGlobalAircraftRegistration } = useGetGlobalAircraftRegistration();
	
	 const items = [
		{
			key: '1',
			label: 'Aircaft Type',
			children: (
				<CreateWrapper 
					formComponent={<AircraftTypeSetupForm />} 
					title="Setup aircraft type" 
					width="120rem" 
					tableComponent={<AircraftTypeSetupTable data={fetchedGlobalAircraftType} formComponent={<AircraftTypeSetupForm />} />}
					// action={addAirport}
					data={fetchedGlobalAircraftType}
					type='aircraft-type'
				/>
			),
		},
		{
			key: '2',
			label: 'Aircraft Registration',
			children: (
				<CreateWrapper
					formComponent={<AircraftRegistrationForm />}
					title="Setup aircraft registration"
					width="120rem"
					tableComponent={<AircraftRegistrationSetupTable data={fetchedGlobalAircraftRegistration} formComponent={<AircraftRegistrationForm />} />}
					data={fetchedGlobalAircraftType}
					type='aircraft-registration'
				/>
			),
		},
	];
	return (
		<div>
			<CustomTabs defaultActiveKey="1" items={items} />
		</div>
	);
};

export default AircraftTabs;
