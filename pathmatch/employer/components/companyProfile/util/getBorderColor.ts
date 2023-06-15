import { FormikErrors, FormikTouched } from 'formik';
import { CompanyFormValues } from '../CompanyEditForm';

export const getBorderColor = (
    fieldName: keyof CompanyFormValues,
    errors: FormikErrors<CompanyFormValues>,
    touched: FormikTouched<CompanyFormValues>,
) => {
    const hasError = Boolean(errors[fieldName] && touched[fieldName]);
    return hasError ? 'red' : 'inherit';
};
