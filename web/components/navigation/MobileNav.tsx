import { HamburgerIcon } from '@chakra-ui/icons';
import CompanyLogo from './CompanyLogo';
import { useState } from 'react';
import { NavButton } from './NavButton';
import { MobileNavLinks, NavLinks } from './NavLinks';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const MobileNav = ({ hiddenSize = 'lg' }: { hiddenSize?: string }) => {
    const router = useRouter();

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className={`flex ${hiddenSize}:hidden flex-col`}>
            <div className="flex items-center border-b p-7 border-dark-50 justify-between w-full bg-white-100 h-[100px]">
                <CompanyLogo />
                <button
                    type="button"
                    title="Nav Menu"
                    className="border border-dark-50 h-12 w-12 flex items-center justify-center rounded-lg"
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    <HamburgerIcon h={5} w={5} />
                </button>
            </div>
            {isNavOpen && (
                <div className="flex flex-col items-center bg-white-100 h-full p-5">
                    {Object.entries(MobileNavLinks).map(([key, value]) => {
                        const isActive = router.pathname === value.link;

                        return (
                            <div
                                key={key}
                                className={classNames(
                                    'w-full border rounded-xl my-1',
                                    { ' border-purple-500': isActive },
                                )}
                            >
                                <NavButton
                                    link={value.link}
                                    text={value.text}
                                    icon={value.icon}
                                    onClick={() => setIsNavOpen(false)}
                                />
                            </div>
                        );
                    })}
                    <div className="flex w-full gap-x-2 flex-1">
                        <div
                            className={classNames(
                                'w-full border rounded-xl my-1',
                                {
                                    ' border-purple-500':
                                        router.pathname ===
                                        NavLinks.logout.link,
                                },
                            )}
                        >
                            <NavButton
                                link={NavLinks.logout.link}
                                text={NavLinks.logout.text}
                                icon={NavLinks.logout.icon}
                                onClick={() => setIsNavOpen(false)}
                            />
                        </div>
                        <div
                            className={classNames(
                                'w-full border rounded-xl my-1',
                                {
                                    ' border-purple-500':
                                        router.pathname ===
                                        NavLinks.settings.link,
                                },
                            )}
                        >
                            <NavButton
                                link={NavLinks.settings.link}
                                text={NavLinks.settings.text}
                                icon={NavLinks.settings.icon}
                                onClick={() => setIsNavOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileNav;
