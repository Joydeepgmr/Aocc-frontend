import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
	useGetGlobalAircraftType,
	useGlobalAirlineDropdown,
	useUploadCSVGlobalAircraftType,
} from '../../../../../services/globalMasters/globalMaster';
import AircraftTypeTable from '../aircraftTypeTable/aircraftTypeTable';
import CreateWrapper from '../createWrapper/createWrapper';
import { useQueryClient } from 'react-query';
import { useDownloadCSV } from '../../../../../services/SeasonalPlanServices/seasonalPlan';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { GET_GLOBAL_AIRCRAFT_TYPE } from '../../../../../api';

const AircraftTypeTab = () => {
	const queryClient = useQueryClient();
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data: airlineDropdownData = [] } = useGlobalAirlineDropdown({ onError });
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch: getAircraftTypeRefetch } = useGetGlobalAircraftType({ onError });
	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
	const uploadCsvHandler = {
		onSuccess: (data) => handleUploadCsvSuccess(data),
		onError: (error) => handleUploadCsvError(error),
	};

	const handleUploadCsvSuccess = () => {
		toast.success('CSV Uploaded Successfully');
		queryClient.invalidateQueries('global-aircraft-type');
		setIsCsvModalOpen(false);
	};

	const handleUploadCsvError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const { mutate: onUploadCSV } = useUploadCSVGlobalAircraftType(uploadCsvHandler);

	const { refetch: refetchDownload, isLoading: isDownloading } = useDownloadCSV('global-aircraft-type', { onError });

	//DOWNLOAD
	function onDownload() {
		refetchDownload();
	}

	function onUpload(file) {
		if (file && file.length > 0) {
			const formData = new FormData();
			formData.append('file', file[0].originFileObj);
			onUploadCSV(formData);
		} else {
			console.error('No file provided for upload.');
		}
	}
	return (
		<>
			<SocketEventListener refetch={getAircraftTypeRefetch} apiName={GET_GLOBAL_AIRCRAFT_TYPE} />
			<CreateWrapper
				width="80%"
				tableComponent={
					<AircraftTypeTable
						data={data}
						createProps={createProps}
						setCreateProps={setCreateProps}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
						airlineDropdownData={airlineDropdownData}
						loading={isFetching}
					/>
				}
				data={data?.pages}
				createProps={createProps}
				setCreateProps={setCreateProps}
				label="New Aircraft Type"
				isLoading={isLoading}
				isCsvModalOpen={isCsvModalOpen}
				setIsCsvModalOpen={setIsCsvModalOpen}
			/>
		</>
	);
};

export default AircraftTypeTab;
