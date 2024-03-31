import React, { useEffect, useState } from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import { useGlobalAircraftRegistration, useGlobalAircraftType, useGlobalAirline, useGlobalAirport, useGlobalCountries, useUploadCSVAircraftType } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationTable from '../aircraftRegistrationTable/aircraftRegistrationTable';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';
import CreateWrapper from '../createWrapper/createWrapper';
import AircraftTypeTab from '../aircraftTypeTab/aircraftTypeTab';


const AircraftTabs = () => {
	const { getGlobalAircraftType, updatedData: updatedAircraftTypeData = [] } = useGlobalAircraftType();
	const { getGlobalAircraftRegistration, updatedData: updatedAircraftRegistrationData = [] } = useGlobalAircraftRegistration();
	const { getGlobalAirline, updatedData: updatedAirLineData = [] } = useGlobalAirline();
	const { getGlobalAirport, updatedData: updatedAirportData = [] } = useGlobalAirport();
	const { getGlobalCountries, countryData = [] } = useGlobalCountries();
	const { mutate: getCountriesData } = getGlobalCountries;
	const { mutate: getAirportData } = getGlobalAirport;
	const { mutate: getAirlineData } = getGlobalAirline;
	const { data: aircraftTypeData, mutate: getAircraftType, isLoading: isAircraftTypeLoading } = getGlobalAircraftType;
	const { data: aircraftRegistrationData, mutate: getAircraftRegistration, isLoading: isAircraftRegistrationLoading } = getGlobalAircraftRegistration;
	const { mutate: uploadAircraftTypeCsv } = useUploadCSVAircraftType();
	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
	const [activeTab, setActiveTab] = useState('1');
	const handleTabChange = (key) => {
		setActiveTab(key);
		if (key == 1) {
			// if (!updatedAircraftTypeData?.length) {
			// 	fetchedGlobalAircraftType();
			// }
			// if (!updatedAirLineData?.length) {
			// 	getAirlineData();
			// }
		} else if (key == 2) {
			if (!updatedAircraftRegistrationData?.length) {
				fetchedGlobalAircraftRegistration();
			}
			if (!updatedAircraftTypeData?.length) {
				fetchedGlobalAircraftType();
			}
			if (!updatedAirportData?.length) {
				getAirportData();
			}
			if (!countryData?.length) {
				console.log("countryData ", countryData)
				getCountriesData();
			}
		}
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
	const fetchedGlobalAircraftType = () => {
		const payload = { pagination: aircraftTypeData?.pagination }
		getAircraftType(payload);

	}
	const fetchedGlobalAircraftRegistration = () => {
		const payload = { pagination: aircraftRegistrationData?.pagination }
		getAircraftRegistration(payload);
	}
	const items = [
		{
			key: '1',
			label: 'Aircraft Type',
			children: (
				<AircraftTypeTab />
			),
		},
		{
			key: '2',
			label: 'Aircraft Registration',
			children: (
				<CreateWrapper
					tableComponent={activeTab == 2 && <AircraftRegistrationTable aircraftData={updatedAircraftTypeData} createProps={createProps} setCreateProps={setCreateProps} pagination={aircraftRegistrationData?.pagination}
						fetchData={fetchedGlobalAircraftRegistration} />}
					data={updatedAircraftRegistrationData}
					createProps={createProps}
					setCreateProps={setCreateProps}
					label='Add aircraft registration'
					isLoading={isAircraftRegistrationLoading}
				/>
			),
		},
	];
	useEffect(() => {
		handleTabChange('1');
	}, []);
	return (
		<div>
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
		</div>
	);
};

export default AircraftTabs;