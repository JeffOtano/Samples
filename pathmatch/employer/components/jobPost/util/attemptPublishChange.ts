import { FormikProps } from 'formik';
import { JobPostFormValues } from '../JobPostForm';
import { validateJobPostForm } from './validateJobPostForm';

export function attemptPublishChange(
    published: boolean,
    formikRef: React.RefObject<FormikProps<JobPostFormValues>>,
) {
    if (!formikRef.current?.values) return;

    const errors = validateJobPostForm(formikRef.current.values);

    if (Object.keys(errors).length === 0) {
        formikRef.current.setFieldValue('published', published);
    }
}
