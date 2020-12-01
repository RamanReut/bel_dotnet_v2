import { createSelector, OutputSelector } from '@reduxjs/toolkit';
import * as types from './types';

function rootSelector(store: types.RootState): types.MainState {
    return store.main;
}

const newsStateSelector = createSelector(
    rootSelector,
    (main) => main.news,
);

const carouselStateSelector = createSelector(
    rootSelector,
    (main) => main.carousel,
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

export const currentSlide = createSelector(
    carouselStateSelector,
    (carouselState) => carouselState.currentSlide,
);

export const isLoading = createSelector(
    newsStateSelector,
    (newsState) => newsState.isLoading,
);
