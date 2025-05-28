import styles from './Main.module.scss';
import { AboutSection } from './parts/About/About';
import { Hero } from './parts/Hero/Hero';
import { Testimonials } from './parts/Testimonials/Testimonials';
import { Newsletter } from './parts/Newsletter/Newsletter';

export const Main = () => (
    <main className={styles.main}>
        <Hero />
        <AboutSection />
        <Testimonials />
        <Newsletter />
    </main>
);
