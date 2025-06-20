import { TeamIntro } from '../../components/blocks/TeamIntro';
import styles from './AboutUsPage.module.scss';

export const AboutUsPage = () => (
    <div data-testid="about-us-page" className={styles.aboutUsPageContainer}>
        <TeamIntro />
    </div>
);
