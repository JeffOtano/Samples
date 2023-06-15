import { useGetJobs } from '@/lib/pmBackend';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import SecondaryButton from '../shared/buttons/SecondaryButton';
import { JobDashboardItem } from './JobDashboardItem';
import { RemainingJobPosts } from '../jobBoard/RemainingJobPosts';

export const JobDashboard = () => {
    const router = useRouter();
    const { data: jobs } = useGetJobs();

    if (!jobs) return null;

    const sortedJobs = jobs.sort((a, b) => {
        if (a.published && !b.published) return -1;
        if (!a.published && b.published) return 1;
        return 0;
    });

    return (
        <div className="flex flex-col flex-1 justify-center">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg leading-6">Job Posts</h3>
                <div className="flex gap-x-2 items-center">
                    <RemainingJobPosts />
                </div>
            </div>

            <div
                className={classNames(
                    'border flex flex-col border-dark-25 mb-10 lg:mb-0 rounded-lg w-full h-full',
                    {
                        'bg-dark-10': jobs.length === 0,
                    },
                    {
                        'bg-white-100': jobs.length > 0,
                    },
                )}
            >
                {sortedJobs.slice(0, 7).map((job, i) => {
                    return (
                        <div
                            key={job.id}
                            className={classNames(
                                'p-[14px] border-b flex w-full min-h-[80px]',
                                {
                                    'border-none': i > 5,
                                },
                            )}
                        >
                            <JobDashboardItem job={job} />
                        </div>
                    );
                })}
                {jobs.length < 7 && (
                    <div className="flex items-center min-h-[136px] justify-center h-full">
                        <SecondaryButton
                            onClick={() => router.push('/job-post/new')}
                            className="h-fit"
                        >
                            + New Job Post
                        </SecondaryButton>
                    </div>
                )}
            </div>
        </div>
    );
};
