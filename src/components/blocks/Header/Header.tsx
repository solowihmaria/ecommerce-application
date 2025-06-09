import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import styles from './Header.module.scss';
import { logoutUser } from '../../../api/auth/authService';
import { useAuth } from '../../../store/auth/useAuth';
import HomeIcon from '../../../assets/icons/main.svg';
import CartIcon from '../../../assets/icons/cart.svg';
import { MdOutlineMenu } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { IoMdClose } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { MdLogin } from 'react-icons/md';

export const Header = () => {
    const { loginStatus, setLoginStatus } = useAuth();
    const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);
    const [isProfileMenuOpened, setIsProfileMenuOpened] = useState(false);
    const profileMenuRef = useRef<null | HTMLDivElement>(null);
    const hamburgerMenuRef = useRef<null | HTMLDivElement>(null);
    const navigate = useNavigate();

    const onLogout = () => {
        logoutUser()
            .then(() => {
                setLoginStatus(false);
                void navigate('/main');
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        function handleResize() {
            setIsHamburgerMenuOpened(false);
        }
        function handleOutsideClick(e: Event) {
            const clickedElement = e.target;
            if (clickedElement instanceof HTMLElement) {
                if (profileMenuRef.current !== clickedElement) {
                    setIsProfileMenuOpened(false);
                }
            }
        }

        function handleHamburgerLinkClick(e: Event) {
            const clickedElement = e.target;
            if (clickedElement instanceof HTMLElement) {
                if (
                    hamburgerMenuRef.current &&
                    hamburgerMenuRef.current.contains(clickedElement) &&
                    hamburgerMenuRef.current !== clickedElement
                ) {
                    setIsHamburgerMenuOpened(false);
                }
            }
        }

        document.addEventListener('click', handleOutsideClick);
        if (hamburgerMenuRef.current) {
            hamburgerMenuRef.current.addEventListener(
                'click',
                handleHamburgerLinkClick
            );
        }
        window.addEventListener('resize', handleResize);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('click', handleHamburgerLinkClick);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className={styles.headerWrapper} data-testid="test-id-header">
            <nav className={styles.header}>
                <div className={styles.leftSection}>
                    <Link to="/main" className={styles.logoLink}>
                        <HomeIcon className={styles.logoIcon} />
                    </Link>
                </div>
                <div
                    ref={hamburgerMenuRef}
                    className={clsx(
                        styles.centerSection,
                        isHamburgerMenuOpened && styles.active
                    )}
                >
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
                    <Link to="/about">
                        <Button variant="ghost" className={styles.navButton}>
                            About
                        </Button>
                    </Link>

                    {isHamburgerMenuOpened && (
                        <IoMdClose
                            className={styles.hamburgerClose}
                            onClick={() => setIsHamburgerMenuOpened(false)}
                        />
                    )}
                </div>

                <div className={styles.rightSection}>
                    {loginStatus ? (
                        <CgProfile
                            className={styles.profileIcon}
                            onClick={() => {
                                setIsProfileMenuOpened(!isProfileMenuOpened);
                            }}
                        ></CgProfile>
                    ) : (
                        <MdLogin
                            className={styles.profileIcon}
                            onClick={() => {
                                setIsProfileMenuOpened(!isProfileMenuOpened);
                            }}
                        ></MdLogin>
                    )}

                    <div
                        ref={profileMenuRef}
                        className={clsx(
                            styles.profileMenu,
                            isProfileMenuOpened && styles.active
                        )}
                    >
                        {loginStatus ? (
                            <>
                                <Link to="/profile" className={styles.link}>
                                    <Button
                                        variant="ghost"
                                        className={styles.authButton}
                                    >
                                        My Profile
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
                                <Link to="/login" className={styles.link}>
                                    <Button
                                        variant="ghost"
                                        className={styles.authButton}
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                                <Link to="/register" className={styles.link}>
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
                    <Link to="/basket" className={styles.cartLink}>
                        <CartIcon className={styles.cartIcon} />
                    </Link>
                    <div className={styles.hamburger}>
                        <MdOutlineMenu
                            className={styles.hamburgerIcon}
                            onClick={() =>
                                setIsHamburgerMenuOpened(!isHamburgerMenuOpened)
                            }
                        />
                    </div>
                </div>
            </nav>
        </header>
    );
};
