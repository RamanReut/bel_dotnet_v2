import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import { ROOT_REDUCER_NAME } from './constants';
import { NewsState, News } from './types';
import getNewList from '../services/getNewsList';

const SLICE_NAME = `${ROOT_REDUCER_NAME}/news`;

const initialState: NewsState = [];

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
            (state: NewsState, { payload }: PayloadAction<News[]>) => payload,
        );
    },
});

export const { reducer } = newsSlice;
export const actions = {
    ...newsSlice.actions,
    getNews,
};
