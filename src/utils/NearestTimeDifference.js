const getNearestTimeDifference = (dateString) => {
    const targetDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInMilliseconds = Math.abs(currentDate - targetDate);
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Approximate, might not be accurate for all cases
    const years = Math.floor(days / 365); // Approximate, might not be accurate for all cases

    const units = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
    const values = [years, months, weeks, days, hours, minutes, seconds];

    let nearestUnit = null;
    let unitIndex = -1;

    for (let i = 0; i < values.length; i++) {
        if (values[i] > 0) {
            nearestUnit = values[i];
            unitIndex = i;
            break;
        }
    }

    if (nearestUnit !== null) {
        return { value: nearestUnit, unit: units[unitIndex] };
    } else {
        // If all units are zero, return the smallest unit (seconds)
        return { value: seconds, unit: 'seconds' };
    }
}

export default getNearestTimeDifference;