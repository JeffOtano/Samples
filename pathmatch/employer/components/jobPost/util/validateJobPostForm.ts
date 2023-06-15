import { JobPostFormValues } from '../JobPostForm';

type Month =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

const monthToIndexMap: Record<Month, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
};

export const validateJobPostForm = (values: JobPostFormValues) => {
    const errors: {
        positionTitle?: string;
        enrollmentType?: string;
        jobRole?: string;
        graduationDates?: string;
        description?: string;
        requirements?: string;
        locations?: string;
        degrees?: string;
        compensation?: string;
        month?: string;
        year?: string;
        sponsorshipAvailable?: string;
    } = {};
    if (!values.positionTitle) {
        errors.positionTitle = 'This field is required';
    }

    if (values.positionTitle && values.positionTitle.length > 100) {
        errors.positionTitle = 'Must be under 100 characters';
    }

    if (!values.jobRole) {
        errors.jobRole = 'This field is required';
    }

    if (values.graduationDates.length === 0) {
        errors.graduationDates = 'This field is required';
    }

    if (!values.description) {
        errors.description = 'This field is required';
    }

    if (!values.requirements) {
        errors.requirements = 'This field is required';
    }

    if (values.locations.length === 0) {
        errors.locations = 'This field is required';
    }

    if (values.degrees.length === 0) {
        errors.degrees = 'This field is required';
    }

    if (values.compensation.length === 0) {
        errors.compensation = 'This field is required';
    }

    if (!values.month) {
        errors.compensation = 'Start month is required.';
    }

    if (values.month !== 'ASAP' && !values.year) {
        errors.year = 'Start year is required';
    }

    if (values.month !== 'ASAP' && values.year) {
        if (values.month in monthToIndexMap) {
            const selectedDate = new Date(
                parseInt(values.year),
                monthToIndexMap[values.month as Month],
            );
            const currentDate = new Date();
            currentDate.setDate(1);
            currentDate.setHours(0, 0, 0, 0);

            if (selectedDate < currentDate) {
                errors.month = 'Start date must be in the present or future';
                errors.year = ' ';
            }
        }
    }

    if (!values.sponsorshipAvailable) {
        errors.sponsorshipAvailable = 'This field is required';
    }

    return errors;
};
