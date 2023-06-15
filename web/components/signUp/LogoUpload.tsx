import { useFormikContext } from 'formik';
import { useCallback, useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import Image from 'next/image';
import classNames from 'classnames';
import { CompanyDetailsFormValues } from './util/companyUtils';

export const LogoUpload = () => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const companySignUpForm = useFormikContext<CompanyDetailsFormValues>();
    const { values } = companySignUpForm;

    const fileRef = useRef<HTMLInputElement | null>(null);
    const toast = useToast();
    const url = values.companyLogo && URL.createObjectURL(values.companyLogo);

    const handleFileUpload = useCallback(() => {
        const file = fileRef?.current?.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast({
                    title: 'Invalid file type',
                    description: 'Please select an image file.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                toast({
                    title: 'File is too large',
                    description:
                        'Please select an image file smaller than 2MB.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            companySignUpForm.setFieldValue('companyLogo', file);
        }
    }, [MAX_FILE_SIZE, companySignUpForm, toast]);

    return (
        <div className="h-[100px] bg-dark-10 justify-between flex w-full mt-7 rounded-xl">
            <div className="flex">
                <div
                    className={classNames(
                        'bg-white-100 flex items-center rounded-xl justify-center m-[14px]',
                        {
                            'w-[72px] h-[72px]': !values.companyLogo,
                        },
                    )}
                >
                    <Image
                        alt="Company Logo"
                        src={url || '/assets/company-default.svg'}
                        className={Boolean(url) ? 'rounded-xl' : undefined}
                        width={values.companyLogo ? 72 : 18}
                        height={values.companyLogo ? 72 : 12}
                    />
                    <input
                        type="file"
                        ref={fileRef}
                        accept="image/png, image/gif, image/jpeg"
                        hidden={true}
                        onChange={handleFileUpload}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-dark-500 font-semibold text-[13px] leading-5">
                        {values.companyName || 'Company Name'}
                    </h3>
                    <p className="text-dark-300 font-normal text-[13px] leading-5">
                        {values.industries[0] || 'Industry'}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => {
                        fileRef?.current?.click();
                    }}
                    className="font-semibold text-[13px] leading-5 bg-white-100 text-dark-500 border rounded-md h-8 w-20 mr-5"
                >
                    Add logo
                </button>
            </div>
        </div>
    );
};
