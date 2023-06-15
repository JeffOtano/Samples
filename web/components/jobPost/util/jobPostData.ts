export const jobCommitmentOptions = [
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
];

export const jobTypeOptions = [
    { value: 'JOB', label: 'Job' },
    { value: 'INTERNSHIP', label: 'Internship' },
];

export const months = [
    { value: 'ASAP', label: 'As soon as possible' },
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
];

export const gpaOptions = [
    { label: 'None', value: 0 },
    { label: '2.5-3.0', value: 2.5 },
    { label: '3.0-3.5', value: 3 },
    { label: '3.5-4.0', value: 3.5 },
];

const currentYear = new Date().getFullYear();
export const years = [
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
];

export const yearsSelectData = years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
}));

export const compensationOptions = [
    { value: '15-17', label: '$15-17/hr' },
    { value: '17-20', label: '$17-20/hr' },
    { value: '20-22', label: '$20-22/hr' },
    { value: '22-25', label: '$22-25/hr' },
    { value: '25-27', label: '$25-27/hr' },
    { value: '30+', label: '$30/hr+' },
];
