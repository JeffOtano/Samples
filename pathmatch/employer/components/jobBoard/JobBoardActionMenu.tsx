import { Popover, PopoverTrigger, PopoverContent } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Job } from '../../lib/interfaces/common';
import Image from 'next/image';
import { useUpdateJob, useGetJobs } from '@/lib/pmBackend';
import { useStripeCustomer } from 'contexts/StripeCustomerContext';
import { AnalyticsEvent, useAnalytics } from 'contexts/AnalyticsContext';
import { getJobPublicLink } from '../util/getJobPublicLink';

export const JobBoardActionMenu = ({ job }: { job: Job }) => {
    const router = useRouter();
    const analytics = useAnalytics();
    const updateJob = useUpdateJob();
    const { customer } = useStripeCustomer();
    const { data: jobs } = useGetJobs();
    const jobPublicLink = getJobPublicLink(job.id);

    if (!jobs) return null;

    const availableJobSlots =
        (customer?.jobPostQuantity || 0) -
        jobs?.filter((job) => job.published === true).length;

    const hasAvailableJobSlots =
        availableJobSlots <= (customer?.jobPostQuantity || 0) &&
        availableJobSlots > 0;

    const handleEdit = () => {
        analytics.event(AnalyticsEvent.JOB_POST_EDIT);
        router.push(`/job-post/${job.id}`);
    };

    const handleView = () => {
        window.open(jobPublicLink, '_blank');
    };

    const handlePublishStateChange = () => {
        updateJob.mutate({
            payload: {
                ...job,
                requirements: job.requirements || '',
                published: !job.published,
            },
            id: job.id,
        });
    };

    return (
        <Popover closeOnBlur closeOnEsc>
            <PopoverTrigger>
                <button
                    type="button"
                    title="Actions Menu"
                    className="flex mx-1 items-center border border-gray-50 px-[6px] py-3 rounded-lg"
                >
                    <Image
                        alt="Actions Menu"
                        src="/assets/icons/three-dots.svg"
                        width={16}
                        height={16}
                    />
                </button>
            </PopoverTrigger>
            <PopoverContent maxW={160}>
                <div className="flex flex-col p-2">
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="py-2 flex items-center"
                    >
                        <Image
                            alt="Edit Post"
                            src={'/assets/icons/pencil-black.svg'}
                            width={16}
                            height={16}
                        />
                        <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                            Edit Post
                        </p>
                    </button>
                    {hasAvailableJobSlots && !job.published && (
                        <button
                            type="button"
                            onClick={handlePublishStateChange}
                            className="py-2 flex items-center"
                        >
                            <Image
                                alt="Publish Post"
                                src={'/assets/icons/publish.svg'}
                                width={16}
                                height={16}
                            />
                            <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                                Publish
                            </p>
                        </button>
                    )}
                    {job.published && (
                        <button
                            type="button"
                            onClick={handlePublishStateChange}
                            className="py-2 flex items-center"
                        >
                            <Image
                                alt="Unpublish Post"
                                src={'/assets/icons/unpublish.svg'}
                                width={16}
                                height={16}
                            />
                            <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                                Unpublish
                            </p>
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleView}
                        className="py-2 flex items-center"
                    >
                        <Image
                            alt="View Post"
                            src={'/assets/icons/arrow-top-right.svg'}
                            width={12}
                            height={12}
                        />
                        <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                            View Post
                        </p>
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
