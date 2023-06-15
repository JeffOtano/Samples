import { useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { Toast } from '../shared/Toast';
import { useFirebaseUserContext } from 'contexts/FirebaseUserContext';

export const VerifyEmailCard = () => {
    const toast = useToast();
    const { firebaseUser, sendVerificationEmail } = useFirebaseUserContext();

    const handleClick = () => {
        try {
            if (firebaseUser) {
                sendVerificationEmail(firebaseUser);
                toast({
                    position: 'top-right',
                    duration: 5000,
                    render: () => (
                        <Toast
                            title="Email Sent"
                            description="Check your inbox for a verification email"
                        />
                    ),
                });
            } else {
                throw new Error('User not logged in');
            }
        } catch (e) {
            console.error(e);
            toast({
                position: 'top-right',
                duration: 5000,
                title: 'Error',
                description: 'Something went wrong. Please try again later.',
                status: 'error',
            });
        }
    };

    return (
        <div className="min-w-[264px] w-full max-w-[400px] border border-dark-25 h-56 p-7 justify-between flex items-start flex-col rounded-2xl bg-cta-gradient">
            <Image
                src={'/assets/icons/mailbox.svg'}
                alt="Verify Email Icon"
                height={48}
                width={48}
            />
            <p className="font-medium text-white-100 text-[28px] leading-9 tracking-tight">
                Verify your email address
            </p>
            <button
                type="submit"
                onClick={handleClick}
                className="text-white-100 flex items-center font-semibold text-[15px] leading-5"
            >
                <Image
                    src={'/assets/icons/mail-white.svg'}
                    alt="Verify Email Icon"
                    height={20}
                    width={20}
                />
                <p className="ml-[10px]">Resend Email</p>
            </button>
        </div>
    );
};
