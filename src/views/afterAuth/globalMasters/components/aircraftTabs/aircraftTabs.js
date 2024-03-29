import React, { useEffect, useState } from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import { useGlobalAircraftRegistration, useGlobalAircraftType, useGlobalAirline, useGlobalAirport, useGlobalCountries, useUploadCSVAircraftType } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationTable from '../aircraftRegistrationTable/aircraftRegistrationTable';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';
import CreateWrapper from '../createWrapper/createWrapper';


const AircraftTabs = () => {
	const { getGlobalAircraftType, updatedData: updatedAircraftTypeData = [], patchGlobalAircraftType } = useGlobalAircraftType();
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
			if (!updatedAircraftTypeData?.length) {
				fetchedGlobalAircraftType();
			}
			if (!updatedAirLineData?.length) {
				getAirlineData();
			}
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

	console.log('getCountriesData', getCountriesData, 'air', getAirportData)

	function onUpload([file]) {
		const formData = new FormData();
		formData.append('file', file);
		if (activeTab == 1) {
			uploadAircraftTypeCsv(formData)
		} else if (activeTab == 2) {

		}
	}
	console.log('isAircraftTypeLoading ', isAircraftTypeLoading)
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
				<CreateWrapper
					tableComponent={<AircraftTypeTable createProps={activeTab == 1 && createProps} setCreateProps={setCreateProps} pagination={aircraftTypeData?.pagination}
						fetchData={fetchedGlobalAircraftType} />}
					createProps={createProps}
					setCreateProps={setCreateProps}
					data={updatedAircraftTypeData}
					// pagination={aircraftTypeData?.pagination}
					// fetchData={fetchedGlobalAircraftType}
					label='Add aircraft type'
					isLoading={isAircraftTypeLoading}
				/>
			),
		},
		{
			key: '2',
			label: 'Aircraft Registration',
			children: (
				<CreateWrapper
					tableComponent={<AircraftRegistrationTable aircraftData={updatedAircraftTypeData} createProps={activeTab == 2 && createProps} setCreateProps={setCreateProps} />}
					data={updatedAircraftRegistrationData}
					pagination={aircraftRegistrationData?.pagination}
					fetchData={fetchedGlobalAircraftRegistration}
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