/* eslint-disable indent */
/* eslint-disable @typescript-eslint/indent */
import React, { useMemo } from 'react';
import Hidden from '@material-ui/core/Hidden';
import { useTranslation } from 'react-i18next';
import NavList from './NavList';
import Menu from './Menu';
import { PAGE_ROUTES } from '../../share/constants';
import { Page } from '../../share/types';

export default function Navbar(): React.ReactElement {
    const { t } = useTranslation('pages');

    const pages = useMemo(() => (
        ['main', 'about'] as Array<Page>).map((page) => ({
            title: t(page),
            href: PAGE_ROUTES[page],
        })), [t]);

    return (
        <div>
            <Hidden xsDown>
                <NavList pages={pages} />
            </Hidden>
            <Hidden smUp>
                <Menu />
            </Hidden>
        </div>
    );
}
