import { SubscriptionType } from 'contexts/StripeCustomerContext';
import { modalConfig } from '../modals/modalValues';
import classNames from 'classnames';
import { useGetCheckoutLink } from 'hooks/useGetCheckoutlink';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const JobCTA = () => {
    const router = useRouter();
    const checkoutLink = useGetCheckoutLink(SubscriptionType.Job);
    const jobConfig = modalConfig.job;

    return (
        <div className="flex flex-col md:flex-row flex-1 items-center flex-grow justify-center bg-dark-10 rounded-[20px]">
            <div
                className={classNames(
                    'flex items-center w-full sm:w-1/2 rounded-l-2xl py-6',
                )}
            >
                <Image
                    className="w-3/4 sm:w-full mx-auto p-3 sm:p-10 md:p-14"
                    alt="decoration"
                    src={jobConfig.heroImage}
                />
            </div>
            <div className="w-full sm:w-1/2 flex flex-col gap-3 justify-center px-5 sm:px-10 py-6">
                <div className="mb-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        {jobConfig.title}
                    </h2>
                    {jobConfig.subtitle && (
                        <h3 className="text-dark-400 text-sm mt-2">
                            {jobConfig.subtitle}
                        </h3>
                    )}
                </div>
                {jobConfig.perkHeader && (
                    <p className="text-xs text-dark-500 font-semibold">
                        {jobConfig.perkHeader}
                    </p>
                )}
                {jobConfig.perks.map((perk, idx) => (
                    <div
                        key={`${perk}-${idx}`}
                        className="flex items-center gap-2 text-sm"
                    >
                        <span className="min-w-[20px]">{perk.icon}</span>
                        {perk.text}
                    </div>
                ))}
                <button
                    type="button"
                    className="flex gap-1 items-center justify-center bg-dark-500 text-white-100 rounded-lg py-2 px-5 font-semibold w-full sm:w-max text-base mt-4"
                    onClick={() => router.push(checkoutLink)}
                >
                    {jobConfig.buttonInner}
                </button>
                {jobConfig.disclaimer && (
                    <p className="text-[10px] text-dark-200 mt-4">
                        {jobConfig.disclaimer}
                    </p>
                )}
            </div>
        </div>
    );
};
