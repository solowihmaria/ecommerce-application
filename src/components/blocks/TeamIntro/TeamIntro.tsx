import styles from './TeamIntro.module.scss';
import { AboutHero } from './parts/AboutHero/AboutHero';
import { MembersSection } from './parts/Members/Members';
import { Collaboration } from './parts/Collaboration/Collaboration';

export const TeamIntro = () => (
    <main className={styles.teamIntro}>
        <AboutHero />
        <Collaboration />
        <MembersSection />
    </main>
);
