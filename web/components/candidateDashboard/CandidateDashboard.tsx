import { useGetCompany, useGetStudentSearch } from '@/lib/pmBackend';
import Spinner from '@/components/shared/Spinner';
import { initialFilters } from '@/components/search/utils/initialFilters';
import CandidateCard from './CandidateCard';
import { AlgoliaStudent } from '@/lib/interfaces/common';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 8;

export interface FilterOptions {
    slug: string;
    title: string;
    category?: string;
    sub_category?: string;
    cms_id?: string;
}

const CandidateDashboard = () => {
    const { data: company, isLoading: isCompanyLoading } = useGetCompany();
    const [randomPageToUse, setRandomPageToUse] = useState<number>(1);

    const filters = {
        ...initialFilters,
        industries: company?.industries ?? [],
    };
    filters.locations = company?.locations ?? [];

    const { data, isSuccess: loaded } = useGetStudentSearch(
        initialFilters,
        '',
        randomPageToUse,
        PAGE_SIZE,
    );

    const { students: studentData, total } = data ?? {};
    const students = studentData as AlgoliaStudent[];

    useEffect(() => {
        if (total) {
            const totalPages = data?.totalPages || 1;
            const randomPage = Math.floor(Math.random() * totalPages) + 1;
            if (randomPage > totalPages) {
                setRandomPageToUse(totalPages - 1);
            } else {
                setRandomPageToUse(randomPage);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!loaded && !isCompanyLoading) {
        return <Spinner />;
    }
    return (
        <div className="flex flex-col text-lg flex-1 leading-6">
            <div className="flex items-start sm:items-center mb-2 flex-col sm:flex-row">
                <h3 className="font-semibold min-w-max">Candidate Matches</h3>
                <p className="text-[10px] ml-0 sm:ml-3 my-2 sm:my-0 leading-3 text-dark-300">{`PathMatch users who match your industry, location, and more.`}</p>
            </div>
            <div className="border bg-white-100 items-center justify-center border-dark-25 rounded-lg flex flex-col w-full">
                {students ? (
                    students.map((student, ind) => (
                        <CandidateCard
                            key={`-CandidateCard-${ind}`}
                            student={student}
                            locations={filters.locations}
                        />
                    ))
                ) : (
                    <div className="flex items-center h-32 justify-center">
                        No matches
                    </div>
                )}
            </div>
        </div>
    );
};

export { CandidateDashboard };
export default CandidateDashboard;
