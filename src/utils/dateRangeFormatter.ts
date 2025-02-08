import { parseISO, format, getMonth, getYear } from 'date-fns';

export const formatDateRange = (startDateStr: string, endDateStr: string) => {
    // Convert strings to Date objects
    const startDate = parseISO(startDateStr);
    const endDate = parseISO(endDateStr);

    const startMonth = getMonth(startDate);
    const startYear = getYear(startDate);
    const endMonth = getMonth(endDate);
    const endYear = getYear(endDate);

    // Compare month and year
    if (startMonth === endMonth && startYear === endYear) {
        const startFormatted = format(startDate, 'MMM d');
        const endFormatted = format(endDate, 'd');
        const year = format(startDate, 'yyyy');

        return `${startFormatted}-${endFormatted}, ${year}`;
    }

    if (startYear === endYear && startMonth !== endMonth) {
        const startFormatted = format(startDate, 'MMM d');
        const endFormatted = format(endDate, 'MMM d');
        const year = format(startDate, 'yyyy');

        return `${startFormatted}-${endFormatted}, ${year}`;
    }

    if (startYear !== endYear && startMonth !== endMonth) {
        const startFormatted = format(startDate, 'MMM d, yyyy');
        const endFormatted = format(endDate, 'MMM d, yyyy');

        return `${startFormatted}-${endFormatted}`;
    }
}
