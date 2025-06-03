import { Header } from '../../components/blocks/Header/Header';
import { TeamIntro } from '../../components/blocks/TeamIntro';
import { Footer } from '../../components/blocks/Footer';
import styles from './AboutUsPage.module.scss';

export const AboutUsPage = () => (
    <div className={styles.aboutUsPageContainer}>
        <Header />
        <TeamIntro />
        <Footer />
    </div>
);
