export type FilterOptions = {
    jobRoles: string[];
    jobTypes: string[];
    locations: string[];
    graduationDates: string[];
    degrees: string[];
    tools: string[];
    //schools: string[];
    availability: string[];
    internship_seasons: string[];
    years: string[];
};

export const initialFilters: FilterOptions = {
    jobRoles: [],
    jobTypes: [],
    locations: [],
    graduationDates: [],
    degrees: [],
    tools: [],
    //schools: [],
    availability: [],
    internship_seasons: [],
    years: [],
};
