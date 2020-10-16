import { createSelector } from '@reduxjs/toolkit';
import * as types from './types';

function rootSelector(root: types.RootState): types.NewsState {
    return root.news;
}

const content = createSelector(
    rootSelector,
    (news: types.NewsState) => news.content,
);

const selectors = {
    content,
};

export default selectors;
