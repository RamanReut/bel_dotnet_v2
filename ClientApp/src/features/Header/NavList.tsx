import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { PageData } from './types';

const useItemStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'inline-flex',
        width: '6em',
        height: '4em',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    active: {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));

function Item({
    href,
    title,
}: PageData): React.ReactElement {
    const classes = useItemStyles();

    return (
        <ListItem
            className={classes.root}
            button
            component={NavLink}
            to={href}
            activeClassName={classes.active}
            disableRipple
        >
            <ListItemText>
                {title}
            </ListItemText>
        </ListItem>
    );
}

export interface NavListProps {
    pages: PageData[];
}

const useListStyles = makeStyles({
    root: {
        margin: '0',
        padding: '0',
    },
});

export default function NavList({
    pages,
}: NavListProps): React.ReactElement {
    const classes = useListStyles();

    return (
        <List
            className={classes.root}
            component="nav"
        >
            {
                pages.map(
                    (page) => (
                        <Item
                            key={page.title}
                            href={page.href}
                            title={page.title}
                        />
                    ),
                )
            }
        </List>
    );
}
