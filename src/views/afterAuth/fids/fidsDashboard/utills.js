import dayjs from "dayjs";

export const isBeforeNow = (dateString, bufferMinutes = 10) => {
    const date = dayjs(dateString, 'YYYYMMDDHHmm');
    const nowWithBuffer = dayjs().subtract(bufferMinutes, 'minute');
    return date.isBefore(nowWithBuffer);
};
export const isAfterNow = (dateString, bufferMinutes = 10) => {
    const date = dayjs(dateString, 'YYYYMMDDHHmm');
    const nowWithBuffer = dayjs().add(bufferMinutes, 'minute');
    return date.isAfter(nowWithBuffer);
};