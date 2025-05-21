import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import styles from './Header.module.scss';
import { logoutUser } from '../../../api/auth/authService';
import { LoginContext } from '../../../App';
import HomeIcon from '../../../assets/icons/main.svg';
import CartIcon from '../../../assets/icons/cart.svg';

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
        <header className={styles.headerWrapper} data-testid="test-id-header">
            <nav className={styles.header}>
                <div className={styles.leftSection}>
                    <Link to="/main" className={styles.logoLink}>
                        <HomeIcon className={styles.logoIcon} />
                    </Link>
                </div>

                <div className={styles.centerSection}>
                    <Link to="/main">
                        <Button variant="ghost" className={styles.navButton}>
                            Main
                        </Button>
                    </Link>
                    <Link to="/catalog">
                        <Button variant="ghost" className={styles.navButton}>
                            Catalog
                        </Button>
                    </Link>
                    <Link to="#">
                        <Button variant="ghost" className={styles.navButton}>
                            About
                        </Button>
                    </Link>
                    {loginStatus ? (
                        <>
                            <Link to="/profile">
                                <Button
                                    variant="ghost"
                                    className={styles.authButton}
                                >
                                    Profile
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                className={styles.authButton}
                                onClick={onLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button
                                    variant="ghost"
                                    className={styles.authButton}
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    variant="ghost"
                                    className={styles.authButton}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                <div className={styles.rightSection}>
                    <Link to="#" className={styles.cartLink}>
                        <CartIcon className={styles.cartIcon} />
                    </Link>
                </div>
            </nav>
        </header>
    );
};
