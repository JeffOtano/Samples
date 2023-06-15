import { Company } from '../../lib/interfaces/common';
import MarkdownToHTML from '../util/MarkdownToHTML';
import Image from 'next/image';
import { slugToText } from '../util/slugToText';

type CompanyProfilePreviewProps = {
    company: Company;
};

export const CompanyProfilePreview = ({
    company,
}: CompanyProfilePreviewProps) => {
    return (
        <div className="bg-white-100 flex basis-1/2 gap-1 relative flex-col mx-2 mb-5  border border-gray-200 rounded-2xl h-full overflow-auto">
            <div className="w-full relative h-[136px] bg-dark-25">
                <Image
                    src={company?.logo ?? '/images/companyDefaultLogo.png'}
                    width={128}
                    height={128}
                    alt="Company Logo"
                    className="rounded-xl h-32 w-32 z-10 border border-gray-200 left-6 absolute top-10"
                />
                {/* This holds the space for flexbox to work */}
                <span className="block h-[136px] w-full" />
            </div>
            <div className="mx-7">
                <h2 className="font-semibold text-[24px] text-dark-500 leading-7 mt-14">
                    {company?.title ?? 'Company Name'}
                </h2>
                <div className="text-[15px] text-dark-400 leading-7 mb-6 mt-2">
                    <MarkdownToHTML content={company?.bio ?? ''} />
                </div>
                <div className="mb-7">
                    <ProfilePreviewSectionTitle title="Office Locations" />
                    {company?.locations.map((location) => {
                        const locationTitle = slugToText(location);
                        return (
                            <DataPill key={location} title={locationTitle} />
                        );
                    })}
                </div>
                <div className="mb-7">
                    <ProfilePreviewSectionTitle title="Industries" />
                    {company?.industries.map((industry) => (
                        <DataPill key={industry} title={industry} />
                    ))}
                </div>
                <MarkdownSection
                    title="Company History"
                    content={company?.history_body ?? ''}
                />
                <MarkdownSection
                    title="What We Look For"
                    content={company?.looking_for_body ?? ''}
                />
                <MarkdownSection
                    title={`Working at ${company?.title}`}
                    content={company?.working_body ?? ''}
                />
                <MarkdownSection
                    title="Our Interview Process"
                    content={company?.interview_body ?? ''}
                />
            </div>
        </div>
    );
};

export const MarkdownSection = ({
    title,
    content,
}: {
    title: string;
    content: string;
}) => {
    return (
        <div className="mb-7">
            <ProfilePreviewSectionTitle title={title} />
            {content ? (
                <div className="border border-dark-50 rounded-2xl h-full px-4 py-3 text-[15px] text-dark-400 leading-7">
                    <MarkdownToHTML content={content} />
                </div>
            ) : (
                <div className="border border-dark-50 py-11 flex items-center justify-center h-full max-h-[100px] rounded-2xl">
                    <p className="text-center text-[11px] font-semibold text-dark-400 leading-4">
                        This section is empty
                    </p>
                </div>
            )}
        </div>
    );
};

const ProfilePreviewSectionTitle = ({ title }: { title: string }) => {
    return <h3 className="font-semibold text-base leading-5 mb-2">{title}</h3>;
};

export const DataPill = ({ title }: { title: string }) => {
    return (
        <div className="border border-dark-50 rounded-full m-[2px] px-4 py-1 text-[11px] font-semibold leading-4 text-dark-500 inline-block mr-2">
            {title}
        </div>
    );
};
