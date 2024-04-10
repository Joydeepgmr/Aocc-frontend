import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
	useCountriesDropdown,
	useGetGlobalAirline,
	useGlobalAirportDropdown,
	useUploadCSVGlobalAirline,
} from '../../../../../services/globalMasters/globalMaster';
import AirlineTable from '../airlineTable/airlineTable';
import CreateWrapper from '../createWrapper/createWrapper';
import { useDownloadCSV } from '../../../../../services/SeasonalPlanServices/seasonalPlan';
import { useQueryClient } from 'react-query';

const AirlineTab = () => {
	const queryClient = useQueryClient();
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data: countryDropdownData = [] } = useCountriesDropdown({ onError });
	const { data: airportDropdownData = [] } = useGlobalAirportDropdown({ onError });
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useGetGlobalAirline({ onError });
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
		<CreateWrapper
			width="80%"
			tableComponent={
				<AirlineTable
					data={data}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isFetching}
					{...{ createProps, setCreateProps, countryDropdownData, airportDropdownData }}
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
	);
};

export default AirlineTab;
