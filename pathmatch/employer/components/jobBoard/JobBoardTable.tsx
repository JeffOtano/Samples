import { JobBoardActionMenu } from './JobBoardActionMenu';
import { JobStatusLabel } from './JobStatusLabel';
import { Job } from '../../lib/interfaces/common';
import classNames from 'classnames';
import { useRouter } from 'next/router';

export const JobBoardTable = ({ jobs }: { jobs: Job[] }) => {
    const router = useRouter();

    const handleJobClick = (job: Job) => {
        router.push(`/jobs/${job.id}`);
    };

    return (
        <div className="border rounded-xl mt-[26px]">
            <table className="w-full text-left rounded-xl">
                <thead>
                    <tr className="h-10 bg-white-100 border-b text-dark-400 font-semibold text-[11px] leading-[16px]">
                        <th className="pl-3 rounded-tl-xl">Job Post</th>
                        <th>Applicants</th>
                        <th>Matches</th>
                        <th>Status</th>
                        <th className="rounded-tr-xl">{''}</th>
                    </tr>
                </thead>
                <tbody className="text-dark-500 bg-white-100 rounded-b-xl">
                    {jobs.map((job, i) => (
                        <tr key={job.id + i} className="h-[60px]">
                            <td
                                onClick={() => handleJobClick(job)}
                                className={classNames(
                                    'pl-3 text-[15px] text-dark-500 font-medium leading-5 cursor-pointer',
                                    {
                                        'rounded-bl-xl': i === jobs.length - 1,
                                    },
                                )}
                            >
                                {job.title}
                            </td>
                            <td className="text-[13px] text-dark-400 leading-5">
                                {job.applicant_count}
                            </td>
                            <td className="text-[13px] text-dark-400 leading-5">
                                {job.match_count}
                            </td>
                            <td>
                                <JobStatusLabel published={job.published} />
                            </td>
                            <td
                                className={classNames({
                                    'rounded-br-xl': i === jobs.length - 1,
                                })}
                            >
                                <JobBoardActionMenu job={job} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
