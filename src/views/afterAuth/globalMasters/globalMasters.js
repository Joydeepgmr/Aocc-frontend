import React, { useEffect, useState } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from './components/createWrapper/createWrapper';
import AirportForm from './components/airportForm/airportForm';
import AirportTable from './components/airportTable/airportTable';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineForm from './components/airlineForm/airlineForm';
// import AirlineTable from './components/airlineTable/airlineTable';
import { useGetGlobalAirport, useGetGlobalAirline } from '../../../services/globalMasters/globalMaster';
import './globalMasters.scss';
import AirlineTable from './components/AirlineTable/AirlineTable';

const GlobalMasters = () => {
	const { data: fetchedGlobalAirport } = useGetGlobalAirport();
	const { data: fetchedGlobalAirline } = useGetGlobalAirline();

	const [createProps, setCreateProps] = useState({ new: false, onUpload: () => {}, onDownload: () => {} });
	const [activeTab, setActiveTab] = useState('1');
	const handleTabChange = (key) => {
		setActiveTab(key);
	};

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
					createProps={createProps}
					setCreateProps={setCreateProps}
					width="120rem"
					tableComponent={
						<AirlineTable
							createProps={activeTab == 3 && createProps}
							setCreateProps={setCreateProps}
							data={fetchedGlobalAirline}
							formComponent={<AirlineForm />}
						/>
					}
					data={fetchedGlobalAirline}
					label=" Add Airline"
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
				<CustomTabs defaultActiveKey="1" items={items} type="card" onChange={handleTabChange} />
			</div>
		</div>
	);
};

export default GlobalMasters;
