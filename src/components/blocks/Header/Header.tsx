import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import styles from './Header.module.scss';
import { logoutUser } from '../../../api/auth/authService';
import { LoginContext } from '../../../App';
import { ReactComponent as HomeIcon } from '../../../assets/icons/main.svg';

export const Header = () => {
    const { loginStatus, setLoginStatus } = useContext(LoginContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logoutUser()
            .then(() => {
                setLoginStatus(false);
                void navigate('/main');
            })
            .catch((error) => console.log(error));
    };

    return (
        <nav className={styles.header}>
            <div>
                <Link to="/main" className={styles.iconLink}>
                    <HomeIcon className={styles.icon} />
                </Link>
            </div>
            <div className={styles.menu}>
                {loginStatus ? (
                    <Button
                        variant="ghost"
                        className={styles.headerButton}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Link to="/login">
                            <Button
                                variant="ghost"
                                className={styles.headerButton}
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                variant="ghost"
                                className={styles.headerButton}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};
