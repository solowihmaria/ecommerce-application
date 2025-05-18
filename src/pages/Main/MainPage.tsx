import React from 'react';
import { Header } from '../../components/blocks/Header/Header';
import styles from './MainPage.module.scss';

export const MainPage = () => (
    <div data-testid="main-page-test-id">
        <Header />
        <main className={styles.main}>
            <div className={styles.titleWrapper}>
                <h1 className={styles.title}>Main Page Content</h1>
            </div>
        </main>
    </div>
);
