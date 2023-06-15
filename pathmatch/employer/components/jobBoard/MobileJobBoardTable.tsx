import { JobBoardActionMenu } from './JobBoardActionMenu';
import { JobStatusLabel } from './JobStatusLabel';
import { Job } from '../../lib/interfaces/common';
import { useRouter } from 'next/router';

export const MobileJobBoardTable = ({ jobs }: { jobs: Job[] }) => {
    const router = useRouter();

    const handleJobClick = (job: Job) => {
        router.push(`/jobs/${job.id}`);
    };

    return (
        <div className="mt-[26px]">
            <div className="text-dark-500 bg-white-100">
                {jobs.map((job, i) => (
                    <div
                        key={`mobileJobItem-${i}`}
                        className="flex justify-between items-center w-full border-t border-b border-dark-75 pt-5 pb-5 cursor-pointer px-4"
                        tabIndex={0}
                        role="button"
                        onClick={() => handleJobClick(job)}
                    >
                        <div className="flex flex-col">
                            <span className="text-[15px] font-medium text-dark-500">
                                {job.title}
                            </span>
                            <div className="flex justify-between text-dark-400 text-[11px] gap-x-4 items-center mt-2">
                                <JobStatusLabel published={job.published} />
                                <span>{job.applicant_count} Applicants</span>
                                <span>{job.match_count} Matches</span>
                            </div>
                        </div>
                        <div className="flex items-center max-h-3">
                            <JobBoardActionMenu job={job} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
