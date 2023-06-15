import classNames from 'classnames';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

type ToastProps = {
    title: string;
    description?: string;
    descriptionComponent?: React.ReactNode;
    isError?: boolean;
    onClose?: () => void;
};

export const Toast = ({
    title,
    description,
    descriptionComponent,
    isError,
    onClose,
}: ToastProps) => {
    return (
        <div
            className={classNames(
                'bg-dark-700 shadow shadow-white text-white-100 w-full items-center justify-center rounded-xl p-4 flex',
                {
                    'justify-between w-full': isError,
                },
            )}
        >
            {!isError && (
                <Image
                    src={'/images/toastCheckMark.png'}
                    alt="Toast Check Mark"
                    height={40}
                    width={40}
                    className="mr-2 w-10 h-10"
                />
            )}
            {isError && (
                <button
                    onClick={onClose}
                    className="h-10 w-10 mr-3 rounded-full bg-red-500 flex items-center justify-center"
                >
                    <AiOutlineClose
                        size={20}
                        color="#FFF"
                        fill="#FFF"
                        stroke="#FFF"
                        className="font-bold"
                    />
                </button>
            )}
            <div>
                <p className="leading-5 text-[15px] font-semibold">{title}</p>
                <p className="leading-5 text-[13px] font-medium">
                    {description}
                </p>
                {descriptionComponent}
            </div>
        </div>
    );
};
