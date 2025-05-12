import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button';
import styles from './Header.module.scss';

export const Header = () => {
    const [isLogined, setIsLogined] = useState(true);

    return (
        <nav className={styles.header}>
            <div className={styles.logoContainer}>
                <Link to="/main">
                    <Button>Main</Button>
                </Link>
            </div>
            <div className={styles.menu}>
                {isLogined ? (
                    <>
                        <Link to="/login">
                            <Button onClick={() => setIsLogined(false)}>
                                Logout
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button>Sign In</Button>
                        </Link>
                        <Link to="/register">
                            <Button>Sign Up</Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
