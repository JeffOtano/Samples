import {
    SubscriptionType,
    useStripeCustomer,
} from 'contexts/StripeCustomerContext';
import axios from 'axios';
import SecondaryButton from '../shared/buttons/SecondaryButton';
import { useGetEmployerGlobal } from '@/lib/pmBackend';
import { useGetCheckoutLink } from 'hooks/useGetCheckoutlink';
import { slugToText } from '../util/slugToText';

export const MembershipSetting = () => {
    const { customer } = useStripeCustomer();
    const checkoutLink = useGetCheckoutLink(SubscriptionType.Search);
    const { data: globals } = useGetEmployerGlobal();
    const subscriptionType = customer
        ? slugToText(customer.subscriptionType)
        : 'Free';

    const onManageMembership = async () => {
        try {
            if (customer?.id) {
                const response = await axios.post(
                    '/api/stripe/billingPortal/get',
                    {
                        customerId: customer?.id,
                        returnUrl: `${window.location.origin}/settings`,
                    },
                );

                window.open(response.data.url, '_self');
            } else {
                window.open(checkoutLink, '_self');
            }
        } catch (error) {
            console.error('Failed to get billing portal link:', error);
        }
    };

    return (
        <div className="bg-white-100 flex-1 lg:ml-6 ml-0 p-7 max-w-[552px] h-fit flex flex-col border border-dark-50 rounded-[20px]">
            <h2 className="font-semibold text-[20px] leading-7">Membership</h2>
            <p className="font=medium mt-5 text-base leading-5 text-dark-300">
                {`PathMatch ${subscriptionType}`}
            </p>
            <p className="text-[13px] mt-1 leading-5 text-dark-300">
                {globals?.user?.email}
            </p>
            <SecondaryButton
                onClick={onManageMembership}
                className="w-fit mt-5 text-[13px] leading-5"
            >
                {customer?.id ? 'Manage Membership' : 'Upgrade Membership'}
            </SecondaryButton>
        </div>
    );
};
