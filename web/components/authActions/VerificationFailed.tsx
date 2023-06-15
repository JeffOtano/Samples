import { BiX } from 'react-icons/bi';
import PrimaryButton from '../shared/buttons/PrimaryButton';
import { PMLogoHeader } from '../signUp/PMLogoHeader';
import Image from 'next/image';

export const VerificationFailed = ({
    goToDashboard,
}: {
    goToDashboard: () => void;
}) => {
    return (
        <div className="flex flex-col h-screen w-screen items-center ">
            <PMLogoHeader />
            <div className="h-[120px] w-[120px] rounded-full bg-red-50 flex items-center justify-center mt-[60px]">
                <BiX className="text-red-500" size={48} />
            </div>
            <h1 className="font-semibold text-[28px] text-center leading-8 tracking-tight mt-12">
                Failed to verify email
            </h1>
            <p className="text-[15px] leading-6 text-center text-dark-300 mt-3">
                Please try again or contact{' '}
                <a
                    href="mailto:hello@pathmatch.com"
                    className="text-purple-500"
                >
                    support
                </a>
            </p>
            <PrimaryButton
                onClick={goToDashboard}
                className="flex items-center justify-center w-full max-w-[380px] mt-7"
            >
                <p className="mr-[14px]">Go to Dashboard</p>
                <Image
                    src={'/assets/icons/arrow-right-white.svg'}
                    alt="Arrow Right Icon"
                    height={12}
                    width={12}
                />
            </PrimaryButton>
        </div>
    );
};
