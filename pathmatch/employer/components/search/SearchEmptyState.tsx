import { SearchIcon } from '@chakra-ui/icons';
import SecondaryButton from '../shared/buttons/SecondaryButton';

export const SearchEmptyState = ({
    loaded,
    fetchedStudentsLength,
    onClearAllFilters,
}: {
    loaded: boolean;
    fetchedStudentsLength: number;
    onClearAllFilters: () => void;
}) => {
    if (!loaded || fetchedStudentsLength != 0) {
        return null;
    }

    return (
        <div className="flex flex-col py-10 sm:py-0 items-center justify-center gap-y-5 min-h-[100px] bg-dark-10 rounded-[20px] md:min-h-[360px]">
            <div className="rounded-full bg-dark-25 p-7">
                <SearchIcon color={'gray.500'} h={8} w={8} />
            </div>
            <p className="text-dark-300 text-[20px] leading-7 font-semibold">
                {`We couldn't find any results`}
            </p>
            <SecondaryButton onClick={onClearAllFilters}>
                Clear Filters
            </SecondaryButton>
        </div>
    );
};
