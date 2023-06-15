import { FilterData } from '../../../lib/interfaces/lists';
import Select, { MultiValue, SingleValue } from 'react-select';
import { FieldInputProps, FormikProps } from 'formik';
import { CompanyDetailsFormValues } from '../../signUp/util/companyUtils';
import { getBorderColor } from '../../companyProfile/util/getBorderColor';
import { JobPostFormValues } from '../../jobPost/JobPostForm';

type FormTypes = JobPostFormValues | CompanyDetailsFormValues;

interface CustomSelectProps {
    options: FilterData[];
    field: FieldInputProps<FormTypes>;
    form: FormikProps<FormTypes>;
    isMulti: boolean;
    disabled: boolean;
}

export const CustomSelect = ({
    options,
    field,
    form,
    isMulti = false,
    disabled = false,
}: CustomSelectProps) => {
    if (!options) {
        return null;
    }

    const selectedValues = extractExistingValuesFromField(field, options);

    return (
        <Select
            styles={{
                control: (provided) => ({
                    ...provided,
                    minHeight: '48px',
                    textAlign: 'start',
                    borderColor: getBorderColor(
                        field.name as keyof FormTypes,
                        form.errors,
                        form.touched,
                    ),
                    boxShadow: 'none',
                    borderRadius: '8px',
                }),
                indicatorSeparator: () => ({
                    display: 'none',
                }),
                menu: (provided) => ({
                    ...provided,
                    borderRadius: '8px',
                }),
            }}
            onBlur={() => form.setFieldTouched(field.name)}
            options={options}
            onChange={(option) => setFieldValues(field, form, option)}
            value={selectedValues}
            isMulti={isMulti}
            isDisabled={disabled}
        />
    );
};

const setFieldValues = (
    field: FieldInputProps<FormTypes>,
    form: FormikProps<FormTypes>,
    option: SingleValue<FilterData> | MultiValue<FilterData> | null,
) => {
    if (Array.isArray(field.value) && Array.isArray(option)) {
        form.setFieldValue(
            field.name,
            option.map((innerValue: FilterData) => innerValue.value),
        );
    } else if (typeof option === 'object' && option !== null) {
        const { value } = option as FilterData;

        form.setFieldValue(field.name, value);

        if (field.name === 'month' && value === 'ASAP') {
            form.setFieldValue('year', '');
        }
    } else if (option === null) {
        form.setFieldValue(field.name, null);
    }
};

const extractExistingValuesFromField = (
    field: FieldInputProps<FormTypes>,
    options: FilterData[],
) => {
    if (field.value instanceof Array) {
        const values = field.value as string[];
        return options.filter((option) => values.includes(option.value));
    } else {
        const fieldValue = field.value as unknown as string;
        return options.find((option) => option.value === fieldValue);
    }
};
