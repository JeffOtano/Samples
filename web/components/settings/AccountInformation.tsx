import { useGetEmployerGlobal } from '@/lib/pmBackend';
import SecondaryButton from '../shared/buttons/SecondaryButton';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { Toast } from '../shared/Toast';
import { useFirebaseUserContext } from 'contexts/FirebaseUserContext';
import { clientSignIn } from '@/firebase/auth';
import { useUpdateEmail } from '@/lib/auth';
import { useRouter } from 'next/router';

export const AccountInformation = () => {
    const { data: globals } = useGetEmployerGlobal();
    const { resetPassword, updateUserEmail } = useFirebaseUserContext();
    const [userPassword, setUserPassword] = useState<string>('');
    const recruiter = globals?.user;
    const [newEmail, setNewEmail] = useState<string>('');
    const toast = useToast();
    const updateEmail = useUpdateEmail();
    const router = useRouter();

    if (!recruiter) {
        return null;
    }

    const onUpdateEmail = async () => {
        try {
            const backendEmailUpdate = async () => {
                await updateEmail.mutateAsync({ newEmail });
            };
            await updateUserEmail(newEmail)
                .then(() => {
                    backendEmailUpdate();
                })
                .catch(async (e) => {
                    if (e.code === 'auth/requires-recent-login') {
                        await clientSignIn(recruiter?.email, userPassword);
                        await updateUserEmail(newEmail).then(() => {
                            backendEmailUpdate();
                        });
                    } else {
                        throw e;
                    }
                });
            toast({
                position: 'top-right',
                duration: 5000,
                render: () => (
                    <Toast
                        title="Email updated"
                        description="Your email has been updated"
                    />
                ),
            });
            router.reload();
        } catch (e) {
            console.error(e);

            toast({
                position: 'top-right',
                duration: 5000,
                status: 'error',
                title: 'Error updating email',
                description: 'Please check your password and try again',
            });
        }
    };

    const handleResetPassword = async () => {
        try {
            resetPassword();

            toast({
                position: 'top-right',
                duration: 5000,
                render: () => (
                    <Toast
                        title="Reset link sent"
                        description="Check your inbox for a link to reset your email"
                    />
                ),
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-7 bg-white-100 border max-w-[552px] rounded-[20px]">
            <h2 className="text-[20px] leading-7 font-semibold mb-5">
                Account Information
            </h2>
            <p className="font-semibold text-[13px] mb-1 leading-5 text-dark-300">
                Account Email
            </p>
            <div className="bg-dark-5 p-3 mb-4 rounded-lg border-dark-10 border">
                {recruiter?.email && (
                    <p className="text-[15px] leading-5 text-dark-200">
                        {recruiter?.email}
                    </p>
                )}
            </div>
            <p className="font-semibold text-[13px] mb-1 leading-5 text-dark-300">
                New Email
            </p>
            <input
                type="email"
                title="New email"
                onChange={(e) => setNewEmail(e.target.value)}
                className="border rounded-lg border-dark-50 p-3 mb-4 w-full"
            />
            <input
                type="password"
                title="Password"
                onChange={(e) => setUserPassword(e.target.value)}
                className="border rounded-lg border-dark-50 p-3 mb-4 w-full"
            />
            <SecondaryButton
                onClick={onUpdateEmail}
                disabled={userPassword.length < 4}
            >
                Update Email
            </SecondaryButton>
            <div className="my-10 border border-dark-25" />
            <h2 className="text-[20px] leading-7 font-semibold mb-4">
                Reset Password
            </h2>
            <p className="text-[13px] leading-5 text-dark-300 mb-4">
                Need to reset your password? Click the button below and we’ll
                email you a link to reset your password.
            </p>
            <SecondaryButton onClick={handleResetPassword}>
                Send Reset Link
            </SecondaryButton>
        </div>
    );
};
