import { useToast } from '@chakra-ui/react';
import { useValidateEmail } from '../../lib/onboarding';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    AccountDetailsFormValues,
    accountInitialValues,
    accountValidationSchema,
} from './util/accountUtils';

const UPDATES_COPY =
    'Send me updates with quality candidates, best practices, and more.';

export function AccountDetails({
    onSubmit,
}: {
    onSubmit: (values: AccountDetailsFormValues) => void;
}) {
    const toast = useToast();

    const validateMutation = useValidateEmail();

    const handleSubmit = (values: AccountDetailsFormValues) => {
        validateMutation.mutate(values.email, {
            onSuccess: () => {
                toast({
                    title: 'Email available',
                    status: 'success',
                    duration: 1000,
                });

                onSubmit(values);
            },
            onError: (err) => {
                const error = err as {
                    response: { data: { errorMessage: string } };
                };
                toast({
                    title: error.response.data.errorMessage,
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                });
            },
        });
    };

    return (
        <div className="w-full h-full w-max-[380px] flex flex-1 flex-col items-center justify-start mt-8">
            <h2 className="font-medium text-xl leading-7">
                Try PathMatch 100% free
            </h2>
            <Formik
                initialValues={accountInitialValues}
                onSubmit={handleSubmit}
                validationSchema={accountValidationSchema}
            >
                {({ errors }) => (
                    <Form className="mt-7 flex flex-col gap-y-4 max-w-full px-4 sm:px-0">
                        <div className="flex flex-1">
                            <div className="flex flex-col w-1/2">
                                <InputLabel label="First Name" />
                                <Field
                                    className="border p-3 flex rounded-l-lg h-12"
                                    name="firstName"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    className="text-sm text-red-500"
                                    component="div"
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <InputLabel label="Last Name" />
                                <Field
                                    className="border-t p-3 flex border-b border-r rounded-r-lg h-12"
                                    name="lastName"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    className="text-sm text-red-500"
                                    component="div"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <InputLabel label="Work Email" />
                                <p className="text-[11px] ml-1 leading-[18px] mb-2 text-dark-200">{`We'll send you a verification link`}</p>
                            </div>
                            <Field
                                className="border p-3 rounded-lg h-12"
                                name="email"
                                type="email"
                            />
                            <ErrorMessage
                                name="email"
                                className="text-sm text-red-500"
                                component="div"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel label="Password" />
                            <Field
                                className="border p-3 rounded-lg h-12"
                                name="password"
                                type="password"
                            />
                            <ErrorMessage
                                name="password"
                                className="text-sm text-red-500"
                                component="div"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel label="Phone Number" />
                            <Field
                                className="border p-3 rounded-lg h-12"
                                name="phoneNumber"
                                type="tel"
                            />
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Field name="updates" type="checkbox" />
                            <p className="text-dark-300 text-xs font-normal leading-3">
                                {UPDATES_COPY}
                            </p>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Field name="terms" type="checkbox" />
                            <p className="text-dark-300 text-xs font-normal leading-3">
                                I agree to PathMatch’s&nbsp;
                                <a
                                    href="https://www.pathmatch.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline font-bold"
                                >
                                    Terms & Conditions
                                </a>
                                &nbsp;and&nbsp;
                                <a
                                    href="https://www.pathmatch.com/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline font-bold"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                            className="bg-dark-500 h-12 hover:bg-dark-400 text-white-100 disabled:text-dark-75 disabled:bg-dark-10 rounded-lg"
                        >
                            <p className="font-semibold text-base leading-5">
                                Get Started
                            </p>
                        </button>
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
