import styles from './Main.module.scss';
import { AboutSection } from './parts/About/About';
import { Hero } from './parts/Hero/Hero';
import { Testimonials } from './parts/Testimonials/Testimonials';
import { Newsletter } from './parts/Newsletter/Newsletter';
import { PromoCodes } from './parts/PromoCodes/PromoCodes';

export const Main = () => (
    <main className={styles.main}>
        <Hero />
        <AboutSection />
        <PromoCodes />
        <Testimonials />
        <Newsletter />
    </main>
);
