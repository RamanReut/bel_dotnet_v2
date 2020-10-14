import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Section from '../../share/Section';
import NewsCarousel from './NewsCarousel';

const useStyles = makeStyles({
    root: {
        height: '20em',
        width: '100%',
    },
});

export default function News(): React.ReactElement {
    const classes = useStyles();

    return (
        <Section className={classes.root}>
            <NewsCarousel />
        </Section>
    );
}
