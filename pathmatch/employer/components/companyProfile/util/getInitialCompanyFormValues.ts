import { Company } from '../../../lib/interfaces/common';
import { CompanyFormValues } from '../CompanyEditForm';

export const getInitialCompanyFormValues = (
    company: Company,
): CompanyFormValues => {
    return {
        companyLogo: company.logo || '',
        companyTitle: company.title || '',
        industries: company.industries || [],
        locations: company.locations || [],
        companyDescription: company.bio || '',
        companyHistory: company.history_body || '',
        lookingFor: company.looking_for_body || '',
        workingAt: company.working_body || '',
        internshipAt: company.internship_body || '',
        interviewAt: company.interview_body || '',
        perks: company.perks || [],
    };
};
