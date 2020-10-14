import React, { ReactElement } from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import Main from './Main';
import Footer from './Footer';

export interface LayoutProps {
    children?: ReactElement | ReactElement[];
}

function Layout({
    children,
}: LayoutProps): ReactElement {
    return (
        <Container maxWidth="lg">
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </Container>
    );
}

Layout.defaultProps = {
    children: <div />,
};

export default Layout;
