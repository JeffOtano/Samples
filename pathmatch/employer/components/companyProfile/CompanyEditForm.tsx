import React from 'react';
import { Formik, Field, FormikProps } from 'formik';
import { useToast } from '@chakra-ui/react';
import { Company, CompanyInput } from '../../lib/interfaces/common';
import { useGetFilters, useSaveCompany } from '../../lib/pmBackend';
import MarkdownEditor from '../shared/forms/MarkdownEditor';
import { CustomSelect } from '../shared/forms/CustomSelect';
import { convertFiltersToFilterData } from '../jobPost/util/convertFiltersToFilterData';
import industries from '../../lib/resources/industries';
import { getInitialCompanyFormValues } from './util/getInitialCompanyFormValues';
import { formatCompanyEditPayload } from './util/formatCompanyEditPayload';
import { MediaUploadBox } from './MediaUploadBox';
import { validateCompanyForm } from './util/validateCompanyForm';
import { getBorderColor } from './util/getBorderColor';
import { Toast } from '../shared/Toast';

export interface CompanyFormValues {
    companyLogo: string;
    companyTitle: string;
    industries: string[];
    locations: string[];
    companyDescription: string;
    companyHistory: string;
    lookingFor: string;
    workingAt: string;
    internshipAt: string;
    interviewAt: string;
    perks: string[];
}

export const CompanyEditForm = ({
    company,
    formikRef,
}: {
    company: Company;
    formikRef: React.MutableRefObject<FormikProps<CompanyFormValues> | null>;
}) => {
    const { data: filters } = useGetFilters();
    const filterData = filters && convertFiltersToFilterData(filters);
    const initialFormValues = getInitialCompanyFormValues(company);
    const saveCompany = useSaveCompany();
    const toast = useToast();

    const onSubmitForm = async (values: CompanyFormValues) => {
        const payload: CompanyInput = formatCompanyEditPayload(values);

        await saveCompany.mutateAsync({
            payload,
        });

        if (saveCompany.isSuccess) {
            toast({
                position: 'top-right',
                duration: 5000,
                isClosable: true,
                render: () => (
                    <Toast
                        title="Changes saved"
                        description="Successfully saved changes to your Company Profile"
                    />
                ),
            });
        }
        if (saveCompany.isError) {
            toast({
                position: 'top-right',
                title: 'Error saving company details',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="bg-white-100 flex flex-col flex-1 basis-1/2 mx-2 mb-5 py-4 px-5 border border-gray-200 rounded-2xl h-full overflow-auto">
            <Formik
                initialValues={initialFormValues}
                onSubmit={(values) => onSubmitForm(values)}
                validate={(values) => validateCompanyForm(values)}
                innerRef={formikRef}
            >
                {({ errors, touched }) => (
                    <>
                        <div className="mb-5">
                            <p className="font-semibold text-[13px] text-dark-300 leading-5 mb-1">
                                Company Name
                            </p>
                            <Field
                                name="companyTitle"
                                id="companyTitle"
                                type="text"
                                height={'48px'}
                                required
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                borderColor={getBorderColor(
                                    'companyTitle',
                                    errors,
                                    touched,
                                )}
                            />
                        </div>

                        <div className="mb-5">
                            <Field
                                name="logo"
                                id="logo"
                                type="text"
                                height="48px"
                                component={MediaUploadBox}
                                value={company.logo}
                            />
                        </div>

                        {companyForm(
                            'Brief Company Description',
                            'companyDescription',
                        )}

                        <div className="mb-5">
                            <p className="font-semibold text-[13px] text-dark-300 leading-5 mb-1">
                                Industries
                            </p>
                            <Field
                                options={industries}
                                component={CustomSelect}
                                isMulti={true}
                                name="industries"
                            />
                        </div>

                        <div className="mb-5">
                            <p className="font-semibold text-[13px] text-dark-300 leading-5 mb-1">
                                Office Locations
                            </p>
                            <Field
                                options={filterData && filterData.locations}
                                component={CustomSelect}
                                isMulti={true}
                                name="locations"
                            />
                        </div>

                        <div className="flex flex-col">
                            {companyForm('Company History', 'companyHistory')}
                            {companyForm('What We Look For', 'lookingFor')}
                            {companyForm(
                                `Working at ${company.title}`,
                                'workingAt',
                            )}
                            {companyForm(
                                'Our Interview Process',
                                'interviewAt',
                            )}
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
};

function companyForm(label: string, name: string) {
    return (
        <div className="mb-5">
            <p className="font-semibold text-[13px] text-dark-300 leading-5 mb-1">
                {label}
            </p>
            <Field
                name={name}
                id={name}
                component={MarkdownEditor}
                height={250}
            />
        </div>
    );
}
