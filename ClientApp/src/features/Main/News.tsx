import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
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
        right: '0.1em',
        bottom: '0.1em',
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
                to="/editNews/new"
            >
                <AddIcon />
            </IconButton>
        </Section>
    );
}
