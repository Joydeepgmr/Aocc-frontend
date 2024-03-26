import React from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import CreateWrapper from '../createWrapper/createWrapper';
import AircraftTypeForm from '../AircraftTypeForm/AircraftTypeForm';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';
import { useGetGlobalAircraftRegistration, useGetGlobalAircraftType } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationForm from '../aircraftRegistrationForm/aircraftRegistrationForm';
import AircraftRegistrationTable from '../AircraftRegistrationTable/AircraftRegistrationTable';


const AircraftTabs = () => {
	const { data: fetchedGlobalAircraftType } = useGetGlobalAircraftType();
	const { data: fetchedGlobalAircraftRegistration } = useGetGlobalAircraftRegistration();
	
	 const items = [
		{
			key: '1',
			label: 'Aircaft Type',
			children: (
				<CreateWrapper 
					formComponent={<AircraftTypeForm />} 
					title="Setup aircraft type" 
					width="120rem" 
					tableComponent={<AircraftTypeTable data={fetchedGlobalAircraftType} formComponent={<AircraftTypeForm />} />}
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
					tableComponent={<AircraftRegistrationTable data={fetchedGlobalAircraftRegistration} formComponent={<AircraftRegistrationForm />} />}
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
