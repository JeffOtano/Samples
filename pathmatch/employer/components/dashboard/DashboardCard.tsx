import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiRightArrowAlt } from 'react-icons/bi';

export type DashboardCardProps = {
    image: string;
    label: string;
    buttonLabel: string;
    route: string;
};

export const DashboardCard = ({
    label,
    image,
    buttonLabel,
    route,
}: DashboardCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(route);
    };

    return (
        <div className="min-w-[232px] w-full max-w-[264px] border border-dark-25 h-56 p-7 justify-between  flex items-start flex-col rounded-2xl bg-white-100">
            <Image src={image} alt="Dashboard Card" height={48} width={48} />
            <p className="font-medium text-dark-500 text-[18px] leading-6">
                {label}
            </p>
            <button
                type="submit"
                onClick={handleClick}
                className="text-purple-500 flex items-center font-semibold text-[15px] leading-5"
            >
                <p>{buttonLabel}</p>
                <BiRightArrowAlt size={20} className="ml-1" />
            </button>
        </div>
    );
};
