import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const PrimaryButton = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
) => {
    const { className, children, ...rest } = props;

    return (
        <button
            className={`bg-dark-500 border rounded-lg px-5 text-white-100 text-base leading-5 font-semibold py-3 hover:shadow-md disabled:shadow-none disabled:bg-dark-10 disabled:border-dark-10 disabled:text-dark-50 disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
