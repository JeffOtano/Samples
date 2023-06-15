import { useState } from 'react';
import PrimaryButton from '../shared/buttons/PrimaryButton';
import SecondaryButton from '../shared/buttons/SecondaryButton';
import { useGetCheckoutLink } from 'hooks/useGetCheckoutlink';
import { SubscriptionType } from 'contexts/StripeCustomerContext';
import { useRouter } from 'next/router';
import SubscriptionModal from '../modals/SubscriptionModal';

export const UpgradeCallout = () => {
    const router = useRouter();
    const checkoutLink = useGetCheckoutLink(SubscriptionType.Search);
    const [isCalloutOpen, setIsCalloutOpen] = useState<boolean>(false);

    const handleUpgradeClick = () => {
        router.push(checkoutLink);
    };

    return (
        <div className="flex px-[30px] py-[35px] flex-1 justify-between bg-white-100 border border-dark-25 rounded-[20px]">
            <div className="flex flex-col">
                <h2 className="font-semibold text-2xl leading-7">
                    Find the perfect candidate fast
                </h2>
                <p className="text-[13px] leading-5 font-normal text-dark-300">
                    Unlimited candidate searches, unlimited potential.
                </p>
            </div>
            {isCalloutOpen && (
                <SubscriptionModal
                    modalType="search"
                    onCloseCallback={() => setIsCalloutOpen(false)}
                    actionClickCallback={handleUpgradeClick}
                />
            )}
            <div className="flex gap-x-3 min-w-max">
                <SecondaryButton
                    onClick={() => setIsCalloutOpen(!isCalloutOpen)}
                >
                    Learn More
                </SecondaryButton>
                <PrimaryButton
                    onClick={handleUpgradeClick}
                    className="flex min-w-max"
                >
                    Upgrade Now
                </PrimaryButton>
            </div>
        </div>
    );
};
