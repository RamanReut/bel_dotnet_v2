import { createSelector } from '@reduxjs/toolkit';
import * as types from './types';
import { getTranslation } from '../../../share/translationContainer';

function rootSelector(root: types.RootState): types.NewsState {
    return root.news;
}

const editLanguage = createSelector(
    rootSelector,
    (news: types.NewsState) => news.editLanguage,
);

const content = createSelector(
    rootSelector,
    editLanguage,
    (news: types.NewsState, lang: string) => getTranslation(news.content, lang),
);

const selectors = {
    content,
};

export default selectors;
