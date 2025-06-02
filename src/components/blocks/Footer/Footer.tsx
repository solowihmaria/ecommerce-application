import { Button } from '../../ui/Button/Button';
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaInstagram,
    FaFacebook,
    FaTwitter,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.columnsWrapper}>
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Quick Links</h3>
                        <ul className={styles.linksList}>
                            <li>
                                <Link to="/catalog" className={styles.link}>
                                    Catalog
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={styles.link}>
                                    Plant Care
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={styles.link}>
                                    Delivery & Payment
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={styles.link}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className={styles.link}>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ЗАМЕНИТЬ НА АКТУАЛЬНЫЕ КАТЕГОРИИ И ССЫЛКИ */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Categories</h3>
                        <ul className={styles.linksList}>
                            <li>
                                <Link to="/catalog" className={styles.link}>
                                    Large Plants
                                </Link>
                            </li>
                            <li>
                                <Link to="/catalog" className={styles.link}>
                                    Succulents
                                </Link>
                            </li>
                            <li>
                                <Link to="/catalog" className={styles.link}>
                                    Flowering Plants
                                </Link>
                            </li>
                            <li>
                                <Link to="/catalog" className={styles.link}>
                                    Hanging Plants
                                </Link>
                            </li>
                            <li>
                                <Link to="/catalog" className={styles.link}>
                                    Palms
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Contact</h3>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <FaMapMarkerAlt
                                    className={styles.contactIcon}
                                />
                                <span>Paris, Rue des Jardins, 15</span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaPhone className={styles.contactIcon} />
                                <span>+33 1 23 45 67 89</span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <span>info@evergreen.com</span>
                            </div>
                        </div>
                        <p className={styles.workingHours}>
                            Open daily from 9:00 to 21:00
                        </p>
                        <div className={styles.socialLinks}>
                            <Button
                                variant="outline"
                                className={styles.socialButton}
                            >
                                <FaInstagram />
                            </Button>
                            <Button
                                variant="outline"
                                className={styles.socialButton}
                            >
                                <FaFacebook />
                            </Button>
                            <Button
                                variant="outline"
                                className={styles.socialButton}
                            >
                                <FaTwitter />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <div className={styles.copyrightContent}>
                        <p className={styles.copyrightText}>
                            © {new Date().getFullYear()} Evergreen.
                        </p>
                        <p className={styles.disclaimerText}>
                            All materials on this site are used for
                            non-commercial and educational purposes only and
                            belong to their respective owners.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
