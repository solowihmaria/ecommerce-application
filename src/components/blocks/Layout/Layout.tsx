import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};
