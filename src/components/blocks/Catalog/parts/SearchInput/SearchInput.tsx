import { FaSearch } from 'react-icons/fa';
import { Input } from '../../../../ui/Input';
import styles from './SearchInput.module.scss';
import type { FormEvent, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: FormEvent) => void;
}

export const SearchInput = ({
    handleSubmit,
    handleChange,
}: SearchInputProps) => {
    return (
        <form
            className={clsx(styles.searchInputWrapper)}
            onSubmit={(event) => handleSubmit(event)}
        >
            <Input
                name="search"
                placeholder="Search for ..."
                onChange={handleChange}
            ></Input>
            <button type="submit" className={styles.buttonSearch}>
                <FaSearch />
            </button>
        </form>
    );
};
