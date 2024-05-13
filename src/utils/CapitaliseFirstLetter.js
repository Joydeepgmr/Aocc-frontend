const CapitaliseFirstLetter = (value) => {
	const finalValues = value ? value?.charAt(0)?.toUpperCase() + value?.slice(1) : null;
	return finalValues;
};

export default CapitaliseFirstLetter;
