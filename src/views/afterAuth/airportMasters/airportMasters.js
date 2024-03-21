import React, { useState } from 'react';
import './airportMasters.scss';
import TopHeader from '../../../components/topHeader/topHeader'
import CustomTabs from '../../../components/customTabs/customTabs';
import CreateWrapper from '../globalMasters/components/createWrapper/createWrapper';
import Wrapper from './components/Wrapper/Wrapper';
import { addAirportLicense } from './redux/reducer';
import LicenseSetupForm from './components/licenseSetupForm/licenseSetupForm';
import LicenseSetupTable from './components/licenseSetupTable/licenseSetupTable';

const AirportMasters = () => {
	return (
		<div className='airport_masters_container'>
			<div className='airport_master_header'>
				<TopHeader heading="Airport Masters" subHeading="Overview of airport licenses for the Airport Operating System" />
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
				formComponent={<LicenseSetupForm/>}
				title="New Airport License"
				width="87.2rem"
				tableComponent={<LicenseSetupTable formComponent={<LicenseSetupTable/>} />}
				action={addAirportLicense}
				/>
			</div>
		</div>
	)
}

export default AirportMasters;