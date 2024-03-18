import dayjs from 'dayjs';
import timezonePlugin from 'dayjs/plugin/timezone';
import ConvertUtcToIst from '../ConvertUtcToIst/ConvertUtcToIst';

const CombineUtcDateAndIstTime = (utcDateString, istTimeString) => {
	const istDate = ConvertUtcToIst(utcDateString, 'YYYY-MM-DD');

	const istDateTime = `${istDate} ${istTimeString}`;

	const utcDateTime = dayjs(istDateTime, 'YYYY-MM-DD HH:mm:ss').utc().format();

	return utcDateTime;
};

export default CombineUtcDateAndIstTime;
