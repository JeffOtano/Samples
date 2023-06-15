import { years } from '@/components/jobPost/util/jobPostData';
import { FilterOptions, Filters } from 'lib/interfaces/common';

type FiltersList = {
    title: string;
    id: string;
    options: FilterOptions[];
    locked?: boolean;
}[];

export const getInitialFiltersList = (
    hasSearchAccess: boolean,
    filters?: Filters,
): FiltersList => {
    if (!filters) {
        return [];
    }

    const filtersList: {
        title: string;
        id: string;
        options: FilterOptions[];
        locked?: boolean;
    }[] = [
        {
            title: 'Locations',
            id: 'locations',
            options: filters.locations,
            locked: false,
        },
        {
            title: 'Career Paths',
            id: 'jobRoles',
            options: filters.job_roles,
            locked: false,
        },
        {
            title: 'Availability',
            id: 'availability',
            options: [
                {
                    slug: 'full-time',
                    title: 'Full Time',
                },
                {
                    slug: 'part-time',
                    title: 'Part Time',
                },
            ],
            locked: !hasSearchAccess,
        },
        {
            title: 'Seasons',
            id: 'internship_seasons',
            options: [
                {
                    slug: 'ASAP',
                    title: 'ASAP',
                },
                {
                    slug: 'spring',
                    title: 'Spring',
                },
                {
                    slug: 'summer',
                    title: 'Summer',
                },
                {
                    slug: 'fall',
                    title: 'Fall',
                },
                {
                    slug: 'winter',
                    title: 'Winter',
                },
            ],
            locked: !hasSearchAccess,
        },
        {
            title: 'Years',
            id: 'years',
            options: years.map((year) => ({
                slug: year.toString(),
                title: year.toString(),
            })),
            locked: !hasSearchAccess,
        },
        {
            title: 'Tools',
            id: 'tools',
            options: filters.tools,
            locked: !hasSearchAccess,
        },
        // {
        //     title: 'Schools',
        //     id: 'schools',
        //     options: filters.schools,
        //     locked: !hasSearchAccess,
        // },
        {
            title: 'Grad Dates',
            id: 'graduationDates',
            options: filters.graduation_dates,
            locked: !hasSearchAccess,
        },
    ];

    return filtersList;
};
