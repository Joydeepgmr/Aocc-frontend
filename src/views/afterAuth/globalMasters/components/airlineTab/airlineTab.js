import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
	useGetGlobalAirline,
	useUploadCSVGlobalAirline,
} from '../../../../../services/globalMasters/globalMaster';
import AirlineTable from '../airlineTable/airlineTable';
import CreateWrapper from '../createWrapper/createWrapper';
import { useDownloadCSV } from '../../../../../services/SeasonalPlanServices/seasonalPlan';
import { useQueryClient } from 'react-query';
import SocketEventListener from '../../../../../socket/listner/socketListner';
import { GET_GLOBAL_AIRLINE } from '../../../../../api';

const AirlineTab = () => {
	const queryClient = useQueryClient();
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch: getGlobalAirlineRefetch } = useGetGlobalAirline({ onError });
	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });

	const uploadCsvHandler = {
		onSuccess: (data) => handleUploadCsvSuccess(data),
		onError: (error) => handleUploadCsvError(error),
	};

	const handleUploadCsvSuccess = () => {
		toast.success('CSV Uploaded Successfully');
		queryClient.invalidateQueries('global-airline');
		setIsCsvModalOpen(false);
	};

	const handleUploadCsvError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const { mutate: onUploadCSV } = useUploadCSVGlobalAirline(uploadCsvHandler);

	const { refetch, isLoading: isDownloading } = useDownloadCSV('global-airline', { onError });

	//DOWNLOAD
	function onDownload() {
		refetch();
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
			<SocketEventListener refetch={getGlobalAirlineRefetch} apiName={GET_GLOBAL_AIRLINE} />
			<CreateWrapper
				width="80%"
				tableComponent={
					<AirlineTable
						data={data}
						fetchData={fetchNextPage}
						pagination={hasNextPage}
						loading={isFetching}
						{...{ createProps, setCreateProps }}
					/>
				}
				data={data?.pages}
				createProps={createProps}
				setCreateProps={setCreateProps}
				label="New Airline"
				isLoading={isLoading}
				isCsvModalOpen={isCsvModalOpen}
				setIsCsvModalOpen={setIsCsvModalOpen}
			/>
		</>
	);
};

export default AirlineTab;
