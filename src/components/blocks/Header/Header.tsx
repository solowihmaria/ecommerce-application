import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import styles from './Header.module.scss';
import { logoutUser } from '../../../api/auth/authService';
import { LoginContext } from '../../../App';

export const Header = () => {
    const { loginStatus, setLoginStatus } = useContext(LoginContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logoutUser()
            .then(() => {
                void navigate('/main');
                setLoginStatus(false);
            })
            .catch((error) => console.log(error));
    };

    return (
        <nav className={styles.header}>
            <div>
                <Link to="/main">
                    <Button>Main</Button>
                </Link>
            </div>
            <div className={styles.menu}>
                {loginStatus ? (
                    <Button onClick={onLogout}>Logout</Button>
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
