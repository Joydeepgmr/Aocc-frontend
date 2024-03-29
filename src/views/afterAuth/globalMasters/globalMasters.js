import React, { useEffect, useState } from 'react';
import CustomTabs from '../../../components/customTabs/customTabs';
import TopHeader from '../../../components/topHeader/topHeader';
import { useGlobalAirline, useGlobalAirport, useUploadCSVAirport } from '../../../services/globalMasters/globalMaster';
import AircraftTabs from './components/aircraftTabs/aircraftTabs';
import AirlineTable from './components/airlineTable/airlineTable';
import AirportTable from './components/airportTable/airportTable';
import CreateWrapper from './components/createWrapper/createWrapper';
import './globalMasters.scss';

const GlobalMasters = () => {
	const { getGlobalAirport, updatedData: updatedAirportData = [] } = useGlobalAirport();
	const { data: airportData, mutate: getAirport } = getGlobalAirport;
	const { getGlobalAirline, updatedData: updatedAirlineData = [] } = useGlobalAirline();
	const { data: airlineData, mutate: getAirline, isLoading: isAirlineLoading } = getGlobalAirline;
	const { mutate: uploadAirportCsv } = useUploadCSVAirport();

	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
	const [activeTab, setActiveTab] = useState('1');


	const handleTabChange = (key) => {
		setActiveTab(key);
		if (key == 1 && !updatedAirportData?.length) {
			fetchedGlobalAirport();
		} else if (key == 3 && !updatedAirlineData?.length) {
			fetchGlobalAirline();
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
	const fetchedGlobalAirline = () => {
		const payload = { pagination: airlineData?.pagination }
		getAirline(payload);
	}


	const fetchGlobalAirline = () => {
		const payload = { pagination: airlineData?.pagination }
		getAirline(payload);
	}

	const items = [
		{
			key: '1',
			label: 'Airports',
			children: (
				<CreateWrapper
					width="120rem"
					tableComponent={
						<AirportTable
							data={airportData?.data}
							createProps={activeTab == 1 && createProps}
							setCreateProps={setCreateProps}
						/>}
					data={updatedAirportData}
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
					title="Setup your airline"
					width="120rem"
					tableComponent={
						<AirlineTable
							data={airlineData?.data}
							createProps={activeTab == 3 && createProps}
							setCreateProps={setCreateProps}
							fetchData={fetchGlobalAirline}
							pagination={airlineData?.pagination}
						/>
					}
					data={updatedAirlineData}
					label=" Add Airline"
					isLoading={isAirlineLoading}
				/>
			),
		},
	];



	useEffect(() => {
		handleTabChange('1');
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