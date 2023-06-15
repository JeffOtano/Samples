import { Filters, FilterOptions } from '../../../lib/interfaces/common';
import { FilterData } from '../../../lib/interfaces/lists';

export const convertFiltersToFilterData = (filters: Filters) => {
    const filterData: Record<string, FilterData[]> = {};
    const filterKeys = [
        'compensation',
        'graduation_dates',
        'job_roles',
        'job_types',
        'locations',
        'degrees',
    ];

    filterKeys.forEach((key) => {
        filterData[key] = convertToFilterData(filters[key]);
    });

    return filterData;
};

const convertToFilterData = (filter: FilterOptions[]) => {
    return filter.map((filter: FilterOptions) => {
        return {
            value: filter.slug,
            label: filter.title,
        };
    });
};
