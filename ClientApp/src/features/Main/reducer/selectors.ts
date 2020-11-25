import { createSelector, OutputSelector } from '@reduxjs/toolkit';
import * as types from './types';

function rootSelector(store: types.RootState): types.MainState {
    return store.main;
}

const newsStateSelector = createSelector(
    rootSelector,
    (main) => main.news,
);

export const newsList = createSelector(
    newsStateSelector,
    (newsState) => newsState.listOrder.map(
        (elem) => newsState.newsList[elem],
    ),
);

export function news(
    id: number,
): OutputSelector<types.RootState, types.News, (res: types.NewsState) => types.News> {
    return createSelector(
        newsStateSelector,
        (newsState) => newsState.newsList[id],
    );
}
