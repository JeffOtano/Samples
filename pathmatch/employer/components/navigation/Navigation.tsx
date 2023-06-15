import { useGetEmployerGlobal } from '../../lib/pmBackend';
import { isLoggedIn } from '../../lib/apiHost';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Navigation({ ...props }) {
    const router = useRouter();
    const { data: globals } = useGetEmployerGlobal();
    const employer = globals?.employer;
    const recruiter = globals?.user;

    useEffect(() => {
        if (isLoggedIn() === false) {
            router.push('/login');
        }
    });

    if (!employer || !recruiter) {
        return <></>;
    }

    return (
        <div
            id="authenticatedPage"
            className="h-screen w-screen flex flex-col lg:flex-row"
        >
            <DesktopNav />
            <MobileNav />
            <div className="flex w-full" {...props} />
        </div>
    );
}
