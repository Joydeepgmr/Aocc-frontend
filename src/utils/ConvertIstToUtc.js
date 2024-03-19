import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
dayjs.extend(utcPlugin);
const ConvertIstToUtc = (dateString) => {
	const istDateTime = dayjs(dateString).utcOffset('+05:30');

	const utcDateTime = istDateTime.utc();

	return utcDateTime.format();
};

export default ConvertIstToUtc;
