import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { FieldInputProps, FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { JobPostFormValues } from '../../jobPost/JobPostForm';
import { CompanyFormValues } from '../../companyProfile/CompanyEditForm';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MarkdownEditorProps = {
    field: FieldInputProps<JobPostFormValues | CompanyFormValues>;
    form: FormikProps<JobPostFormValues | CompanyFormValues>;
};

export default function MarkdownEditor({ field, form }: MarkdownEditorProps) {
    const { name, value } = field;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [commands, setCommands] = useState<any>(null);

    useEffect(() => {
        const loadCommands = async () => {
            const mdEditorModule = await import('@uiw/react-md-editor');
            setCommands(mdEditorModule.commands);
        };

        loadCommands();
    }, []);

    const handleChange = (value?: string) => {
        form.setFieldValue(name, value || '');
    };

    if (!commands) return null;

    return (
        <MDEditor
            preview="edit"
            commands={[
                commands.bold,
                commands.italic,
                commands.link,
                commands.unorderedListCommand,
            ]}
            visibleDragbar={false}
            value={value as unknown as string}
            onChange={handleChange}
        />
    );
}
