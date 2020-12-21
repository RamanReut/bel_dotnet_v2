import React, { ReactElement, ReactChild } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        '& > *': {
            paddingBottom: '1em',
        },
    },
    ul: {
        display: 'inline-flex',
    },
    empty: {
        padding: 0,
    },
});

export interface CardDeckProps{
    cards?: ReactChild[];
    pageCount?: number;
}

function CardDeck({
    cards = [],
    pageCount = 0,
}: CardDeckProps): ReactElement {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                {cards.map((cur, index) => (
                    <Grid
                        item
                        key={index.toString()}
                    >
                        {cur}
                    </Grid>
                ))}
            </Grid>
            {
                pageCount !== 0
                    ? (
                        <Pagination
                            classes={{ ul: classes.ul }}
                            count={pageCount}
                        />
                    )
                    : <div className={classes.empty} />
            }

        </div>
    );
}

export default CardDeck;
