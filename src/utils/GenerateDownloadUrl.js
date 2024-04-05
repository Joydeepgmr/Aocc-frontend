const GenerateDownloadUrl = (csvData) => {
	// Convert CSV string to Blob
	const csvToBlob = (csvData) => {
		return new Blob([csvData], { type: 'text/csv' });
	};

	// Convert Blob to URL
	const blobToUrl = (blob) => {
		return URL.createObjectURL(blob);
	};

	// Generate download URL
	const blob = csvToBlob(csvData);
	return blobToUrl(blob);
};

export default GenerateDownloadUrl;
