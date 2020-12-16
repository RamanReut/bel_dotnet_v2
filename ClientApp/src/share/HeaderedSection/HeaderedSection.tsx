import React, { ReactChild, ReactElement } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Section from '../Section';

const useStyles = makeStyles((theme) => ({
    header: {
        position: 'relative',
    },
    title: {
        margin: '0.5em',
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

export interface HeaderedSectionProps {
    title: string;
    addLink: string;
    children: ReactChild | ReactChild[];
}

function HeaderedSection({
    title,
    children,
    addLink,
}: HeaderedSectionProps): ReactElement {
    const classes = useStyles();

    return (
        <Section>
            <AppBar
                className={classes.header}
                position="static"
            >
                <Typography
                    className={classes.title}
                    variant="h5"
                >
                    {title}
                </Typography>
                <div className={classes.addIconWrapper}>
                    <IconButton
                        className={classes.addIcon}
                        component={Link}
                        to={addLink}
                    >
                        <AddIcon />
                    </IconButton>
                </div>
            </AppBar>
            {children}
        </Section>
    );
}

export default HeaderedSection;
