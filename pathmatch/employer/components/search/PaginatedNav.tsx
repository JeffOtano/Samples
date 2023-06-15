import classNames from 'classnames';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import SecondaryButton from '../shared/buttons/SecondaryButton';

type PaginatedNavProps = {
    page: number;
    setPage: (page: number) => void;
    handleNext: () => void;
    handlePrev: () => void;
    totalPages: number;
};

export const PaginatedNav = ({
    page,
    setPage,
    handleNext,
    handlePrev,
    totalPages,
}: PaginatedNavProps) => {
    return (
        <div className="flex justify-between items-center mt-3">
            <SecondaryButton disabled={page === 1} onClick={handlePrev}>
                <AiOutlineArrowLeft />
            </SecondaryButton>
            <div className="hidden sm:flex items-center">
                {Array.from(Array(totalPages).keys())
                    .slice(page, page + 5)
                    .map((i) => (
                        <button
                            type="button"
                            onClick={() => setPage(i)}
                            className={classNames(
                                'p-[14px] px-4 rounded-lg border bg-white-100 mx-1 w-1 flex text-center align-middle justify-center items-center hover:shadow-md',
                                {
                                    'bg-[#F2EBFF] border-purple-200 text-purple-500':
                                        i === page,
                                },
                            )}
                            key={i}
                        >
                            <p className="font-medium text-[13px] leading-5">
                                {i}
                            </p>
                        </button>
                    ))}
                <p className="font-medium text-[10px] leading-3 mx-4 text-dark-300">
                    OF
                </p>
                <button
                    type="button"
                    onClick={() => setPage(totalPages)}
                    className="p-[14px] rounded-lg  border bg-white-100 mx-1 flex justify-center items-center hover:shadow-md"
                >
                    <p className="font-medium text-[13px] leading-5 flex">
                        {totalPages}
                    </p>
                </button>
            </div>
            <div className="flex sm:hidden items-center">
                <p className="font-medium text-[13px] leading-5 flex">
                    {page}
                    <span className="font-medium text-[10px] leading-3 items-center flex mx-4 text-dark-300">
                        OF
                    </span>
                    {totalPages}
                </p>
            </div>
            <SecondaryButton
                disabled={page === totalPages}
                onClick={handleNext}
            >
                <AiOutlineArrowRight />
            </SecondaryButton>
        </div>
    );
};
