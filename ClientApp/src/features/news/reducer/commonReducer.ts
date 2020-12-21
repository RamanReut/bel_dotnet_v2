import {
    createSlice,
    createSelector,
} from '@reduxjs/toolkit';
import { ROOT_REDUCER_NAME } from './constants';
import { CommonState } from './types';
import rootSelector from './rootSelector';

const REDUCER_NAME = `${ROOT_REDUCER_NAME}/common`;

const commonSelector = createSelector(
    rootSelector,
    (news) => news.common,
);

const selectors = {
    isPreview: createSelector(
        commonSelector,
        (common) => common.isPreview,
    ),
};

const initialState: CommonState = {
    isPreview: false,
};

const slice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        enablePreview(state) {
            state.isPreview = true;
        },
        disablePreview(state) {
            state.isPreview = false;
        },
    },
});

export const { reducer, actions } = slice;
export { selectors };
