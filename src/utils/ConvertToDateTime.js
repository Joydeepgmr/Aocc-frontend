import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const ConvertToDateTime = (dateString, format = 'YYYY-MM-DD') => {
    return dateString && dayjs.utc(dateString).format(format);
};

export default ConvertToDateTime;
