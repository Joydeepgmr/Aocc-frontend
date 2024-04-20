const SplitTimeFromDateAndTime = (date) => {
	return date.split('T')[1].slice(0, 5);
};

export default SplitTimeFromDateAndTime;
