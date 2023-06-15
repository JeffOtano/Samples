import Image from 'next/image';
import { useRouter } from 'next/router';

export const PMLogoHeader = () => {
    const router = useRouter();

    const navigateToHome = () => {
        router.push('/');
    };

    return (
        <div
            onClick={navigateToHome}
            className="flex w-full justify-center items-center cursor-pointer mt-10 lg:mt-20"
        >
            <Image
                width={30}
                height={30}
                alt="PathMatch Logo"
                src="assets/pm-logo-black.svg"
            />
            <Image
                width={140}
                height={30}
                className="ml-2"
                alt="PathMatch Text"
                src="assets/pm-text-black.svg"
            />
        </div>
    );
};
