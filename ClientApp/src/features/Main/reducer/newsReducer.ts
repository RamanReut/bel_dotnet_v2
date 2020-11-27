/* eslint-disable no-param-reassign */
import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import { ROOT_REDUCER_NAME } from './constants';
import { NewsState, News } from './types';
import getNewList from '../services/getNewsList';

const SLICE_NAME = `${ROOT_REDUCER_NAME}/news`;

const initialState: NewsState = {
    newsList: [],
    listOrder: [],
};

const getNews = createAsyncThunk(
    `${SLICE_NAME}/getNews`,
    async () => getNewList(),
);

const newsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            getNews.fulfilled,
            (state: NewsState, { payload }: PayloadAction<News[]>) => {
                const lst: Record<number, News> = {};
                const order = new Array<number>();

                payload.forEach((news) => {
                    lst[news.id] = news;
                    order.push(news.id);
                });

                state.newsList = lst;
                state.listOrder = order;
            },
        );
    },
});

export const { reducer } = newsSlice;
export const actions = {
    ...newsSlice.actions,
    getNews,
};
