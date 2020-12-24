import React, { ReactChild, ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Section from '../Section';

const useStyles = makeStyles((theme) => ({
    header: {
        position: 'relative',
    },
    title: {
        margin: '0.5em',
    },
    titleLink: {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
        '&:visited': {
            color: theme.palette.primary.contrastText,
        },
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    addIconWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    addIcon: {
        margin: '0.15em',
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
        },
    },
}));

export interface HeaderedSectionClasses {
    root?: string;
    title?: string;
    button?: string;
    header?: string;
    titleLink?: string;
}

export interface HeaderedSectionProps {
    title: string;
    titleLink?: string;
    addLink?: string;
    children: ReactChild | ReactChild[];
    classes?: HeaderedSectionClasses;
}

function HeaderedSection({
    title,
    titleLink,
    children,
    addLink,
    classes: inputClasses = {},
}: HeaderedSectionProps): ReactElement {
    const classes = useStyles();

    return (
        <Section className={classnames(inputClasses.root)}>
            <AppBar
                className={classnames(classes.header, inputClasses.header)}
                position="static"
            >
                <Typography
                    className={classnames(classes.title, inputClasses.title)}
                    variant="h5"
                >
                    {
                        titleLink
                            ? (
                                <Link
                                    className={
                                        classnames(
                                            classes.titleLink,
                                            inputClasses.titleLink,
                                        )
                                    }
                                    to={titleLink}
                                >
                                    {title}
                                </Link>
                            )
                            : title
                    }
                </Typography>
                {
                    addLink
                        ? (
                            <div
                                className={
                                    classnames(
                                        classes.addIconWrapper,
                                        inputClasses.button,
                                    )
                                }
                            >
                                <IconButton
                                    className={classes.addIcon}
                                    component={Link}
                                    to={addLink}
                                >
                                    <AddIcon />
                                </IconButton>
                            </div>
                        )
                        : <div />
                }
            </AppBar>
            {children}
        </Section>
    );
}

export default HeaderedSection;
