import { CompanyInput } from '../../../lib/interfaces/common';
import { CompanyFormValues } from '../CompanyEditForm';

export const formatCompanyEditPayload = (
    values: CompanyFormValues,
): CompanyInput => {
    return {
        title: values.companyTitle,
        industries: values.industries,
        locations: values.locations,
        bio: values.companyDescription,
        history_body: values.companyHistory,
        looking_for_body: values.lookingFor,
        working_body: values.workingAt,
        internship_body: values.internshipAt,
        interview_body: values.interviewAt,
        perks: values.perks,
    };
};
