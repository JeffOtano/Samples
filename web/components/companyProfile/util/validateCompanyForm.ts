import { FormikErrors } from 'formik';
import { CompanyFormValues } from '../CompanyEditForm';

export const validateCompanyForm = (values: CompanyFormValues) => {
    const errors: FormikErrors<CompanyFormValues> = {};
    if (!values.companyTitle) {
        errors.companyTitle = 'Company title is required';
    }

    return errors;
};
