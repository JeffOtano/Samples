import classNames from 'classnames';

export const JobStatusLabel = ({ published }: { published: boolean }) => {
    return (
        <div
            className={classNames(
                'p-1 w-fit rounded',
                {
                    'bg-green-50': published,
                },
                {
                    'bg-dark-25': !published,
                },
            )}
        >
            <p
                className={classNames(
                    'text-[11px] font-semibold leading-3 tracking-[0.5px]',
                    {
                        'text-green-600': published,
                    },
                    {
                        'text-dark-200': !published,
                    },
                )}
            >
                {published ? 'PUBLISHED' : 'UNPUBLISHED'}
            </p>
        </div>
    );
};
