const handleUpdatedObjects = (initialValues, values) => {
	let finalValues = {};
	let editValue = [];
	Object.keys(values).forEach((key) => {
		if (Boolean(values[key]) || Boolean(initialValues[key])) {
			if (Boolean(values[key])) {
				finalValues[key] = values[key];
			}
			editValue.push(key);
		}
	});

	finalValues = { ...finalValues, modifiedFields: editValue };
	return finalValues;
};

export default handleUpdatedObjects;
