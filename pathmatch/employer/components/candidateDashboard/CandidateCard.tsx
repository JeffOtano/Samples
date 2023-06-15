import { AlgoliaStudent } from '@/lib/interfaces/common';
import { slugToText } from '../util/slugToText';
import Image from 'next/image';
import { getStudentProfileLink } from '../util/getStudentProfileLink';
import {
    useStripeCustomer,
    SubscriptionType,
} from 'contexts/StripeCustomerContext';

const CanidateCard = ({
    student,
    locations,
}: {
    student: AlgoliaStudent;
    locations: string[];
}) => {
    const { customer } = useStripeCustomer();

    const hasSearchAccess =
        customer?.subscriptionType === SubscriptionType.Search;
    const profileLink = getStudentProfileLink(
        student['profile.slug'],
        hasSearchAccess,
    );
    const formattedLocations = locations?.map((loc) => slugToText(loc));
    const studentLocations = student['profile.locations']
        ? student['profile.locations'].map((loc) => slugToText(loc))
        : [];
    const locationDisplay =
        formattedLocations?.find((loc) => studentLocations?.includes(loc)) ??
        studentLocations[0];

    return (
        <a
            target="_blank"
            href={profileLink}
            className="w-full h-fit flex min-h-[80px] p-[14px] items-start hover:bg-dark-10"
        >
            {student.photo_url ? (
                <div className="w-12">
                    <Image
                        className="rounded-2xl overflow-hidden mt-1"
                        alt="profile photo"
                        src={student.photo_url}
                        width={30}
                        height={30}
                    />
                </div>
            ) : (
                <div className="flex w-12 items-start justify-start mt-1">
                    <div className="flex items-center justify-center w-[30px] h-[30px] bg-dark-10 text-dark-200 text-[12px] rounded-2xl">
                        {`${student.first_name[0]}${student.last_name[0]}`}
                    </div>
                </div>
            )}
            <div className="flex flex-col">
                <p className="font-medium text-[13px] text-dark-500 leading-5">{`${student.first_name} ${student.last_name[0]}`}</p>
                <div className="flex items-center gap-x-3 mt-1">
                    {student['education.school'] && (
                        <p className="text-[11px] leading-4 text-dark-400">
                            {student['education.school']}
                        </p>
                    )}
                    {locationDisplay && (
                        <>
                            <p className="text-[11px] leading-4 text-dark-400">
                                •
                            </p>
                            <p className="text-[11px] leading-4 text-dark-400">
                                {locationDisplay}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </a>
    );
};

export { CanidateCard };
export default CanidateCard;
