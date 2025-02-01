const parseDateFromISO = (date?: string): Date | null => (date ? new Date(date) : null);

export default parseDateFromISO;
