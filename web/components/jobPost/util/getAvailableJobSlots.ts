import { Employer, Job } from '../../../lib/interfaces/common';

export function getAvailableJobSlots(employer?: Employer, jobs?: Job[]) {
    if (!employer || !jobs) {
        return 0;
    }

    const publishedJobs = jobs.filter((job) => job.published);

    return employer.job_slots - publishedJobs.length;
}
