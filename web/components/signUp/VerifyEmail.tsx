import Image from 'next/image';
import PrimaryButton from '../shared/buttons/PrimaryButton';

type VerifyEmailProps = {
    email: string;
    onSubmit: () => void;
};

export const VerifyEmail = ({ email, onSubmit }: VerifyEmailProps) => {
    return (
        <div className="w-full h-full max-w-[380px] flex flex-1 flex-col items-center justify-start mt-16 gap-y-3">
            <div className="w-[120px] h-[120px] flex items-center justify-center rounded-full bg-purple-100 mb-8">
                <Image
                    src="assets/icons/mail.svg"
                    alt="email icon"
                    width={40}
                    height={28}
                />
            </div>
            <h1 className="font-semibold text-[28px] leading-8 tracking-tight">
                Verify your email
            </h1>
            <h2 className="font-semibold text-[15px] leading-5 text-center text-dark-300">
                {`✨ Magic link sent to ${email}`}
            </h2>
            <p className="text-[15px] leading-6 text-center text-dark-300">
                We sent you a link to verify your email to publish your Company
                Profile, post jobs, and more.
            </p>
            <PrimaryButton
                onClick={onSubmit}
                className="flex w-full items-center justify-center mt-4"
            >
                <p className="mr-[14px]">Continue</p>
                <Image
                    src="assets/icons/arrow-right-white.svg"
                    alt="email icon"
                    width={12.5}
                    height={12}
                />
            </PrimaryButton>
        </div>
    );
};
