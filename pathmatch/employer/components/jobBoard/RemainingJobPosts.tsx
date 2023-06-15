import { useGetJobs } from '@/lib/pmBackend';
import classNames from 'classnames';
import {
    useStripeCustomer,
    SubscriptionType,
} from 'contexts/StripeCustomerContext';
import { useGetCheckoutLink } from 'hooks/useGetCheckoutlink';
import Link from 'next/link';

export const RemainingJobPosts = () => {
    const { customer } = useStripeCustomer();
    const { data: jobs } = useGetJobs();

    const checkoutLink = useGetCheckoutLink(SubscriptionType.Job);
    const jobPostQuantity = customer?.jobPostQuantity || 0;

    const availableJobSlots = jobs
        ? jobPostQuantity - jobs?.filter((job) => job.published === true).length
        : jobPostQuantity;

    const remainingPostsCopy =
        availableJobSlots > 0
            ? `${availableJobSlots}/${jobPostQuantity} Job Posts Remaining`
            : '0 Job Posts Remaining';
    return (
        <>
            <p
                className={classNames(
                    'text-dark-300 text-[11px] leading-4 min-w-max',
                    {
                        'text-red-600 bg-red-50 border border-red-200 rounded-sm py-[2px] px-1':
                            availableJobSlots < 1,
                    },
                )}
            >
                {remainingPostsCopy}
            </p>
            <Link
                href={checkoutLink}
                className="text-purple-500 text-[11px] leading-4 cursor-pointer font-semibold"
            >
                Buy more
            </Link>
        </>
    );
};
