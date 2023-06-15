import { useRouter } from 'next/router';
import PrimaryButton from '../shared/buttons/PrimaryButton';
import { PMLogoHeader } from '../signUp/PMLogoHeader';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { VerificationFailed } from './VerificationFailed';
import Spinner from '../shared/Spinner';
import { useFirebaseUserContext } from 'contexts/FirebaseUserContext';

export const VerificationConfirmed = () => {
    const router = useRouter();
    const [verifying, setVerifying] = useState(false);
    const [failedToVerify, setFailedToVerify] = useState(false);
    const { verifyEmail, reloadUser } = useFirebaseUserContext();
    const { oobCode } = router.query;

    useEffect(() => {
        setVerifying(true);
        if (oobCode && typeof oobCode === 'string') {
            verifyEmail(oobCode)
                .then(() => {
                    setVerifying(false);
                })
                .catch(() => {
                    setVerifying(false);
                    setFailedToVerify(true);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oobCode, setVerifying]);

    const goToDashboard = async () => {
        await reloadUser();
        router.push('/');
    };

    if (failedToVerify) {
        return <VerificationFailed goToDashboard={goToDashboard} />;
    }

    return (
        <div className="flex flex-col h-screen w-screen items-center ">
            <PMLogoHeader />
            {verifying && (
                <div className="flex items-center h-[50vh] justify-center">
                    <Spinner />
                </div>
            )}
            {!verifying && (
                <>
                    <div className="h-[120px] w-[120px] rounded-full bg-green-50 flex items-center justify-center mt-[60px]">
                        <Image
                            alt="Email Sent"
                            src="/assets/icons/checkmark-green.svg"
                            className="m-1"
                            width={28}
                            height={12}
                        />
                    </div>
                    <h1 className="font-semibold text-[28px] text-center leading-8 tracking-tight mt-12">
                        Your email has been verified
                    </h1>
                    <p className="text-[15px] leading-6 text-center text-dark-300 mt-3">
                        Thanks for helping us fight spam. Enjoy Pathmatch 😄
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
                </>
            )}
        </div>
    );
};
