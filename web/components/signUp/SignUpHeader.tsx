import classNames from 'classnames';
import { PMLogoHeader } from './PMLogoHeader';

export enum OnboardingSteps {
    Account = 'Account',
    VerifyEmail = 'VerifyEmail',
    Company = 'Company',
}

export const SignUpHeader = ({ step }: { step: OnboardingSteps }) => {
    return (
        <>
            <PMLogoHeader />
            {step !== OnboardingSteps.VerifyEmail && (
                <div className="flex w-full max-w-[380px] items-center mt-10 gap-x-1 justify-center">
                    <div className="border-b-[3px] py-2 flex border-green-500 justify-center items-center w-full">
                        <div className="w-3 h-3 border-[2px] border-green-500 rounded-full"></div>
                        <p className="text-dark-500 ml-3 font-medium text-[13px] leading-5">
                            Account
                        </p>
                    </div>
                    <div
                        className={classNames(
                            'border-b-[3px] py-2 flex border-dark-50 justify-center items-center w-full',
                            {
                                'border-green-500':
                                    step === OnboardingSteps.Company,
                            },
                        )}
                    >
                        <div
                            className={classNames(
                                'w-3 h-3 border-[2px] border-dark-50 rounded-full',
                                {
                                    'border-green-500':
                                        step === OnboardingSteps.Company,
                                },
                            )}
                        ></div>
                        <p className="text-dark-500 ml-3 font-medium text-[13px] leading-5">
                            Company
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
