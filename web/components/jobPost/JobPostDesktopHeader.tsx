import { BsArrowLeftShort } from 'react-icons/bs';
import { Job } from '../../lib/interfaces/common';
import { useRouter } from 'next/router';
import { RemainingJobPosts } from '../jobBoard/RemainingJobPosts';

export const JobPostDesktopHeader = ({ job }: { job?: Job }) => {
    const router = useRouter();

    const isEditing = !!job;

    return (
        <div className="hidden flex-col px-10 pt-10 lg:flex">
            <button
                type="button"
                className="font-semibold text-[13px] w-fit mb-5 text-dark-300 text-left flex items-center leading-5"
                onClick={() => router.push('/')}
            >
                <BsArrowLeftShort size={24} />
                Back to Dashboard
            </button>
            <div className="flex justify-between items-center mb-7">
                <h1 className="font-semibold text-[40px] text-dark-500 leading-[44px] -tracking-[0.02rem] ">
                    {isEditing ? 'Edit Job' : 'Post a Job'}
                </h1>
                {!isEditing && (
                    <div className="flex flex-col items-end">
                        <RemainingJobPosts />
                    </div>
                )}
            </div>
        </div>
    );
};
