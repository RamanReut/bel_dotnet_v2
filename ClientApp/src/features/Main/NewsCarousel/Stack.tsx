import React, { ReactElement } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import StackElement, { StackElementProps } from './StackElement';
import { NEWS_HEIGHT } from '../constants';

const useStyles = makeStyles({
    root: {
        overflowY: 'auto',
        height: NEWS_HEIGHT,
        boxSizing: 'border-box',
    },
});

export interface StackProps {
    news: StackElementProps[];
}

function Stack({
    news,
}: StackProps): ReactElement {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {news.map((elem) => <StackElement key={elem.id} {...elem} />)}
        </List>
    );
}

export default Stack;
