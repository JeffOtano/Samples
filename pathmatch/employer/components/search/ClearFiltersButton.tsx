export const ClearFiltersButton = ({
    onClearFilters,
}: {
    onClearFilters: () => void;
}) => {
    return (
        <button
            type="button"
            onClick={onClearFilters}
            className="text-purple-500 text-center align-middle mb-2 font-semibold text-[15px] leading-5"
        >
            Clear
        </button>
    );
};
