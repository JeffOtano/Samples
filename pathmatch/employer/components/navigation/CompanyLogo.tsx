import { useGetEmployerGlobal } from 'lib/pmBackend';
import Image from 'next/image';

const CompanyLogo = ({ styles }: { styles?: string }) => {
    const { data: globals } = useGetEmployerGlobal();
    const employer = globals?.employer;

    return (
        <div className={`w-full flex items-center ${styles}`}>
            <Image
                height="65"
                width="65"
                src={employer?.logo ?? '/images/companyDefaultLogo.png'}
                alt="Logo"
                className="rounded-xl"
            />
        </div>
    );
};

export default CompanyLogo;
