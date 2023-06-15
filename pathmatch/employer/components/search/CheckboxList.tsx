import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from '@chakra-ui/icons';
import { FilterOptions } from 'lib/interfaces/common';
import React, { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import Image from 'next/image';
import lock from '@/icons/lock-grey.svg';
import classNames from 'classnames';

type CheckBoxListProps = {
    title: string;
    options: FilterOptions[];
    selectedOptions: string[];
    index: number;
    locked?: boolean;
    setSelectedOptions: (options: string[]) => void;
};

const CheckBoxList = ({
    title,
    options,
    selectedOptions,
    locked,
    index,
    setSelectedOptions,
}: CheckBoxListProps) => {
    const [showOptions, setShowOptions] = useState(false);
    const [filter, setFilter] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    const blurTimeout = useRef(
        setTimeout(() => {
            return;
        }, 0),
    );

    const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
    const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(buttonRef, dropdownRef, {
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 10],
                },
            },
            {
                name: 'preventOverflow',
                options: {
                    padding: 10,
                },
            },
            {
                name: 'flip',
                options: {
                    padding: 10,
                },
            },
        ],
    });

    const handleOptionClick = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((o) => o !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleSelectAll = () => {
        setSelectedOptions(options.map((option) => option.slug));
    };

    const handleDeselectAll = () => {
        setSelectedOptions([]);
    };

    const handleBlur = () => {
        blurTimeout.current = setTimeout(() => setShowOptions(false), 100);
    };

    const handleFocus = () => {
        clearTimeout(blurTimeout.current);
    };

    useEffect(() => {
        setFilteredOptions(
            options.filter((option) =>
                option.title.toLowerCase().includes(filter.toLowerCase()),
            ),
        );
    }, [filter, options, selectedOptions]);

    return (
        <div
            className={classNames(
                'flex flex-col w-48% sm:w-max min-w-min relative items-start',
                {
                    'mr-1 sm:mr-0': index % 2 === 0,
                },
            )}
            onBlur={handleBlur}
            onFocus={handleFocus}
        >
            {locked ? (
                <div
                    className={`w-full sm:w-max py-1 px-4 my-1 bg-dark-10 border cursor-not-allowed flex items-center rounded-full`}
                >
                    <Image
                        width={8}
                        height={10}
                        src={lock}
                        className="text-dark-300"
                        alt="outlined plus"
                    />
                    <div className="flex flex-1 justify-between items-center">
                        <p className="mr-1 ml-2 font-semibold text-[13px] text-dark-100 leading-5">
                            {title}
                        </p>
                        <ChevronDownIcon
                            color={'#CDCCD0'}
                            className="text-dark-100"
                        />
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    ref={setButtonRef}
                    onClick={() => {
                        setShowOptions(!showOptions);
                        buttonRef?.focus();
                    }}
                    className={classNames(
                        'w-full sm:w-max py-1 px-4 bg-white-100 my-1 border flex items-center justify-between rounded-full',
                        {
                            'bg-purple-50 text-purple-500':
                                selectedOptions.length > 0,
                        },
                    )}
                >
                    <p className="font-semibold text-[13px] min-w-max leading-5">
                        {title}
                        {selectedOptions.length > 0 && (
                            <>{` (${selectedOptions.length})`}</>
                        )}
                    </p>

                    {showOptions ? (
                        <ChevronUpIcon className="ml-1 text-dark-300" />
                    ) : (
                        <ChevronDownIcon className="ml-1 text-dark-300" />
                    )}
                </button>
            )}
            {showOptions && (
                <div
                    className="z-20 bg-white-100 border shadow-md rounded-lg py-4 px-2 sm:p-4 max-w-[200px] xxs:max-w-[300px] xs:max-w-[100vw] "
                    style={styles.popper}
                    {...attributes.popper}
                    ref={setDropdownRef}
                    tabIndex={0}
                >
                    <div className="relative border rounded-lg mb-2">
                        <input
                            type="text"
                            placeholder="Start typing"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="py-2 pl-8 rounded-lg w-full text-[15px] leading-5"
                        />
                        <SearchIcon
                            h={4}
                            w={4}
                            color={'gray.500'}
                            className="absolute top-2 mt-[2px] left-0 ml-2 text-dark-300 fill-dark-300"
                        />
                    </div>

                    <div className="border rounded-lg p-2 h-max max-h-[232px] overflow-y-auto">
                        {filteredOptions.length === 0 && (
                            <p className="text-dark-200 text-sm">
                                No results found
                            </p>
                        )}

                        {filteredOptions.map((option) => (
                            <div
                                key={option.slug}
                                className="flex max-w-xs items-center"
                            >
                                <input
                                    title="Select option"
                                    type="checkbox"
                                    checked={selectedOptions.includes(
                                        option.slug,
                                    )}
                                    className="mr-2"
                                    onChange={() =>
                                        handleOptionClick(option.slug)
                                    }
                                />
                                <span className="sm:w-max truncate">
                                    {option.title}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="pt-1 px-2 text-sm w-max text-dark-200 hover:text-dark-300"
                        >
                            Select All
                        </button>
                        <button
                            type="button"
                            onClick={handleDeselectAll}
                            disabled={selectedOptions.length === 0}
                            className="pt-1 px-2 text-sm w-max text-dark-200 hover:text-dark-300 disabled:text-dark-100"
                        >
                            Deselect All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckBoxList;
