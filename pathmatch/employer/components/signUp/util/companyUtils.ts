import * as yup from 'yup';

export const companyValidationSchema = yup.object().shape({
    companyName: yup
        .string()
        .required('Company name is required')
        .max(50, 'Company name must be 50 characters or less'),
    industries: yup.array().min(1, 'At least one industry is required'),
    website: yup
        .string()
        .required('Company Website is required')
        .transform((value, originalValue) => {
            if (/^(https?:\/\/)/.test(originalValue)) {
                return originalValue;
            } else {
                return `https://${originalValue}`;
            }
        })
        .url('Please enter a valid URL'),
    workplaceType: yup
        .array()
        .min(1, 'At least one workplace type is required'),
    locations: yup.array().min(1, 'At least one location is required'),
});

export type CompanyDetailsFormValues = {
    companyName: string;
    companyLogo: File | null;
    industries: string[];
    website: string;
    workplaceType: string[];
    locations: string[];
};

export const companyInitialValues: CompanyDetailsFormValues = {
    companyName: '',
    companyLogo: null,
    industries: [],
    website: '',
    workplaceType: [],
    locations: [],
};
