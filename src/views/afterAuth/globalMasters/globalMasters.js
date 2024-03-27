import React, {useEffect, useState} from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from './components/createWrapper/createWrapper';
import AirportForm from './components/airportForm/airportForm';
import AirportTable from './components/airportTable/airportTable';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineForm from './components/airlineForm/airlineForm';
import AirlineTable from './components/airlineTable/airlineTable';
import { useGetGlobalAirport, useGetGlobalAirline } from '../../../services/globalMasters/globalMaster';
import './globalMasters.scss';

const GlobalMasters = () => {
	const { data: airportData, mutate: getGlobalAirport } = useGetGlobalAirport();
	// const { data: fetchedGlobalAirport } = useGetGlobalAirport();
	// const { mutate: fetchedGlobalAirport, isLoading, isError, isSuccess } = useGetGlobalAirport();
	// const { data: fetchedGlobalAirline } = useGetGlobalAirline();

	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
	const [activeTab, setActiveTab] = useState('1');
	const handleTabChange = (key) => {
		setActiveTab(key);
	}
	function onUpload([file]) {
		const formData = new FormData();
		formData.append('file', file);
		if (activeTab == 1) {
			uploadAircraftTypeCsv(formData)
		} else if (activeTab == 2) {

		}
	}
	function onDownload(file) {

	}

	const fetchedGlobalAirport = () => {
		const payload = { pagination: airportData?.pagination }
		getGlobalAirport(payload);
	}

	const items = [
	
		{
			key: '1',
			label: 'Airports',
			children: (
				<CreateWrapper
					title="Setup your Airport"
					width="120rem"
					tableComponent={<AirportTable data={airportData?.data} createProps={activeTab == 1 && createProps} setCreateProps={setCreateProps} />}
					data={airportData?.data}
					pagination={airportData?.pagination}
					createProps={createProps}
					setCreateProps={setCreateProps}
					fetchData={fetchedGlobalAirport}
					label='New Airport'
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
					// tableComponent={<AirlineTable data={fetchedGlobalAirline} createProps={activeTab == 3 && createProps} setCreateProps={setCreateProps} />}
					// data={fetchedGlobalAirline}
					type='airline'
				/>
			),
		},
	];

	useEffect(() => {
		fetchedGlobalAirport();
	}, []);

	return (
		<div className="global_masters_container">
			<div className="global_master_header">
				<TopHeader heading="Global Reference Data" subHeading="overview of global reference data" />
			</div>
			<div>
				<CustomTabs defaultActiveKey="1" items={items} type="card" onChange={handleTabChange}/>
			</div>
		</div>
	);
};

export default GlobalMasters;
