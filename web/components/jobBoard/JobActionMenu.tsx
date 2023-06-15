import { useRouter } from 'next/router';
import { Job } from '../../lib/interfaces/common';
import Image from 'next/image';
import { useUpdateJob, useGetJobs } from '@/lib/pmBackend';
import { useStripeCustomer } from 'contexts/StripeCustomerContext';
import { AnalyticsEvent, useAnalytics } from 'contexts/AnalyticsContext';
import SecondaryButton from '../shared/buttons/SecondaryButton';
import { useRef, useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { AiOutlineEye } from 'react-icons/ai';
import { RxEyeClosed } from 'react-icons/rx';
import { BsLink45Deg } from 'react-icons/bs';
import { useToast } from '@chakra-ui/react';
import { getJobPublicLink } from '../util/getJobPublicLink';
import { Toast } from '../shared/Toast';

export const JobActionMenu = ({ job }: { job: Job }) => {
    const router = useRouter();
    const analytics = useAnalytics();
    const updateJob = useUpdateJob();
    const { customer } = useStripeCustomer();
    const { data: jobs } = useGetJobs();
    const [showOptions, setShowOptions] = useState(false);
    const publicLink = getJobPublicLink(job.id);
    const toast = useToast();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const blurTimeout = useRef(
        setTimeout(() => {
            return;
        }, 0),
    );

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

    const onCopyPublicLink = () => {
        navigator.clipboard.writeText(publicLink);
        toast({
            position: 'top-right',
            duration: 3000,
            render: () => (
                <Toast
                    title="Copied to clipboard"
                    description="Job public link copied to your clipboard"
                />
            ),
        });
        setShowOptions(false);
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

    const handleBlur = () => {
        blurTimeout.current = setTimeout(() => setShowOptions(false), 100);
    };

    const handleFocus = () => {
        clearTimeout(blurTimeout.current);
    };

    return (
        <button
            type="button"
            tabIndex={0}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className="flex relative w-full sm:w-fit"
        >
            <SecondaryButton
                type="button"
                title="Actions Menu"
                className="flex items-center justify-center w-full"
                ref={buttonRef}
                onClick={() => {
                    setShowOptions(!showOptions);
                    buttonRef?.current?.focus();
                }}
            >
                <p className="font-semibold text-base leading-5 text-dark-400 mr-3">
                    Job Menu
                </p>
                <Image
                    alt="Actions Menu"
                    src={
                        showOptions
                            ? '/assets/icons/arrow-up.svg'
                            : '/assets/icons/arrow-down-thin.svg'
                    }
                    width={10}
                    height={6}
                />
            </SecondaryButton>

            {showOptions && (
                <div className="flex rounded-xl flex-col w-full sm:w-max top-full mt-2 left-0 z-10 border absolute shadow-lg bg-white-100">
                    <button
                        type="button"
                        onClick={onCopyPublicLink}
                        className="flex p-2 items-center rounded-t-xl hover:text-purple-500 hover:bg-purple-10"
                    >
                        <BsLink45Deg />
                        <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                            Copy Public Link
                        </p>
                    </button>
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="flex p-2 items-center hover:text-purple-500 hover:bg-purple-10"
                    >
                        <TiPencil />
                        <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                            Edit Post
                        </p>
                    </button>
                    {hasAvailableJobSlots && !job.published && (
                        <button
                            type="button"
                            onClick={handlePublishStateChange}
                            className="flex p-2 items-center rounded-b-xl hover:text-purple-500 hover:bg-purple-10"
                        >
                            <AiOutlineEye />
                            <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                                Publish
                            </p>
                        </button>
                    )}
                    {job.published && (
                        <button
                            type="button"
                            onClick={handlePublishStateChange}
                            className="flex p-2 items-center rounded-b-xl hover:text-purple-500 hover:bg-purple-10"
                        >
                            <RxEyeClosed />
                            <p className="text-left text-[13px] ml-2 leading-5 font-medium">
                                Unpublish
                            </p>
                        </button>
                    )}
                </div>
            )}
        </button>
    );
};
