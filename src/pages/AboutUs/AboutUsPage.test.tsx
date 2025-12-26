import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutUsPage } from './AboutUsPage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../components/blocks/TeamIntro/TeamIntro', () => ({
    TeamIntro: () => <div data-testid="test-id-team-intro">TeamIntro Mock</div>,
}));

describe('<AboutUsPage/> component', () => {
    test('Render AboutUsPage component', () => {
        render(
            <MemoryRouter>
                <AboutUsPage />
            </MemoryRouter>
        );

        const aboutPage = screen.getByTestId('about-us-page');
        expect(aboutPage).toBeInTheDocument();

        expect(screen.getByTestId('test-id-team-intro')).toBeInTheDocument();
        expect(aboutPage).toMatchSnapshot();
    });
});
