import { DashboardCardProps } from '../DashboardCard';

export const dashboardCardData: Record<
    'editProfile' | 'search' | 'postJob',
    DashboardCardProps
> = {
    editProfile: {
        image: '/assets/wave.png',
        label: 'Build your profile, generate talent',
        buttonLabel: 'Edit Profile',
        route: '/company-profile',
    },
    search: {
        image: '/assets/magGlass.png',
        label: 'Search for the perfect candidate',
        buttonLabel: 'Open Search',
        route: '/search',
    },
    postJob: {
        image: '/assets/briefcase.png',
        label: 'Post a job and hire faster than ever',
        buttonLabel: 'New Job Post',
        route: '/job-post/new',
    },
};
