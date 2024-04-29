import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TopHeader from '../../../components/topHeader/topHeader';
import { useGetLicenseData } from '../../../services/airportMasters/airportMasters';
import CreateWrapper from '../globalMasters/components/createWrapper/createWrapper';
import LicenseSetupTable from './components/licenseSetupTable/licenseSetupTable';
import SocketEventListener from '../../../socket/listner/socketListner';
import { GET_LICENSE } from '../../../api';
import './airportMasters.scss';

const AirportMasters = () => {
	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch: getAirportMastersRefetch } = useGetLicenseData({ onError });
	const [createProps, setCreateProps] = useState({ new: false, onDownload });

	function onDownload() { }

	return (
		<>
			<SocketEventListener refetch={getAirportMastersRefetch} apiName={GET_LICENSE} />
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
		</>
	);
};

export default AirportMasters;
