import { TeamIntro } from '../../components/blocks/TeamIntro';
import styles from './AboutUsPage.module.scss';

export const AboutUsPage = () => (
    <div className={styles.aboutUsPageContainer}>
        <TeamIntro />
    </div>
);
