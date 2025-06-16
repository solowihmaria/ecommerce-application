import { useEffect } from 'react';
import styles from './LeafFall.module.scss';

export const LeafFall = () => {
    useEffect(() => {
        const container = document.querySelector(`.${styles.leafContainer}`);

        for (let i = 0; i < 15; i++) {
            const leaf = document.createElement('div');
            leaf.className = styles.leaf;
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.animationDuration = `${5 + Math.random() * 5}s`;
            leaf.style.animationDelay = `${Math.random() * 5}s`;

            container?.appendChild(leaf);
        }
    }, []);

    return <div className={styles.leafContainer}></div>;
};
