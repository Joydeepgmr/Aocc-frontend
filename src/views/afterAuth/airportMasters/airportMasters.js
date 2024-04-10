import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TopHeader from '../../../components/topHeader/topHeader';
import { useCountriesDropdown, useGlobalAirportDropdown } from '../../../services';
import { useGetLicenseData } from '../../../services/airportMasters/airportMasters';
import CreateWrapper from '../globalMasters/components/createWrapper/createWrapper';
import './airportMasters.scss';
import LicenseSetupTable from './components/licenseSetupTable/licenseSetupTable';

const AirportMasters = () => {
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useGetLicenseData({ onError });
	const { data: airportDropdownData } = useGlobalAirportDropdown({ onError });
	const { data: countryDropdownData } = useCountriesDropdown({ onError });
	const [createProps, setCreateProps] = useState({ new: false, onDownload });

	function onDownload() {}

	return (
		<div className="airport_masters_container">
			<div className="airport_master_header">
				<TopHeader
					heading="Airport Masters"
					subHeading="Overview of airport licenses for the Airport Operating System"
				/>
			</div>
			<div>
				<CreateWrapper
					width="80%"
					tableComponent={
						<LicenseSetupTable
							data={data}
							createProps={createProps}
							setCreateProps={setCreateProps}
							fetchData={fetchNextPage}
							pagination={{ isMore: hasNextPage }}
							airportDropdownData={airportDropdownData}
							countryDropdownData={countryDropdownData}
							loading={isFetching}
						/>
					}
					data={data?.pages}
					createProps={createProps}
					setCreateProps={setCreateProps}
					label="New Airport License"
					isLoading={isLoading}
					isCsv={false}
				/>
			</div>
		</div>
	);
};

export default AirportMasters;
