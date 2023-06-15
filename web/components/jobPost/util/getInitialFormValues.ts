import { Job } from '../../../lib/interfaces/common';
import {
    descriptionOfOpportunity,
    requirementForRoles,
} from '../../constants/jobs.constants';
import { JobPostFormValues } from '../JobPostForm';

const initialValues: JobPostFormValues = {
    compensation: [],
    description: descriptionOfOpportunity,
    gpa: 0,
    graduationDates: [],
    jobRole: '',
    locations: [],
    positionTitle: '',
    requirements: requirementForRoles,
    published: false,
    commitment: 'FULL_TIME',
    jobType: 'JOB',
    month: 'ASAP',
    year: '',
    degrees: [],
    sponsorshipAvailable: 'No',
};

export const getInitialFormValues = (job?: Job): JobPostFormValues => {
    if (!job) {
        return initialValues;
    }

    const jobLocations = job.locations.map((location) => {
        const multiWordLocation = location.split(' ');
        if (multiWordLocation.length > 1) {
            return multiWordLocation
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }

        return location.charAt(0).toUpperCase() + location.slice(1);
    });

    return {
        compensation: job.compensation,
        description: job.description,
        gpa: job.desired_gpa ?? 0,
        graduationDates: job.who_should_apply,
        jobRole: job.category,
        locations: jobLocations,
        positionTitle: job.title,
        requirements: job.requirements ?? '',
        published: job.published,
        degrees: job.degrees,
        sponsorshipAvailable: job.visa_sponsorship ? 'Yes' : 'No',
        commitment: job.types?.[0]?.split('-')[0],
        jobType: job.types?.[0]?.split('-')[1],
        month: job.types?.[0]?.split('-')[2],
        year: job.types?.[0]?.split('-')[3],
    };
};
