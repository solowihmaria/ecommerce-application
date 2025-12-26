import styles from './TeamIntro.module.scss';
import { AboutHero } from './parts/AboutHero/AboutHero';
import { MembersSection } from './parts/Members/Members';
import { Collaboration } from './parts/Collaboration/Collaboration';
import { Gratitude } from './parts/Gratitude/Gratitude';

export const TeamIntro = () => (
    <main className={styles.teamIntro}>
        <AboutHero />
        <Collaboration />
        <MembersSection />
        <Gratitude />
    </main>
);
