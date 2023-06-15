import Image from 'next/image';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Job } from '../../lib/interfaces/common';
import { useRouter } from 'next/router';
import { RemainingJobPosts } from '../jobBoard/RemainingJobPosts';

export const JobPostMobileHeader = ({ job }: { job?: Job }) => {
    const router = useRouter();

    const isEditing = !!job;

    return (
        <>
            <div className="flex flex-1 p-5 lg:hidden bg-dark-500">
                <div className="flex flex-col flex-1">
                    <h1 className="font-semibold text-2xl text-white-100 mb-2 leading-7">
                        {isEditing ? 'Edit Job' : 'Post a Job'}
                    </h1>
                    {!isEditing && (
                        <>
                            <RemainingJobPosts />
                        </>
                    )}
                </div>
                <div className="flex flex-1 items-center justify-end mr-12">
                    <Image
                        alt="Job Post Decorative Image"
                        src={'/assets/postJob.svg'}
                        width={86}
                        height={72}
                    />
                </div>
            </div>
            <div className="flex ml-5 my-4 lg:hidden">
                <button
                    type="button"
                    className="font-semibold text-[13px] border px-2 rounded-md text-left flex items-center leading-5"
                    onClick={() => router.push('/')}
                >
                    <BsArrowLeftShort size={24} />
                    Back to Dashboard
                </button>
            </div>
        </>
    );
};
