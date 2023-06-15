import { FieldInputProps, FormikProps } from 'formik';
import { JobPostFormValues } from './JobPostForm';
import { FilterData } from '../../lib/interfaces/lists';
import classNames from 'classnames';

interface JobPostRadioProps {
    field: FieldInputProps<JobPostFormValues>;
    form: FormikProps<JobPostFormValues>;
    options: FilterData[];
}

export function JobPostRadio({ field, form, options }: JobPostRadioProps) {
    const isSelected = (field.value as unknown as string) === options[0].value;

    const onSelect = (option: string) => {
        form.setFieldValue(field.name, option);
    };

    return (
        <div className="flex flex-1">
            <button
                type="button"
                key={options[0].label}
                className={classNames(
                    'flex-1 flex h-9 justify-center items-center border rounded-s-lg border-dark-50',
                    {
                        'border-purple-500 bg-purple-25': isSelected,
                    },
                )}
                onClick={() => onSelect(options[0].value)}
            >
                <p
                    className={classNames(
                        'text-center text-[13px] font-semibold',
                        { 'text-purple-500': isSelected },
                    )}
                >
                    {options[0].label}
                </p>
            </button>
            <button
                type="button"
                key={options[1].label}
                className={classNames(
                    'flex-1 flex h-9 justify-center items-center border rounded-e-lg',
                    {
                        'border-purple-500 bg-purple-25': !isSelected,
                    },
                )}
                onClick={() => onSelect(options[1].value)}
            >
                <p
                    className={classNames(
                        'text-center text-[13px] font-semibold',
                        { 'text-purple-500': !isSelected },
                    )}
                >
                    {options[1].label}
                </p>
            </button>
        </div>
    );
}
