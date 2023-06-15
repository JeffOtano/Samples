import { Job } from '@/lib/interfaces/common';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@chakra-ui/react';
import { Toast } from '../shared/Toast';
import classNames from 'classnames';
import { useRouter } from 'next/router';

export const JobDashboardItem = ({ job }: { job: Job }) => {
    const toast = useToast();
    const router = useRouter();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_STUDENT_APP_URL}/job-board/${job.id}`,
        );

        toast({
            position: 'top-right',
            duration: 3000,
            isClosable: true,
            render: () => (
                <Toast
                    title="Link copied"
                    description="Successfully copied job post link to clipboard"
                />
            ),
        });
    };

    const goToJobPage = () => {
        router.push(`/jobs/${job.id}`);
    };

    return (
        <div className="flex w-full min-h-[48px]">
            <button
                onClick={goToJobPage}
                className=" w-full h-fit flex flex-col"
            >
                <p className="font-medium text-[13px] leading-5">{job.title}</p>
                <div className="flex items-center gap-x-3 mt-1">
                    <p
                        className={classNames(
                            'text-[10px] leading-3 font-semibold border rounded p-1',
                            {
                                'bg-green-25 text-green-600 border border-green-200 ':
                                    job.published,
                            },
                            {
                                'bg-dark-10 text-dark-200': !job.published,
                            },
                        )}
                    >
                        {job.published ? 'PUBLISHED' : 'UNPUBLISHED'}
                    </p>
                    <p className="text-[11px] leading-4 text-dark-400">
                        {`${job.applicant_count} Applicants`}
                    </p>
                    <p className="text-[11px] leading-4 text-dark-400">
                        {`${job.match_count} Matches`}
                    </p>
                </div>
            </button>
            <div className="w-fit flex items-center gap-x-3">
                <button
                    type="button"
                    title="Copy link to clipboard"
                    onClick={handleCopyLink}
                    className="border rounded h-7 w-7 flex p-1 items-center justify-center border-dark-25"
                >
                    <Image
                        src="assets/icons/copy-link.svg"
                        alt="copy link"
                        width={16}
                        height={16}
                    />
                </button>
                <Link
                    href={`${process.env.NEXT_PUBLIC_STUDENT_APP_URL}/job-board/${job.id}`}
                    target="_blank"
                    className="border rounded h-7 w-7 flex p-1 items-center justify-center border-dark-25"
                >
                    <Image
                        src="assets/icons/external-link.svg"
                        alt="copy link"
                        width={16}
                        height={16}
                    />
                </Link>
            </div>
        </div>
    );
};
