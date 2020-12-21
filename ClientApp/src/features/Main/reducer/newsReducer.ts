import {
    createSlice,
    createSelector,
    createAsyncThunk,
    unwrapResult,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
    actions as newsActions,
    selectors as newsSelectors,
    RootState as NewsRootState,
} from '../../news/reducer';
import rootSelector from './rootSelector';
import { ROOT_REDUCER_NAME } from './constants';
import {
    NewsState,
    RootState,
    News,
} from './types';

const REDUCER_NAME = `${ROOT_REDUCER_NAME}/news`;
const REQUEST_COUNT = 5;

const newsStateSelector = createSelector(
    rootSelector,
    (main) => main.news,
);

interface CombineRootState extends RootState, NewsRootState {}

const selectors = {
    isLoading: createSelector(
        newsStateSelector,
        (news) => news.isLoading,
    ),
    newsList: (state: CombineRootState): Array<News> => {
        const { showCount } = newsStateSelector(state);

        return newsSelectors.data.newsList(0, showCount - 1)(state);
    },
};

const initNewsList = createAsyncThunk(
    `${REDUCER_NAME}/initNewsList`,
    async (_, { dispatch }) => {
        unwrapResult(
            await dispatch(
                newsActions.data.initShortNewsList({
                    start: 0,
                    end: REQUEST_COUNT - 1,
                }),
            ),
        );

        return REQUEST_COUNT;
    },
);

const loadNewsMore = createAsyncThunk(
    `${REDUCER_NAME}/loadNews}`,
    async (_, { dispatch, getState }) => {
        const showCount = newsStateSelector(
            getState() as RootState,
        ).showCount + REQUEST_COUNT;

        unwrapResult(
            await dispatch(
                newsActions.data.initShortNewsList({
                    start: 0,
                    end: showCount,
                }),
            ),
        );

        return showCount;
    },
);

const initialState: NewsState = {
    showCount: 0,
    isLoading: false,
};

const slice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                loadNewsMore.pending,
                (state) => {
                    state.isLoading = true;
                },
            )
            .addCase(
                loadNewsMore.fulfilled,
                (state, { payload }: PayloadAction<number>) => {
                    state.isLoading = false;
                    state.showCount = payload;
                },
            )
            .addCase(
                loadNewsMore.rejected,
                (state) => {
                    state.isLoading = false;
                },
            )
            .addCase(
                initNewsList.pending,
                (state) => {
                    state.isLoading = true;
                },
            )
            .addCase(
                initNewsList.fulfilled,
                (state, { payload }: PayloadAction<number>) => {
                    state.isLoading = false;
                    state.showCount = payload;
                },
            )
            .addCase(
                initNewsList.rejected,
                (state) => {
                    state.isLoading = false;
                },
            );
    },
});

export const actions = {
    ...slice.actions,
    loadNewsMore,
    initNewsList,
};
export const { reducer } = slice;
export { selectors };
