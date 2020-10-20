import { createSelector } from '@reduxjs/toolkit';
import { NewsState, RootState } from './types';
import { getTranslation } from '../../../share/translationContainer';

function rootSelector(root: RootState): NewsState {
    return root.news;
}

const editLanguage = createSelector(
    rootSelector,
    (news: NewsState) => news.editLanguage,
);
const content = createSelector(
    rootSelector,
    editLanguage,
    (news: NewsState, lang: string) => getTranslation(news.content, lang),
);
const title = createSelector(
    rootSelector,
    editLanguage,
    (news: NewsState, lang: string) => getTranslation(news.title, lang),
);
const isPreview = createSelector(
    rootSelector,
    (news: NewsState) => news.isPreview,
);

const selectors = {
    content,
    title,
    editLanguage,
    isPreview,
};

export default selectors;
