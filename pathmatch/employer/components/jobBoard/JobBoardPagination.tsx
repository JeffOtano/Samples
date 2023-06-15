import classNames from 'classnames';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

export const JobBoardPagination = ({
    currentPage,
    setCurrentPage,
    jobsLength,
    jobsPerPage,
}: {
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    jobsLength: number;
    jobsPerPage: number;
}) => {
    const totalPages = Math.ceil(jobsLength / jobsPerPage);

    if (totalPages <= 1) {
        return null;
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const visiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    if (endPage - startPage < visiblePages - 1) {
        startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    return (
        <div className="flex justify-between mt-6">
            {currentPage > 1 && (
                <div>
                    <button
                        title="previous"
                        type="button"
                        className="flex items-center bg-white-100 text-dark-500 border border-dark-50 rounded-lg h-12 w-12 justify-center"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <AiOutlineArrowLeft className="w-4 h-4" />
                    </button>
                </div>
            )}
            <div className="flex flex-1 justify-center">
                {Array.from({ length: totalPages }, (_, i) => {
                    const pageNumber = i + 1;

                    if (pageNumber >= startPage && pageNumber <= endPage) {
                        return (
                            <button
                                key={i}
                                className={classNames(
                                    'mx-1 px-3 py-1 h-12 border rounded-lg text-[13px] font-medium leading-5',
                                    {
                                        'bg-purple-25 text-purple-500 border-purple-200':
                                            currentPage === pageNumber,
                                    },
                                    {
                                        'bg-white-100 text-dark-500 border-dark-50':
                                            currentPage !== pageNumber,
                                    },
                                )}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    }

                    return null;
                })}
            </div>
            {currentPage < totalPages && (
                <div>
                    <button
                        title="next"
                        type="button"
                        className="flex items-center bg-white-100 text-dark-500 border border-dark-50 rounded-lg h-12 w-12 justify-center"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <AiOutlineArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};
