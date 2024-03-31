import React, { useState } from 'react';
import './airportMasters.scss';
import TopHeader from '../../../components/topHeader/topHeader';
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from '../globalMasters/components/createWrapper/createWrapper';
import Wrapper from './components/Wrapper/Wrapper';
// import { addAirportLicense } from './redux/reducer';
import { useGetLicenseData } from '../../../services/airportMasters/airportMasters';
import LicenseSetupForm from './components/licenseSetupForm/licenseSetupForm';
import LicenseSetupTable from './components/licenseSetupTable/licenseSetupTable';

const AirportMasters = () => {
	const { data: fetchedLicenseData, isLoading } = useGetLicenseData();
	console.log('what is fetched data', fetchedLicenseData);

	return (
		<div className="airport_masters_container">
			<div className="airport_master_header">
				<TopHeader
					heading="Airport Masters"
					subHeading="Overview of airport licenses for the Airport Operating System"
				/>
			</div>
			<div>
				{/* <CreateWrapper
					formComponent={<LicenseSetupForm />}
					title="New Airport License"
					width="87.2rem"
					tableComponent={<LicenseSetupTable formComponent={<LicenseSetupForm />} />}
					action={addAirportLicense}
				/> */}
				<Wrapper
					title="New Airport License"
					width="87.2rem"
					tableComponent={
						<LicenseSetupTable
							data={fetchedLicenseData}
						/>
					}
					isLoading={isLoading}
					data={fetchedLicenseData}
				/>
			</div>
		</div>
	);
};

export default AirportMasters;
