import { JobInput } from '../../../lib/interfaces/common';
import { JobPostFormValues } from '../JobPostForm';

export const formatCreateJobPayload = (values: JobPostFormValues): JobInput => {
    const jobType = `${values.commitment}-${values.jobType}-${values.month}-${values.year}`;

    return {
        title: values.positionTitle,
        description: values.description,
        category: values.jobRole,
        types: [jobType],
        visa_sponsorship: values.sponsorshipAvailable === 'Yes',
        who_should_apply: values.graduationDates,
        requirements: values.requirements,
        compensation: values.compensation,
        desired_gpa: values.gpa,
        published: values.published,
        locations: values.locations,
        degrees: values.degrees,
    };
};
