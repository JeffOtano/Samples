import Image from 'next/image';
import { useStripeCustomer } from 'contexts/StripeCustomerContext';
import SecondaryButton from '@/components/shared/buttons/SecondaryButton';
import { useRouter } from 'next/router';
import { Job } from '@/lib/interfaces/common';
import { useGetJobs } from '@/lib/pmBackend';

export const JobBoardEmpty = () => {
    const { customer } = useStripeCustomer();
    const { data: jobs } = useGetJobs();
    const router = useRouter();

    const availableJobSlots =
        (customer?.jobPostQuantity || 0) -
        (jobs?.filter((job: Job) => job.published === true).length || 0);

    const navigateToNewJobPost = () => {
        router.push('/job-post/new');
    };

    return (
        <div className="flex flex-col items-center justify-center h-[416px] bg-dark-10 rounded-[20px]">
            <div className="rounded-full bg-dark-25 p-7 mb-5">
                <Image
                    alt="Job Board Illustration"
                    src="/assets/icons/briefcase-grey.svg"
                    width={40}
                    height={36}
                />
            </div>
            <p className="text-dark-300 text-[20px] leading-7 text-center font-semibold mb-1">
                {"You haven't posted any Jobs"}
            </p>
            <p className="text-dark-300 text-[13px] leading-5 mb-5">
                {`You have ${availableJobSlots} Job Posts Remaining`}
            </p>
            <SecondaryButton
                onClick={navigateToNewJobPost}
                className="flex items-center justify-center h-fit"
            >
                <Image
                    alt="Plus Icon"
                    src="/assets/icons/plus-black.svg"
                    width={12}
                    height={12}
                />
                <p className="ml-[14px]">New Job Post</p>
            </SecondaryButton>
        </div>
    );
};
