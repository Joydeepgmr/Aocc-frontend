import dayjs from 'dayjs';
const ConvertToDateTime = (dateString, format = 'YYYY-MM-DD') => {
    return dateString && dayjs(dateString).format(format);
};

export default ConvertToDateTime;
