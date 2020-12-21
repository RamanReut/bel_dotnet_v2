import { combineReducers } from '@reduxjs/toolkit';
import * as news from './newsReducer';
import * as carousel from './carouselReducer';
import * as types from './types';

const reducer = combineReducers({
    news: news.reducer,
    carousel: carousel.reducer,
});

export const actions = {
    news: news.actions,
    carousel: carousel.actions,
};

export const selectors = {
    news: news.selectors,
    carousel: carousel.selectors,
};

export { types };
export default reducer;
