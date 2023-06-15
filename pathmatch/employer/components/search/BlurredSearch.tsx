import { StudentSearchItem } from '@/components/search/StudentSearchItem';
import classNames from 'classnames';
import { SubscriptionType } from 'contexts/StripeCustomerContext';
import Image from 'next/image';
import CTAButton from '@/components/shared/buttons/CTAbutton';
import briefcase from '@/icons/briefcase-grey.svg';
import message from '@/icons/message-grey.svg';
import list from '@/icons/list-grey.svg';
import { useGetCheckoutLink } from 'hooks/useGetCheckoutlink';
import { useRouter } from 'next/router';
import { useGetStudentSearch } from '@/lib/pmBackend';
import { initialFilters } from './utils/initialFilters';
import { AlgoliaStudent } from '@/lib/interfaces/common';

export const BlurredSearch = () => {
    const checkoutLink = useGetCheckoutLink(SubscriptionType.Search);
    const router = useRouter();
    const { data: searchResults, isSuccess: loaded } = useGetStudentSearch(
        initialFilters,
        '',
        1,
        12,
    );

    if (!loaded) return null;

    let blurredStudents: AlgoliaStudent[] = [];
    if (searchResults?.students) {
        blurredStudents = searchResults?.students.slice(0, 3);
    }

    const goToCheckout = () => {
        router.push(checkoutLink);
    };

    return (
        <div className="relative w-full">
            <div className="absolute z-10 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 items-center flex justify-center w-full">
                <div className="flex flex-col items-center gap-y-6 max-w-[80%]">
                    <h1 className="font-semibold text-dark-500 text-[28px] leading-8 tracking-tight text-center">
                        Upgrade to Search to see all results
                    </h1>
                    <div className="flex flex-col sm:flex-row text-dark-300 gap-y-4 sm:gap-y-0 sm:gap-x-10">
                        <div className="flex items-center gap-x-2">
                            <Image
                                width={16}
                                height={16}
                                src={briefcase}
                                className="text-dark-300"
                                alt="outlined plus"
                            />
                            <p className="text-[11px] leading-4">
                                1 active job post per month
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Image
                                width={16}
                                height={16}
                                src={message}
                                alt="outlined plus"
                            />
                            <p className="text-[11px] leading-4">
                                Contact candidates directly
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Image
                                width={16}
                                height={16}
                                src={list}
                                alt="outlined plus"
                            />
                            <p className="text-[11px] leading-4">
                                Unlimited candidate searches
                            </p>
                        </div>
                    </div>
                    <CTAButton className="w-fit" onClick={goToCheckout}>
                        Upgrade Now
                    </CTAButton>
                </div>
            </div>
            <div className="blur-md">
                {blurredStudents.map((student, i) => (
                    <div
                        key={i}
                        className={classNames('flex items-start bg-white-100')}
                    >
                        <StudentSearchItem
                            first_name={student.first_name}
                            last_name={student.last_name}
                            slug={student['profile.slug']}
                            locations={student['profile.locations']}
                            photo_url={student.photo_url}
                            school={student['education.school']}
                            major={student['education.major']}
                            graduation_date={
                                student['education.graduation_date']
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
