import dayjs from "dayjs";

export const isBeforeNow = (dateString, bufferMinutes = 10) => {
    const date = dayjs(dateString, 'YYYYMMDDHHmm');
    const nowWithBuffer = dayjs().subtract(bufferMinutes, 'minute');
    console.log('first', dateString, date.isBefore(nowWithBuffer))
    return date.isBefore(nowWithBuffer);
};
export const isAfterNow = (dateString, bufferMinutes = 10) => {
    const date = dayjs(dateString, 'YYYYMMDDHHmm');
    const nowWithBuffer = dayjs().add(bufferMinutes, 'minute');
    console.log('first second', dateString, date.isAfter(nowWithBuffer))
    return date.isAfter(nowWithBuffer);
};