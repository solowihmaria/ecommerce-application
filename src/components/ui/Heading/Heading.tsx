import React from 'react';
import styles from './Heading.module.scss';
import clsx from 'clsx';
import type { HeadingProps } from './Heading.types';

export const Heading = ({
    level = 'h1',
    className = '',
    ...props
}: HeadingProps) => {
    return React.createElement(level, {
        className: clsx(styles.heading, styles[`heading--${level}`], className),
        ...props,
    });
};
