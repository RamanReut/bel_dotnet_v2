import { createSelector } from '@reduxjs/toolkit';
import { NewsState, RootState } from './types';
import { getTranslation } from '../../../share/translationContainer';

export function rootSelector(root: RootState): NewsState {
    return root.news;
}

const language = createSelector(
    rootSelector,
    (news: NewsState) => news.language,
);
const content = createSelector(
    rootSelector,
    language,
    (news: NewsState, lang: string) => getTranslation(news.content, lang),
);
const title = createSelector(
    rootSelector,
    language,
    (news: NewsState, lang: string) => getTranslation(news.title, lang),
);
const isPreview = createSelector(
    rootSelector,
    (news: NewsState) => news.isPreview,
);
const isContentLoading = createSelector(
    rootSelector,
    (news: NewsState) => news.isContentLoading,
);
const isContentLoadSuccess = createSelector(
    rootSelector,
    (news: NewsState) => news.isContentLoadSuccess,
);

const selectors = {
    content,
    title,
    language,
    isPreview,
    isContentLoading,
    isContentLoadSuccess,
};

export default selectors;
