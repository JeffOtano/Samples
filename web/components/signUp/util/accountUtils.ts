import * as yup from 'yup';

export const accountValidationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    terms: yup.boolean().oneOf([true], 'Terms and conditions are required'),
});

export type AccountDetailsFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    terms: boolean;
    updates: boolean;
};

export const accountInitialValues: AccountDetailsFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    terms: false,
    updates: false,
};
