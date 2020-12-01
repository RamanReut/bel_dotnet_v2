import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getTranslation } from '../../../share/translationContainer';
import HeaderedList from '../../../share/HeaderedList';
import { selectors } from '../reducer';

function News(): ReactElement {
    const { t, i18n } = useTranslation();
    const news = useSelector(selectors.newsList);

    const newsListElements = useMemo(
        () => news.map((elem) => ({
            img: elem.preview,
            title: getTranslation<string>(elem.title, i18n.language),
            link: `/news/${elem.id}`,
            editLink: `/editNews/${elem.id}`,
        })),
        [i18n.language, news],
    );

    return (
        <HeaderedList
            title={t('newsTitle')}
            elements={newsListElements}
            addLink="/editNews/new"
        />
    );
}

export default News;
