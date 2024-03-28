import React, { useEffect, useState } from 'react';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from './components/createWrapper/createWrapper';
import AirportForm from './components/airportForm/airportForm';
import AirportTable from './components/airportTable/airportTable';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineForm from './components/airlineForm/airlineForm';
import AirlineTable from './components/airlineTable/airlineTable';
import { useGlobalAirport, useGetGlobalAirline, useUploadCSVAirport } from '../../../services/globalMasters/globalMaster';
import './globalMasters.scss';

const GlobalMasters = () => {
	console.log(useGlobalAirport, 'useGlobalAirport-line');
	const { getGlobalAirport, updatedData: updatedAirportData = [] } = useGlobalAirport('get');
	const { data: airportData, mutate: getAirport } = getGlobalAirport;
	const { data: fetchedGlobalAirline, mutate: getGlobalAirline } = useGetGlobalAirline();
	console.log('fetchedGlobalAirline', fetchedGlobalAirline);
	const { mutate: uploadAirportCsv } = useUploadCSVAirport();

	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
	const [activeTab, setActiveTab] = useState('1');

	const handleTabChange = (key) => {
		setActiveTab(key);
		if (key == 1 && !updatedAirportData?.length) {
			fetchedGlobalAirport();
		}
	}

	function onUpload([file]) {
		const formData = new FormData();
		formData.append('file', file);
		if (activeTab == 1) {
			uploadAirportCsv(formData)
		} else if (activeTab == 2) {

		}
	}
	function onDownload(file) {

	}

	const fetchedGlobalAirport = () => {
		const payload = { pagination: airportData?.pagination }
		getAirport(payload);
	}

	const items = [
		{
			key: '1',
			label: 'Airports',
			children: (
				<CreateWrapper
					title="Setup your Airport"
					width="120rem"
					tableComponent={
						<AirportTable
							data={airportData?.data}
							createProps={activeTab == 1 && createProps}
							setCreateProps={setCreateProps}
						/>}
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
					createProps={createProps}
					setCreateProps={setCreateProps}
					width="120rem"
					tableComponent={
						<AirlineTable
							createProps={activeTab == 3 && createProps}
							setCreateProps={setCreateProps}
							data={fetchedGlobalAirline?.data}
							formComponent={<AirlineForm />}
						/>
					}
					data={fetchedGlobalAirline?.data}
					label=" Add Airline"
				/>
			),
		},
	];

	useEffect(() => {
		fetchedGlobalAirport();
	}, []);

	useEffect(() => {
		getGlobalAirline();
	}, []);


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
