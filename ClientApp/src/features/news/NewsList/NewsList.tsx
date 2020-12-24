import React, {
    ReactElement,
    useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import { useAppDispatch } from '../../store';
import HeaderedSection from '../../../share/HeaderedSection';
import CardDeck from '../../../share/CardDeck';
import { getTranslation } from '../../../share/translationContainer';
import NewsCard from './NewsCard';
import {
    actions,
    selectors,
} from '../reducer';

const NEWS_PER_PAGE = 9;

const useStyles = makeStyles(
    (theme) => ({
        cardDeck: {
            backgroundColor: theme.palette.grey[200],
            marginTop: '1em',
        },
    }),
);

function NewsList(): ReactElement {
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();
    const classes = useStyles();

    const page = useSelector(selectors.list.page);
    const newsCount = useSelector(selectors.data.maxCount);

    const start = (page - 1) * NEWS_PER_PAGE;
    const end = page * NEWS_PER_PAGE;
    const news = useSelector(selectors.data.newsList(start, end));

    useEffect(
        () => {
            dispatch(actions.data.initNewsCount());
        },
        [dispatch],
    );

    useEffect(
        () => {
            dispatch(
                actions.data.initShortNewsList({ start, end }),
            );
        },
        [dispatch, end, page, start],
    );

    return (
        <HeaderedSection
            title="Новости"
            addLink="/editNews/new"
        >
            <CardDeck
                className={classes.cardDeck}
                page={page}
                pageCount={Math.ceil(newsCount / NEWS_PER_PAGE)}
            >
                {news.map((cur) => {
                    const title = getTranslation(cur.title, i18n.language);

                    return (
                        <NewsCard
                            key={cur.id}
                            id={cur.id}
                            title={title}
                            image={cur.previewImage}
                        />
                    );
                })}
            </CardDeck>
        </HeaderedSection>
    );
}

export default NewsList;
