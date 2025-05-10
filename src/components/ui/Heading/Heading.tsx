import React from 'react';
import styles from './Heading.module.scss';
import type { HeadingProps } from './Heading.types';

export const Heading = ({
    level = 'h1',
    className = '',
    children,
    ...props
}: HeadingProps): React.JSX.Element => {
    const Tag = level;

    return (
        <Tag
            className={`${styles.heading} ${styles[`heading--${level}`]} ${className}`}
            {...props}
        >
            {children}
        </Tag>
    );
};
