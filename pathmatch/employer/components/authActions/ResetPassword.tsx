import { useState } from 'react';
import { validatePassword } from '../util/validatePassword';
import InputWithMask from '../login/InputWithMask';
import { useRouter } from 'next/router';
import Spinner from '../shared/Spinner';
import AuthOuter from '../login/AuthOuter';
import CTAButton from '../shared/buttons/CTAbutton';
import { useFirebaseUserContext } from 'contexts/FirebaseUserContext';

const ResetPassword = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { oobCode } = router.query;
    const { comfirmPasswordReset } = useFirebaseUserContext();

    const handleUpdatePassword = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        const error = validatePassword(password);
        if (error) {
            setErrorMessage(error);
            return;
        } else {
            setErrorMessage('');
        }

        setIsLoading(true);

        comfirmPasswordReset(String(oobCode), password)
            .then(() => {
                router.push('/login');
            })
            .catch(() => {
                setErrorMessage('Something went wrong, please try again later');
            });

        setIsLoading(false);
    };

    return (
        <AuthOuter useLogo>
            <h1 className="w-full text-center justify-center flex text-[32px] font-semibold leading-10 tracking-[-2%] text-white-100 mt-4">
                Reset your Password
            </h1>
            <h2 className="w-full max-w-[360px] text-center justify-center flex text-[13px] leading-5 text-white-100 mb-10 mt-3">
                Passwords must: be at least 12 characters, include a capital
                letter, and contain a number or special character
            </h2>
            <InputWithMask
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputWithMask
                inputStyles="mt-4"
                maskButtonStyles="top-[30px]"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorMessage && (
                <p className="text-red-300 self-start text-sm ml-1 mt-1 text-left">
                    {errorMessage}
                </p>
            )}
            <CTAButton
                onClick={handleUpdatePassword}
                className="my-4 items-center justify-center w-full border-none hover:shadow-dark-400"
            >
                {!isLoading && 'Update Password'}
                {isLoading && <Spinner />}
            </CTAButton>
        </AuthOuter>
    );
};

export default ResetPassword;
