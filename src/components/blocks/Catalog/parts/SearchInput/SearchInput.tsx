import { FaSearch } from 'react-icons/fa';
import { Input } from '../../../../ui/Input';
import styles from './SearchInput.module.scss';
import type { FormEvent } from 'react';

interface SearchInputProps {
    handleSubmit: (event: FormEvent) => void;
    handleChange: (event: FormEvent) => void;
}

export const SearchInput = ({
    handleSubmit,
    handleChange,
}: SearchInputProps) => {
    return (
        <form
            className={styles.inputWrapper}
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
