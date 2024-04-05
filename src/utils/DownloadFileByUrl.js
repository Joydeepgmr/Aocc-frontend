const DownloadFileByUrl = (downloadingUrl) => {
	const awbLink = `${downloadingUrl}`;
	const link = document.createElement('a');
	link.href = awbLink;
	link.download;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export default DownloadFileByUrl;
