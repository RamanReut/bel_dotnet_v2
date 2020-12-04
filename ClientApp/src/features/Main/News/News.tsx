import React, { ReactElement, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { getTranslation } from '../../../share/translationContainer';
import HeaderedList from '../../../share/HeaderedList';
import { selectors, actions } from '../reducer';

function News(): ReactElement {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const news = useSelector(selectors.newsList);
    const isLoading = useSelector(selectors.isLoading);

    const handleLoadMoreReject = useCallback(
        () => {
            enqueueSnackbar(t('loadError'), { variant: 'error' });
        },
        [enqueueSnackbar, t],
    );

    const handleLoadMore = useCallback(
        () => {
            dispatch(actions.news.getNews(handleLoadMoreReject));
        },
        [dispatch, handleLoadMoreReject],
    );

    const newsListElements = useMemo(
        () => news.map((elem) => ({
            img: elem.preview,
            title: getTranslation<string>(elem.title, i18n.language),
            link: `/news/${elem.id}`,
            edit: `/editNews/${elem.id}`,
            remove: () => '/',
        })),
        [i18n.language, news],
    );

    return (
        <HeaderedList
            title={t('newsTitle')}
            elements={newsListElements}
            addLink="/editNews/new"
            isLoading={isLoading}
            onLoadMoreRequest={handleLoadMore}
        />
    );
}

export default News;
