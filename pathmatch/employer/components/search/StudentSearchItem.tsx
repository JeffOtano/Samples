import { FaUserCircle } from 'react-icons/fa';
import { slugToText } from '../util/slugToText';
import Image from 'next/image';
import { getStudentProfileLink } from '../util/getStudentProfileLink';

export const StudentSearchItem = ({
    first_name,
    last_name,
    slug,
    locations,
    photo_url,
    school,
    major,
    graduation_date,
    blurred,
}: {
    first_name: string;
    last_name: string;
    slug: string;
    locations: string[];
    photo_url?: string;
    school?: string;
    major?: string;
    graduation_date?: string;
    blurred?: boolean;
}) => {
    const profileLink = getStudentProfileLink(slug, blurred);

    const handleStudentClick = () => {
        window.open(profileLink, '_blank');
    };

    return (
        <button
            type="button"
            onClick={handleStudentClick}
            disabled={blurred}
            className="flex flex-1 justify-start items-start px-4 py-5 hover:bg-dark-10 hover:disabled:bg-white-100 disabled:cursor-default"
        >
            <div className="mr-2">
                {photo_url ? (
                    <Image
                        alt="Student profile picture"
                        height={36}
                        width={36}
                        className="rounded-full h-9 w-9"
                        src={photo_url}
                    />
                ) : (
                    <FaUserCircle size={36} className="text-dark-200" />
                )}
            </div>
            <div className="text-left sm:text-center">
                <p className="text-lg flex leading-6 font-semibold">
                    {`${first_name} ${last_name}`}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    {locations?.length > 0 && locations[0] && (
                        <p className="text-sm leading-5 text-dark-200">
                            {slugToText(locations[0])}
                        </p>
                    )}
                    {locations?.length > 0 && locations[0] && school && (
                        <div className="hidden sm:flex">
                            &nbsp;
                            <p className="text-dark-200 font-bold">{'·'}</p>
                            &nbsp;
                        </div>
                    )}

                    {school && (
                        <p className="text-sm leading-5 text-dark-200">
                            {school}
                        </p>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    {major && (
                        <p className="text-sm text-left leading-5 text-dark-200">
                            {major}
                        </p>
                    )}
                    {graduation_date && major && (
                        <div className="hidden sm:flex">
                            &nbsp;
                            <p className="text-dark-200 font-bold">{'·'}</p>
                            &nbsp;
                        </div>
                    )}
                    {graduation_date && (
                        <p className="text-sm leading-5 text-dark-200">
                            <span className="inline sm:hidden">Class of </span>
                            {graduation_date}
                        </p>
                    )}
                </div>
            </div>
        </button>
    );
};
