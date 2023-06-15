import React from 'react';
import { FiLock } from 'react-icons/fi';
import { JobPostFormValues } from './JobPostForm';
import { FormikProps } from 'formik';
import { attemptPublishChange } from './util/attemptPublishChange';
import { useGetEmployerGlobal } from '../../lib/pmBackend';
import { useGetCheckoutLink } from 'hooks/useGetCheckoutlink';
import { SubscriptionType } from 'contexts/StripeCustomerContext';
import { useRouter } from 'next/router';
import { AnalyticsEvent, useAnalytics } from 'contexts/AnalyticsContext';
import Spinner from '../shared/Spinner';

type JobPostFooterProps = {
    isEditing: boolean;
    hasAvailableSlots: boolean;
    published: boolean;
    formikRef: React.RefObject<FormikProps<JobPostFormValues>>;
    saving?: boolean;
};

export const JobPostFooter = ({
    isEditing,
    hasAvailableSlots,
    published,
    formikRef,
    saving,
}: JobPostFooterProps) => {
    const globals = useGetEmployerGlobal();
    const analytics = useAnalytics();
    const checkoutLink = useGetCheckoutLink(SubscriptionType.Job);
    const recruiter = globals?.data?.user;
    const router = useRouter();

    const handlePublishChange = async (publish: boolean) => {
        attemptPublishChange(publish, formikRef);
        await formikRef.current?.submitForm();
    };

    const canPublish =
        hasAvailableSlots || published || recruiter?.role === 'PATHMATCH_ADMIN';

    return (
        <div className="flex flex-1 justify-end items-center border-t mb-5 gap-x-2">
            {!canPublish && !isEditing && (
                <div className="flex-1 mx-1 flex-col items-end justify-center hidden sm:flex">
                    <p className="text-dark-300 mt-4 text-right text-[11px] font-medium leading-4">
                        You’re out of Job Posts
                    </p>
                    <button
                        type="button"
                        className="text-purple-500 text-right font-semibold text-[11px] leading-4"
                        onClick={() => {
                            router.push(checkoutLink);
                        }}
                    >
                        Buy more to Publish
                    </button>
                </div>
            )}

            {isEditing && (
                <>
                    <button
                        type="submit"
                        disabled={!canPublish}
                        className="flex items-center border px-5 py-3 bg-white-100 hover:shadow-md justify-center mt-5 rounded-lg text-dark-500 disabled:gap-x-2 disabled:shadow-none disabled:bg-dark-10 disabled:text-dark-75"
                        onClick={async () => handlePublishChange(!published)}
                    >
                        {!canPublish && <FiLock size={18} />}
                        <p className="font-semibold text-base leading-5">
                            {published ? 'Unpublish' : 'Publish'}
                        </p>
                    </button>
                    <button
                        type="submit"
                        className="flex items-center mr-2 px-5 py-3 bg-dark-500 justify-center mt-5 rounded-lg text-white-100"
                        onClick={async () => handlePublishChange(published)}
                    >
                        {saving ? (
                            <Spinner />
                        ) : (
                            <p className="font-semibold leading-5">
                                Save Changes
                            </p>
                        )}
                    </button>
                </>
            )}
            {!isEditing && (
                <>
                    <button
                        type="submit"
                        className="border px-5 py-3 bg-white-100 hover:shadow-md justify-center mt-5 rounded-lg"
                        onClick={async () => {
                            handlePublishChange(false);
                            analytics.event(
                                AnalyticsEvent.JOB_POST_SAVE_DRAFT,
                                {
                                    isPublished: published,
                                },
                            );
                        }}
                    >
                        {saving ? (
                            <Spinner />
                        ) : (
                            <p className="text-dark-500 font-semibold text-base leading-5">
                                Save as Draft
                            </p>
                        )}
                    </button>
                    <button
                        type="submit"
                        disabled={!canPublish}
                        className="flex items-center mr-2 px-5 py-3 bg-dark-500 justify-center mt-5 rounded-lg text-white-100 disabled:gap-x-2 disabled:bg-dark-10 disabled:text-dark-75"
                        onClick={async () => handlePublishChange(true)}
                    >
                        {!canPublish && <FiLock size={18} />}
                        <p className="font-semibold leading-5">Post Job</p>
                    </button>
                </>
            )}
        </div>
    );
};
