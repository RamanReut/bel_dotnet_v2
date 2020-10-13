import React, { ReactElement } from 'react';
import Header from '../Header';
import Main from './Main';
import Footer from './Footer';

export interface LayoutProps {
    children?: ReactElement | ReactElement[];
}

function Layout(): ReactElement {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    children: <div />,
};

export default Layout;
