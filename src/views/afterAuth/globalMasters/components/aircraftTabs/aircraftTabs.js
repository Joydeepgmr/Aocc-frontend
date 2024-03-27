import React, { useEffect, useState } from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import { useGetGlobalAircraftRegistration, useGetGlobalAircraftType, useUploadCSVAircraftType } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationTable from '../aircraftRegistrationTable/aircraftRegistrationTable';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';
import CreateWrapper from '../createWrapper/createWrapper';


const AircraftTabs = () => {
	const { data: aircraftTypeData, mutate: getGlobalAircraftType, updatedData: updatedAircraftTypeData } = useGetGlobalAircraftType();
	const { data: aircraftRegistrationData, mutate: getGlobalAircraftRegistration, updatedData: updatedAircraftRegistrationData } = useGetGlobalAircraftRegistration();
	const { mutate: uploadAircraftTypeCsv } = useUploadCSVAircraftType();
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
	console.log("pagination is ", aircraftTypeData)
	const fetchedGlobalAircraftType = () => {
		const payload = { pagination: aircraftTypeData?.pagination }
		getGlobalAircraftType(payload);
	}
	const fetchedGlobalAircraftRegistration = () => {
		const payload = { pagination: aircraftRegistrationData?.pagination }
		getGlobalAircraftRegistration(payload);
	}
	const items = [
		{
			key: '1',
			label: 'Aircraft Type',
			children: (
				<CreateWrapper
					tableComponent={<AircraftTypeTable data={updatedAircraftTypeData} createProps={activeTab == 1 && createProps} setCreateProps={setCreateProps} />}
					createProps={createProps}
					setCreateProps={setCreateProps}
					data={updatedAircraftTypeData}
					pagination={aircraftTypeData?.pagination}
					fetchData={fetchedGlobalAircraftType}
					label='Add aircraft type'
				/>
			),
		},
		{
			key: '2',
			label: 'Aircraft Registration',
			children: (
				<CreateWrapper
					tableComponent={<AircraftRegistrationTable data={updatedAircraftRegistrationData} createProps={activeTab == 2 && createProps} setCreateProps={setCreateProps} />}
					data={updatedAircraftRegistrationData}
					pagination={aircraftRegistrationData?.pagination}
					fetchData={fetchedGlobalAircraftRegistration}
					createProps={createProps}
					setCreateProps={setCreateProps}
					label='Add aircraft registration'
				/>
			),
		},
	];
	useEffect(() => {
		fetchedGlobalAircraftType();
		fetchedGlobalAircraftRegistration();
	}, []);
	return (
		<div>
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
		</div>
	);
};

export default AircraftTabs;