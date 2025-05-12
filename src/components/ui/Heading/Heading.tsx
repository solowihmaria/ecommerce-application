import React from 'react';
import styles from './Heading.module.scss';
import type { HeadingProps } from './Heading.types';
import clsx from 'clsx';

export const Heading = ({
    level = 'h1',
    className = '',
    children,
    ...props
}: HeadingProps) => {
    const Tag = level;

    return (
        <Tag
            className={clsx(
                styles.heading,
                styles[`heading--${level}`],
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
};
