import React, { ReactElement } from 'react';
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
        <div>
            <Header />
            <Main>
                {children}
            </Main>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    children: <div />,
};

export default Layout;
