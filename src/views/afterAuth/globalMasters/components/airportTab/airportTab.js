import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetGlobalAirport, useTimezoneDropdown, useUploadCSVGlobalAirport } from '../../../../../services/globalMasters/globalMaster';
import AirportTable from '../airportTable/airportTable';
import CreateWrapper from '../createWrapper/createWrapper';
import { useQueryClient } from 'react-query';
import { useDownloadCSV } from '../../../../../services/SeasonalPlanServices/seasonalPlan';

const AirportTab = () => {
	const queryClient = useQueryClient();
	const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

	const onError = ({
		response: {
			data: { message },
		},
	}) => toast.error(message);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useGetGlobalAirport({ onError });
	const { data: timezoneDropdown = [] } = useTimezoneDropdown({ onError });
	const [createProps, setCreateProps] = useState({ new: false, onUpload, onDownload });
	const uploadCsvHandler = {
		onSuccess: (data) => handleUploadCsvSuccess(data),
		onError: (error) => handleUploadCsvError(error),
	};

	const handleUploadCsvSuccess = () => {
		toast.success('CSV Uploaded Successfully');
		queryClient.invalidateQueries('global-airport');
		setIsCsvModalOpen(false);
	};

	const handleUploadCsvError = (error) => {
		toast.error(error?.response?.data?.message);
	};

	const { mutate: onUploadCSV } = useUploadCSVGlobalAirport(uploadCsvHandler);

	const { refetch, isLoading: isDownloading } = useDownloadCSV('global-airport', { onError });

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
				<AirportTable
					data={data}
					createProps={createProps}
					setCreateProps={setCreateProps}
					fetchData={fetchNextPage}
					pagination={hasNextPage}
					loading={isFetching}
				/>
			}
			data={data?.pages}
			createProps={createProps}
			setCreateProps={setCreateProps}
			label="New Airport"
			isLoading={isLoading}
			isCsvModalOpen={isCsvModalOpen}
			setIsCsvModalOpen={setIsCsvModalOpen}
		/>
	);
};

export default AirportTab;
