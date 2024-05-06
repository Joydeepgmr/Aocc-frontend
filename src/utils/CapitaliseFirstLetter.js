const CapitaliseFirstLetter = (value) => {
	const finalValues = value?.charAt(0)?.toUpperCase() + value?.slice(1);
	return finalValues;
};

export default CapitaliseFirstLetter;
