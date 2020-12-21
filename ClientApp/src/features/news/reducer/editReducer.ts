/* eslint-disable no-param-reassign */
import {
    createSlice,
    createSelector,
    PayloadAction,
    unwrapResult,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import {
    getTranslation,
    setTranslation,
    TranslationContainer,
} from '../../../share/translationContainer';
import { UpdatePage } from '../services';
import {
    EditState,
    RootState,
    News,
} from './types';
import { ROOT_REDUCER_NAME } from './constants';
import rootSelector from './rootSelector';
import {
    actions as dataActions,
    selectors as dataSelectors,
} from './dataReducer';

const REDUCER_NAME = `${ROOT_REDUCER_NAME}/edit`;

const initialState: EditState = {
    language: 'ru',
    isContentLoadSuccess: true,
    isContentLoading: false,
    id: 0,
    title: {
        ru: '',
        be: '',
    },
    content: {
        ru: '',
        be: '',
    },
    previewImage: '',
};

const editSelector = createSelector(
    rootSelector,
    (state) => state.edit,
);

const selectors = {
    language: createSelector(
        editSelector,
        (edit) => edit.language,
    ),
    isContentLoadSuccess: createSelector(
        editSelector,
        (edit) => edit.isContentLoadSuccess,
    ),
    isContentLoading: createSelector(
        editSelector,
        (edit) => edit.isContentLoading,
    ),
    content: createSelector(
        editSelector,
        (edit) => getTranslation<string>(edit.content, edit.language),
    ),
    title: createSelector(
        editSelector,
        (edit) => getTranslation<string>(edit.title, edit.language),
    ),
    previewImage: createSelector(
        editSelector,
        (edit) => edit.previewImage,
    ),
};

interface NewsNew {
    id: 'new';
}

const initWithNews = createAsyncThunk(
    `${REDUCER_NAME}/initWithNews`,
    async (id: number | 'new', { dispatch, getState }): Promise<NewsNew | News> => {
        if (id !== 'new') {
            unwrapResult(await dispatch(dataActions.initFullNews(id)));
            return dataSelectors.news(id)(getState() as RootState) as News;
        }

        return {
            id: 'new',
        };
    },
);

const savePage = createAsyncThunk(
    `${REDUCER_NAME}/savePage`,
    async (_, { getState, dispatch }) => {
        const state = editSelector(getState() as RootState);
        let res;

        if (state.id === 'new') {
            res = await dispatch(dataActions.addNews(state));
        } else {
            res = await dispatch(dataActions.updateNews(state as UpdatePage));
        }
        return unwrapResult(res).id;
    },
);

const slice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        changeContent(state, { payload }: PayloadAction<string>) {
            state.content = setTranslation<string>(
                state.content,
                state.language,
                payload,
            );
        },
        changeTitle(state, { payload }: PayloadAction<string>) {
            state.title = setTranslation<string>(
                state.title,
                state.language,
                payload,
            );
        },
        changeLanguage(state, { payload }: PayloadAction<string>) {
            state.language = payload;
        },
        changePreviewImage(state, { payload }: PayloadAction<string>) {
            state.previewImage = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                initWithNews.pending,
                (state) => {
                    state.isContentLoading = true;
                },
            )
            .addCase(
                initWithNews.fulfilled,
                (state, { payload }: PayloadAction<NewsNew | News>) => {
                    state.id = payload.id;
                    if (payload.id !== 'new') {
                        state.title = payload.title;
                        state.content = payload.content as TranslationContainer<string>;
                        state.previewImage = payload.previewImage;
                    }
                    state.isContentLoadSuccess = true;
                    state.isContentLoading = false;
                },
            )
            .addCase(
                initWithNews.rejected,
                (state) => {
                    state.isContentLoading = false;
                    state.isContentLoadSuccess = false;
                },
            );
    },
});

export const actions = {
    ...slice.actions,
    initWithNews,
    savePage,
};
export { selectors };
export const { reducer } = slice;
