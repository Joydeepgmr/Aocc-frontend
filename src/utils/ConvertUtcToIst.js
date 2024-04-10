import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import timezonePlugin from 'dayjs/plugin/timezone';
dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

const ConvertUtcToIst = (utcDateString, format = 'YYYY-MM-DD', tz = 'Asia/Kolkata') => {
	const utcDateTime = dayjs.utc(utcDateString);
	const istDateTime = utcDateTime.tz(tz);
	return istDateTime.format(format);
};

export default ConvertUtcToIst;
