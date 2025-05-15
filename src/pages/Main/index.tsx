import React from 'react';
import { Header } from '../../components/blocks/Header/Header';

export const MainPage = (): React.JSX.Element => (
    <div data-testid="main-page-test-id">
        <Header />
        <h1>Main Page Content</h1>
    </div>
);
