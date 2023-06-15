import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    CompanyDetailsFormValues,
    companyInitialValues,
    companyValidationSchema,
} from './util/companyUtils';
import industries from 'lib/resources/industries';
import { convertFiltersToFilterData } from '../jobPost/util/convertFiltersToFilterData';
import { useGetFilters } from 'lib/pmBackend';
import { workplaceTypes } from 'lib/resources/workplaceTypes';
import { CustomSelect } from '../shared/forms/CustomSelect';
import Spinner from '../shared/Spinner';
import PrimaryButton from '../shared/buttons/PrimaryButton';
import classNames from 'classnames';

type CompanyDetailsProps = {
    onSubmit: (values: CompanyDetailsFormValues) => void;
    submitState: {
        isSubmitting: boolean;
        submitError: string;
    };
};

export function CompanyDetails({ onSubmit, submitState }: CompanyDetailsProps) {
    const { data: filters } = useGetFilters();
    const filterData = filters && convertFiltersToFilterData(filters);

    return (
        <div className="w-full h-full max-w-[380px] flex flex-col items-center justify-start mt-8">
            <h2 className="font-medium text-xl leading-7">
                Tell us about your Business
            </h2>

            <Formik
                initialValues={companyInitialValues}
                onSubmit={(values, { setSubmitting }) => {
                    onSubmit(values);
                    setSubmitting(false);
                }}
                validationSchema={companyValidationSchema}
            >
                {({ errors, touched }) => (
                    <Form className="mt-4 flex w-full flex-col gap-y-4">
                        <div className="flex flex-col">
                            <InputLabel label="Company Name" />
                            <Field
                                className={classNames(
                                    'border p-3 flex rounded-lg h-12',
                                    { 'border-red-500': errors.companyName },
                                )}
                                name="companyName"
                            />

                            <ErrorMessage
                                name="companyName"
                                className="text-sm text-red-500"
                                component="div"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel label="Industry" />
                            <Field
                                className="p-3 flex border rounded-lg h-12"
                                name="industries"
                                options={industries}
                                isMulti
                                component={CustomSelect}
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel label="Website URL" />
                            <Field
                                className={classNames(
                                    'border p-3 rounded-lg h-12',
                                    {
                                        'border-red-500': Boolean(
                                            errors.website && touched.website,
                                        ),
                                    },
                                )}
                                name="website"
                                placeholder="https://pathmatch.com"
                            />

                            <ErrorMessage
                                name="website"
                                className="text-sm text-red-500"
                                component="div"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel label="Workplace Type" />
                            <Field
                                className="border p-3 rounded-lg h-12"
                                options={workplaceTypes}
                                component={CustomSelect}
                                isMulti
                                name="workplaceType"
                            />
                            <ErrorMessage
                                name="workplaceType"
                                className="text-sm text-red-500"
                                component="div"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel label="Office Locations" />
                            <Field
                                className="border p-3 rounded-lg h-12"
                                options={filterData && filterData.locations}
                                component={CustomSelect}
                                isMulti
                                name="locations"
                            />

                            <ErrorMessage
                                name="locations"
                                className="text-sm text-red-500"
                                component="div"
                            />
                        </div>
                        <PrimaryButton
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className="flex items-center justify-center"
                        >
                            {submitState.isSubmitting ? (
                                <Spinner />
                            ) : (
                                <p className="font-semibold text-base leading-5">
                                    Get Started
                                </p>
                            )}
                        </PrimaryButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const InputLabel = ({ label }: { label: string }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
        </div>
    );
};
