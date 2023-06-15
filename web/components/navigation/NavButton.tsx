import { useRouter } from 'next/router';
import classNames from 'classnames';

export function NavButton({
    link,
    text,
    icon,
    onClick,
}: {
    link: string;
    text: string;
    icon?: JSX.Element;
    onClick?: () => void;
}) {
    const router = useRouter();
    const isActive = router.pathname === link;

    const handleNavigation = () => {
        if (onClick) {
            onClick();
        }
        router.push(link);
    };

    return (
        <button
            type="button"
            className={classNames(
                'flex items-center w-full p-3 h-12 text-dark-300 rounded-xl font-medium hover:bg-purple-10 hover:text-purple-500 transition-all',
                { 'bg-purple-10 text-purple-500': isActive },
            )}
            onClick={handleNavigation}
        >
            {icon}
            <p className="flex items-center ml-3">{text}</p>
        </button>
    );
}
