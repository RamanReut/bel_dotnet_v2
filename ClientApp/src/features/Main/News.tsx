import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import Section from '../../share/Section';
import NewsCarousel from './NewsCarousel';

const useStyles = makeStyles({
    root: {
        height: '20em',
        width: '100%',
        position: 'relative',
    },
    editButton: {
        position: 'absolute',
        right: '0.25em',
        top: '0.25em',
    },
});

export default function News(): React.ReactElement {
    const classes = useStyles();

    return (
        <Section className={classes.root}>
            <NewsCarousel />
            <IconButton
                className={classes.editButton}
                component={Link}
                to="/editNews"
            >
                <EditIcon />
            </IconButton>
        </Section>
    );
}
