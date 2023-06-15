import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { BiBuilding, BiSearch } from 'react-icons/bi';

export const NavLinks = {
    dashboard: {
        icon: <MdOutlineSpaceDashboard size={20} />,
        text: 'Dashboard',
        link: '/',
    },
    search: {
        icon: <BiSearch size={20} />,
        text: 'Search',
        link: '/search',
    },
    jobBoard: {
        icon: <IoBriefcaseOutline size={20} />,
        text: 'Job Posts',
        link: '/job-board',
    },
    profile: {
        icon: <BiBuilding size={20} />,
        text: 'Company Profile',
        link: '/company-profile',
    },
    settings: {
        icon: <FiSettings size={20} />,
        text: 'Settings',
        link: '/settings',
    },
    logout: {
        icon: <FiLogOut size={20} />,
        text: 'Logout',
        link: '/logout',
    },
};

export const MobileNavLinks = {
    dashboard: {
        link: NavLinks.dashboard.link,
        text: NavLinks.dashboard.text,
        icon: NavLinks.dashboard.icon,
    },
    search: {
        link: NavLinks.search.link,
        text: NavLinks.search.text,
        icon: NavLinks.search.icon,
    },
    jobBoard: {
        link: NavLinks.jobBoard.link,
        text: NavLinks.jobBoard.text,
        icon: NavLinks.jobBoard.icon,
    },
    companyProfile: {
        link: NavLinks.profile.link,
        text: NavLinks.profile.text,
        icon: NavLinks.profile.icon,
    },
};
