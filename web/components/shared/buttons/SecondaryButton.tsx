import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const SecondaryButton = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
) => {
    const { children, className, ...rest } = props;

    return (
        <button
            className={`bg-white-100 border rounded-lg px-5 text-dark-400 text-base leading-5 font-semibold py-3 hover:shadow-md disabled:shadow-none disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
