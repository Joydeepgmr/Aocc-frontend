import React, { useState } from 'react';
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
	const [createProps, setCreateProps] = useState({ new: false, onUpload: () => { }, onDownload: () => { } })
	const [activeTab, setActiveTab] = useState('1');
	const handleTabChange = (key) => {
		setActiveTab(key);
	}
	const items = [
		{
			key: '1',
			label: 'Aircraft Type',
			children: (
				<CreateWrapper
					tableComponent={<AircraftTypeSetupTable data={fetchedGlobalAircraftType} createProps={activeTab == 1 && createProps} setCreateProps={setCreateProps} />}
					createProps={createProps}
					setCreateProps={setCreateProps}
					data={fetchedGlobalAircraftType}
					label='Add aircraft type'
				/>
			),
		},
		{
			key: '2',
			label: 'Aircraft Registration',
			children: (
				<CreateWrapper
					tableComponent={<AircraftRegistrationSetupTable data={fetchedGlobalAircraftRegistration} createProps={activeTab == 2 && createProps} setCreateProps={setCreateProps} />}
					data={fetchedGlobalAircraftType}
					createProps={createProps}
					setCreateProps={setCreateProps}
					label='Add aircraft registration'
				/>
			),
		},
	];
	return (
		<div>
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
		</div>
	);
};

export default AircraftTabs;
