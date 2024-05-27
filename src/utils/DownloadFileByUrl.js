const DownloadFileByUrl = (downloadingUrl, fileName = 'Upload') => {
	const awbLink = `${downloadingUrl}`;
	const link = document.createElement('a');
	link.href = awbLink;
	link.setAttribute('download', fileName);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export default DownloadFileByUrl;
