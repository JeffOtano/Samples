import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const CTAButton = (
    props: DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
) => {
    const { children, className, ...rest } = props;

    return (
        <button
            className={`bg-cta-gradient border rounded-lg px-5 text-white-100 text-base leading-5 font-semibold py-3 hover:shadow-md disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default CTAButton;
