import React, { useEffect, useState } from 'react';
import CustomTabs from '../../../../../components/customTabs/customTabs';
import { useGlobalAircraftRegistration, useGlobalAircraftType, useUploadCSVAircraftType } from '../../../../../services/globalMasters/globalMaster';
import AircraftRegistrationTable from '../aircraftRegistrationTable/aircraftRegistrationTable';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';
import CreateWrapper from '../createWrapper/createWrapper';


const AircraftTabs = () => {
	const { getGlobalAircraftType, updatedData: updatedAircraftTypeData = [] } = useGlobalAircraftType();
	const { getGlobalAircraftRegistration, updatedData: updatedAircraftRegistrationData = [] } = useGlobalAircraftRegistration();
	const { data: aircraftTypeData, mutate: getAircraftType } = getGlobalAircraftType;
	const { data: aircraftRegistrationData, mutate: getAircraftRegistration } = getGlobalAircraftRegistration;
	const { mutate: uploadAircraftTypeCsv } = useUploadCSVAircraftType();
	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
	const [activeTab, setActiveTab] = useState('1');
	const handleTabChange = (key) => {
		setActiveTab(key);
		if (key == 1 && !updatedAircraftTypeData?.length) {
			fetchedGlobalAircraftType();
		} else if (key == 2 && !updatedAircraftRegistrationData?.length) {
			fetchedGlobalAircraftRegistration();
		}
	}
	console.log("aircraftTypeData is ", aircraftTypeData)
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
				<CreateWrapper
					tableComponent={<AircraftTypeTable createProps={activeTab == 1 && createProps} setCreateProps={setCreateProps} />}
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
		handleTabChange('1');
	}, []);
	return (
		<div>
			<CustomTabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
		</div>
	);
};

export default AircraftTabs;