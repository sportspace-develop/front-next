const formatDateToISO = (date: Date | null): string => (date ? date.toISOString() : '');

export default formatDateToISO;
