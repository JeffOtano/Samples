import { SubscriptionType } from 'contexts/StripeCustomerContext';
import { useGetCheckoutLink } from 'hooks/useGetCheckoutlink';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const NavUpgradeCallout = ({
    isJobUpgrade,
}: {
    isJobUpgrade?: boolean;
}) => {
    const router = useRouter();
    const checkoutLink = useGetCheckoutLink(SubscriptionType.Search);

    const handleUpgradeClick = () => {
        router.push(checkoutLink);
    };

    return (
        <div className="border border-purple-100 bg-purple-10 mt-3 sm:mt-0 flex items-center justify-center rounded-lg p-4 gap-x-2">
            <Image
                alt="Clock icon"
                height={16}
                width={16}
                src={'/assets/icons/clock.svg'}
            />
            <p className="text-[11px] leading-4 font-medium text-dark-500 min-w-max">
                {isJobUpgrade
                    ? 'Search thousands of candidates to find the perfect hire'
                    : 'You’re on the free version of PathMatch'}
            </p>
            <button
                type="button"
                onClick={handleUpgradeClick}
                className="text-[11px] leading-4 font-semibold min-w-max"
            >
                Upgrade Now
            </button>
        </div>
    );
};
