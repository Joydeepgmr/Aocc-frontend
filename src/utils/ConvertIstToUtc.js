import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
dayjs.extend(utcPlugin);
const ConvertIstToUtc = (dateString) => {
	const istDateTime = dayjs(dateString, 'YYYY-MM-DD');
	return istDateTime.format('YYYY-MM-DD[T]00:00:00[Z]');
};

export default ConvertIstToUtc;
