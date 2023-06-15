import { NavLinks } from './NavLinks';
import { NavButton } from './NavButton';
import CompanyLogo from './CompanyLogo';
import Image from 'next/image';
import { useGetEmployerGlobal } from '@/lib/pmBackend';

const DesktopNav = () => {
    const { data: globals } = useGetEmployerGlobal();
    const employer = globals?.employer;
    const recruiter = globals?.user;

    return (
        <div className="min-w-[324px] justify-between bg-white-100 flex-col hidden h-full border-r border-r-dark-25 lg:flex">
            <div className="bg-white-100 p-8 flex-col">
                <CompanyLogo />
                <div className="mt-5">
                    {Object.entries(NavLinks).map(([key, value]) => {
                        return (
                            <div key={key} className="my-1">
                                <NavButton
                                    link={value.link}
                                    text={value.text}
                                    icon={value.icon}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div
                className={`w-full p-4 mb-1 flex border-t h-[100px] border-dark-50 items-center `}
            >
                <Image
                    height="48"
                    width="48"
                    src={
                        recruiter?.photoURL ?? '/images/companyDefaultLogo.png'
                    }
                    alt="Logo"
                    className="rounded-full"
                />
                <div className="flex flex-col ml-3">
                    <h3 className="font-semibold text-[15px] text-dark-500 leading-5">
                        {`${recruiter?.first_name} ${recruiter?.last_name.slice(
                            0,
                            1,
                        )}.`}
                    </h3>
                    <p className="font-medium text-[11px] leading-4 text-dark-300">
                        {employer?.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DesktopNav;
