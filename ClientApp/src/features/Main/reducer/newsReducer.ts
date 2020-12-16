/* eslint-disable no-param-reassign */
import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import { ROOT_REDUCER_NAME } from './constants';
import { NewsState, News, RootState } from './types';
import { newsList } from './selectors';
import * as services from '../services';

const REQUEST_ITEM_COUNT = 5;
const SLICE_NAME = `${ROOT_REDUCER_NAME}/news`;

const initialState: NewsState = {
    newsList: {},
    listOrder: [],
    isLoading: false,
};

const initNews = createAsyncThunk(
    `${SLICE_NAME}/initNews`,
    async () => services.getNewsList(0, REQUEST_ITEM_COUNT),
);

const getNews = createAsyncThunk(
    `${SLICE_NAME}/getNews`,
    async (onRejected: () => void, thunkApi) => {
        const start = newsList(thunkApi.getState() as RootState).length;
        return services.getNewsList(start, start + REQUEST_ITEM_COUNT)
            .catch((reason) => {
                onRejected();
                throw reason;
            }) as Promise<News[]>;
    },
);

interface DeleteNewsProps {
    id: number,
    onFulfilled: (id: number) => void,
    onRejected: () => void,
}

const deleteNews = createAsyncThunk(
    `${SLICE_NAME}/deleteNews`,
    async ({
        id,
        onFulfilled,
        onRejected,
    }: DeleteNewsProps) => services
        .deleteNews(id)
        .then(
            (value) => {
                onFulfilled(value);
                return value;
            },
            (err) => {
                onRejected();
                throw err;
            },
        ),
);

const newsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            initNews.fulfilled,
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
        builder.addCase(
            getNews.pending,
            (state: NewsState) => {
                state.isLoading = true;
            },
        );
        builder.addCase(
            getNews.fulfilled,
            (state: NewsState, { payload }: PayloadAction<News[]>) => {
                payload.forEach((news) => {
                    state.newsList[news.id] = news;
                    if (!state.listOrder.includes(news.id)) {
                        state.listOrder.push(news.id);
                    }
                });
                state.isLoading = false;
            },
        );
        builder.addCase(
            getNews.rejected,
            (state: NewsState) => {
                state.isLoading = false;
            },
        );
        builder.addCase(
            deleteNews.fulfilled,
            (state: NewsState, { payload }: PayloadAction<number>) => {
                delete state.newsList[payload];
                state.listOrder = state.listOrder.filter(
                    (value) => value !== payload,
                );
            },
        );
    },
});

export const { reducer } = newsSlice;
export const actions = {
    ...newsSlice.actions,
    getNews,
    initNews,
    deleteNews,
};
