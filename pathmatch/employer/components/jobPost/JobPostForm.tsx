import React from 'react';
import { Formik, Form, Field, FieldInputProps, FormikProps } from 'formik';
import MarkdownEditor from '../shared/forms/MarkdownEditor';
import { JobPostRadio } from './JobPostRadio';
import { CustomSelect } from '../shared/forms/CustomSelect';
import { useCreateJob, useGetFilters, useUpdateJob } from '../../lib/pmBackend';
import { convertFiltersToFilterData } from './util/convertFiltersToFilterData';
import { Job } from '../../lib/interfaces/common';
import {
    compensationOptions,
    jobCommitmentOptions,
    jobTypeOptions,
    months,
    yearsSelectData,
    gpaOptions,
} from './util/jobPostData';
import { getInitialFormValues } from './util/getInitialFormValues';
import { validateJobPostForm } from './util/validateJobPostForm';
import { formatCreateJobPayload } from './util/formatCreateJobPayload';
import { useRouter } from 'next/router';
import { JobPostFooter } from './JobPostFooter';

export interface JobPostFormValues {
    positionTitle: string;
    jobRole: string;
    commitment: string;
    jobType: string;
    month: string;
    year: string;
    graduationDates: string[];
    degrees: string[];
    locations: string[];
    compensation: string[];
    gpa: number;
    description: string;
    requirements: string;
    sponsorshipAvailable: string;
    published: boolean;
}

export const JobPostForm = ({
    job,
    hasAvailableSlots,
}: {
    job?: Job;
    hasAvailableSlots: boolean;
}) => {
    const [saving, setSaving] = React.useState(false);
    const createJob = useCreateJob();
    const updateJob = useUpdateJob();
    const formikRef = React.useRef<FormikProps<JobPostFormValues>>(null);
    const router = useRouter();
    const isEditing = !!job;

    const onSubmitForm = async (values: JobPostFormValues) => {
        const payload = formatCreateJobPayload({
            ...values,
        });
        if (job) {
            setSaving(true);
            await updateJob.mutateAsync({ id: job.id, payload });
        } else {
            await createJob.mutateAsync({ payload });
        }
        router.push(isEditing ? '/job-board' : '/');
    };

    const { data: filters } = useGetFilters();
    const filterData = filters && convertFiltersToFilterData(filters);
    const initialFormValues = getInitialFormValues(job);

    return (
        <>
            <Formik
                initialValues={initialFormValues}
                validate={validateJobPostForm}
                onSubmit={(values) => onSubmitForm(values)}
                validateOnChange={false}
                validateOnBlur={true}
                innerRef={formikRef}
            >
                {({ values, errors }) => (
                    <Form className="overflow-y-scroll justify-center h-screen px-5 md:px-10 pb-5">
                        <JobFormLabel
                            label="Position Title"
                            error={errors.positionTitle}
                        />
                        <Field
                            name="positionTitle"
                            as="input"
                            type="text"
                            className={
                                'w-full h-12 border rounded-lg border-dark-50 px-2 hover:border-dark-200 focus:border-dark-100 focus:outline-none'
                            }
                            placeholder="Marketing Intern, Sales Associate, etc."
                        />

                        <JobFormLabel
                            label="Department"
                            error={errors.jobRole}
                        />
                        <Field
                            options={filterData && filterData.job_roles}
                            component={CustomSelect}
                            name="jobRole"
                        />

                        <JobFormLabel label="Job Type" />
                        <div className="flex gap-x-3">
                            <Field name={'commitment'}>
                                {({
                                    field,
                                    form,
                                }: {
                                    field: FieldInputProps<JobPostFormValues>;
                                    form: FormikProps<JobPostFormValues>;
                                }) => (
                                    <JobPostRadio
                                        field={field}
                                        form={form}
                                        options={jobCommitmentOptions}
                                    />
                                )}
                            </Field>
                            <Field name={'jobType'}>
                                {({
                                    field,
                                    form,
                                }: {
                                    field: FieldInputProps<JobPostFormValues>;
                                    form: FormikProps<JobPostFormValues>;
                                }) => (
                                    <JobPostRadio
                                        field={field}
                                        form={form}
                                        options={jobTypeOptions}
                                    />
                                )}
                            </Field>
                        </div>

                        <JobFormLabel
                            label="Start Date"
                            error={`${errors.month ? errors.month : ''}${
                                errors.year ? errors.year : ''
                            }`}
                        />
                        <div className="flex flex-1 gap-x-1">
                            <div className="flex flex-col flex-1">
                                <Field
                                    options={months}
                                    component={CustomSelect}
                                    name="month"
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <Field
                                    disabled={values.month === 'ASAP'}
                                    options={yearsSelectData}
                                    component={CustomSelect}
                                    name="year"
                                />
                            </div>
                        </div>

                        <JobFormLabel
                            label="Who Should Apply?"
                            secondaryLabel="Select all that apply"
                            error={errors.graduationDates as string}
                        />
                        <Field
                            options={filterData && filterData.graduation_dates}
                            component={CustomSelect}
                            isMulti={true}
                            name="graduationDates"
                        />

                        <JobFormLabel
                            label="Suggested Majors, Minors & Degrees"
                            secondaryLabel="Select all that apply"
                            error={errors.degrees as string}
                        />
                        <Field
                            options={filterData && filterData.degrees}
                            component={CustomSelect}
                            isMulti={true}
                            name="degrees"
                        />

                        <JobFormLabel
                            label="Is visa sponsorship available for this position?"
                            error={errors.sponsorshipAvailable}
                        />
                        <div className="flex items-center">
                            <Field
                                type="radio"
                                name="sponsorshipAvailable"
                                value={'Yes'}
                                checked={values.sponsorshipAvailable === 'Yes'}
                                className="h-5 w-5"
                            />
                            <p className="ml-2 text-[13px] leading-5 text-dark-400">
                                Yes
                            </p>

                            <Field
                                type="radio"
                                name="sponsorshipAvailable"
                                value={'No'}
                                checked={values.sponsorshipAvailable === 'No'}
                                className="ml-5 h-5 w-5"
                            />
                            <p className="ml-2 text-[13px] leading-5 text-dark-400">
                                No
                            </p>
                        </div>

                        <JobFormLabel
                            label="Location"
                            error={errors.locations as string}
                        />
                        <Field
                            options={filterData && filterData.locations}
                            component={CustomSelect}
                            isMulti={true}
                            name="locations"
                        />

                        <div className="flex flex-1 gap-x-1">
                            <div className="flex flex-col flex-1">
                                <JobFormLabel
                                    label="Compensation"
                                    error={errors.compensation as string}
                                />
                                <Field
                                    options={compensationOptions}
                                    component={CustomSelect}
                                    name="compensation"
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <JobFormLabel
                                    label="GPA Requirements"
                                    error={errors.gpa}
                                />
                                <Field
                                    options={gpaOptions}
                                    component={CustomSelect}
                                    name="gpa"
                                />
                            </div>
                        </div>

                        <JobFormLabel
                            label="Responsibilities"
                            error={errors.description}
                        />
                        <Field
                            name="description"
                            id="description"
                            component={MarkdownEditor}
                        />

                        <JobFormLabel
                            label="Requirements"
                            error={errors.requirements}
                        />
                        <Field
                            name="requirements"
                            id="requirements"
                            component={MarkdownEditor}
                        />
                    </Form>
                )}
            </Formik>
            <JobPostFooter
                isEditing={isEditing}
                hasAvailableSlots={hasAvailableSlots}
                published={formikRef.current?.values.published as boolean}
                formikRef={formikRef}
                saving={saving}
            />
        </>
    );
};

const JobFormLabel = ({
    label,
    secondaryLabel,
    error,
}: {
    label: string;
    secondaryLabel?: string;
    error?: string;
}) => {
    return (
        <div className="flex mt-5 mb-1 gap-x-2 items-center">
            <h2 className="font-semibold  text-[13px] leading-5 text-dark-300">
                {label}
            </h2>
            {secondaryLabel && (
                <span className="inline text-[11px] text-dark-300">
                    {secondaryLabel}
                </span>
            )}
            {error && (
                <p className="text-[11px] leading-4 text-red-500">{error}</p>
            )}
        </div>
    );
};
