import { createSelector } from '@reduxjs/toolkit';
import { RootState, MainState } from './types';

function rootSelector(store: RootState): MainState {
    return store.main;
}

// eslint-disable-next-line import/prefer-default-export
export const news = createSelector(
    rootSelector,
    (main: MainState) => main.news,
);
