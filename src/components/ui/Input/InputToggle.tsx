import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Input.module.scss';
import type { InputToggleButtonProps } from './Input.types';

export const InputToggleButton = ({
    showPassword,
    onTogglePassword,
}: InputToggleButtonProps): React.JSX.Element => (
    <button
        type="button"
        className={styles.toggleButton}
        onClick={onTogglePassword}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
);
