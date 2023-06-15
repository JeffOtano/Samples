import React, { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import CTAButton from '../shared/buttons/CTAbutton';
import { Spinner } from '@chakra-ui/react';

type SearchInputProps = {
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
    handleSearch: () => void;
};

const SearchInput = ({
    isLoading,
    searchQuery,
    setSearchQuery,
    handleSearch,
}: SearchInputProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSearch]);

    useEffect(() => {
        if (searchQuery === '') {
            handleSearch();
        }
    }, [handleSearch, searchQuery]);

    return (
        <div className="flex items-center flex-col sm:flex-row w-full gap-y-2 pr-3 sm:gap-x-2">
            <div className="relative w-full sm:w-fit flex items-center">
                <BiSearch
                    className="absolute left-3 text-dark-200 top-[14px]"
                    size={20}
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[360px] h-11 p-3 pl-9 rounded-lg border font-[13px] leading-5 placeholder:font-[13px] placeholder:leading-5 border-dark-50"
                    placeholder="Search by name, email, school, anything"
                />
            </div>
            <CTAButton
                className="h-11 min-w-[140px] flex w-full sm:max-w-fit items-center justify-center"
                onClick={handleSearch}
            >
                {isLoading ? <Spinner /> : 'Find Talent'}
            </CTAButton>
        </div>
    );
};

export default SearchInput;
